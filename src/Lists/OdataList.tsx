import * as React from "react";

import { NavLink } from "react-router-dom";

import {
  CustomPaging,
  DataTypeProvider,
  PagingState,
  SortingState
} from "@devexpress/dx-react-grid";

import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow
  // tslint:disable-next-line:no-implicit-dependencies
} from "@devexpress/dx-react-grid-bootstrap3";

import { OdataContext } from "../Api/OdataContext";

export interface IOdataListProps {
  columns: any[];
  links: string[];
  totalCount: number;
}

const getRowId = (row: any) => row.id;
const pageSize = 5;
export class OdataList extends React.Component<IOdataListProps | any, any> {
  public state = { page: 0 };
  public render() {
    const { items, totalCount, columns, links } = this.props;
    const { page } = this.state;
    return (
      <div style={{ paddingLeft: "3px" }}>
        <OdataContext>
          {ctx => (
            <Grid
              rows={items || []}
              columns={columns || []}
              getRowId={getRowId}
            >
              <DataTypeProvider
                for={links}
                formatterComponent={this.linkFormatter}
              />
              <SortingState
              // sorting={sorting || []}
              // onSortingChange={changeSorting}
              />
              <PagingState
                currentPage={page}
                // tslint:disable-next-line:jsx-no-lambda
                onCurrentPageChange={(currentPage: number) => {
                  this.setState({ page: currentPage });
                  ctx.setSkip(pageSize * currentPage);
                  ctx.setTop(pageSize);
                }}
                pageSize={pageSize}
                // onPageSizeChange={changePageSize}
              />
              <Table />
              <CustomPaging totalCount={totalCount} />
              <TableHeaderRow showSortingControls={true} />
              <PagingPanel pageSizes={[10, 20, 50]} />
            </Grid>
          )}
        </OdataContext>
      </div>
    );
  }
  private linkFormatter = (value: any) => {
    const { path } = this.props;
    return (
      <NavLink to={`${path}/${value.row.id}`}>
        {value.row[value.column.name]}
      </NavLink>
    );
  };
}
