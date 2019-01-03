import { Menu } from "antd";
// import { ClickParam } from "antd/lib/menu";
import * as React from "react";
import { ILinkItem } from "./types";
import { Link } from "@reach/router";

interface IOwnProps {
  items: ILinkItem[];
}

export class NavBar extends React.Component<IOwnProps> {
  public render() {
    return (
      <Menu style={{ height: "100%" }} mode="inline">
        {this.props.items.map(item => {
          return (
            <Menu.Item key={item.path}>
              <Link to={item.path}>{item.displayName}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}
