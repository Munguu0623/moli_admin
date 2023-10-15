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
import { slugify } from "@/utils/slugify";
import dayjs from "dayjs";
import { CategoryType } from "../utils/types";
import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();
const formSchema = z.object({
  title: z
    .string({
      required_error: "Гарчиг оруулна уу",
    })
    .max(50),
  description: z.string(),
  published: z.boolean(),
});

type TProps = {
  data: {
    posts: IBlog;
    allPostsData: {
      content: string;
    }[];
    category: CategoryType[];
  };
};

const CreatePost: NextPage<TProps> = ({
  data: allPostsData,
  data: category,
  data: posts,
}) => {
  const [type, setType] = useState("");
  const [value, setValue] = useState("**нийтлэл бичэх хэсэг**");
  const firstPostContent = allPostsData.allPostsData[0].content;
  const categoryName = category.category;
  const [form] = Form.useForm();

  console.log(slugify("asdkfljfa  laskjfas jalskdfjslfdj lasd"));
  function onSubmit(values: any) {
    console.log(values);
    const finalValues = {
      ...values,
      content: value,
      image: values.image,
      slug: slugify(values.title),
      authorId: 1,
      createdDate: dayjs(),
      modifiedDate: dayjs(),
    };
    console.log(finalValues, "values");
    // return;
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
        Notif("Анхаар", "Илгээхэд алдаа гарсан!!!", "error");
      });
  }

  return (
    <HomeLayout>
      <div className="flex">
        <div className="">
          <Form
            form={form}
            onFinish={onSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 25 }}
            layout="horizontal"
            size="large"
            style={{ maxWidth: 2500 }}
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
            <p className=" text-slate-500 text-xs">
              Нийтлэл үү? эсвэл мэргэжилийн танилцуулга уу та сонгоно уу?
            </p>
            <Form.Item label="Гарчиг" name="title">
              <Input />
            </Form.Item>
            <p className=" text-slate-500 text-xs">
              Гарчиг ойлгомжтой, товч, тодорхой байх хэрэгтэй
            </p>
            <Form.Item label="Зураг" name="image">
              <Input />
            </Form.Item>
            <p className=" text-slate-500 text-xs">Нийтлэлийн зурагны линк</p>
            {type == "profession" && (
              <>
                <Form.Item label="Категори" name="category">
                  <Select
                    options={(categoryName || []).map((d) => ({
                      value: d.id,
                      label: d.name,
                    }))}
                  ></Select>
                </Form.Item>
              </>
            )}
          </Form>
        </div>
        <div className="ml-16">
          <img src="/warning.png" className="w-[40rem]"></img>
        </div>
        {/* <div className="w-36 bg-black">
          <Tag
            icon={<ExclamationCircleOutlined />}
            color="warning"
            className="mt-4 w-36"
          >
            Та мэргэжилийн талаар мэдээлэл оруулах гэж байгаа бол доорх форматын
            дагуу бичнэ үү?
            <MarkdownRenderer
              content={firstPostContent}
              className="prose prose-sm  text-[0.60rem] "
            />
          </Tag>
        </div> */}
      </div>
      <div className="mt-10">
        <Editor value={value} setValue={setValue} />
      </div>
    </HomeLayout>
  );
};

export default CreatePost;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const category = await prisma.category.findMany();

  console.log(allPostsData + "allPosts");
  return {
    props: {
      data: {
        allPostsData,
        category,
      },
    },
  };
}
