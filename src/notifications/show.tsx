import * as React from "react"
import{notification}from"antd"

export function showInfo(message:string){
    notification.info({message})
}

export function showError(message:string){
    notification.error({message})
}