import * as React from "react"
import { Formik, FormikProps } from "formik"
import { Spin, Alert, message } from "antd"
import produce from "immer";
import { useActions } from './useActions';

interface ActionFormProps {
    entityName: string
    actionName: string
    initialValues: any
    loading?: boolean
    error?: string
    children: any
    onSuccessfulSubmit?: (response: Response) => void
    validateOnChange?: boolean
    apiVersion?: string
}

export function ActionForm({
    initialValues,
    loading,
    error,
    children,
    entityName,
    actionName,
    onSuccessfulSubmit,
    validateOnChange,
    apiVersion = "1.0",
}: ActionFormProps) {

    const { validate, submit } = useActions({ entityName, actionName, apiVersion, onSuccessfulSubmit })
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validate={validate}
            onSubmit={submit}
            validateOnBlur={true}
            validateOnChange={validateOnChange !== undefined ? validateOnChange : true}
            render={(formProps: FormikProps<any>) => (
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
                                {children(formProps)}
                            </div>
                        </div>
                    ) : (
                            children(formProps)
                        )}
                </Spin>
            )}
        />
    )
}