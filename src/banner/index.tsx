import * as React from "react"
import { Alert } from "antd"

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

export function InfoBanner({ message }: { message: string | null }) {
  return message ? <Alert message={message} type="info" banner={true} /> : null
}
