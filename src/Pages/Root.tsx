import * as React from "react";
import { NavBar } from "./NavBar";
import { Pages } from "./Pages";
import { IEntityItem, ILinkItem } from "./types";

interface IProps {
  items: IEntityItem[];
  links: ILinkItem[];
}

export class Root extends React.Component<IProps> {
  public render() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
        <NavBar items={this.props.links} />
        <div style={{ margin: 20 }}>
          <Pages items={this.props.items} />
        </div>
      </div>
    );
  }
}
