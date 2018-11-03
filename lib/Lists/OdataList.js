import * as tslib_1 from "tslib";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { CustomPaging, DataTypeProvider, PagingState, SortingState } from "@devexpress/dx-react-grid";
import { Grid, PagingPanel, Table, TableHeaderRow, TableColumnResizing
// tslint:disable-next-line:no-implicit-dependencies
 } from "@devexpress/dx-react-grid-bootstrap3";
import { DataLoader } from "../Api";
import { OdataContext } from "../Api/OdataContext";
var getRowId = function (row) { return row.id; };
var pageSize = 10;
var OdataList = /** @class */ (function (_super) {
    tslib_1.__extends(OdataList, _super);
    function OdataList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { page: 0, pageSize: 10, sorting: [] };
        //   public changeSorting = (sorting: any) =>
        //   this.setState({ sorting, loadingState: 'INVALID' });
        // public changeFilters = (filters: any) =>
        //   this.setState({ filters, loadingState: 'INVALID', currentPage: 0 });
        // public changeCurrentPageSize = (pageSize: number) =>
        //   this.setState({ currentPage: 0, pageSize, loadingState: 'INVALID' });
        // public changeCurrentPage = (currentPage: number) => {
        //   this.setState({ currentPage, loadingState: 'INVALID' });
        // };
        _this.linkFormatter = function (value) {
            var path = _this.props.path;
            return (React.createElement(NavLink, { to: path + "/" + value.row.id }, value.row[value.column.name]));
        };
        return _this;
    }
    OdataList.prototype.render = function () {
        var _this = this;
        var _a = this.props, columns = _a.columns, links = _a.links;
        var page = this.state.page;
        return (React.createElement("div", { style: { paddingLeft: "3px" } },
            React.createElement(OdataContext, { expand: this.props.expand, render: function (ctx) { return (React.createElement(DataLoader, { url: _this.props.odataPath + "?" + ctx.params }, function (_a) {
                    var data = _a.data;
                    return (React.createElement(Grid, { rows: data ? (data.value ? data.value : []) : [], columns: columns || [], getRowId: getRowId },
                        React.createElement(DataTypeProvider, { for: links, formatterComponent: _this.linkFormatter }),
                        React.createElement(SortingState
                        // sorting={sorting || []}
                        // onSortingChange={changeSorting}
                        , null),
                        React.createElement(PagingState, { currentPage: page, 
                            // tslint:disable-next-line:jsx-no-lambda
                            onCurrentPageChange: function (currentPage) {
                                // tslint:disable-next-line:no-console
                                console.log("change pagesize", pageSize, currentPage);
                                _this.setState({ page: currentPage });
                                ctx.setSkip(pageSize * currentPage);
                                ctx.setTop(pageSize);
                            }, pageSize: pageSize, 
                            // tslint:disable-next-line:jsx-no-lambda
                            onPageSizeChange: function (newPageSize) {
                                ctx.setSkip(newPageSize * page);
                                ctx.setTop(newPageSize);
                            } }),
                        React.createElement(Table, null),
                        React.createElement(CustomPaging, { totalCount: data ? data["@odata.count"] : undefined }),
                        React.createElement(TableColumnResizing, tslib_1.__assign({}, _this.props.tableColumnResizingProps)),
                        React.createElement(TableHeaderRow, { showSortingControls: true }),
                        React.createElement(PagingPanel, { pageSizes: [10, 20, 50] })));
                })); } })));
    };
    return OdataList;
}(React.Component));
export { OdataList };
//# sourceMappingURL=OdataList.js.map