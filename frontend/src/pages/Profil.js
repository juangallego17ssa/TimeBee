import React, { useState } from 'react';
import UserDisplay from "../Components/ProfilComp/UserDisplay";
import Calendar from 'react-calendar';
import "../Components/ReportComp/Calendar_styles.css";
import ReportCalendar from '../Components/ReportComp/ReportCalendar';
import Holidays from '../Components/ReportComp/MonthlyView/Holidays';
import { useGetpublicHolidayYearQuery } from '../api/API';
import moment from "moment";


function Profil() {

  const [value, onChange] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = moment(currentDate).format("yyyy-MM");

  const currentYear = new Date().getFullYear();
  const { data: PUBLIC_HOLIDAYS } = useGetpublicHolidayYearQuery(currentYear);
  const publicHolidaysOfMonth = PUBLIC_HOLIDAYS?.filter(
    (holiday) => holiday.date.substring(0, 7) === currentMonth
  );
  console.log("publicHolidaysOfMonth:", publicHolidaysOfMonth);
  const holidayDates = publicHolidaysOfMonth?.map((holiday) => holiday.date);

  console.log(value)
    return (
      <div className="flex flex-rows justify-evenly bg-stone-100 md:h-full  w-full h-full p-10 gap-10">
        <UserDisplay />
        <div className="flex md:flex-col justify-center items-center bg-stone-100 md:h-1/2  md:w-1/4 h-full gap-4">
          <div className="flex flex-col justify-center bg-white h-full md:h-1/2 rounded-xl  w-full shadow-xl">
            <p className='flex items-center justify-center font-bold py-5'>PUBLIC HOLIDAYS THIS MONTH</p>
            <Holidays currentMonth={currentMonth}
            publicHolidaysOfMonth={publicHolidaysOfMonth}/>
          </div>
          <div className="boder-2 bg-white h-full md:h-1/2 w-full rounded-xl shadow-xl py-2">
            <div className='flex items-center justify-center font-bold'>HOLIDAY PLAN</div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div>
        <Calendar onChange={onChange} value={value} showWeekNumbers={true} 
          selectRange={true} 
          defaultValue={value} />
        </div>
     </div>
    );
  }
  
  export default Profil;