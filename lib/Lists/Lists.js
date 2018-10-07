import * as tslib_1 from "tslib";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { CustomPaging, DataTypeProvider, PagingState, SortingState } from "@devexpress/dx-react-grid";
import { Grid, PagingPanel, Table, TableHeaderRow
// tslint:disable-next-line:no-implicit-dependencies
 } from "@devexpress/dx-react-grid-bootstrap3";
var getRowId = function (row) { return row.id; };
var OdataList = /** @class */ (function (_super) {
    tslib_1.__extends(OdataList, _super);
    function OdataList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.linkFormatter = function (value) {
            var path = _this.props.path;
            return (React.createElement(NavLink, { to: "/" + path + "/" + value.row.id }, value.row[value.column.name]));
        };
        return _this;
    }
    OdataList.prototype.render = function () {
        var _a = this.props, columns = _a.columns, links = _a.links;
        var items = this.props.items;
        var _b = this.props.collectionState, currentPage = _b.currentPage, pageSize = _b.pageSize, pageSizes = _b.pageSizes, changeCurrentPage = _b.changeCurrentPage, changePageSize = _b.changePageSize, changeSorting = _b.changeSorting, sorting = _b.sorting, totalCount = _b.totalCount;
        return (React.createElement(Grid, { rows: items || [], columns: columns || [], getRowId: getRowId },
            React.createElement(DataTypeProvider, { for: links, formatterComponent: this.linkFormatter }),
            React.createElement(SortingState, { sorting: sorting || [], onSortingChange: changeSorting }),
            React.createElement(PagingState, { currentPage: currentPage, onCurrentPageChange: changeCurrentPage, pageSize: pageSize, onPageSizeChange: changePageSize }),
            React.createElement(Table, null),
            React.createElement(CustomPaging, { totalCount: totalCount }),
            React.createElement(TableHeaderRow, { showSortingControls: true }),
            React.createElement(PagingPanel, { pageSizes: pageSizes })));
    };
    return OdataList;
}(React.Component));
export { OdataList };
//# sourceMappingURL=Lists.js.map