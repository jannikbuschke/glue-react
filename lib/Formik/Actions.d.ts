import * as React from "react";
import { FormikActions, FormikValues } from "formik";
export declare const createPatchSubmitHandler: (url: string) => (values: FormikValues, actions: FormikActions<any>) => Promise<void>;
export declare const patchJson: (url: string, payload: any) => Promise<Response>;
export declare const PatchAction: (props: {
    onClick: (e?: any) => void;
    loading: boolean;
}) => JSX.Element;
export declare class DeleteAction extends React.Component<{
    url: string;
}> {
    state: {
        loading: boolean;
    };
    render(): JSX.Element;
}
export declare const createPostSubmitHandler: (url: string) => (values: FormikValues, actions: FormikActions<any>) => Promise<void>;
export declare const postJson: (url: string, payload: any) => Promise<Response>;
export declare const PostAction: (props: any) => JSX.Element;
