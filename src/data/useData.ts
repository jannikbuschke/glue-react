import * as React from "react";
import produce from "immer"
import { useEffect, useState } from "react"
import { FetchContext } from "@jbuschke/react-fetch-context"

export const useData = (
    uri: string,
    placeholder?: any,
) => {
    const fetch = React.useContext(FetchContext);
    const [data, setData] = useState<any>(placeholder ? placeholder : null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [key, setKey] = useState(Math.random())

    useEffect(() => {
        setLoading(true)

        fetch(uri, { headers: { "content-type": "application/json" } })
            .then((r: any) => {
                if (r.ok) {
                    return r
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
