import { Field, FormikProps } from "formik";
import * as React from "react";
import { ButtonProps } from "antd/lib/button";
import { FetchContext } from '@jbuschke/react-fetch-context';
import { Button, Spin, message } from 'antd';

type Props = {
  payload: any;
  path: string;
  onSuccess?: (value?: any) => void;
  onError?: (e: any) => void;
  scopes?: string[];
};

export const ActionButton = ({
  path,
  payload,
  onSuccess,
  onError,
  scopes, 
  ...props }: ButtonProps & Props) => {
  const [loading, setLoading] = React.useState(false);
  const fetch = React.useContext(FetchContext);

  return (
    <Spin delay={750} spinning={loading}>
      <Field>
        {({ form }: { field: any; form: FormikProps<any> }) => (
          <Button
            onClick={async () => {
              setLoading(true)

              try {
                const response = await fetch(path, {
                  method: "POST",
                  body: JSON.stringify(payload),
                  headers: { "content-type": "application/json" },
                  credentials: "same-origin",
                })

                if (onSuccess && response.ok) {
                  if (response.status === 201) {
                    const value = await response.json()
                    onSuccess(value)
                  }
                }
              } catch (E) {
                message.error(E.toString())
              } finally {
                setLoading(false)
              }
            }}
            {...props}
          />
        )}
      </Field>
    </Spin>
  )
}
