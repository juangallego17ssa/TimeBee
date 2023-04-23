import React, { useState } from 'react';
import UserDisplay from "../Components/ProfilComp/UserDisplay";
import Calendar from 'react-calendar';
import "../Components/ReportComp/Calendar_styles.css";
import ReportCalendar from '../Components/ReportComp/ReportCalendar';


function Profil() {

  const [value, onChange] = useState(new Date());

  console.log(value)
    return (
      <div className="flex felx-rows flex-grow bg-stone-100 md:h-full  w-full h-full">
        <UserDisplay />
        <div className="flex felx-col flex-grow bg-stone-100 md:h-full  w-1/3 h-48">
          <div className="flex flex-grow bg-stone-100 md:h-full  w-1/3 h-48"></div>
          <div className="flex  flex-grow bg-stone-100 md:h-full  w-1/3 h-48"></div>
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