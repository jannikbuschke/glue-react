// import * as React from 'react';
// import styled from 'styled-components';
// import {
//   CustomPaging,
//   DataTypeProvider,
//   FilteringState,
//   IntegratedSelection,
//   PagingState,
//   SelectionState,
//   SortingState,
// } from '@devexpress/dx-react-grid';
// import {
//   Grid,
//   PagingPanel,
//   Table,
//   TableFilterRow,
//   TableHeaderRow,
//   TableSelection,
// } from '@devexpress/dx-react-grid-bootstrap3';
// const GridContainerDiv = styled.div`
//   position: relative;
//   & tbody > tr:hover {
//     background-color: #fcf8e3;
//   }
// `;
// export interface IOdataResponse<T> {
//   ['@odata.context']: string,
//   ['@odata.count']: number,
//   value: T[],
// }
// class OdataGrid extends React.Component<Props, State> {
//   public static getDerivedStateFromProps(props: Props, state: State) {
//     if (state.currentFilterId !== props.currentFilterId) {
//       return {
//         ...state,
//         currentFilterId: props.currentFilterId,
//         loadingState: 'INVALID',
//       };
//     }
//     return state;
//   }
//   public state: State = {
//     currentPage: 0,
//     error: '',
//     exactSearchColumn: null,
//     exactSearchData: null,
//     filters: [],
//     loadingState: 'INVALID',
//     missingValues: [],
//     pageSize: 15,
//     search: '',
//     selection: [],
//     sorting: this.props.defaultSorting || [],
//     currentFilterId: null,
//   };
//   public debouncedOdataFetch = _.debounce(this.odataFetch, 500);
//   public componentDidMount() {
//     this.load();
//     this.setState({
//       filters: this.props.columns.filter(c => c.initialFilterValue).map(c => ({
//         columnName: c.name,
//         operation: 'contains',
//         value: c.initialFilterValue,
//       })),
//     });
//   }
//   public componentDidUpdate() {
//     const { loadingState, search } = this.state;
//     if (loadingState === 'INVALID') {
//       this.load();
//     } else if (search !== this.props.search) {
//       this.setState({ search: this.props.search, loadingState: 'INVALID' });
//     }
//   }
//   public render() {
//     const {
//       data,
//       error,
//       loadingState,
//       filters,
//       missingValues,
//       currentPage,
//       pageSize,
//       sorting,
//     } = this.state;
//     const rows = data ? data.value : [];
//     const count = data ? data['@odata.count'] : 0;
//     return (
//       <GridContainerDiv>
//         {error && <Alert bsStyle="danger">{error}</Alert>}
//         {missingValues &&
//           missingValues.length > 0 && (
//             <Alert bsStyle="warning">
//               <span style={{ fontWeight: 'bold' }}>Missing:</span>{' '}
//               {missingValues.join(', ')}
//             </Alert>
//           )}
//         <Grid
//           rows={rows}
//           columns={this.props.columns}
//           getRowId={this.props.getRowId}
//           getCellValue={(row, columnName) => {
//             const value = row[columnName];
//             return <span title={value}>{value}</span>;
//           }}>
//           <LinkTypeProvider
//             for={this.props.columns.filter(c => c.isLink).map(c => c.name)}
//           />
//           <FilteringState
//             filters={filters}
//             onFiltersChange={this.changeFilters}
//           />
//           <SortingState
//             sorting={sorting}
//             onSortingChange={this.changeSorting}
//           />
//           <SelectionState
//             selection={this.props.selection}
//             onSelectionChange={this.changeCurrentSelection}
//           />
//           <IntegratedSelection highlight={true} />
//           <PagingState
//             currentPage={currentPage}
//             onCurrentPageChange={this.changeCurrentPage}
//             onPageSizeChange={this.changeCurrentPageSize}
//             pageSize={pageSize}
//           />
//           <CustomPaging totalCount={count} />
//           <Table />
//           <TableSelection showSelectAll={true} selectByRowClick={true} highlightRow={true} />
//           <TableHeaderRow showSortingControls={true} />
//           {!this.props.disableFilterRow && (
//             <TableFilterRow cellComponent={CustomFilterCell} />
//           )}
//           <PagingPanel pageSizes={[15, 30, 100]} />
//         </Grid>
//         {loadingState === 'LOADING' && <Loading />}
//       </GridContainerDiv>
//     );
//   }
//   public changeCurrentSelection = (selection: any) => {
//     if (this.props.disableMultiSelect) {
//       this.props.onSelectionChange(selection.slice(selection.length - 1));
//     } else {
//       this.props.onSelectionChange(selection);
//     }
//   };
//   public changeSorting = (sorting: any) =>
//     this.setState({ sorting, loadingState: 'INVALID' });
//   public changeFilters = (filters: any) =>
//     this.setState({ filters, loadingState: 'INVALID', currentPage: 0 });
//   public changeCurrentPageSize = (pageSize: number) =>
//     this.setState({ currentPage: 0, pageSize, loadingState: 'INVALID' });
//   public changeCurrentPage = (currentPage: number) => {
//     this.setState({ currentPage, loadingState: 'INVALID' });
//   };
//   public odataFetch(
//     odataUrl: string,
//     exactSearchColumn: string | null,
//     exactSearchData: any[] | null
//   ) {
//     this.setState({
//       loadingState: 'LOADING',
//     });
//     fetch(odataUrl, { credentials: 'include' })
//       .then(r => {
//         return r.ok ? r.json() : Promise.reject(r.statusText);
//       })
//       .then((data: IOdataResponse<any>) => {
//         this.setState({ data, loadingState: 'FULFILLED', error: '' });
//         // currently only one column is used for 'exact search'
//         if (exactSearchColumn && data && data.value) {
//           const missingValues = [];
//           const values = data.value.map(d => d[exactSearchColumn]);
//           exactSearchData.forEach(element => {
//             if (values.indexOf(element) === -1) {
//               missingValues.push(element);
//             }
//           });
//           this.setState({ missingValues });
//         } else {
//           this.setState({ missingValues: [] });
//         }
//       })
//       .catch(reason => {
//         this.setState({ loadingState: 'FULFILLED', error: reason.toString() });
//       });
//   }
//   public load() {
//     const { url, search } = this.props;
//     const { currentPage, filters, pageSize, sorting } = this.state;
//     const skip = currentPage * pageSize;
//     const top = pageSize;
//     let exactSearchColumn = null;
//     let exactSearchData = null;
//     const searchItemSeperator = ';';
//     const filter = filters
//       .filter(f => f.value)
//       .map(f => {
//         // if filtervalue is surround by quotationmarks we do an 'exact' search (eq) else we use a 'like' search (contains)
//         if (f.value.startsWith('"') && f.value.endsWith('"')) {
//           exactSearchColumn = f.columnName;
//           exactSearchData = f.value
//             .replace(/"/g, '')
//             .split(searchItemSeperator);
//           return f.value
//             .replace(/"/g, '')
//             .split(searchItemSeperator)
//             .map(value => `${f.columnName} eq '${value}'`)
//             .join(' or ');
//         } else {
//           return f.value
//             .split(searchItemSeperator)
//             .map(value => `contains(${f.columnName},'${value}')`)
//             .join(' or ');
//         }
//       })
//       .join(' and ');
//     const filterQuery = filter ? `&$filter=${filter}` : '';
//     const apiFilter = this.props.currentFilterId
//       ? `&filterId=${this.props.currentFilterId}`
//       : '';
//     const orderBy = sorting
//       .map(sort => `${sort.columnName} ${sort.direction}`)
//       .join(', ');
//     const orderByQuery = orderBy ? `&$orderBy=${orderBy}` : '';
//     const odataUrl = `${url}&$count=true&$skip=${skip}&$top=${top}${filterQuery}${orderByQuery}&search=${search}${apiFilter}`;
//     this.debouncedOdataFetch(odataUrl, exactSearchColumn, exactSearchData);
//   }
// }
// export { OdataGrid };
//# sourceMappingURL=OdataList2.js.map