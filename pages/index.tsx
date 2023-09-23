import Image from "next/image";
import { Inter } from "next/font/google";
import HomeLayout from "./components/Layout";
import prisma from "@/lib/prisma";
const inter = Inter({ subsets: ["latin"] });
import { GetStaticProps, NextPage } from "next";
import { IBlog } from "@/utils/types";
import ReactMarkdown from "react-markdown";

interface PageContent {
  section: string;
}

type TProps = {
  data: {
    page: {
      content: PageContent[];
    };
    blog: IBlog[];
  };
};

const Home: NextPage<TProps> = ({ data }) => {
  console.log(data.blog);
  return (
    <HomeLayout>
      <div>
        {data.blog.map((el) => {
          return (
            <div key={el.ID}>
              {/* <div key={el.ID}>{el.BlodTitle}</div> */}
              <ReactMarkdown key={el.ID}>{el.BlodTitle}</ReactMarkdown>
              <br />
              <ReactMarkdown key={el.ID}>{el.BlogDescription}</ReactMarkdown>
            </div>
          );
        })}
      </div>
    </HomeLayout>
  );
};
export default Home;

// Home.HomeLayout = HomeLayout;

export const getStaticProps: GetStaticProps = async () => {
  const blog = await prisma.blogsTests.findMany();

  return {
    props: {
      data: {
        blog,
      },
    },
    revalidate: 10,
  };
};
