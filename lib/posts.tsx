import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface IBloger {
  id: string;
  title?: string;
  contenr?: string;
  // Add more properties as needed
}

const postsDirectory = path.join(process.cwd(), "/pages/data");

export function getSortedPostsData(): IBloger[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: IBloger[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      //   fileContents.\,
      ...matterResult.data,
      content: matterResult.content,
    };
  });
  // Sort posts by date
  console.log("file dotor baina  " + JSON.stringify(allPostsData, null, 2));
  return allPostsData;
}
