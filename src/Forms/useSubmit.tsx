import * as React from "react"
import { set } from "lodash"
import { notification, Typography } from "antd"

function camelize(str: string) {
  return str
    .split(".")
    .map(_camelize)
    .join(".")
}

function _camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return "" // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

const toFormikErrors = (error: SerializableError) => {
  const errors = {}
  Object.keys(error).forEach((key) => {
    const path = camelize(key)
    set(errors, path, error[key])
  })
  return errors
}

function send(url: string, values: any, intent: "execute" | "validate") {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "x-submit-intent": intent,
      "content-type": "application/json",
    },
    credentials: "same-origin",
  })
}

export interface ValidationResult {
  isValid: boolean
  errors: SerializableError
}

export interface SerializableError {
  [key: string]: string[]
}

export interface ModelStateDictionary {
  root: any
  maxAllowedErrors: number
  hasReachedMaxErrors: boolean
  errorCount: number
  count: number
  keys: string | null[]
  values: any[]
  isValid: boolean
  validationState: number
  item: any
}

interface ProblemDetail {
  detail: string
  status: number
  title: string
  type: string
}

export function useSubmit<T = any>(
  url: string,
): [
  (values: any) => Promise<T | undefined>,
  (values: any) => Promise<ValidationResult | undefined>,
  string | null,
] {
  const [error, setError] = React.useState<string | null>(null)
  return [
    async (values: any): Promise<T | undefined> => {
      const response = await send(url, values, "execute")
      if (!response.ok) {
        try {
          const problem = await response.json()
          if (problem.status === 400 && problem.detail) {
            const problemDetail = problem as ProblemDetail
            notification.error({
              message: (
                <div>
                  <div>
                    <Typography.Text strong={true}>
                      {problemDetail.title}
                    </Typography.Text>
                  </div>
                  <Typography.Text>{problemDetail.detail}</Typography.Text>
                </div>
              ),
            })
          }
        } catch (e) {}
        // what to do if bad request?
        console.error(response)
        setError(response.statusText)
        return undefined
      } else {
        const data = (await response.json()) as T
        return data
      }
    },
    async (values: any): Promise<ValidationResult | undefined> => {
      const response = await send(url, values, "validate")
      if (response.ok) {
        const data = (await response.json()) as ValidationResult
        const errors = toFormikErrors(data.errors)
        return { isValid: data.isValid, errors }
      } else {
        console.error(response)
        setError("error while validating: " + response.statusText)
        return
      }
    },
    error,
  ]
}
