var _this = this;
import * as tslib_1 from "tslib";
import * as React from "react";
import { Button, message } from "antd";
import { actionItemMargin } from "./Layout";
export var createPatchSubmitHandler = function (url) { return function (values, actions) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var response, E_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, patchJson(url, values)];
            case 1:
                response = _a.sent();
                if (response.ok) {
                    message.success("Saved");
                }
                else {
                    message.error(response.statusText);
                }
                return [3 /*break*/, 4];
            case 2:
                E_1 = _a.sent();
                // tslint:disable-next-line:no-console
                console.log("error", E_1);
                message.error(E_1.toString());
                return [3 /*break*/, 4];
            case 3:
                actions.setSubmitting(false);
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); }; };
export var patchJson = function (url, payload) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, fetch(url, {
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
                method: "PATCH"
            })];
    });
}); };
export var PatchAction = function (props) { return (React.createElement(Button, tslib_1.__assign({ style: { margin: actionItemMargin } }, props), "Save")); };
var DeleteAction = /** @class */ (function (_super) {
    tslib_1.__extends(DeleteAction, _super);
    function DeleteAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { loading: false };
        return _this;
    }
    DeleteAction.prototype.render = function () {
        var _this = this;
        var loading = this.state.loading;
        return (React.createElement(Button, { loading: loading, style: { margin: actionItemMargin }, type: "danger", 
            // tslint:disable-next-line:jsx-no-lambda
            onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var response, E_2;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.setState({ loading: true });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, fetch(this.props.url, { method: "DELETE" })];
                        case 2:
                            response = _a.sent();
                            if (response.ok) {
                                this.setState({ loading: false });
                                message.success("Success");
                                // navigate back
                            }
                            else {
                                message.error(response.statusText);
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            E_2 = _a.sent();
                            // tslint:disable-next-line:no-console
                            console.log("error", E_2);
                            message.error(E_2.toString());
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); } }, "Delete"));
    };
    return DeleteAction;
}(React.Component));
export { DeleteAction };
export var createPostSubmitHandler = function (url) { return function (values, actions) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var response, E_3;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, postJson(url, values)];
            case 1:
                response = _a.sent();
                message.success("Success");
                // const payload =
                return [4 /*yield*/, response.json()];
            case 2:
                // const payload =
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                E_3 = _a.sent();
                // tslint:disable-next-line:no-console
                console.log("error", E_3);
                message.error(E_3.toString());
                return [3 /*break*/, 5];
            case 4:
                actions.setSubmitting(false);
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); }; };
export var postJson = function (url, payload) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, fetch(url, {
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
                method: "POST"
            })];
    });
}); };
export var PostAction = function (props) { return (React.createElement(Button, tslib_1.__assign({ style: { margin: actionItemMargin } }, props), "Create")); };
//# sourceMappingURL=Actions.js.map