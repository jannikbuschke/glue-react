import { Button, message, Spin } from "antd"
import { Field, FormikProps } from "formik"
import * as React from "react"
import { ButtonProps } from "antd/lib/button"
import { AuthenticationContext } from "../authentication/authenticationContext"

type Props = {
  payload: any
  path: string
  onSuccess?: (value?: any) => void
  onError?: (e: any) => void
  scopes?: string[]
}

export const EntityActionButton = ({
  path,
  payload,
  onSuccess,
  onError,
  scopes,
  ...props
}: ButtonProps & Props) => {
  const [loading, setLoading] = React.useState(false)
  const { getToken } = React.useContext(AuthenticationContext)

  return (
    <Spin delay={750} spinning={loading}>
      <Field>
        {({ form }: { field: any; form: FormikProps<any> }) => (
          <Button
            onClick={async (e: any) => {
              setLoading(true)

              try {
                const token = Array.isArray(scopes) ? await getToken() : null

                const response = await fetch(path, {
                  method: "POST",
                  body: JSON.stringify(payload),
                  headers: {
                    "content-type": "application/json",
                    ...(token
                      ? { Authorization: "Bearer " + token }
                      : undefined),
                  },
                })

                if (onSuccess && response.ok) {
                  if (response.status === 201) {
                    const value = await response.json()
                    onSuccess(value)
                  } else {
                    onSuccess()
                  }
                }
              } catch (E) {
                if (onError) {
                  onError(E.toString())
                } else {
                  message.error(E.toString())
                }
              } finally {
                setLoading(false)
              }
            }}
            // loading={form.isSubmitting || loading}
            disabled={form.dirty || loading}
            {...props}
          />
        )}
      </Field>
    </Spin>
  )
}
