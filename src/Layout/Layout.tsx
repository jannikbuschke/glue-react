import { Link } from "@reach/router";
import { Layout, Menu } from "antd";
import * as React from "react";

const { Header, Content, Sider } = Layout;

interface NavigationLink {
  displayName: string;
  icon?: string;
  to: string;
  kind: "LINK";
}

interface Custom {
  component: React.ReactNode;
  kind: "CUSTOM";
}

type NavigationItem = NavigationLink | Custom;

export const NavigationItems = ({ items }: { items: NavigationItem[] }) =>
  items.map(item => {
    switch (item.kind) {
      case "LINK":
        return (
          <Menu.Item key={item.to}>
            <div>asd</div>
            <Link to={item.to}>{item.displayName}</Link>
          </Menu.Item>
        );
      default:
        return null;
    }
  });

interface Props {
  header?: NavigationItem[];
  sideBarItems?: NavigationItem[];
  children: any;
}

export const FlatMenu = (props: { items: NavigationItem[] }) => (
  <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
    {props.items.map(item => {
      switch (item.kind) {
        case "LINK":
          return (
            <Menu.Item key={item.to}>
              <Link to={item.to}>{item.displayName}</Link>
            </Menu.Item>
          );
        case "CUSTOM":
          return item.component;
        default:
          return null;
      }
    })}
  </Menu>
);

export const ApplicationLayout = ({
  header,
  sideBarItems,
  children
}: Props) => (
  <Layout style={{ minHeight: "100vh" }}>
    {header && (
      <Header style={{ height: "auto" }}>
        <Menu theme="dark" mode="horizontal">
          {header.map((item: NavigationLink) => {
            return (
              <Menu.Item key={item.to}>
                <Link to={item.to}>{item.displayName}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
    )}
    <Layout>
      {sideBarItems && (
        <Sider
          width={200}
          style={{
            background: "#fff"
          }}
        >
          <FlatMenu items={sideBarItems} />
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
