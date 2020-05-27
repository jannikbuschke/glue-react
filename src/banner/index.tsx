import * as React from "react"
import { Alert } from "antd"
import { AlertProps } from "antd/lib/alert"

export function ErrorBanner({ error }: { error: any }) {
  return error ? (
    <Alert
      type="error"
      banner={true}
      message={error.toString()}
      showIcon={false}
    />
  ) : null
}

export function WarningBanner({ message }: { message: string | null }) {
  return message ? (
    <Alert message={message} type="warning" banner={true} />
  ) : null
}

type InfoProps = AlertProps

export function InfoBanner({ message, ...rest }: InfoProps) {
  return message ? (
    <Alert message={message} type="info" banner={true} {...rest} />
  ) : null
}
