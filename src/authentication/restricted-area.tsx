import * as React from 'react';
import { MsalContext } from "msal-react"
import { Button } from 'antd';

export function LoginView() {
  const { login } = React.useContext(MsalContext);
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button onClick={() => login({ scopes: ['openid', 'profile'] })}>
        Login
      </Button>
    </div>
  );
}