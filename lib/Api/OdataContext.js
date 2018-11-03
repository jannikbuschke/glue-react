import * as tslib_1 from "tslib";
import * as React from "react";
import * as _ from "lodash";
var defaultPageSize = 10;
var OdataContext = /** @class */ (function (_super) {
    tslib_1.__extends(OdataContext, _super);
    function OdataContext() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { skip: 0, top: defaultPageSize, queryParameters: {} };
        return _this;
    }
    OdataContext.prototype.render = function () {
        var _this = this;
        var _a = this.state, top = _a.top, skip = _a.skip, queryParameters = _a.queryParameters;
        var params = Object.keys(queryParameters)
            .map(function (key) { return "&" + key + "=" + queryParameters[key]; })
            .join();
        var expand = this.props.expand ? "&$expand=" + this.props.expand : "";
        var allParams = "$count=true&$top=" + top + "&$skip=" + skip + params + expand;
        return this.props.render({
            getQueryParameter: function (key) { return queryParameters[key]; },
            key: "" + Math.random(),
            params: allParams,
            setQueryParameter: _.debounce(function (key, value) {
                return _this.setState(function (state) {
                    var _a;
                    return ({
                        queryParameters: tslib_1.__assign({}, state.queryParameters, (_a = {}, _a[key] = value, _a))
                    });
                });
            }, 500),
            setSkip: function (skip) { return _this.setState({ skip: skip }); },
            setTop: function (top) { return _this.setState({ top: top }); },
            top: top
        });
    };
    return OdataContext;
}(React.Component));
export { OdataContext };
//# sourceMappingURL=OdataContext.js.map