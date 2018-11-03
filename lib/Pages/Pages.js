import * as React from "react";
import { Route, Switch } from "react-router";
var MasterDetailContainer = function (props) { return (React.createElement("div", { style: {
        display: "grid",
        gridGap: "20px",
        gridTemplateColumns: "repeat(2, 1fr)",
        margin: "30px"
    } }, props.children)); };
var Pages = function (props) { return (React.createElement(MasterDetailContainer, null, props.items.map(function (item, index) { return (React.createElement(React.Fragment, null,
    React.createElement(Route, { path: "" + item.path, component: item.list }),
    React.createElement(Switch, null,
        React.createElement(Route, { exact: true, path: item.path + "/new", component: item.new }),
        React.createElement(Route, { exact: true, path: item.path + "/:id", component: item.detail })))); }))); };
export { Pages };
//# sourceMappingURL=Pages.js.map