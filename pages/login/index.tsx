import { NextPage } from "next";
import { getSession, signIn, SignInOptions } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import LoginForm from "../components/login-register/login";
import HomeLayout from "../components/Layout";

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, [router]);

  const login = async (e: React.FormEvent<HTMLButtonElement>) => {
    setError("");
    setLoading(true);
    const options: SignInOptions = {
      email: username,
      password: password,
      redirect: false,
      callbackUrl: "/",
    };
    const result = await signIn("credentials", options);

    if (result?.error) {
      setError("Хэрэглэгчийн нэвтрэх нэр, нууц үг буруу байна.");
      setLoading(false);
    } else if (result?.status === 200) {
      console.log(result, "ewa");
      router.push(result.url);
    }
  };

  return (
    <>
      <LoginForm />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default LoginScreen;
