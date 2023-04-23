import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackedTimeOwn } from '../redux/Slices/trackedTimeOwnSlice';
import moment from "moment";
import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const Test = () => {
  // // --- This is the to get the Data from Redux Store where all tracked Times for current user are stored ---
  const reduxTrackedTime = useSelector(
    (store) => store.trackedtime.trackedtime
  );
  const dispatch = useDispatch();

  console.log(reduxTrackedTime);

  // // --- This is needed to fetch the "all tracked Times for current user and store it in redux"
  useEffect(() => {
    dispatch(fetchTrackedTimeOwn());
  }, []);

  // //--- This is the caluclation of Duration of all todays tracked Times and sum it in Minutes or Hours ---
  // const today = new Date().toISOString().slice(0, 10); //!!!!!!!!! TAKE CARE NOT HAVING TWO const today !!!!!!!! get today's date in yyyy-mm-dd format

  // // // filter the trackedTimes based on today's date
  // const todayTrackedTimes = reduxTrackedTime.filter(
  //   (time) => time.start.substr(0, 10) === today
  // );

  // let sumOfTrackedMinutesToday = 0;
  // // // calculate the duration for each tracked time
  // todayTrackedTimes.forEach((time) => {
  //   if (time.stop != null) {
  //     const startTime = new Date(time.start);
  //     const stopTime = new Date(time.stop);
  //     const duration = (stopTime - startTime) / 1000 / 60; // duration in minutes
  //     sumOfTrackedMinutesToday += duration;
  //     console.log(`Duration for ${time.id}: ${duration} minutes`);
  //   } else {
  //     console.log("not finished now");
  //   }
  // });

  // const sumOfTrackedMinutesTodayInHours = (
  //   sumOfTrackedMinutesToday / 60
  // ).toFixed(2);
  // console.log(`${sumOfTrackedMinutesTodayInHours} in Hours`); // 11.98 in Hours
  // console.log(`${sumOfTrackedMinutesToday.toFixed(2)} in Minutes`); // 718.81 in Minutes;

  //  //------------------------------------------------------------------------------------------

  // //--- This is how to get the days of the Week/LastWeek/Month/lastMonth/Year/LastYear ---------------------

  // const today = new Date(); // !!!!!!!!! TAKE CARE NOT HAVING TWO const today !!!!!!!!
  // const currentDay = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  // const startOfWeek = new Date(today); // Create a new Date object based on the current date
  // startOfWeek.setDate(
  //   today.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
  // ); // Set the date to the first day of the week (Sunday or Monday)
  // const endOfWeek = new Date(today); // Create another new Date object based on the current date
  // endOfWeek.setDate(startOfWeek.getDate() + 6); // Set the date to the last day of the week (Friday + 4)(Sunday + 6)

  // const lastWeekStart = new Date(
  //   today.getFullYear(),
  //   today.getMonth(),
  //   today.getDate() - 7
  // );
  // const lastWeekEnd = new Date(
  //   today.getFullYear(),
  //   today.getMonth(),
  //   today.getDate() - 1
  // );
  // const actualMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  // const actualMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  // const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  // const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  // const startOfLastWeek = new Date(today); // Create a new Date object based on the current date
  // startOfLastWeek.setDate(today.getDate() - currentDay - 6); // Set the date to the first day of the previous week (Sunday)

  // const startOfThisYear = new Date(today.getFullYear(), 0, 1); // Set the date to the first day of the current year (January 1)
  // const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1); // Set the date to the first day of the previous year (January 1)

  // console.log(`startOfWeek ${startOfWeek}`); // output: Mon Apr 17 2023 22:11:06 GMT+0200 (Central European Summer Time)
  // console.log(`endOfWeek ${endOfWeek}`); // output: Sun Apr 23 2023 22:25:38 GMT+0200 (Central European Summer Time)
  // console.log(`startOfLastWeek ${startOfLastWeek}`); // output: Mon Apr 10 2023 22:26:03 GMT+0200 (Central European Summer Time)
  // console.log(`startOfThisYear ${startOfThisYear}`); // output: Sun Jan 01 2023 00:00:00 GMT+0100 (Central European Standard Time)
  // console.log(`startOfLastYear ${startOfLastYear}`); // output: Sat Jan 01 2022 00:00:00 GMT+0100 (Central European Standard Time)

  // console.log(`lastWeekStart ${lastWeekStart}`); // output: Thu Apr 13 2023 00:00:00 GMT+0200 (Central European Summer Time) !!! This is form Today backwards as you see it was Thursday 20.04.2023
  // console.log(`lastWeekEnd ${lastWeekEnd}`); // output: Wed Apr 19 2023 00:00:00 GMT+0200 (Central European Summer Time) !!! This is form Today backwards as you see it was Thursday 20.04.2023
  // console.log(`actualMonthStart ${actualMonthStart}`); // output: Sat Apr 01 2023 00:00:00 GMT+0200 (Central European Summer Time)
  // console.log(`actualMonthEnd ${actualMonthEnd}`); // output: Sun Apr 30 2023 00:00:00 GMT+0200 (Central European Summer Time)
  // console.log(`lastMonthStart ${lastMonthStart}`); // output: Wed Mar 01 2023 00:00:00 GMT+0100 (Central European Standard Time)
  // console.log(`lastMonthEnd ${lastMonthEnd}`); // output: Fri Mar 31 2023 00:00:00 GMT+0200 (Central European Summer Time)

  // ------------------------------------------------------------------------------------------------------


  // --- Sum all the Tracked times for on Project this is done with "moment" ------------------------------
  // const data = reduxTrackedTime;

  // const durations = data
  //   .filter((item) => item.stop !== null)
  //   .reduce((acc, item) => {
  //     const project = item.project.name;
  //     const duration = moment.duration(
  //       moment(item.stop).diff(moment(item.start))
  //     );
  //     acc[project] = acc[project] ? acc[project].add(duration) : duration;
  //     console.log(acc);
  //     return acc;
  //   }, {});

  // EXAMLE OUTPUT
  // Worktime: 6 days, 18 hours, 1 minutes
  // TimeBee: 0 days, 4 hours, 1 minutes
  // Administration: 22 days, 11 hours, 12 minutes






  // ---------------- Test Date Picker---------------->
  // const [date, setDate] = useState(new Date());
  // const [view, setView] = useState("month");
  //  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  // const handleDateChange = (newDate) => {
  //   setDateRange(newDate);

  // };

  // const handleViewChange = (event) => {
  //   setView(event.target.value);
  // };
  
  
  /// needed for part one and is working
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  

  const handleDateChange = (date) => {
    setDateRange(date);
  };
/// -------------------------------------
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [view, setView] = useState("day");

  const handleViewChange = (newView) => {
    setView(newView);
    switch (newView) {
      case "day":
        setStartDate(new Date(startDate));
        setEndDate(new Date(startDate));
        break;
      case "week":
        setStartDate(getWeekStartDate());
        setEndDate(getWeekEndDate());
        break;
      case "month":
        setStartDate(getMonthStartDate());
        setEndDate(getMonthEndDate());
        break;
      case "year":
        setStartDate(getYearStartDate());
        setEndDate(getYearEndDate());
        break;
      default:
        setStartDate(new Date());
        setEndDate(new Date());
        break;
    }
  };

  const getWeekStartDate = () => {
    const now = new Date(startDate);
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const getWeekEndDate = () => {
    const now = new Date(startDate);
    const dayOfWeek = now.getDay();
    const diff = now.getDate() + (7 - dayOfWeek);
    const sunday = new Date(now.setDate(diff));
    sunday.setHours(23, 59, 59, 999);
    return sunday;
  };

  const getMonthStartDate = () => {
    const now = new Date(startDate);
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    firstDay.setHours(0, 0, 0, 0);
    return firstDay;
  };

  const getMonthEndDate = () => {
    const now = new Date(startDate);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);
    return lastDay;
  };

  const getYearStartDate = () => {
    const now = new Date(startDate);
    const firstDay = new Date(now.getFullYear(), 0, 1);
    firstDay.setHours(0, 0, 0, 0);
    return firstDay;
  };

  const getYearEndDate = () => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), 11, 31);
    lastDay.setHours(23, 59, 59, 999);
    return lastDay;
  };

  const handleNextClick = () => {
  switch(view) {
    case 'day':
      setStartDate(new Date(startDate.getTime() + 24 * 60 * 60 * 1000));
      setEndDate(new Date(endDate.getTime() + 24 * 60 * 60 * 1000));
      break;
    case 'week':
      setStartDate(new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000));
      setEndDate(new Date(endDate.getTime() + 7 * 24 * 60 * 60 * 1000));
      break;
    case 'month':
      setStartDate(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1));
      setEndDate(new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0, 23, 59, 59, 999));
      break;
    case 'year':
      setStartDate(new Date(startDate.getFullYear() + 1, 0, 1));
      setEndDate(new Date(startDate.getFullYear() + 1, 11, 31, 23, 59, 59, 999));
      break;
    default:
      break;
  }
};

  const handlePrevClick = () => {
    switch(view) {
      case 'day':
        setStartDate(new Date(startDate.getTime() - 24 * 60 * 60 * 1000));
        setEndDate(new Date(endDate.getTime() - 24 * 60 * 60 * 1000));
        break;
      case 'week':
        setStartDate(new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000));
        setEndDate(new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000));
        break;
      case 'month':
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1));
        setEndDate(new Date(startDate.getFullYear(), startDate.getMonth(), 0, 23, 59, 59, 999));
        break;
      case 'year':
        setStartDate(new Date(startDate.getFullYear() - 1, 0, 1));
        setEndDate(new Date(startDate.getFullYear() - 1, 11, 31, 23, 59, 59, 999));
        break;
      default:
        break;
    }
  };

///--------------Datepicker part
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChangePicker = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };
  
  

  
  return (
    <div>
      <Calendar
        value={dateRange}
        onChange={handleDateChange}
        selectRange={true}
      />
      <div>
        <p>Start date: {dateRange[0].toDateString()}</p>
        <p>End date: {dateRange[1].toDateString()}</p>
      </div>
      <div>NEW SECTION </div>
      <div>
        <div>
          <button onClick={() => handleViewChange("day")}>Day</button>
          <button onClick={() => handleViewChange("week")}>Week</button>
          <button onClick={() => handleViewChange("month")}>Month</button>
          <button onClick={() => handleViewChange("year")}>Year</button>
        </div>
        <div>
          <button onClick={handlePrevClick}>Prev</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
        <div>
          <p>Start: {startDate.toLocaleDateString()}</p>
          <p>End: {endDate.toLocaleDateString()}</p>
        </div>
      </div>
      <div>DATEPICKER </div>
      <div>
        <input
          type="text"
          value={selectedDate ? selectedDate.toDateString() : ""}
          readOnly
        />
        <button onClick={() => setShowDatePicker(true)}>Select Date</button>
        {showDatePicker && (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChangePicker}
            inline
          />
        )}
      </div>
    </div>
  );

}
export default Test



