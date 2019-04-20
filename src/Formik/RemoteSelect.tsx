import * as React from "react";
import { Select as $Select } from "@jbuschke/formik-antd";
import { FormikFieldProps } from "@jbuschke/formik-antd/lib/FieldProps";
import { Select, Alert, Spin } from "antd";
import { useRemoteJson } from "@jbuschke/dx-odata-grid";
import { debounce } from "lodash";
import { SelectProps } from "antd/lib/select";

export const RemoteSelect = ({
  name,
  validate,
  url,
  addHeaders,
  ...restProps
}: FormikFieldProps &
  SelectProps<any> & {
    url: string;
    addHeaders?: () => Promise<HeadersInit>;
  }) => {
  const [search, setSearch] = React.useState("");
  const { loading, error, data } = useRemoteJson(
    `${url}&search=${search}`,
    {},
    addHeaders
  );

  const debouncedSearch = debounce(setSearch, 500);

  if (error) {
    console.log("error!!!!!");
    return (
      <Alert type="error" showIcon={false} banner={true} message={error} />
    );
  }

  return (
    <Spin spinning={loading} delay={250}>
      <$Select
        name={name}
        showSearch={true}
        style={{ width: "100%" }}
        onSearch={debouncedSearch}
        allowClear={true}
        showArrow={true}
        filterOption={false}
        notFoundContent={null}
        {...restProps}
      >
        {Array.isArray(data)
          ? data.map((i: any) => (
              <Select.Option key={i.id}>
                {i.name || i.displayName || i.title}
              </Select.Option>
            ))
          : null}
      </$Select>
    </Spin>
  );
};
