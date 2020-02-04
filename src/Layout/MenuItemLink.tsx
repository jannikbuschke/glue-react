import { Link } from "@reach/router"
import * as React from "react"

interface MenuItemLinkProps {
  to: string
}

export const MenuItemLink = (props: React.PropsWithChildren<MenuItemLinkProps>) => {
  return (
    <Link to={props.to}>
      {props.children}
    </Link>
  )
}
