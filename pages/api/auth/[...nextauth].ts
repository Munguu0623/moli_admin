import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

import prisma from "../../../lib/prisma";  // adjust the path to your prisma instance
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/utils/types";;  // adjust the path to your types file

export default NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });
        if (!user || user.password !== credentials.password) {
          return null;
        }

        const { password, ...rest } = user;
        const result = await prisma.menu.findMany({
          where: {
            RoleMenu: {
              some: {
                roleId: 'writer'
              }
            },
            isVisible: 1
          },
          select: {
            id: true,
            name: true,
            parentMenuId: true,
            menuType: true,
            menuUrl: true,
            isVisible: true,
            viewOrder: true
          }
        });
        return {
          ...rest,
          name: user.firstName,
          id: user.id + '',
          menu: result
        };
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/500",
  },
  callbacks: {
    session({ session, token }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id + '',
          roleId: token.roleId,
          menu: token.menu
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          roleId: u.roleId,
          menu: u.menu
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,

  // adapter: PrismaAdapter(prisma),
});
