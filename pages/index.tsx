// Import the getPosts function if it's not already imported.
import { getPosts } from "@/lib/prisma/posts";
import { NextPage } from "next";
import { IBlog } from "@/utils/types"; // Make sure to import TPost or the appropriate type.
import HomeLayout from "./components/Layout";
import ReactMarkdown from "react-markdown";
import MarkdownRenderer from "./components/markdown-render";

interface HomeProps {
  posts: IBlog[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <HomeLayout>
      <div>
        {posts.map((el) => (
          <div key={el.ID}>
            <MarkdownRenderer
              className="prose prose-sm"
              key={el.ID}
              content={el.BlodTitle}
            />
            <br />
            <MarkdownRenderer
              key={el.ID}
              content={el.BlogDescription}
              className="prose prose-sm"
            />
          </div>
        ))}
      </div>
    </HomeLayout>
  );
};

export async function getStaticProps() {
  try {
    const args = {
      // Specify any query arguments if needed.
      // For example, you can add filtering, sorting, or pagination options here.
    };

    const { posts, error } = await getPosts(args);

    if (error) {
      console.error("Error fetching posts:", error);
      // Handle the error as needed.
      return { props: { posts: [] } }; // Return an empty array or handle errors.
    } else {
      return { props: { posts } };
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    // Handle unexpected errors here.
    return { props: { posts: [] } }; // Return an empty array or handle errors.
  }
}

export default Home;
