import React, { useEffect, useState } from 'react';
import CalendarComponent from '../Components/CalendarComp/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackedTimeOwn } from '../redux/Slices/trackedTimeOwnSlice';
import moment from 'moment'
import { useGetTrackedTimeByDateQuery } from '../api/API';

function Calendar() {
  const reduxTrackedTime = useSelector(
    (store) => store.trackedtime.trackedtime
  );
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchTrackedTimeOwn());
  }, []);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // GET all tasks created by USER
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
  } = useGetTrackedTimeByDateQuery(moment(selectedDate).format("YYYY-MM-DD"));

  // console.log(tasks)

  return (
    <div className="h-[93vh] p-20">
      <CalendarComponent
        events={reduxTrackedTime}
        date={selectedDate}
        onDateChange={handleDateChange}
      />
    </div>
  );
}

export default Calendar;
