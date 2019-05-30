import { Layout, Menu } from "antd"
import * as React from "react"
import { ShadowPropTypesIOS } from "react-native"

const { Header, Content, Sider } = Layout

interface HeaderProps {
  Left?: any
  Center?: any
  Right?: any
}

interface Props {
  Header: any
  SideBar?: any
  children: any
}

export const DefaultApplicationLayout = (props: { children: any }) => (
  <Layout style={{ minHeight: "100vh" }}>{props.children}</Layout>
)

DefaultApplicationLayout.Header = (props: { children: any }) => (
  <Header
    style={{
      height: "auto",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    {props.children}
  </Header>
)

DefaultApplicationLayout.HeaderMenu = (props: { children: any }) => (
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={[window.location.pathname]}
  >
    {props.children}
  </Menu>
)

export const ApplicationLayout = ({
  Header,
  // Header: { Left: HeaderLeft, Center: HeaderCenter, Right: HeaderRight },
  SideBar,
  children,
}: Props) => (
  <Layout style={{ minHeight: "100vh" }}>
    {Header}
    <Layout>
      {SideBar && (
        <Sider
          width={200}
          style={{
            background: "#fff",
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
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
)
