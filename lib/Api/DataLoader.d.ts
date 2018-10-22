import * as React from "react";
export interface IDataLoaderProps<T> {
    url: string;
    children: (props: IDataProps<T>) => any;
}
export interface IDataProps<T> {
    data: T | null;
    loading: boolean;
    error?: string | null;
}
interface IState<T> {
    loadingState: string;
    data: T | null;
    error?: string | null;
    url: string;
}
export declare class DataLoader<T> extends React.Component<IDataLoaderProps<T>, IState<T>> {
    static getDerivedStateFromProps(props: IDataLoaderProps<any>, state: IState<any>): IState<any> | {
        url: string;
        loadingState: string;
    };
    state: IState<T>;
    componentDidMount(): Promise<void>;
    componentDidUpdate(): Promise<void>;
    reload: () => Promise<void>;
    render(): any;
}
export {};
