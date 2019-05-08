import * as Msal from "msal";
import * as React from "react";

const application = fetch("/api/Aad/Settings?api-version=1.0")
  .then(v => v.json())
  .then(v => {
    console.log(v);
    console.log(window.location.origin);
    return new Msal.UserAgentApplication(v.appId, v.authority, () => {}, {
      redirectUri: window.location.origin,
      cacheLocation: "localStorage"
    });
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
    console.log("user", app.getUser());
    console.log("login in progress", app.loginInProgress());

    if (!app.getUser()) {
      console.log("no user");

      await app.loginPopup();
    }
    try {
      const token = await app.acquireTokenSilent([
        "3c634f33-81a6-4acc-8dbd-8752c8c9f931/user_impersonation"
      ]);
      return token;
    } catch (E) {
      await app.loginPopup();
      const token = await app.acquireTokenSilent([
        "3c634f33-81a6-4acc-8dbd-8752c8c9f931/user_impersonation"
      ]);
      return token;
    }
  }
};

application.then(app => (defaultAuthenticationContext.application = app));

export const AuthenticationContext = React.createContext(
  defaultAuthenticationContext
);
