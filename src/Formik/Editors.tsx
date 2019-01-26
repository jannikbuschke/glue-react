import { Select, Button, Radio, Switch } from "antd";
import { DatePicker, Input, InputNumber, Form } from "antd";
import * as React from "react";

import { Field, FieldProps, FormikProps, FieldArray } from "formik";
import { DataLoader } from "../Api";
import { TextAreaProps } from "antd/lib/input";
import { FormItemProps } from "antd/lib/form";

import { debounce } from "lodash";

export const DateEditor = (props: any) => (
  <Field {...props}>
    {(p: FieldProps) => (
      <DatePicker
        value={p.field.value}
        // tslint:disable-next-line:jsx-no-lambda
        onChange={date => {
          p.form.setFieldValue(props.name, date);
        }}
      />
    )}
  </Field>
);

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 5 }
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 12 }
//   }
// };

export const EnumStringEditor = (props: any) => (
  <Field {...props}>
    {({ field, form }: { field: any; form: FormikProps<any> }) => {
      return (
        <Radio.Group {...field}>
          {props.dataSource.map((item: any) => (
            <Radio key={item.value} value={item.value}>
              {item.displayName}
            </Radio>
          ))}
        </Radio.Group>
      );
    }}
  </Field>
);

export const StringEditor = (props: any) => (
  <Field {...props}>
    {({ field, form }: { field: any; form: FormikProps<any> }) => {
      const hasError = form.errors && form.errors[field.name.toLowerCase()];
      if (hasError) {
        return (
          <Form.Item
            label={props.label}
            validateStatus="error"
            hasFeedback={false}
            help={form.errors[field.name.toLowerCase()]}
          >
            <Input {...props} {...field} />
          </Form.Item>
        );
      }
      return <Input {...props} {...field} />;
    }}
  </Field>
);

export const BooleanEditor = (props: any) => (
  <Field {...props}>
    {({ field, form }: { field: any; form: FormikProps<any> }) => (
      <>
        <div>{JSON.stringify(field)}</div>
        <Switch
          checked={field.value}
          onChange={e => form.setFieldValue(props.name, e)}
        />
      </>
    )}
  </Field>
);

export const TextAreaEditor = (props: TextAreaProps & FormItemProps) => (
  <Field {...props}>
    {({ field, form }: { field: any; form: FormikProps<any> }) => {
      const hasError = form.errors && form.errors[field.name.toLowerCase()];

      if (hasError) {
        return (
          <Form.Item
            label={props.label}
            validateStatus="error"
            hasFeedback={false}
            help={form.errors[field.name.toLowerCase()]}
          >
            <Input.TextArea {...props} {...field} />
          </Form.Item>
        );
      }
      return <Input.TextArea {...props} {...field} />;
    }}
  </Field>
);

export const StringArrayEditor = (props: any) => (
  <Field>
    {({ form }: { form: FormikProps<any> }) => {
      const data = form.values[props.name];

      return (
        <FieldArray
          {...props}
          render={arrayHelpers => (
            <div
              style={{
                display: "grid",
                gridGap: 3,
                gridAutoRows: "auto"
              }}
            >
              {data && data.length > 0 ? (
                data.map((friend: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      display: "grid",
                      gridGap: 3,
                      gridTemplateColumns: "1fr 40px 40px"
                    }}
                  >
                    <StringEditor name={`${props.name}.${index}`} />
                    <Button
                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                    >
                      -
                    </Button>
                    <Button
                      htmlType="submit"
                      onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                    >
                      +
                    </Button>
                  </div>
                ))
              ) : (
                <Button htmlType="submit" onClick={() => arrayHelpers.push("")}>
                  {/* show this when user has removed all friends from the list */}
                  Add
                </Button>
              )}
              <Button
                htmlType="submit"
                onClick={() => arrayHelpers.push("")} // insert an empty string at a position
              >
                +
              </Button>
            </div>
          )}
        />
      );
    }}
  </Field>
);

interface IValidationErrorsProps {
  showOnlyIfTouched?: boolean;
}

export const ValidationErrors = ({
  showOnlyIfTouched = true
}: IValidationErrorsProps) => (
  <Field>
    {({ form }: { form: FormikProps<any> }) => {
      const errorKeys = Object.keys(form.errors);
      if (!errorKeys.length) {
        return null;
      }
      return (
        <div style={{ color: "red" }}>
          <ul>
            {errorKeys.map(
              key =>
                (form.touched[key] || !showOnlyIfTouched) && (
                  <li key={key}>{form.errors[key]}</li>
                )
            )}
          </ul>
        </div>
      );
    }}
  </Field>
);

export const NumberEditor = (props: any) => (
  <Field {...props}>
    {(p: FieldProps) => {
      return (
        <InputNumber
          {...props}
          {...p.field}
          onChange={
            // tslint:disable-next-line:jsx-no-lambda
            value => p.form.setFieldValue(props.name, value)
          }
        />
      );
    }}
  </Field>
);

export const Text = (props: any) => (
  <Field {...props}>
    {(p: FieldProps) => {
      return (
        <>
          <label>{props.label ? props.label : " "}:</label>
          <span>{p.field.value ? p.field.value.toString() : " "}</span>
        </>
      );
    }}
  </Field>
);

interface IProps {
  name: string;
  url: string;
  placeholder?: string;
}

interface State {
  search: string;
}

export class ReferenceEditor extends React.Component<IProps, State> {
  public state: State = { search: "" };

  handleSearch = (search: string) => {
    this.setState({ search });
  };
  debouncedSearch = debounce(this.handleSearch, 500);
  public render() {
    return (
      <Field name={this.props.name}>
        {(fieldProps: FieldProps<any>) => (
          <DataLoader url={`${this.props.url}&search=${this.state.search}`}>
            {({ data }: any) => (
              <Select
                showSearch={true}
                style={{ width: "100%" }}
                value={
                  fieldProps.field.value === null
                    ? undefined
                    : fieldProps.field.value
                }
                onSearch={this.debouncedSearch}
                allowClear={true}
                placeholder={this.props.placeholder}
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                // tslint:disable-next-line:jsx-no-lambda
                onChange={(value: any) => {
                  fieldProps.form.setFieldValue(this.props.name, value);
                }}
                notFoundContent={null}
              >
                {data && data.value
                  ? data.value.map((i: any) => {
                      return (
                        <Select.Option key={i.id}>
                          {i.name || i.displayName || i.title}
                        </Select.Option>
                      );
                    })
                  : null}
              </Select>
            )}
          </DataLoader>
        )}
      </Field>
    );
  }
}
