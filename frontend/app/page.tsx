"use client"
import useSWR from 'swr'
import { fetcher } from '@/app/api/index'
import AuthSegmentedControl from './features/login/page'


export default function HomePage() {
  const url = 'http://localhost:3000/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>


  return (
    <>
      <div>Rails疎通確認</div>
      <div>レスポンスメッセージ: {data.message}</div>
        <AuthSegmentedControl/>
    </>
  )
}
