import { Button, message, Spin } from "antd";
import { Field, FormikProps } from "formik";
import * as React from "react";
import { ButtonProps } from "antd/lib/button";

type Props = {
  payload: any;
  path: string;
  onSuccess?: (value?: any) => void;
  onError?: (e: any) => void;
};

export const EntityActionButton = ({
  path,
  payload,
  onSuccess,
  onError,
  ...props
}: ButtonProps & Props) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <Spin delay={750} spinning={loading}>
      <Field>
        {({ form }: { field: any; form: FormikProps<any> }) => (
          <Button
            onClick={async (e: any) => {
              setLoading(true);
              try {
                const response = await fetch(path, {
                  method: "POST",
                  body: JSON.stringify(payload),
                  headers: { "content-type": "application/json" }
                });
                if (onSuccess && response.ok) {
                  if (response.status === 201) {
                    const value = await response.json();
                    onSuccess(value);
                  } else {
                    onSuccess();
                  }
                }
              } catch (E) {
                if (onError) {
                  onError(E.toString());
                } else {
                  message.error(E.toString());
                }
              } finally {
                setLoading(false);
              }
            }}
            // loading={form.isSubmitting || loading}
            disabled={form.dirty || loading}
            {...props}
          />
        )}
      </Field>
    </Spin>
  );
};
