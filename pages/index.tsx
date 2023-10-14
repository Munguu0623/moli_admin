// Import the getPosts function if it's not already imported.

import React, { useState } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { IBlog } from "@/utils/types"; // Make sure to import TPost or the appropriate type.
import HomeLayout from "./components/Layout";
import ReactMarkdown from "react-markdown";
import MarkdownRenderer from "./components/markdown-render";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { Button } from "antd";
interface HomeProps {
  posts: IBlog[];
}
const EditorOutput = dynamic(
  () => import("./components/editor/configuration"),
  {
    ssr: false,
  }
);

const Home: NextPage<HomeProps> = ({ posts }) => {
  const [content, setContent] = useState("");
  return (
    <HomeLayout>
      <div>
        hello
        {/* {posts.map((el) => (
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
        ))} */}
      </div>
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
