import * as tslib_1 from "tslib";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { CustomPaging, DataTypeProvider, PagingState, SortingState } from "@devexpress/dx-react-grid";
import { Grid, PagingPanel, Table, TableHeaderRow
// tslint:disable-next-line:no-implicit-dependencies
 } from "@devexpress/dx-react-grid-bootstrap3";
import { OdataContext } from "../Api/OdataContext";
var getRowId = function (row) { return row.id; };
var pageSize = 5;
var OdataList = /** @class */ (function (_super) {
    tslib_1.__extends(OdataList, _super);
    function OdataList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { page: 0 };
        _this.linkFormatter = function (value) {
            var path = _this.props.path;
            return (React.createElement(NavLink, { to: path + "/" + value.row.id }, value.row[value.column.name]));
        };
        return _this;
    }
    OdataList.prototype.render = function () {
        var _this = this;
        var _a = this.props, items = _a.items, totalCount = _a.totalCount, columns = _a.columns, links = _a.links;
        var page = this.state.page;
        return (React.createElement("div", { style: { paddingLeft: "3px" } },
            React.createElement(OdataContext, null, function (ctx) { return (React.createElement(Grid, { rows: items || [], columns: columns || [], getRowId: getRowId },
                React.createElement(DataTypeProvider, { for: links, formatterComponent: _this.linkFormatter }),
                React.createElement(SortingState
                // sorting={sorting || []}
                // onSortingChange={changeSorting}
                , null),
                React.createElement(PagingState, { currentPage: page, 
                    // tslint:disable-next-line:jsx-no-lambda
                    onCurrentPageChange: function (currentPage) {
                        _this.setState({ page: currentPage });
                        ctx.setSkip(pageSize * currentPage);
                        ctx.setTop(pageSize);
                    }, pageSize: pageSize }),
                React.createElement(Table, null),
                React.createElement(CustomPaging, { totalCount: totalCount }),
                React.createElement(TableHeaderRow, { showSortingControls: true }),
                React.createElement(PagingPanel, { pageSizes: [10, 20, 50] }))); })));
    };
    return OdataList;
}(React.Component));
export { OdataList };
//# sourceMappingURL=OdataList.js.map