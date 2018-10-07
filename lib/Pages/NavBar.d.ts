/// <reference types="react-redux" />
import * as React from "react";
import { ILinkItem } from "./types";
interface IDispatchProps {
    items: ILinkItem[];
    dispatch: any;
}
interface IOwnProps {
    items: ILinkItem[];
}
declare const NavBar: React.ComponentClass<Pick<IDispatchProps, never> & IOwnProps, any> & {
    WrappedComponent: React.ComponentType<IDispatchProps>;
};
export { NavBar };
