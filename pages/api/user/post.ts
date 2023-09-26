import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body.form,'bpu');
  // const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: req.body.form,
  });
  return res.status(201).json(result);
}
