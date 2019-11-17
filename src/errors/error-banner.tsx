import * as React from 'react'
import { Alert } from 'antd'


export function ErrorBanner({error}:{error:string|null|undefined}){
      return error?<Alert type="error" banner={true} message={error}/>:null
}