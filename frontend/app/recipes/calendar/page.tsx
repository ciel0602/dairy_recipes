'use client'
import dynamic from "next/dynamic";

// 「今日」の認識の齟齬によるハイドレーションエラーへの対策
const CalendarClient = dynamic(
  () => import("@/app/features/calendar/component/Calendar"),
  { ssr: false }
);

export default function CalendarPage(){

  return (
      <CalendarClient />
    
  )
}