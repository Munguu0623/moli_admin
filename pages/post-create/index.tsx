import { NextPage } from "next";
import HomeLayout from "../components/Layout";
import Editor from "../components/common/Editor";
import React, { useState } from "react";
import { Button, Form, Input, Select, Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { getSortedPostsData } from "../lib/posts";
import MarkdownRenderer from "../components/markdown-render";

type TProps = {
  data: {
    allPostsData: {
      content: string; // Add this line to specify the type of 'content'
    }[];
  };
};

const CreatePost: NextPage<TProps> = ({ data: allPostsData }) => {
  const [type, setType] = useState("нийтлэлийн төрөл сонгох");
  const firstPostContent = allPostsData.allPostsData[0].content; // how to fix this is error Property 'content' does not exist on type 'string'?
  console.log(firstPostContent);

  return (
    <HomeLayout>
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="large"
          style={{ maxWidth: 1000 }}
        >
          <Form.Item>
            <Button>Нийтлэх</Button>
          </Form.Item>
          <Form.Item label="Гарчиг">
            <Input />
            <p className=" text-slate-500">
              Гарчиг ойлгомжтой, товч, тодорхой байх хэрэгтэй
            </p>
          </Form.Item>
          <Form.Item label="Төрөл">
            <Select
              onChange={(value) => {
                console.log("Selected value:", value);
                setType(value);
                console.log("Type state:", type);
              }}
            >
              <Select.Option value="blog">Нийтлэл & Влог</Select.Option>
              <Select.Option value="profession">Мэргэжил</Select.Option>
            </Select>
            <p className=" text-slate-500">
              Нийтлэл үү? эсвэл мэргэжилийн танилцуулга уу та сонгоно уу?
            </p>
          </Form.Item>
          {type == "profession" ? (
            <Form.Item label="Категори">
              <Select>
                <Select.Option value="blog">Хүмүүнлэг</Select.Option>
                <Select.Option value="medical">Ангаах</Select.Option>
                <Select.Option value="tech">Мэдээлэл технологи</Select.Option>
                <Select.Option value="eng">Инженер</Select.Option>
                <Select.Option value="eng">батлан хамгаалах</Select.Option>
              </Select>

              <Tag
                icon={<ExclamationCircleOutlined />}
                color="warning"
                className="mt-4"
              >
                Та мэргэжилийн талаар мэдээлэл оруулах гэж байгаа бол доорх
                форматын дагуу бичнэ үү?
              </Tag>
            </Form.Item>
          ) : (
            <></>
          )}
        </Form>
        <Editor />
        <MarkdownRenderer
          className="entry-content tw-mb-[54px]"
          content={firstPostContent}
        />
      </div>
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
