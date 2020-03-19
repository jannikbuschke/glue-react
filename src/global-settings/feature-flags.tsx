import * as React from "react"
import { useGlobalSettings } from "./index"

export function useFeatureFlags() {
  const ctx = useGlobalSettings()

  function isEnabled(feature: string) {
    return ctx[feature] == "true"
  }

  return isEnabled
}

interface Props {
  feature: string
}

export const IfFeature: React.FC<Props> = ({ feature, children }) => {
  const isEnabled = useFeatureFlags()

  if (isEnabled(feature)) {
    return children as React.ReactElement<any>
  }
  return null
}
