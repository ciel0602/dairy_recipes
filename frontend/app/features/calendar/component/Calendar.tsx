"use client"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import classicThemePlugin from "@fullcalendar/react/themes/classic";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";
import styles from "@/app/styles/Calendar.module.css";
import { useState } from "react";
import CalendarModal from "./CalendarModal";
import useMealPlans from "@/app/hooks/useMealPlans";

export default function Calendar(){
  const [dateStr, setDateStr] = useState("");
  
  const [modalOpen, setModalOpen] = useState(false);
  const { mealPlans } = useMealPlans();

  const events = mealPlans.map((mealPlan) => ({
    id: String(mealPlan.id),
    title:mealPlan.recipe.title,
    start:mealPlan.plannedDate
  }))

  return (
    <>
    <div className={styles.container}>
    <FullCalendar
        timeZone="Asia/Tokyo"
        plugins={[dayGridPlugin,interactionPlugin,classicThemePlugin]}
        initialView="dayGridMonth"
        locale="ja"
        dayHeaderFormat={{weekday:'short'}}
        headerToolbar={{left:"prev",center:"title",right:"next"}}
        defaultAllDay={true}
        events={events}
        eventColor="#E85D04"
        dayMaxEvents={2}
        moreLinkContent={(args) => `他${args.num}件`}

        // 何日の「日」の非表示にする
        dayCellTopContent={(arg) => ({
          html: String(arg.date.getDate()),
        })}
        // calendar.module.css用のクラスを命名
        dayCellClass="calendar-cell"
        buttonClass="calendar-button"
        dayCellTopClass="date-text"

        dateClick={(info) => {
          setDateStr(info.dateStr);
          setModalOpen(true);
          
        }}
        eventClick={(info) => {
          const mealPlan = mealPlans.find((item) => String(item.id) === info.event.id );
          if (!mealPlan) return;
          setDateStr(mealPlan.plannedDate);
          setModalOpen(true);
        }}
    />
    </div>
    <CalendarModal mealPlans={mealPlans} modalOpen={modalOpen} dateStr={dateStr} setModalOpen={setModalOpen}/>
    </>
  )
}