import * as React from "react";
import { Formik, FormikProps } from "formik";
import { Spin, Alert } from "antd";
import { validate } from "./validation";
import { postJson } from "./Actions";

interface IDetailViewProps {
  entityName: string;
  actionName: string;
  initialValues: any;
  loading?: boolean;
  error?: string;
  children: any;
  onSuccessfulSubmit?: () => void;
}

export const ActionForm = ({
  initialValues,
  loading,
  error,
  children,
  entityName,
  actionName,
  onSuccessfulSubmit
}: IDetailViewProps) => (
  <Formik
    initialValues={initialValues}
    validate={async values => {
      await validate(`api/${entityName}/${actionName}/validate`, values);
    }}
    onSubmit={async (values, actions) => {
      actions.setSubmitting(true);
      await postJson(`api/${entityName}/${actionName}/execute`, values);
      actions.setSubmitting(false);
      onSuccessfulSubmit && onSuccessfulSubmit();
    }}
    validateOnBlur={true}
    validateOnChange={false}
    render={(formProps: FormikProps<any>) => (
      <Spin spinning={loading === true} delay={250}>
        {error ? (
          <Alert message="Error" description={error} type="error" closable />
        ) : (
          children
        )}
      </Spin>
    )}
  />
);
