import { Layout, Menu } from "antd";
import * as React from "react";

const { Header, Content, Sider } = Layout;

interface HeaderProps {
  Left?: any;
  Center?: any;
  Right?: any;
}

interface Props {
  Header: HeaderProps;
  SideBar?: any;
  children: any;
}

export const ApplicationLayout = ({
  Header: { Left: HeaderLeft, Center: HeaderCenter, Right: HeaderRight },
  SideBar,
  children
}: Props) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header
      style={{
        height: "auto",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[window.location.pathname]}
      >
        {HeaderLeft}
      </Menu>
      <Menu theme="dark">{HeaderCenter}</Menu>
      {HeaderRight}
    </Header>
    <Layout>
      {SideBar && (
        <Sider
          width={200}
          style={{
            background: "#fff"
          }}
        >
          {SideBar}
        </Sider>
      )}
      <Layout style={{ padding: "24px 24px 24px" }}>
        <Content
          style={{
            height: "1fr",
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
);
