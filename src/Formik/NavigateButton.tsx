import { Button } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { routerActions } from "react-router-redux";
import { actionItemMargin } from "./Layout";

export interface INavigateButtonProps {
  type: "replace" | "push";
  to: string;
}

export const NavigateButton = connect(
  state => ({}),
  (dispatch, ownProps: any) => ({ dispatch, ...ownProps })
)((props: any) => (
  <Button
    style={{ margin: actionItemMargin }}
    {...props}
    // tslint:disable-next-line:jsx-no-lambda
    onClick={() => {
      switch (props.type) {
        case "push":
          props.dispatch(routerActions.push(props.to));
          break;
        case "replace":
          props.dispatch(routerActions.replace(props.to));
          break;
      }
    }}
  >
    new
  </Button>
));
