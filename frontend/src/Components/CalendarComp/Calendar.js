import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./react-big-calendar_own.css";


const localizer = momentLocalizer(moment);


const CalendarComponent = ({ events, views, defaultView, selectedDate, onDateChange }) => {
  const [foregroundEvents, setForegroundEvents] = useState([])
  const [backgroundEvents, setBackgroundEvents] = useState([])
  // console.log(events)

  const processEvents = (events) => {
    const foregroundEvents = []
    const backgroundEvents = []
    events?.forEach((event) => {
      const copyEvent = {}
      copyEvent.start = new Date(event.start);
      // copyEvent.start.setHours(copyEvent.start.getHours() - 2)
      if (event.stop === null && event.type_of_input === "0") {
        copyEvent.end = new Date();
      } else {
        copyEvent.end = new Date(event.stop);
        // copyEvent.end.setHours(copyEvent.end.getHours() - 2);
      }
      copyEvent.title = event.task_name;
      if (event.type_of_input === "0") {
        
        backgroundEvents.push(copyEvent);
      } else {
        
        foregroundEvents.push(copyEvent);
      }
    })
    return [foregroundEvents, backgroundEvents]
  }

  


  const handelDateChange = (newDate) => {
    onDateChange(newDate)
  }

  useEffect(() => {
    
    const [eventsFiltered, backgroundEventsFiltered] = processEvents(events) 
    setForegroundEvents(eventsFiltered)
    setBackgroundEvents(backgroundEventsFiltered)
    // console.log(eventsFiltered)
  }, [events, selectedDate])
  
  return (
    <div className="h-full shadow-xl">
      <Calendar
        localizer={localizer}
        events={foregroundEvents}
        backgroundEvents={backgroundEvents}
        views={views}
        defaultView={defaultView}
        showMultiDayTimes={true}
        // dayLayoutAlgorithm={"no-overlap"}
        step={60}
        popup
        date={selectedDate}
        onNavigate={handelDateChange}
        
      />
    </div>
  );
};

export default CalendarComponent;
