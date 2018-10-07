import * as React from "react";
export interface IOdataListProps {
    columns: any[];
    links: string[];
    totalCount: number;
}
export declare class OdataList extends React.Component<IOdataListProps | any, any> {
    state: {
        page: number;
    };
    render(): JSX.Element;
    private linkFormatter;
}
