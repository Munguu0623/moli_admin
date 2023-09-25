import { Prisma } from "@prisma/client";
import prisma from ".";

export async function getPosts(args: Prisma.BlogsTestsFindManyArgs) {
  try {
    const result = await prisma.blogsTests.findMany(args);
    return { posts: result };
  } catch (error: any) {
    return { error };
  }
}

export async function createPost(data: Prisma.BlogsTestCreateInput) {
  try {
    const result = await prisma.blogsTests.create({ data });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
}
