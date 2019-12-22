import { Layout, Menu, Row } from "antd"
import * as React from "react"

const { Header,  Sider } = Layout

interface HeaderProps {
  Left?: any
  Center?: any
  Right?: any
}

interface Props {
  Header: any
  SideBar?: any
  children: any
  footer?: React.ReactNode
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
  SideBar,
  children,
  footer
}: Props) => (
  <Layout style={{ minHeight: "100vh" }}>
    {Header}
    <Layout style={{flex:1}}>
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
      <Layout style={{ padding: "24px 24px 24px", flex:1 }}>
        {/* <Content
          style={{
            height: "1fr",
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        > */}
        <div style={{ flex:1 }}>
          {children}
        </div>
        {footer&&<Row>{footer}</Row>}
      </Layout>
    </Layout>
  </Layout>
)
