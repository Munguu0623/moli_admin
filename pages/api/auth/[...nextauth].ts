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
        console.log(credentials.email, "-----");
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });
        console.log(user, "user------");
        if (!user || user.password !== credentials.password) {
          return null;
        }

        const { password, ...rest } = user;
        console.log(password, rest, ' rest');
        return {
          ...rest,
          id: user.id.toString()
        };
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token, user }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id.toString(),
          email: user.email,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,

  adapter: PrismaAdapter(prisma),
});
