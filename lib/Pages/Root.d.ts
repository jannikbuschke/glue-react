import * as React from "react";
import { IEntityItem, ILinkItem } from "./types";
interface IProps {
    items: IEntityItem[];
    links: ILinkItem[];
}
export declare class Root extends React.Component<IProps> {
    render(): JSX.Element;
}
export {};
