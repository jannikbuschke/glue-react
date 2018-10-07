import * as React from "react";
export interface IDataLoaderProps {
    url: string;
    children: any;
}
interface IState {
    loadingState: string;
    data: any;
    error?: string | null;
    url: string;
}
export declare class DataLoader extends React.Component<IDataLoaderProps, IState> {
    static getDerivedStateFromProps(props: IDataLoaderProps, state: IState): IState | {
        url: string;
        loadingState: string;
    };
    state: IState;
    componentDidMount(): Promise<void>;
    componentDidUpdate(): Promise<void>;
    reload: () => Promise<void>;
    render(): any;
}
export {};
