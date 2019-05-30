import { Link } from "@reach/router"
import { Menu, Icon } from "antd"
import * as React from "react"

interface MenuItemLinkProps {
  displayName?: string
  icon?: string
  to: string
}

export const MenuItemLink = (props: MenuItemLinkProps) => {
  return (
    <Link to={props.to}>
      {props.icon && <Icon type={props.icon} />} {props.displayName}
    </Link>
  )
}
