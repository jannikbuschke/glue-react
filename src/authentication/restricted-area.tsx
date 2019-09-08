import * as React from 'react';
import { MsalContext } from "msal-react"
import {  Button } from 'antd';

export function RestrictedArea({
  children,
  renderUnauthenticated,
}: {
  children: React.ReactElement;
  renderUnauthenticated?: React.ReactElement;
}) {
  const { isLoggedIn } = React.useContext(MsalContext);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    isLoggedIn(['openid', 'profile'])
      .then(v => {
        setLoggedIn(v);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>loading</div>;
  }
  if (loggedIn) {
    return children;
  }

  return renderUnauthenticated || null;
}

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