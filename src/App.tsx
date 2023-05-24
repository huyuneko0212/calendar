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
</span>
  <hr />
  {events.length*330*2}
    </>

    
  );
}

export default App;
