import * as React from "react";

import * as _ from "lodash";

export interface IQueryParameter {
  key: string;
  value: string;
}

export interface IOdataCollectionResponse {
  value: any;
  ["@odata.context"]: string;
  ["@odata.count"]?: number;
}

export interface IOdataCollectionContext {
  key: any;
  setTop: (top: number) => void;
  setSkip: (skip: number) => void;
  setQueryParameter: (key: string, value: string) => void;
  getQueryParameter: (key: string) => string;
  params: string;
  top: number;
}

export interface IProps {
  children: (ctx: IOdataCollectionContext) => React.ReactNode;
}

interface IState {
  skip: number;
  top: number;
  queryParameters: { [key: string]: string };
}

const defaultPageSize = 10;

export class OdataContext extends React.Component<IProps, IState> {
  public state: IState = { skip: 0, top: defaultPageSize, queryParameters: {} };
  public render() {
    const { top, skip, queryParameters } = this.state;
    const params = Object.keys(queryParameters)
      .map(key => `&${key}=${queryParameters[key]}`)
      .join();
    const allParams = `$count=true&$top=${top}&$skip=${skip}${params}`;
    // tslint:disable-next-line:no-console
    console.log("PARAMS", allParams);
    return this.props.children({
      getQueryParameter: (key: string) => queryParameters[key],
      key: "" + Math.random(),
      params: allParams,
      setQueryParameter: _.debounce(
        (key: string, value: string) =>
          this.setState(state => ({
            queryParameters: { ...state.queryParameters, [key]: value }
          })),
        500
      ),
      setSkip: (skip: number) => this.setState({ skip }),
      setTop: (top: number) => this.setState({ top }),
      top
    });
  }
}
