import * as React from "react"
import { FormikErrors } from "formik"
import { FetchContext } from "@jbuschke/react-fetch-context"
import { message } from "antd"

interface UseActionProps {
  apiVersion: string
  entityName: string
  actionName: string
  onSuccessfulSubmit?: (response: Response) => void
}

interface UseActionsResponse {
  // validate: any;
  validate: (values: any) => Promise<FormikErrors<any>> | undefined
  submit: (values: any, formikActions: any) => void
}

interface BadRequestResponse {
  [field: string]: string[]
}

function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return "" // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

export const badRequestResponseToFormikErrors = (data: BadRequestResponse) => {
  const errors = {}
  Object.keys(data).forEach((key) => {
    errors[camelize(key)] = data[key]
  })
  return errors
}

function postRequestInit(values: any, intent: "validate" | "execute") {
  return {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "x-action-intent": intent,
      "content-type": "application/json",
    },
    credentials: "same-origin" as "same-origin",
  }
}

export function useActions({
  entityName,
  actionName,
  apiVersion,
  onSuccessfulSubmit,
}: UseActionProps): UseActionsResponse {
  const fetch = React.useContext(FetchContext)
  const url = `/api/${entityName}/${actionName}?api-version=${apiVersion}`
  return {
    submit: async (values, actions) => {
      console.log("submitting..")
      actions.setSubmitting(true)
      const response = await fetch(url, postRequestInit(values, "execute"))

      console.log("submitting.. done", response)

      actions.setSubmitting(false)
      if (response.ok) {
        onSuccessfulSubmit && onSuccessfulSubmit(response)
      } else {
        message.error(response.statusText)
      }
    },
    validate: async (values: any) => {
      const response = await fetch(url, postRequestInit(values, "validate"))

      switch (response.status) {
        case 400: {
          const data: BadRequestResponse = await response.json()
          const errors = badRequestResponseToFormikErrors(data)
          if (Object.keys(errors).length) {
            throw errors
          }
        }
        case 204: {
          return {}
        }
        case 404: {
          console.error(`could not find endpoint '${url}'`)
        }
        default: {
          console.error(
            `Could not validate request (no handler for http status code '${response.status}'`,
            response,
          )
          return {}
        }
      }
    },
  }
}
