import { NextPage } from "next";
import { getSession, signIn, SignInOptions } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

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
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80")',
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Нэвтрэх
        </h2>
        <p className="mt-2 text-center text-sm text-gray-200 max-w">
          Та Facebook хаягаа ашиглан нэвтэрч орно уу
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md backdrop-filter">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <a
              href="#"
              className="block text-center w-full py-2 px-4 rounded-full bg-red-800 text-white font-semibold hover:bg-red-700"
            >
              <span className="flex items-center justify-center">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 32 32"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 12 }}
                >
                  <path
                    d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"
                    fill="#00ac47"
                  />
                  <path
                    d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"
                    fill="#4285f4"
                  />
                  <path
                    d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"
                    fill="#ffba00"
                  />
                  <polygon
                    fill="#2ab2db"
                    points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"
                  />
                  <path
                    d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"
                    fill="#ea4435"
                  />
                  <polygon
                    fill="#2ab2db"
                    points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"
                  />
                  <path
                    d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z"
                    fill="#4285f4"
                  />
                </svg>
                Google-ээр нэвтрэх
              </span>
            </a>
          </div>
          <div className="mt-5">
            <a
              href="#"
              className="block text-center w-full py-2 px-4 rounded-full bg-blue-800 text-white font-semibold hover:bg-blue-700"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  width="40"
                  viewBox="-204.79995 -341.33325 1774.9329 2047.9995"
                  style={{ marginRight: 4 }}
                >
                  <path
                    d="M1365.333 682.667C1365.333 305.64 1059.693 0 682.667 0 305.64 0 0 305.64 0 682.667c0 340.738 249.641 623.16 576 674.373V880H402.667V682.667H576v-150.4c0-171.094 101.917-265.6 257.853-265.6 74.69 0 152.814 13.333 152.814 13.333v168h-86.083c-84.804 0-111.25 52.623-111.25 106.61v128.057h189.333L948.4 880H789.333v477.04c326.359-51.213 576-333.635 576-674.373"
                    fill="#1877f2"
                  />
                  <path
                    d="M948.4 880l30.267-197.333H789.333V554.609C789.333 500.623 815.78 448 900.584 448h86.083V280s-78.124-13.333-152.814-13.333c-155.936 0-257.853 94.506-257.853 265.6v150.4H402.667V880H576v477.04a687.805 687.805 0 00106.667 8.293c36.288 0 71.91-2.84 106.666-8.293V880H948.4"
                    fill="#fff"
                  />
                </svg>
                Facebook-ээр нэвтрэх
              </span>
            </a>
          </div>
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Эсвэл</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  И-мэйл хаяг
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="@example"
                    autoComplete="email"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Нууц үг
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="*******"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-500"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={login}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Нэвтрэх
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
