/// <reference types="react-redux" />
import * as React from "react";
export interface INavigateButtonProps {
    type: "replace" | "push";
    to: string;
}
export declare const NavigateButton: React.ComponentClass<any, any> & {
    WrappedComponent: React.ComponentType<any>;
};
