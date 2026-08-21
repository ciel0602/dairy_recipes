'use client'
import { fetcher } from "@/app/api"
import  useSWR from "swr"

export default function HealthCheck(){
    const url = 'http://localhost:3000/api/v1/health_check'
    const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>
  return(
    <>          
      <div>Rails疎通確認</div>
      <div>レスポンスメッセージ: {data.message}</div>
    </>

  )
}