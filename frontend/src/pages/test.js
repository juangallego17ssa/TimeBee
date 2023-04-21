import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackedTimeOwn } from '../redux/Slices/trackedTimeOwnSlice';
import moment from "moment";



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

  const today = new Date(); // !!!!!!!!! TAKE CARE NOT HAVING TWO const today !!!!!!!!
  const currentDay = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const startOfWeek = new Date(today); // Create a new Date object based on the current date
  startOfWeek.setDate(
    today.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
  ); // Set the date to the first day of the week (Sunday or Monday)
  const endOfWeek = new Date(today); // Create another new Date object based on the current date
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Set the date to the last day of the week (Friday + 4)(Sunday + 6)

  const lastWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  const lastWeekEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  const actualMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const actualMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  const startOfLastWeek = new Date(today); // Create a new Date object based on the current date
  startOfLastWeek.setDate(today.getDate() - currentDay - 6); // Set the date to the first day of the previous week (Sunday)

  const startOfThisYear = new Date(today.getFullYear(), 0, 1); // Set the date to the first day of the current year (January 1)
  const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1); // Set the date to the first day of the previous year (January 1)

  console.log(`startOfWeek ${startOfWeek}`); // output: Mon Apr 17 2023 22:11:06 GMT+0200 (Central European Summer Time)
  console.log(`endOfWeek ${endOfWeek}`); // output: Sun Apr 23 2023 22:25:38 GMT+0200 (Central European Summer Time)
  console.log(`startOfLastWeek ${startOfLastWeek}`); // output: Mon Apr 10 2023 22:26:03 GMT+0200 (Central European Summer Time)
  console.log(`startOfThisYear ${startOfThisYear}`); // output: Sun Jan 01 2023 00:00:00 GMT+0100 (Central European Standard Time)
  console.log(`startOfLastYear ${startOfLastYear}`); // output: Sat Jan 01 2022 00:00:00 GMT+0100 (Central European Standard Time)

  console.log(`lastWeekStart ${lastWeekStart}`); // output: Thu Apr 13 2023 00:00:00 GMT+0200 (Central European Summer Time) !!! This is form Today backwards as you see it was Thursday 20.04.2023
  console.log(`lastWeekEnd ${lastWeekEnd}`); // output: Wed Apr 19 2023 00:00:00 GMT+0200 (Central European Summer Time) !!! This is form Today backwards as you see it was Thursday 20.04.2023
  console.log(`actualMonthStart ${actualMonthStart}`); // output: Sat Apr 01 2023 00:00:00 GMT+0200 (Central European Summer Time)
  console.log(`actualMonthEnd ${actualMonthEnd}`); // output: Sun Apr 30 2023 00:00:00 GMT+0200 (Central European Summer Time)
  console.log(`lastMonthStart ${lastMonthStart}`); // output: Wed Mar 01 2023 00:00:00 GMT+0100 (Central European Standard Time)
  console.log(`lastMonthEnd ${lastMonthEnd}`); // output: Fri Mar 31 2023 00:00:00 GMT+0200 (Central European Summer Time)

  // ------------------------------------------------------------------------------------------------------


  // --- Sum all the Tracked times for on Project this is done with "moment" ------------------------------
  const data = reduxTrackedTime;

  const durations = data
    .filter((item) => item.stop !== null)
    .reduce((acc, item) => {
      const project = item.project.name;
      const duration = moment.duration(
        moment(item.stop).diff(moment(item.start))
      );
      acc[project] = acc[project] ? acc[project].add(duration) : duration;
      console.log(acc);
      return acc;
    }, {});

  // EXAMLE OUTPUT
  // Worktime: 6 days, 18 hours, 1 minutes
  // TimeBee: 0 days, 4 hours, 1 minutes
  // Administration: 22 days, 11 hours, 12 minutes

  return (
    <div>
      <ul>
        {Object.keys(durations).map((project) => (
          <li key={project}>
            {project}: {durations[project].days()} days,{" "}
            {durations[project].hours()} hours, {durations[project].minutes()}{" "}
            minutes
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Test