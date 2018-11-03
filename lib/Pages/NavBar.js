import * as tslib_1 from "tslib";
import { Menu } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
var NavBarComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavBarComponent, _super);
    function NavBarComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavBarComponent.prototype.render = function () {
        var _this = this;
        return (React.createElement(Menu, { style: { height: "100%" }, mode: "inline", 
            // tslint:disable-next-line:jsx-no-lambda
            onClick: function (param) {
                _this.props.dispatch(push(param.key));
            } }, this.props.items.map(function (item) {
            return React.createElement(Menu.Item, { key: item.path }, item.displayName);
        })));
    };
    return NavBarComponent;
}(React.Component));
var NavBar = connect(function (state, ownProps) { return ({}); }, function (dispatch, ownProps) { return (tslib_1.__assign({ dispatch: dispatch }, ownProps)); })(NavBarComponent);
export { NavBar };
//# sourceMappingURL=NavBar.js.map