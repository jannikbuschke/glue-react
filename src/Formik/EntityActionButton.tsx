import { Button, message } from "antd";
import { Field, FormikProps } from "formik";
import * as React from "react";
import { ButtonProps } from "antd/lib/button";

type Props = {
  payload: any;
  path: string;
};

export const EntityActionButton = (props: ButtonProps & Props) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <Field>
      {({ form }: { field: any; form: FormikProps<any> }) => (
        <Button
          onClick={async (e: any) => {
            setLoading(true);
            try {
              await fetch(props.path, {
                method: "POST",
                body: JSON.stringify(props.payload),
                headers: { "content-type": "application/json" }
              });
            } catch (E) {
              message.error(E.toString());
            } finally {
              setLoading(false);
            }
          }}
          loading={form.isSubmitting || loading}
          disabled={form.dirty}
          {...props}
        />
      )}
    </Field>
  );
};
