import * as React from "react"
import { useEffect, useState } from "react"
import { FetchContext } from "@jbuschke/react-fetch-context"

export function useData<T>(
  uri: string,
  placeholder?: T,
  additionalFetchInfo?: any,
) {
  const fetch = React.useContext(FetchContext)
  const [data, setData] = useState<T | null>(placeholder ? placeholder : null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [key, setKey] = useState(Math.random())

  useEffect(() => {
    setLoading(true)

    fetch(
      uri,
      { headers: { "content-type": "application/json" } },
      additionalFetchInfo,
    )
      .then((r: any) => {
        if (r.ok) {
          const contentType = r.headers ? r.headers.get("content-type") : ""
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return r
          }
          throw new Error(
            `expected application/json response but got '${contentType}'`,
          )
        } else {
          console.error("http error", r)
          throw Error(r.statusText)
        }
      })
      .then((response: any) => response.json())
      .then((data: any) => {
        setData(data)
        setLoading(false)
      })
      .catch((e: any) => {
        setError(e.toString())
        setLoading(false)
      })
  }, [uri, key])

  return { data, loading, error, reload: () => setKey(Math.random()) }
}
