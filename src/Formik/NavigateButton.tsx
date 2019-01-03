import { Button, Icon } from "antd";
import * as React from "react";
import { Link } from "@reach/router";
import { ButtonProps } from "antd/lib/button";

export interface INavigateButtonProps {
  to: string;
}

export const NavigateButton = (props: INavigateButtonProps & ButtonProps) => (
  <Button type="primary" {...props}>
    <Link to={props.to}>new</Link>
  </Button>
);
