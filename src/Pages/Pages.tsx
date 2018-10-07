import * as React from "react";
import { Route, Switch } from "react-router";
import { IEntityItem } from "./types";

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
  <React.Fragment>
    {props.items.map((item: IEntityItem, index) => (
      <MasterDetailContainer key={index}>
        <Route path={`${item.path}`} component={item.list} />
        <Switch>
          <Route exact={true} path={`${item.path}/new`} component={item.new} />
          <Route
            exact={true}
            path={`${item.path}/:id`}
            component={item.detail}
          />
        </Switch>
      </MasterDetailContainer>
    ))}
  </React.Fragment>
);

export { Pages };
