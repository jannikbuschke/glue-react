import * as React from "react";
export declare const PageContainer: (props: any) => JSX.Element;
export declare const PageHeader: (props: any) => JSX.Element;
export declare const PageContentContainer: (props: any) => JSX.Element;
export declare const PageActionContainer: (props: any) => JSX.Element;
export declare class ErrorBoundary extends React.Component {
    state: {
        hasError: boolean;
    };
    componentDidCatch(error: any, info: any): void;
    render(): {} | null | undefined;
}
