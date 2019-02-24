import { Link } from "@reach/router";
import { Layout, Menu, Icon } from "antd";
import * as React from "react";
import { MenuItemLink } from "./MenuItemLink";

const { Header, Content, Sider } = Layout;

interface NavigationLink {
  displayName: string;
  icon?: string;
  to: string;
  kind: "LINK";
}

interface Custom {
  component: any;
  kind: "CUSTOM";
}

type NavigationItem = NavigationLink | Custom;

export const NavigationItems = ({ items }: { items: NavigationItem[] }) =>
  items.map(item => {
    switch (item.kind) {
      case "LINK":
        return <MenuItemLink {...item} />;
      default:
        return null;
    }
  });

interface HeaderProps {
  Left?: any;
  Center?: any;
  Right?: any;
}

interface Props {
  Header: HeaderProps;
  sideBarItems?: NavigationItem[];
  children: any;
}

export const RenderNavigationItem = (props: NavigationItem) => {
  switch (props.kind) {
    case "LINK":
      return <MenuItemLink {...props} />;
    case "CUSTOM":
      return <props.component {...props} />;
    default:
      return null;
  }
};
export const FlatMenu = (props: { items: NavigationItem[] }) => (
  <Menu
    mode="inline"
    style={{ height: "100%", borderRight: 0 }}
    defaultSelectedKeys={[window.location.pathname]}
  >
    {props.items.map(item => {
      switch (item.kind) {
        case "LINK":
          return <MenuItemLink {...item} />;
        case "CUSTOM": {
          throw new Error("CUSTOM component no longer supported");
        }
        default:
          return null;
      }
    })}
  </Menu>
);

export const ApplicationLayout = ({
  Header: { Left: HeaderLeft, Center: HeaderCenter, Right: HeaderRight },
  sideBarItems,
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
      <Menu theme="dark" style={{ alignSelf: "center", justifySelf: "" }}>
        {HeaderRight}
      </Menu>
    </Header>
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
