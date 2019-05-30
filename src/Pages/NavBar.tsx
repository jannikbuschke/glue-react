import { Menu } from "antd"
import * as React from "react"
import { ILinkItem } from "./types"
import { Link } from "@reach/router"
import { MenuProps } from "antd/lib/menu"

interface IProps {
  items: ILinkItem[]
  menuProps?: MenuProps
}

export class NavBar extends React.Component<IProps> {
  public render() {
    return (
      <Menu mode="inline" {...this.props.menuProps}>
        {this.props.items.map((item) => {
          return (
            <Menu.Item key={item.path}>
              <Link to={item.path}>{item.displayName}</Link>
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
}
