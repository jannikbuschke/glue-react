import * as React from "react"
import { useField } from "formik"

export function HtmlText({ name }: { name: string }) {
  const [field] = useField(name)
  if (field.value !== undefined && field.value !== null) {
    return field.value.toString()
  }
  return null
}
