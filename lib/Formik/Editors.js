import * as tslib_1 from "tslib";
import { Select } from "antd";
import { DatePicker, Input, InputNumber } from "antd";
import * as React from "react";
import { Field } from "formik";
import { DataLoader } from "../Api";
export var FormikDebug = function () { return (React.createElement(Field, null, function (_a) {
    var form = _a.form;
    return JSON.stringify(form, null, 4);
})); };
export var DateEditor = function (props) { return (React.createElement(Field, tslib_1.__assign({}, props), function (p) { return (React.createElement(DatePicker, { value: p.field.value, 
    // tslint:disable-next-line:jsx-no-lambda
    onChange: function (date) {
        p.form.setFieldValue(props.name, date);
    } })); })); };
export var StringEditor = function (props) { return (React.createElement(Field, tslib_1.__assign({}, props), function (_a) {
    var field = _a.field;
    return React.createElement(Input, tslib_1.__assign({}, props, field));
})); };
export var NumberEditor = function (props) { return (React.createElement(Field, tslib_1.__assign({}, props), function (p) {
    return (React.createElement(InputNumber, tslib_1.__assign({}, props, p.field, { onChange: 
        // tslint:disable-next-line:jsx-no-lambda
        function (value) { return p.form.setFieldValue(props.name, value); } })));
})); };
export var Text = function (props) { return (React.createElement(Field, tslib_1.__assign({}, props), function (p) {
    return (React.createElement(React.Fragment, null,
        React.createElement("label", null,
            props.label,
            ":"),
        " ",
        p.field.value ? p.field.value.toString() : ""));
})); };
var ReferenceEditor = /** @class */ (function (_super) {
    tslib_1.__extends(ReferenceEditor, _super);
    function ReferenceEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReferenceEditor.prototype.render = function () {
        var _this = this;
        return (React.createElement(DataLoader, { url: this.props.url }, function (_a) {
            var data = _a.data;
            return (React.createElement(Field, { name: _this.props.name }, function (fieldProps) { return (React.createElement(Select, { showSearch: true, style: { width: "100%" }, value: fieldProps.field.value === null
                    ? undefined
                    : fieldProps.field.value, allowClear: true, placeholder: _this.props.placeholder, defaultActiveFirstOption: false, showArrow: true, filterOption: false, 
                // tslint:disable-next-line:jsx-no-lambda
                onChange: function (value) {
                    fieldProps.form.setFieldValue(_this.props.name, value);
                }, notFoundContent: null }, data && data.value
                ? data.value.map(function (i) {
                    return React.createElement(Select.Option, { key: i.id }, i.name);
                })
                : null)); }));
        }));
    };
    return ReferenceEditor;
}(React.Component));
export { ReferenceEditor };
//# sourceMappingURL=Editors.js.map