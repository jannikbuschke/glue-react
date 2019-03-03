import { Select } from "antd";
import { DatePicker } from "antd";
import * as React from "react";

import { Field, FieldProps, FormikProps } from "formik";
import { DataLoader } from "../Api";

import { debounce } from "lodash";

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
                onBlur={e => {
                  fieldProps.field.onBlur({
                    target: { name: this.props.name }
                  });
                }}
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
