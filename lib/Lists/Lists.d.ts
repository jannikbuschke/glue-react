import * as React from "react";
export interface IProps {
    columns: any[];
    links: string[];
}
export declare class OdataList extends React.Component<IProps | any, any> {
    render(): JSX.Element;
    private linkFormatter;
}
