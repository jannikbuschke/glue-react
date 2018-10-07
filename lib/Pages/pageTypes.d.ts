/// <reference types="react" />
import { RouteComponentProps } from "react-router";
export interface INavBarItem {
    displayName: string;
    path: string;
    detail: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    list: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    new: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}
