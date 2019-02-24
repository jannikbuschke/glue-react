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
}

export const ActionForm = ({
  initialValues,
  loading,
  error,
  children,
  entityName,
  actionName
}: IDetailViewProps) => (
  <Formik
    initialValues={initialValues}
    validate={async values => {
      console.log("validate", values);
      await validate(`api/${entityName}/${actionName}/validate`, values);
    }}
    onSubmit={values =>
      postJson(`api/${entityName}/${actionName}/execute`, values)
    }
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
