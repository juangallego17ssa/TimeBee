import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "../ReportComp/Calendar_styles.css";

function ReportCalendar() {

  const [value, onChange] = useState(new Date());

  console.log(value)

  return (
    <div>
      <Calendar onChange={onChange} value={value} showWeekNumbers={true} 
          selectRange={true} 
          defaultValue={value} />
    </div>
  );
}

export default ReportCalendar;