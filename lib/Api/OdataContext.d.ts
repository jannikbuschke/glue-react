import * as React from "react";
export interface IQueryParameter {
    key: string;
    value: string;
}
export interface IOdataCollectionResponse {
    value: any;
    ["@odata.context"]: string;
    ["@odata.count"]?: number;
}
export interface IOdataCollectionContext {
    key: any;
    setTop: (top: number) => void;
    setSkip: (skip: number) => void;
    setQueryParameter: (key: string, value: string) => void;
    getQueryParameter: (key: string) => string;
    params: string;
    top: number;
}
export interface IProps {
    expand?: string;
    children?: (ctx: IOdataCollectionContext) => React.ReactNode;
    render?: (ctx: IOdataCollectionContext) => React.ReactNode;
}
interface IState {
    skip: number;
    top: number;
    queryParameters: {
        [key: string]: string;
    };
}
export declare class OdataContext extends React.Component<IProps, IState> {
    state: IState;
    render(): React.ReactNode;
}
export {};
