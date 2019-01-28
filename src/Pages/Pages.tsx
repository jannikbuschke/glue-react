import * as React from "react";
import { IEntityItem } from "./types";
import { Router } from "@reach/router";

const MasterDetailContainer = (props: any) => (
  <div
    style={{
      display: "grid",
      gridGap: "20px",
      gridTemplateColumns: "2fr 3fr"
    }}
  >
    {props.children}
  </div>
);

interface IProps {
  items: IEntityItem[];
}

const Pages = (props: IProps) =>
  props.items.map((item: IEntityItem, index) => (
    <MasterDetailContainer>
      <React.Fragment key={index}>
        <Router primary={false}>
          <item.list path={`${item.path}/*`} />
        </Router>
        <Router primary={false}>
          <item.new path={`${item.path}/new`} />
          {item.create && <item.create path={`${item.path}/create`} />}
          {item.batchCreate && (
            <item.batchCreate path={`${item.path}/batch-create`} />
          )}
          <item.detail path={`${item.path}/:id`} />
        </Router>
      </React.Fragment>
    </MasterDetailContainer>
  ));

export { Pages };
