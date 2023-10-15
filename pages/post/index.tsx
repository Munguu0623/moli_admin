import { NextPage } from "next";
import HomeLayout from "../components/Layout";
import Editor from "../components/common/Editor";
import React, { useState } from "react";
import { Button, Form, Input, Select, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getSortedPostsData } from "../lib/posts";
import MarkdownRenderer from "../components/markdown-render";
import { Notif } from "../components/notification";

type TProps = {
  data: {
    allPostsData: {
      content: string; // Add this line to specify the type of 'content'
    }[];
  };
};

const CreatePost: NextPage<TProps> = ({ data: allPostsData }) => {
  const [type, setType] = useState("");
  // const [body, setBody] = useState(post?.body || "");
  const firstPostContent = allPostsData.allPostsData[0].content; // how to fix this is error Property 'content' does not exist on type 'string'?
  console.log(type + "type");

  const submitBlog = () => {
    type == ""
      ? Notif("Анхаар", "Та нийтлэх төрөл сонгоогүй байна!!!", "warning")
      : "";
  };

  return (
    <HomeLayout>
      <div>this is post</div>
    </HomeLayout>
  );
};

export default CreatePost;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  console.log(allPostsData + "allPosts");
  return {
    props: {
      data: {
        allPostsData,
      },
    },
  };
}
