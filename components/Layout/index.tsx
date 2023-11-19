import React, { ReactNode, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  LoginOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { signOut } from "next-auth/react";

const { Header, Content, Footer, Sider } = Layout;

// console.log("this is items type" + typeof items);
export default function HomeLayout({
  children,
  menu,
}: {
  children: ReactNode;
  menu: any;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const mainMenus = menu?.filter((menu) => menu.menuType == "MainMenu");
  const subMenus = menu?.filter((menu) => menu.menuType == "subMenu");
  for (let menu of mainMenus) {
    if (!menu.children) {
      menu.children = []; // Initialize the children array if it doesn't exist
    }
    for (let subMenu of subMenus) {
      if (menu.id == subMenu.parentMenuId) {
        // Check if subMenu doesn't already exist in menu.children
        if (!menu.children.some((child) => child.id == subMenu.id)) {
          menu.children.push(subMenu);
        }
      }
    }
  }
  mainMenus.sort((a, b) => a.viewOrder - b.viewOrder);
  const items = mainMenus.map((e, i) => {
    if (e.children?.length > 0) {
      return {
        key: i,
        icon: <LoginOutlined className="text-red-500" />,
        label: <span>{e.name}</span>,
        children: e.children.map((child, i) => {
          return {
            key: i + 100,
            icon: e.icon,
            label: <Link href={child.menuUrl}>{child.name}</Link>,
          };
        }),
      };
    }
    return {
      key: i,
      icon: <LoginOutlined className="text-red-500" />,
      label: (
        <Link href={e.menuUrl} className="">
          <span className="">{e.name}</span>
        </Link>
      ),
    };
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        {/* <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link href={item.Menulink || ""}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu> */}

        <Menu
          theme="dark"
          mode="inline"
          items={items.concat({
            key: 99,
            // danger: true,
            icon: <LoginOutlined className="text-red-500" />,
            label: (
              <a
                className="text-red-500 hover:text-red-600"
                onClick={() => {
                  signOut({ redirect: true, callbackUrl: "/login" });
                  localStorage.setItem("menus", null);
                  localStorage.setItem("count", null);
                }}
              >
                Гарах
              </a>
            ),
          })}
          // onClick={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-end items-center "
        >
          <div className="mr-4">
            <Link href="/post-create">
              <Button type="primary" className="bg-blue-500">
                Нийтлэл бичэх
              </Button>
            </Link>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          MOLI ©2023 MOLI AdminPanel
        </Footer>
      </Layout>
    </Layout>
  );
}
