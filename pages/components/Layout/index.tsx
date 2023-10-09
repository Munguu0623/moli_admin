import React, { ReactNode, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  menulink?: String,
  key?: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    menulink,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Нүүр", "/", "1", <PieChartOutlined />),
  getItem("Нийтлэл", "/blog", "2", <DesktopOutlined />),
  getItem("Зөвлөгч", "", "sub1", <UserOutlined />, [
    getItem("Бат", "/couch", "3"),
    getItem("Болд", "/couch", "4"),
    getItem("Сараа", "/couch", "5"),
  ]),
];

// console.log("this is items type" + typeof items);
export default function HomeLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
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
