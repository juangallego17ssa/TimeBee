import React, { useState } from 'react';
import UserDisplay from "../Components/ProfilComp/UserDisplay";
import Calendar from 'react-calendar';
import "../Components/ReportComp/Calendar_styles.css";
import ReportCalendar from '../Components/ReportComp/ReportCalendar';
import Holidays from '../Components/ReportComp/MonthlyView/Holidays';
import { useGetpublicHolidayYearQuery } from '../api/API';
import moment from "moment";


function AddCodeDay() {


  console.log(value)
    return (
      <div className="flex flex-rows justify-evenly bg-stone-100 md:h-full  w-full p-10 gap-10">
     </div>
    );
  }
  
  export default AddCodeDay;