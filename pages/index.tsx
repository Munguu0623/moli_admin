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

import { Button, Col, Row, Statistic, Progress } from "antd";
import { MenuView } from "./components/menu-view";
interface HomeProps {
  posts: IBlog[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const [content, setContent] = useState("");
  return (
    <HomeLayout>
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Нийт хэрэглэгчид" value={112893} />
          </Col>
          <Col span={12}>
            <Statistic title="Нийт төлбөр (₮)" value={1112893} precision={2} />
          </Col>
          <Col span={12}>
            <Statistic title="Идэвхтэй хэрэглэгч" value={1322893} loading />
          </Col>
        </Row>
      </div>
      <MenuView />
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
