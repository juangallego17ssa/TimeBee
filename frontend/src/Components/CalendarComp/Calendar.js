import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./react-big-calendar_own.css";


const localizer = momentLocalizer(moment);


const CalendarComponent = ({ events, views, defaultView }) => {
  const [foregroundEvents, setForegroundEvents] = useState([])
  const [backgroundEvents, setBackgroundEvents] = useState([])

  const processEvents = (events) => {
    const foregroundEvents = []
    const backgroundEvents = []
    events.forEach((event) => {
      const copyEvent = {}
      copyEvent.start = new Date(event.start);
      // copyEvent.start.setHours(copyEvent.start.getHours() - 2)
      if (event.stop === null) {
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

  useEffect(() => {
    
    const [eventsFiltered, backgroundEventsFiltered] = processEvents(events) 
    setForegroundEvents(eventsFiltered)
    setBackgroundEvents(backgroundEventsFiltered)
    // console.log(eventsFiltered)
  }, [events])
  
  return (
    <div className="h-full">
      <Calendar
        localizer={localizer}
        events={foregroundEvents}
        backgroundEvents={backgroundEvents}
        views={views}
        defaultView={defaultView}
        showMultiDayTimes={true}
        dayLayoutAlgorithm={"no-overlap"}
        popup
      />
    </div>
  );
};

export default CalendarComponent;
