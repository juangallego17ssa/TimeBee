import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./react-big-calendar_own.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, BackgroundEvent, views, defaultView }) => {
  return (
    <div className="">
      <Calendar
        localizer={localizer}
        events={events}
        backgroundEvents={BackgroundEvent}
        views={views}
        defaultView={defaultView}
      />
    </div>
  );
};

export default CalendarComponent;
