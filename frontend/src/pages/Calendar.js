import React, { useEffect } from 'react';
import CalendarComponent from '../Components/CalendarComp/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackedTimeOwn } from '../redux/Slices/trackedTimeOwnSlice';

function Calendar() {
  const reduxTrackedTime = useSelector(
    (store) => store.trackedtime.trackedtime
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrackedTimeOwn());
  }, []);

  

  return (
    <div className="h-[93vh] p-20">
      <CalendarComponent events={reduxTrackedTime} />
    </div>
  );
}

export default Calendar;
