import * as React from "react";

import { Button, message } from "antd";

import { FormikActions, FormikValues } from "formik";
import { actionItemMargin } from "./Layout";

export const createPatchSubmitHandler = (url: string) => async (
  values: FormikValues,
  actions: FormikActions<any>
) => {
  try {
    const response = await patchJson(url, values);
    if (response.ok) {
      message.success("Saved");
    } else {
      message.error(response.statusText);
    }
  } catch (E) {
    // tslint:disable-next-line:no-console
    console.log("error", E);
    message.error(E.toString());
  } finally {
    actions.setSubmitting(false);
  }
};

export const patchJson = async (url: string, payload: any) =>
  fetch(url, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    method: "PATCH"
  });

export const PatchAction = (props: {
  onClick: (e?: any | undefined) => void;
  loading: boolean;
}) => (
  <Button style={{ margin: actionItemMargin }} {...props}>
    Save
  </Button>
);

export class DeleteAction extends React.Component<{ url: string }> {
  public state = { loading: false };
  public render() {
    const { loading } = this.state;
    return (
      <Button
        loading={loading}
        style={{ margin: actionItemMargin }}
        type="danger"
        // tslint:disable-next-line:jsx-no-lambda
        onClick={async () => {
          this.setState({ loading: true });
          try {
            const response = await fetch(this.props.url, { method: "DELETE" });
            if (response.ok) {
              this.setState({ loading: false });
              message.success("Success");
              // navigate back
            } else {
              message.error(response.statusText);
            }
          } catch (E) {
            // tslint:disable-next-line:no-console
            console.log("error", E);
            message.error(E.toString());
          }
        }}
      >
        Delete
      </Button>
    );
  }
}

export const createPostSubmitHandler = (url: string) => async (
  values: FormikValues,
  actions: FormikActions<any>
) => {
  try {
    const response = await postJson(url, values);
    message.success("Success");
    // const payload =
    await response.json();
    //   p.dispatch(routerActions.replace(payload.id));
  } catch (E) {
    // tslint:disable-next-line:no-console
    console.log("error", E);
    message.error(E.toString());
  } finally {
    actions.setSubmitting(false);
  }
};

export const postJson = async (url: string, payload: any) =>
  fetch(url, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  });

export const PostAction = (props: any) => (
  <Button style={{ margin: actionItemMargin }} {...props}>
    Create
  </Button>
);
