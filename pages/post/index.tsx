import { GetServerSidePropsContext, NextPage } from "next";
import HomeLayout from "@/components/Layout";
import React, { useState } from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { Notification } from "@/components/notification";

type TProps = {
  user: any;
};

const CreatePost: NextPage<TProps> = ({ user }) => {
  const [type, setType] = useState("");

  const submitBlog = () => {
    type == ""
      ? Notification("Анхаар", "Та нийтлэх төрөл сонгоогүй байна!!!", "warning")
      : "";
  };

  return (
    <HomeLayout menu={user.menu}>
      <div>this is post</div>
    </HomeLayout>
  );
};

export default CreatePost;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session: Session | null = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login", // Redirect to the login page if not logged in
        permanent: false,
      },
    };
  }
  const user = session?.user ?? null;

  return {
    props: {
      user: user,
    },
  };
};
