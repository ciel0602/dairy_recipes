"use client"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import classicThemePlugin from "@fullcalendar/react/themes/classic";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";
import styles from './Calendar.module.css';

export default function Calendar(){
  return (
    <div className={styles.container}>
    <FullCalendar
        plugins={[dayGridPlugin,interactionPlugin, classicThemePlugin]}
        initialView="dayGridMonth"
        locale="ja"
        dayHeaderFormat={{weekday:'short'}}
        headerToolbar={{left:"prev",center:"title",right:"next"}}
        dayCellDidMount={(args) => {
        // args.el はその日のセル（td要素など）そのもの
        const cellEl = args.el;

        // マウスが乗ったとき
        cellEl.addEventListener("mouseenter", () => {
          cellEl.style.backgroundColor = "#e0f2fe";
          cellEl.style.cursor = "pointer";
        });

        // マウスが離れたとき
        cellEl.addEventListener("mouseleave", () => {
          cellEl.style.backgroundColor = "";
        });
      }}
        dateClick={(info) => {
          console.log(info.dateStr);
        }}
    />
    </div>
  )
}