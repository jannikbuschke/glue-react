import * as React from "react";
// import { Route, Switch } from "react-router";
import { IEntityItem } from "./types";
import { Router } from "@reach/router";

const MasterDetailContainer = (props: any) => (
  <div
    style={{
      display: "grid",
      gridGap: "20px",
      gridTemplateColumns: "repeat(2, 1fr)"
    }}
  >
    {props.children}
  </div>
);

interface IProps {
  items: IEntityItem[];
}

const Pages = (props: IProps) => (
  <MasterDetailContainer>
    {props.items.map((item: IEntityItem, index) => (
      <React.Fragment key={index}>
        <Router>
          <item.list path={`${item.path}/*`} />
        </Router>
        <Router>
          <item.new path={`${item.path}/new`} />
          {item.create && <item.create path={`${item.path}/create`} />}
          {item.batchCreate && (
            <item.batchCreate path={`${item.path}/batch-create`} />
          )}
          <item.detail path={`${item.path}/:id`} />
        </Router>
      </React.Fragment>
    ))}
  </MasterDetailContainer>
);

export { Pages };
