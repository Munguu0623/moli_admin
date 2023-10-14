import { NextPage } from "next";

import React, { useState } from "react";
import { Button, Form, Input, Select, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import MarkdownRenderer from "../components/markdown-render";
import { getSortedPostsData } from "@/pages/lib/posts";
import HomeLayout from "../components/Layout";
import Editor from "../components/common/Editor";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IBlog } from "@/utils/types";
import { Notif } from "../components/notification";
import axios from "axios";

import EditorJS from "@editorjs/editorjs";
// import CustomEditor from "../components/editor/configuration";
import dynamic from "next/dynamic";
type TProps = {
  data: {
    posts: IBlog;
    allPostsData: {
      content: string; // Add this line to specify the type of 'content'
    }[];
    // post?: Post | null;
  };
};

// Editor
const CustomEditor = dynamic(
  () => import("../components/editor/configuration"),
  {
    ssr: false,
  }
);

const CreatePost: NextPage<TProps> = ({ data: allPostsData, data: posts }) => {
  const [type, setType] = useState("");
  const [value, setValue] = useState("**нийтлэл бичэх хэсэг**");
  const [content, setContent] = useState("");

  // const [body, setBody] = useState(post?.body || "");
  const firstPostContent = allPostsData.allPostsData[0].content; // how to fix this is error Property 'content' does not exist on type 'string'?
  const [form] = Form.useForm();

  // form beltgej baina
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     title: (posts && posts.posts && posts.posts.BlodTitle) || "",
  //     description: (posts && posts.posts && posts.posts.BlogDescription) || "",
  //   },
  // });

  function onSubmit(values: any) {
    const finalValues = {
      ...values,
      data: value,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(finalValues, "values");

    axios
      .post("/api/user/post", {
        form: finalValues,
      })
      .then(({ data }) => {
        console.log(data, "res.data");
        Notif("Амжилттай", "Амжилттай хадгаллаа!!!", "success");
      })
      .catch((error) => {
        console.log(error.message);
        Notif("Амжилттай", "Илгээхэд алдаа гарсан!!!", "error");
      });
  }

  return (
    <HomeLayout>
      <div>
        <Form
          form={form}
          onFinish={onSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="large"
          style={{ maxWidth: 1000 }}
        >
          <Form.Item>
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={() => form.submit()}
            >
              Нийтлэх
            </Button>
          </Form.Item>
          <Form.Item label="Төрөл" name="type">
            <Select
              onChange={(value) => {
                setType(value);
              }}
            >
              <Select.Option value="blog">Нийтлэл & Влог</Select.Option>
              <Select.Option value="profession">Мэргэжил</Select.Option>
            </Select>
          </Form.Item>
          <p className=" text-slate-500">
            Нийтлэл үү? эсвэл мэргэжилийн танилцуулга уу та сонгоно уу?
          </p>

          <Form.Item label="Гарчиг" name="title">
            <Input />
          </Form.Item>
          <p className=" text-slate-500">
            Гарчиг ойлгомжтой, товч, тодорхой байх хэрэгтэй
          </p>

          {type == "profession" && (
            <>
              <Form.Item label="Категори" name="category">
                <Select>
                  <Select.Option value="blog">Хүмүүнлэг</Select.Option>
                  <Select.Option value="medical">Ангаах</Select.Option>
                  <Select.Option value="tech">Мэдээлэл технологи</Select.Option>
                  <Select.Option value="eng">Инженер</Select.Option>
                </Select>
              </Form.Item>
              <Tag
                icon={<ExclamationCircleOutlined />}
                color="warning"
                className="mt-4"
              >
                Та мэргэжилийн талаар мэдээлэл оруулах гэж байгаа бол доорх
                форматын дагуу бичнэ үү?
                <MarkdownRenderer
                  content={firstPostContent}
                  className="prose prose-sm  text-[0.60rem] "
                />
                {/* <Markdown class="prose prose-sm text-orange-400">
            {firstPostContent}
          </Markdown> */}
              </Tag>
            </>
          )}
        </Form>
        {/* <CustomEditor setContent={setContent} content={content} />
        <button className="save_btn" onClick={() => console.log(content)}>
          Save
        </button> */}

        <Editor value={value} setValue={setValue} />
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
