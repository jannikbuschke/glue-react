import { Select, Alert, Spin } from "antd"
import * as React from "react"

import { Field, FieldProps } from "formik"

import { debounce } from "lodash"
import { SelectProps } from "antd/lib/select"
import { useData } from '../data/useData';

type Props = {
  name: string
  url: string
  addHeaders?: () => Promise<HeadersInit>
} & SelectProps<any>

export const RemoteSelectField = (props: Props) => {
  const { name, url } = props
  const [search, setSearch] = React.useState("")
  const { loading, error, data } = useData(
    `${url}&search=${search}`,
    {}
  )

  const debouncedSearch = debounce(setSearch, 500)

  if (error) {
    return <Alert type="error" showIcon={false} banner={true} message={error} />
  }

  return (
    <Spin spinning={loading} delay={250}>
      <Field name={name}>
        {(fieldProps: FieldProps<any>) => (
          <Select
            style={{ width: "100%" }}
            showSearch={true}
            allowClear={true}
            placeholder={props.placeholder}
            defaultActiveFirstOption={false}
            showArrow={true}
            notFoundContent={null}
            {...props}
            value={
              fieldProps.field.value === null
                ? undefined
                : fieldProps.field.value
            }
            onSearch={debouncedSearch}
            filterOption={false}
            onBlur={(e) => {
              fieldProps.field.onBlur({
                target: { name },
              })
            }}
            onChange={(value: any) => {
              fieldProps.form.setFieldValue(name, value)
            }}
          >
            {data && data.value
              ? data.value.map((i: any) => {
                return (
                  <Select.Option key={i.id}>
                    {i.name || i.displayName || i.title}
                  </Select.Option>
                )
              })
              : null}
          </Select>
        )}
      </Field>
    </Spin>
  )
}
