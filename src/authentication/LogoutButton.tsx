import * as React from "react";
import { Button } from "antd";
import { AuthenticationContext } from "./authenticationContext";
import { ButtonProps } from "antd/lib/button";

export const LogoutButton = (props: ButtonProps) => {
  const { logout } = React.useContext(AuthenticationContext);

  return <Button children="LOGOUT" {...props} onClick={logout} />;
};
