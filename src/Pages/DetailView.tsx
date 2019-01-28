import * as React from "react";
import { PageContentContainer, PageActionContainer } from "../Formik/Layout";
import { Formik, FormikProps } from "formik";
import { Spin, Alert } from "antd";
import { Page } from "./Page";

interface IDetailViewProps {
  title?: string;
  initialValues: any;
  onSubmit: any;
  validate?: any;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  renderActions: (props: FormikProps<any>) => any;
  renderContent: (props: FormikProps<any>) => any;
  loading?: boolean;
  error?: string;
}

export const DetailView = ({
  title,
  initialValues,
  onSubmit,
  validate,
  validateOnChange,
  validateOnBlur,
  renderActions,
  renderContent,
  loading,
  error
}: IDetailViewProps) => (
  <Page title={title}>
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
      render={(formProps: FormikProps<any>) => (
        <Spin spinning={loading === true} delay={250}>
          {error ? (
            <Alert
              message="Error Text"
              description="Error Description Error Description Error Description Error Description Error Description Error Description"
              type="error"
              closable
            />
          ) : (
            <PageContentContainer>
              <PageActionContainer>
                {renderActions(formProps)}
              </PageActionContainer>
              {renderContent(formProps)}
            </PageContentContainer>
          )}
        </Spin>
      )}
    />
  </Page>
);
