"use client"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import classicThemePlugin from "@fullcalendar/react/themes/classic";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";
import styles from './Calendar.module.css';
import { useState } from "react";
import CalendarModal from "./CalendarModal";


export default function Calendar(){
  const [dateStr, setDateStr] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <div className={styles.container}>
    <FullCalendar
        plugins={[dayGridPlugin,interactionPlugin,classicThemePlugin]}
        initialView="dayGridMonth"
        locale="ja"
        dayHeaderFormat={{weekday:'short'}}
        headerToolbar={{left:"prev",center:"title",right:"next"}}

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
    />
    </div>
    <CalendarModal modalOpen={modalOpen} dateStr={dateStr} setModalOpen={setModalOpen}/>
    </>
  )
}