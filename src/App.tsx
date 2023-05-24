import React,{useCallback,useState,useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin,{DateClickArg} from "@fullcalendar/interaction";
import './App.css';
import { start } from 'repl';
import { log } from 'console';
type Event = {
  start: string;
  // end: string;
  display: string;
  color: string;
}
function App() {
    const handleDateClick = useCallback((arg: DateClickArg) => {
    alert(arg.date);
  }, []);
  const [events,setEvents] = useState<Event[]>([]);
  const one_way=330;
  let attendance_days=events.length;
  const commute_expenses=attendance_days*one_way*2;
  
  return (
    <>
    <FullCalendar
    plugins={[dayGridPlugin,interactionPlugin]}
    initialView='dayGridMonth'
    locale="ja"
    editable={false}
    events={events}
    selectable={true}
    select={function(arg) {
      let list =[...events,{
        start: arg.startStr,
        // end: arg.endStr,
        display: 'background',
        color: 'red'
      }]
      list.sort((a,b) => {
        if(a.start < b.start) return -1;
        if(a.start > b.start) return 1;
        return 0;
      })
      setEvents(list)
      
      
    }
  }
  
  />
  <span>
  出勤日：
  </span>
  {events.map((event,index) => {
    const date = new Date(event.start)
    console.log(date.getDate());
    
    return (
      <span key={index}>
        {date.getDate()},
      </span>
    )
  })
}
  <hr />
  <span>通勤費：</span>
  {commute_expenses}
    </>

    
  );
}

export default App;
