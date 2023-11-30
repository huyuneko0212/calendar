import React, { useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./utils";

import "./App.css";
import { log } from "console";

function App() {
  const todayStr = new Date().toISOString().replace(/T.*$/, ""); // 今日の日付をYYYY-MM-DD形式にする
  
  const INITIAL_EVENTS: any = [
    {
      id: 1,
      title: "出社",
      start: todayStr,
    },
  ];

  const [currentEvents, setCurrentEvents] = useState<any[]>([]);
  const handleEvents = useCallback((events: any[]) => {
    console.log("events:", events); // 確認用
    setCurrentEvents(events);
  }, []);

  const handleDateSelect = useCallback((selectInfo: any) => {
    let title = "出社";
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
    
  }, []);
  const handleEventClick = useCallback((clickInfo: any) => {
    clickInfo.event.remove();
  }, []);

  // 片道料金
  const one_way = 330;

  let attendance_days = currentEvents.length;
  const commute_expenses = attendance_days * one_way * 2;


  return (
    <div style={{display:"flex"}}>
      <div style={{height:"50%",width:"50%"}}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialEvents={INITIAL_EVENTS}
          locales={allLocales}
          locale="ja"
          eventsSet={handleEvents}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
      <div style={{marginTop:70,marginLeft:50 ,width:"50%"}}>
          <span>出勤日：</span>
          {currentEvents.map((event, index) => {
            const date = new Date(event.start);
            console.log(date.getDate());

            return <span key={index}>{date.getDate()},</span>;
          })}
          <hr />
          <span>出社回数：：</span>
          {currentEvents.length}
          <hr />
          <span>通勤費：</span>
          {commute_expenses}
        </div>
    </div>
  );
}

export default App;
