import * as React from "react"
import { Formik, FormikProps, FormikErrors } from "formik"
import { Spin, Alert, message } from "antd"
import { useActions } from "./useActions"

interface FormProps {
  entityName: string
  actionName: string
  initialValues: any
  loading?: boolean
  error?: string
  children: any
  onSuccessfulSubmit?: (response: Response) => void
  validateOnChange?: boolean
  apiVersion?: string
  validate?:
    | ((values: any) => void | object | Promise<FormikErrors<any>>)
    | undefined
  additionalInfo?: any
}

export const Form = ({
  initialValues,
  loading,
  error,
  children,
  entityName,
  actionName,
  onSuccessfulSubmit,
  validateOnChange,
  apiVersion = "1.0",
  validate: overrideValidate,
  additionalInfo
}: FormProps) => {
  const { submit, validate } = useActions(
    `/api/${entityName}/${actionName}?api-version=${apiVersion}`, additionalInfo
  )

  const $validate = overrideValidate ? overrideValidate : validate

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validate={$validate}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        await $validate(values)
        const response = await submit(values)
        actions.setSubmitting(false)
        if (response.ok) {
          onSuccessfulSubmit && onSuccessfulSubmit(response)
        } else {
          // message.error(response.statusText)
        }
      }}
      validateOnBlur={true}
      validateOnChange={
        validateOnChange !== undefined ? validateOnChange : true
      }
      render={(formikProps: FormikProps<any>) => (
        <Spin spinning={loading === true} delay={250}>
          {error ? (
            <div>
              <Alert
                message={error}
                showIcon={false}
                type="error"
                closable={true}
                banner={true}
                style={{ marginBottom: 10 }}
              />
              <div style={{ pointerEvents: "none", opacity: 0.6 }}>
                {children(formikProps)}
              </div>
            </div>
          ) : (
            children(formikProps)
          )}
        </Spin>
      )}
    />
  )
}