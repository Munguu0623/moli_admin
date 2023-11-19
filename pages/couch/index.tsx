import HomeLayout from "@/components/Layout";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
type TProps = {
  user: any;
};

const Couch: React.FC<TProps> = ({ user }) => {
  return (
    <HomeLayout menu={user.menu}>
      <div>
        энд нийтлэгч sub menu аар зөвлөгч нарын бичсэн нийтлэл харагдана
      </div>
    </HomeLayout>
  );
};

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
export default Couch;
