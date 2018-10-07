import * as React from "react";
export declare const FormikDebug: () => JSX.Element;
export declare const DateEditor: (props: any) => JSX.Element;
export declare const StringEditor: (props: any) => JSX.Element;
export declare const NumberEditor: (props: any) => JSX.Element;
export declare const Text: (props: any) => JSX.Element;
interface IProps {
    name: string;
    url: string;
    placeholder?: string;
}
export declare class ReferenceEditor extends React.Component<IProps> {
    render(): JSX.Element;
}
export {};
