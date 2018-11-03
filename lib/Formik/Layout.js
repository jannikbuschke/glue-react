import * as tslib_1 from "tslib";
import * as React from "react";
import styled from "styled-components";
export var PageContainer = function (props) { return React.createElement("div", tslib_1.__assign({ style: {} }, props)); };
export var PageHeader = function (props) { return React.createElement("h1", tslib_1.__assign({}, props)); };
export var PageContentContainer = function (props) { return (React.createElement(ErrorBoundary, tslib_1.__assign({}, props))); };
var StyledActionContainer = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  // margin: 20px;\n  // padding: 20px;\n  & > * {\n    margin: 10px;\n  }\n"], ["\n  display: flex;\n  // margin: 20px;\n  // padding: 20px;\n  & > * {\n    margin: 10px;\n  }\n"])));
export var PageActionContainer = function (props) { return (React.createElement(StyledActionContainer, tslib_1.__assign({}, props))); };
var ErrorBoundary = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { hasError: false };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        // tslint:disable-next-line:no-console
        console.error(error, info);
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return React.createElement("h1", null, "Something went wrong.");
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
export { ErrorBoundary };
var templateObject_1;
//# sourceMappingURL=Layout.js.map