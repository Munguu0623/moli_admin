import { GetServerSidePropsContext, NextPage } from "next";
import HomeLayout from "@/components/Layout";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
type TProps = {
  user: any;
};

const Blog: React.FC<TProps> = ({ user }) => {
  return (
    <HomeLayout menu={user.menu}>
      <div>энд бүх нийтлэл байх ёстой</div>
    </HomeLayout>
  );
};

export default Blog;

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
