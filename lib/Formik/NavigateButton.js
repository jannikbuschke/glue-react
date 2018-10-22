import * as tslib_1 from "tslib";
import { Button } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { routerActions } from "react-router-redux";
import { actionItemMargin } from "./Layout";
export var NavigateButton = connect(function (state) { return ({}); }, function (dispatch, ownProps) { return (tslib_1.__assign({ dispatch: dispatch }, ownProps)); })(function (props) { return (React.createElement(Button, tslib_1.__assign({ style: { margin: actionItemMargin } }, props, { 
    // tslint:disable-next-line:jsx-no-lambda
    onClick: function () {
        switch (props.type) {
            case "push":
                props.dispatch(routerActions.push(props.to));
                break;
            case "replace":
                props.dispatch(routerActions.replace(props.to));
                break;
        }
    } }), "new")); });
//# sourceMappingURL=NavigateButton.js.map