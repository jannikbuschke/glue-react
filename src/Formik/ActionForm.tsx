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
  onSuccessfulSubmit?: (response: Response) => void;
  addHeaders?: () => Promise<HeadersInit>;
  validateOnChange?: boolean;
}

export const ActionForm = ({
  initialValues,
  loading,
  error,
  children,
  entityName,
  actionName,
  onSuccessfulSubmit,
  addHeaders,
  validateOnChange
}: IDetailViewProps) => (
  <Formik
    key={"" + loading}
    initialValues={initialValues}
    validate={async values => {
      const additionalHeaders = addHeaders ? await addHeaders() : undefined;
      await validate(
        `/api/${entityName}/${actionName}/validate?api-version=1.0`,
        values,
        additionalHeaders
      );
    }}
    onSubmit={async (values, actions) => {
      actions.setSubmitting(true);
      const response = await postJson(
        `/api/${entityName}/${actionName}/execute?api-version=1.0`,
        values,
        addHeaders
      );
      actions.setSubmitting(false);
      onSuccessfulSubmit && onSuccessfulSubmit(response);
    }}
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
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </Spin>
    )}
  />
);
