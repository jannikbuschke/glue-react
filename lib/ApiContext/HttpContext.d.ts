import * as React from "react";
interface IHttpContext {
    apiUrl: string;
    httpContextPath?: string;
}
export declare const createContext: (apiUrl: string, httpContextPath?: string | undefined) => React.Context<IHttpContext>;
export {};
