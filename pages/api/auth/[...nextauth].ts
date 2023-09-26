import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import axios from 'axios';

import prisma from "@/lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { username: string; password: string; }, req: any) {
        const { username, password } = credentials;
        const result = await axios.post(`${process.env.URL}/api/auth/login`, {
          username: username,
          password: password,
        });
        const body = result.data;
        // if (body.status !== 200 || !body.success) {
        //   return null;
        // }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
