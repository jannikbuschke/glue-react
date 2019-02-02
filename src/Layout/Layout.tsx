import { Link } from "@reach/router";
import { Layout, Menu, Icon } from "antd";
import * as React from "react";

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
  headerRight?: NavigationItem[];
  center?: any;
  sideBarItems?: NavigationItem[];
  children: any;
}

export const RenderNavigationItem = (props: NavigationItem) => {
  console.log("RENDER NAVIGATION PROPS", props);
  switch (props.kind) {
    case "LINK":
      return (
        <Menu.Item key={props.to}>
          <Link to={props.to}>
            {props.icon && <Icon type={props.icon} />} {props.displayName}
          </Link>
        </Menu.Item>
      );
    case "CUSTOM":
      return <props.component {...props} />;
    default:
      return null;
  }
};

export const FlatMenu = (props: { items: NavigationItem[] }) => (
  <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
    {props.items.map(item => {
      switch (item.kind) {
        case "LINK":
          return (
            <Menu.Item key={item.to}>
              <Link to={item.to}>
                {item.icon && <Icon type={item.icon} />} {item.displayName}
              </Link>
            </Menu.Item>
          );
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
  header: headerLeft,
  headerRight,
  sideBarItems,
  children,
  center
}: Props) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header
      style={{
        height: "auto",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Menu theme="dark" mode="horizontal">
        {headerLeft &&
          headerLeft.map((item: NavigationLink) => (
            <Menu.Item key={item.to}>
              <Link to={item.to}>
                {item.icon && <Icon type={item.icon} />} {item.displayName}
              </Link>
            </Menu.Item>
          ))}
      </Menu>
      <Menu theme="dark" />
      <Menu theme="dark" style={{ alignSelf: "center", justifySelf: "" }}>
        {headerRight &&
          headerRight.map((item, index) => (
            <RenderNavigationItem key={index} {...item} />
          ))}
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
