import * as React from "react"
import { useFormikContext } from "formik"
import { useDebounce } from "use-lodash-debounce"

export function SimpleAutoSave({ delayMs = 500 }: { delayMs?: number }) {
  const ctx = useFormikContext()
  const values = useDebounce(ctx.values, delayMs)

  const firstUpdate = React.useRef(true)

  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    ctx.submitForm()
  }, [values])

  return null
}
