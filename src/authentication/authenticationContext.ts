import * as Msal from "msal";
import * as React from "react";

const application = fetch("/api/Aad/Settings?api-version=1.0")
  .then(v => v.json())
  .then(v => {
    console.log(v);
    console.log(window.location.origin);
    return new Msal.UserAgentApplication({
      auth: {
        authority: v.authority,
        clientId: v.appId
      },
      cache: { cacheLocation: "localStorage" }
    })

  });

export const defaultAuthenticationContext = {
  application: (null as unknown) as Msal.UserAgentApplication,
  login: async () => {
    const app = await application;
    await app.loginPopup();
  },
  logout: async () => {
    const app = await application;
    await app.logout();
  },
  getToken: async () => {
    const app = await application;
    console.log("app", app);
    console.log("user", app.getAccount());
    console.log("login in progress", app.getLoginInProgress());

    if (!app.getAccount()) {
      console.log("no user");

      await app.loginPopup();
    }
    try {
      const token = await app.acquireTokenSilent({
        scopes: [
          "3c634f33-81a6-4acc-8dbd-8752c8c9f931/user_impersonation"
        ]
      });
      return token;
    } catch (E) {
      await app.loginPopup();
      const token = await app.acquireTokenSilent({
        scopes: [
          "3c634f33-81a6-4acc-8dbd-8752c8c9f931/user_impersonation"
        ]
      });
      return token;
    }
  }
};

application.then(app => (defaultAuthenticationContext.application = app));

export const AuthenticationContext = React.createContext(
  defaultAuthenticationContext
);
