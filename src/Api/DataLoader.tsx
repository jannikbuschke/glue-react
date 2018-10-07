import { message } from "antd";
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

export class DataLoader extends React.Component<IDataLoaderProps, IState> {
  public static getDerivedStateFromProps(
    props: IDataLoaderProps,
    state: IState
  ) {
    // tslint:disable-next-line:no-console
    console.log("next url", props.url);
    if (state.url !== props.url) {
      return { url: props.url, loadingState: "INVALID" };
    }
    return state;
  }
  public state: IState = {
    data: null,
    loadingState: "INVALID",
    url: ""
  };
  public async componentDidMount() {
    this.reload();
  }

  public async componentDidUpdate() {
    if (this.state.loadingState === "INVALID") {
      // tslint:disable-next-line:no-console
      console.log("reload");
      this.reload();
    }
  }
  public reload = async () => {
    this.setState({ loadingState: "LOADING" });
    // tslint:disable-next-line:no-console
    console.log("load", this.props.url);
    const response = await fetch(this.props.url);
    if (response.ok) {
      const json = await response.json();
      this.setState({ data: json, loadingState: "SUCCESS", error: null });
    } else {
      this.setState({
        data: null,
        error: response.statusText,
        loadingState: "ERROR"
      });
      message.error(response.statusText);
    }
  };
  public render() {
    const { data, error, loadingState } = this.state;
    const loading = loadingState === "INVALID" || loadingState === "LOADING";
    return this.props.children({ data, loading, error });
  }
}
