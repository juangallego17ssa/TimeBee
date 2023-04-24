import React, { useState } from 'react';
import CalendarComponent from '../Components/CalendarComp/Calendar';
import moment from 'moment'
import { useGetTrackedTimeFromToDateQuery } from "../api/API";

function Calendar() {
 
  const [selectedDate, setSelectedDate] = useState(new Date());
   
  const currentDate = moment(selectedDate)
  const start_date = currentDate.clone().subtract(1, 'month').startOf("month").format("YYYY-MM-DD");
  const end_date = currentDate.clone().add(1, 'month').endOf("month").format("YYYY-MM-DD");

  // console.log(
  //   "First date of the month:",
  //   startDate
  // );
  // console.log("Last date of the month:", endDate);

  // GET all tasks created by USER
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
  } = useGetTrackedTimeFromToDateQuery({ start_date, end_date });


  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    
  };

  return (
    <div className="h-[93vh] p-20">
      <CalendarComponent
        events={tasks}
        date={selectedDate}
        onDateChange={handleDateChange}
      />
    </div>
  );
}

export default Calendar;
