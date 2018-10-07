import * as tslib_1 from "tslib";
import * as React from "react";
import { NavBar } from "./NavBar";
import { Pages } from "./Pages";
var Root = /** @class */ (function (_super) {
    tslib_1.__extends(Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Root.prototype.render = function () {
        return (React.createElement("div", { style: { display: "grid", gridTemplateColumns: "200px 1fr" } },
            React.createElement(NavBar, { items: this.props.links }),
            React.createElement("div", { style: { margin: 20 } },
                React.createElement(Pages, { items: this.props.items }))));
    };
    return Root;
}(React.Component));
export { Root };
//# sourceMappingURL=Root.js.map