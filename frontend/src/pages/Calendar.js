import React, { useState } from 'react';
import CalendarComponent from '../Components/CalendarComp/Calendar';
import moment from 'moment'
import { useGetTrackedTimeByStartDateEndDateQuery } from '../api/API';

function Calendar() {
 
  const [selectedDate, setSelectedDate] = useState(new Date());
   
  const currentDate = moment(selectedDate)
  const startDate = currentDate.clone().subtract(1, 'month').startOf("month").format("YYYY-MM-DD");
  const endDate = currentDate.clone().add(1, 'month').endOf("month").format("YYYY-MM-DD");

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
  } = useGetTrackedTimeByStartDateEndDateQuery( {startDate, endDate});


  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    console.log("newDate", newDate)
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
