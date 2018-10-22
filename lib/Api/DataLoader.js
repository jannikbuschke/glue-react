import * as tslib_1 from "tslib";
import { message } from "antd";
import * as React from "react";
var DataLoader = /** @class */ (function (_super) {
    tslib_1.__extends(DataLoader, _super);
    function DataLoader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            data: {},
            loadingState: "INVALID",
            url: ""
        };
        _this.reload = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var response, json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ loadingState: "LOADING" });
                        // tslint:disable-next-line:no-console
                        console.log("load", this.props.url);
                        return [4 /*yield*/, fetch(this.props.url)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        this.setState({ data: json, loadingState: "SUCCESS", error: null });
                        return [3 /*break*/, 4];
                    case 3:
                        this.setState({
                            data: null,
                            error: response.statusText,
                            loadingState: "ERROR"
                        });
                        message.error(response.statusText);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    DataLoader.getDerivedStateFromProps = function (props, state) {
        // tslint:disable-next-line:no-console
        console.log("next url", props.url);
        if (state.url !== props.url) {
            return { url: props.url, loadingState: "INVALID" };
        }
        return state;
    };
    DataLoader.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.reload();
                return [2 /*return*/];
            });
        });
    };
    DataLoader.prototype.componentDidUpdate = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.state.loadingState === "INVALID") {
                    this.reload();
                }
                return [2 /*return*/];
            });
        });
    };
    DataLoader.prototype.render = function () {
        var _a = this.state, data = _a.data, error = _a.error, loadingState = _a.loadingState;
        var loading = loadingState === "INVALID" || loadingState === "LOADING";
        return this.props.children({ data: data, loading: loading, error: error });
    };
    return DataLoader;
}(React.Component));
export { DataLoader };
//# sourceMappingURL=DataLoader.js.map