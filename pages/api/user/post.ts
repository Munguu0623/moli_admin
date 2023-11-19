import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// POST /api/post
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { title, content, authorEmail } = req.body;
  const result = await prisma.blogs.create({
    data: req.body.form,
  });
  return res.status(201).json(result);
}
