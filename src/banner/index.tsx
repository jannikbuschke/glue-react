import * as React from "react"
import { Alert } from "antd"
import { AlertProps } from "antd/lib/alert"

export function ErrorBanner({ message }: { message: string | null }) {
  return message ? (
    <Alert message={message} type="error" banner={true} showIcon={false} />
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
