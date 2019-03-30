import { Button, Icon } from "antd";
import * as React from "react";
import { Link } from "@reach/router";
import { ButtonProps } from "antd/lib/button";

type Props = { to: string } & ButtonProps;

export const NavigateButton = (props: Props) => (
  <Button type="primary" {...props}>
    <Link to={props.to}>new</Link>
  </Button>
);
