import * as React from "react"

import { Button, message, Popconfirm, notification } from "antd"

import { FormikActions, FormikValues } from "formik"
import produce from "immer"

export const createPatchSubmitHandler = (url: string) => async (
  values: FormikValues,
  actions: FormikActions<any>,
) => {
  try {
    const response = await patchJson(url, values)
    if (response.ok) {
      message.success("Saved")
    } else {
      message.error(response.statusText)
    }
  } catch (E) {
    // tslint:disable-next-line:no-console
    console.log("error", E)
    message.error(E.toString())
  } finally {
    actions.setSubmitting(false)
  }
}

export const patchJson = async (url: string, payload: any) =>
  fetch(url, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  })

export const PatchAction = (props: {
  onClick: (e?: any | undefined) => void
  loading: boolean
}) => (
  <Button htmlType="submit" {...props}>
    Save
  </Button>
)

class Delete extends React.Component<{ path: string; id: string }> {
  public render() {
    return (
      <Popconfirm
        title="Are you sure?"
        onConfirm={async () => {
          const response = await fetch(this.props.path, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: this.props.id }),
          })
          if (response.ok) {
            this.setState({ loading: false })
            message.success("Success")
            window.history.back()
            // navigate("..", { replace: true });
          } else {
            message.error(response.statusText)
          }
        }}
      >
        <Button type="danger">Delete</Button>
      </Popconfirm>
    )
  }
}

export const Action = {
  Delete: Delete,
}

export class DeleteAction extends React.Component<{ url: string }> {
  public state = { loading: false }
  public render() {
    const { loading } = this.state
    return (
      <Popconfirm
        title="Are you sure you want to delete this item?"
        onConfirm={async () => {
          this.setState({ loading: true })
          const response = await fetch(this.props.url, { method: "DELETE" })
          if (response.ok) {
            this.setState({ loading: false })
            message.success("Success")
            // navigate back
          } else {
            message.error(response.statusText)
          }
        }}
      >
        <Button htmlType="submit" loading={loading} type="danger">
          Delete
        </Button>
      </Popconfirm>
    )
  }
}

export const createPostSubmitHandler = (
  url: string,
  onSuccess?: (result: any) => void,
  transform: (values: any) => any = (values) => values,
) => async (values: FormikValues, actions: FormikActions<any>) => {
  try {
    const response = await postJson(url, transform(values))
    if (response.ok) {
      message.success("Success")
      if (onSuccess) {
        const payload = await response.json()
        onSuccess(payload)
      }
    } else {
      console.error(response)
      message.error(response.statusText)
      const text = await response.text()
      if (text) {
        notification.error({
          message: (
            <div>
              <div>{response.statusText}</div>
              <div>{text}</div>
            </div>
          ),
          duration: 0,
        })
      }
    }
  } catch (E) {
    console.log("error", E)
    message.error(E.toString())
  } finally {
    actions.setSubmitting(false)
  }
}

export const postJson = async (
  url: string,
  payload: any,
  additionalHeaders?: () => Promise<HeadersInit>,
) => {
  const headers = produce(
    additionalHeaders ? await additionalHeaders() : {},
    (draft) => {
      draft["Content-Type"] = "application/json"
    },
  )
  return fetch(url, {
    body: JSON.stringify(payload),
    headers,
    method: "POST",
  })
}

export const PostAction = (props: any) => (
  <Button {...props}>{props.children || "Create"}</Button>
)
