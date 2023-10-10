// Import the getPosts function if it's not already imported.
import { getPosts } from "@/lib/prisma/posts";
import { GetServerSidePropsContext, NextPage } from "next";
import { IBlog } from "@/utils/types"; // Make sure to import TPost or the appropriate type.
import HomeLayout from "./components/Layout";
import ReactMarkdown from "react-markdown";
import MarkdownRenderer from "./components/markdown-render";
import React from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface HomeProps {
  posts: IBlog[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <HomeLayout>
      {/* <div>
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
      </div> */}
    </HomeLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session: Session | null = await getSession(context);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login", // Redirect to the login page if not logged in
  //       permanent: false,
  //     },
  //   };
  // }
  const user = session?.user ?? null;

  console.log(session, "user");

  return {
    props: {
      user: user,
    },
  };
};
export default Home;
