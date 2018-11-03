import * as React from "react";
import { TableColumnResizingProps } from "@devexpress/dx-react-grid";
interface IColumn {
    name: string;
    title: string;
    getCellValue?: (row: any) => any;
}
export interface IOdataListProps {
    columns: IColumn[];
    links: string[];
    path: string;
    odataPath: string;
    expand?: string;
    tableColumnResizingProps?: TableColumnResizingProps;
}
export declare class OdataList extends React.Component<IOdataListProps, any> {
    state: {
        page: number;
        pageSize: number;
        sorting: never[];
    };
    render(): JSX.Element;
    private linkFormatter;
}
export {};
