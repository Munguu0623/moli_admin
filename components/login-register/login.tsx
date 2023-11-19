/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Checkbox, Select } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import Link from "next/link";
interface IFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [islogin, setIsLogin] = useState(true);
  const handleChange = (value: string) => {};
  return (
    <>
      <img src="/wave.png" className="fixed hidden lg:block inset-0 h-full" />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img
          src="/unlock.svg"
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
        />
        {islogin ? (
          <Form className="flex flex-col justify-center items-center w-3/4">
            <img src="/moli.png" className="w-52" />
            <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
              Moli веб сайтанд тавтай морил
            </h2>
            <div className="relative mt-4">
              <Input
                size="large"
                placeholder="Нэвтрэх нэр"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Бүртгүүлсэн имейл хаяг">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
            </div>
            <div className="relative mt-4 ">
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                size="large"
                placeholder="нууц үг"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <Link href="/">
              <Button
                type="primary"
                className="  mt-8 px-20 bg-primarycolor rounded-full bg-blue-500 text-white font-bold uppercase  transform hover:translate-y-1 transition-all duration-500"
              >
                Нэвтрэх
              </Button>
            </Link>

            <div className=" mt-4 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-500" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Эсвэл</span>
              </div>
            </div>

            <Button
              onClick={() => setIsLogin(false)}
              type="primary"
              className="  mt-4 px-[4.3rem] bg-primarycolor rounded-full bg-blue-500 text-white font-bold uppercase  transform hover:translate-y-1 transition-all duration-500"
            >
              Бүртгүүлэх
            </Button>

            <Link href="#" className="self-end mt-4 text-gray-600 font-bold">
              Нууц үг мартсан?
            </Link>
          </Form>
        ) : (
          <Form className="flex flex-col justify-center items-center w-3/4">
            <img src="/moli.png" className="w-52" />
            <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
              Moli веб сайтанд тавтай морил
            </h2>
            <div className="relative mt-4">
              <Input
                size="large"
                placeholder="Нэвтрэх нэр"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Бүртгүүлэх имейл хаяг">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
            </div>
            <div className="relative mt-4 ">
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                size="large"
                placeholder="нууц үг"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <div className="relative mt-4 ">
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                size="large"
                placeholder="давтан нууц үг"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <Select
              className="mt-4"
              defaultValue="default"
              style={{ width: 240 }}
              onChange={handleChange}
              options={[
                { value: "default", label: "Хэрэглчийн төрөл сонгох" },
                { value: "instructor", label: "Зөвөлгөө өгөх" },
                { value: "writer", label: "Блог бичих" },
                { value: "viewer", label: "Энгийн хэрэглэгч" },
              ]}
            />
            <Button
              onClick={() => setIsLogin(true)}
              type="primary"
              className="  mt-4 px-20 bg-primarycolor rounded-full bg-blue-500 text-white font-bold uppercase  transform hover:translate-y-1 transition-all duration-500"
            >
              Хадгалах
            </Button>
          </Form>
        )}
      </div>
    </>
    // <section className="bg-gray-50 ">
    //   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  border-gray-200">
    //       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x">
    //           Нэвтрэх
    //         </h1>
    //         <Form
    //           onFinish={handleSubmit(onSubmit)}
    //           className="space-y-4 md:space-y-6"
    //         >
    //           <Form.Item>
    //             <label className="block mb-2 text-sm font-medium text-gray-900 ">
    //               Нэвтрэх хаяг
    //             </label>
    //             <Input
    //               type="email"
    //               name="email"
    //               id="email"
    //               placeholder="имейл хаяг"
    //               {...register("email")}
    //             />
    //           </Form.Item>
    //           <Form.Item>
    //             <label className="block mb-2 text-sm font-medium text-gray-900 ">
    //               Нууц үг
    //             </label>
    //             <Input
    //               type="password"
    //               name="password"
    //               id="password"
    //               placeholder="нууц үг"
    //               {...register("password")}
    //             />
    //           </Form.Item>
    //           <Form.Item valuePropName="checked">
    //             <Checkbox
    //               id="remember"
    //               aria-describedby="remember"
    //               //   {...register("remember")}
    //             >
    //               Хэрэглэгч хадгалах
    //             </Checkbox>
    //           </Form.Item>
    //           <Form.Item>
    //             <Button type="primary" className="bg-blue-500 w-full">
    //               Нэвтрэх
    //             </Button>
    //           </Form.Item>
    //         </Form>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default LoginForm;
