import * as React from "react";

export const PageContainer = (props: any) => <div {...props} />;

export const PageHeader = (props: any) => <h1 {...props} />;

export const PageContentContainer = (props: any) => (
  <div style={{}} {...props} />
);

export const PageActionContainer = (props: any) => (
  <div
    style={{
      display: "flex",
      marginBottom: "5px"
    }}
    {...props}
  />
);
