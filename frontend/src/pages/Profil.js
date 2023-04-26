import React, { useState } from 'react';
import UserDisplay from "../Components/ProfilComp/UserDisplay";
import Calendar from 'react-calendar';
import "../Components/ReportComp/Calendar_styles.css";
import Holidays from '../Components/ReportComp/MonthlyView/Holidays';
import { useGetpublicHolidayYearQuery, useGetOwnTrackedTimeQuery } from '../api/API';
import moment from "moment";
import AddCodeDay from '../Components/ProfilComp/AddCodeDay';
import { FiPlus, FiMinus } from 'react-icons/fi';
import CodeTask from '../Components/ProfilComp/CodeTask';

function Profil() {

  const [value, onChange] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayAdd, setdayAdd] = useState(false);

  //Getting all own Tasks
  const { data: codeTask, isLoadingCode, isSuccessCode, isErrorCode } = useGetOwnTrackedTimeQuery();

  console.log(codeTask);
  //Filtering only coded ones

  const filteredTask = codeTask?.filter((task) => task.code >= "01" && task.code <= "08");


  //Filtering only Vacation ones

  const filteredHolidays = codeTask?.filter((task) => task.code === "03");

  console.log(filteredTask)






  const currentMonth = moment(currentDate).format("yyyy-MM");

  const currentYear = new Date().getFullYear();
  const { data: PUBLIC_HOLIDAYS } = useGetpublicHolidayYearQuery(currentYear);
  const publicHolidaysOfMonth = PUBLIC_HOLIDAYS?.filter(
    (holiday) => holiday.date.substring(0, 7) === currentMonth
  );
  console.log("publicHolidaysOfMonth:", publicHolidaysOfMonth);
  const holidayDates = publicHolidaysOfMonth?.map((holiday) => holiday.date);


  const handleDayAdd = () => {
    setdayAdd(!dayAdd);
  };

  console.log(value)
    return (
      <div className="flex flex-rows justify-evenly bg-stone-100 md:h-full  w-full p-10 gap-10">
        <UserDisplay />
        <div className="flex md:flex-col justify-center items-center bg-stone-100 md:h-full  md:w-1/4 h-full gap-4">
          <div className="flex flex-col justify-center bg-white h-full md:h-1/4 rounded-xl  w-full shadow-xl">
            <p className='flex flex-grow items-center justify-center font-bold py-5'>PUBLIC HOLIDAYS THIS MONTH</p>
            <Holidays currentMonth={currentMonth}
            publicHolidaysOfMonth={publicHolidaysOfMonth}/>
          </div>
            <div className="boder-2 flex-grow bg-white h-full md:h-1/2 w-full rounded-xl shadow-xl py-2">
              <div className='flex items-center justify-center font-bold'>SPECIAL LEAVE</div>
              <div className='flex flex-col justify-center items-center gap-1 pt-1'> {/* Display Coded Task */}
              {filteredTask?.map((task) => (
                <CodeTask
                  key={task.id}
                  code={task.code}
                  task={task} />))}
              {dayAdd ?
                <div className="flex flex-rows justify-end items-center bg-white md:h-full  w-full p-2">
                  <p className='font-semibold px-2'>CLOSE</p>
                  <div 
                  onClick={handleDayAdd}
                  className='border-[2.5px] border-teal-400 text-teal-400 w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-400  hover:text-white'>
                      <FiMinus className='text-xl font-extrabold'/>
                  </div>
                </div>
                :
                <div className="flex flex-rows justify-end items-center bg-white md:h-full  w-full p-2">
                  <p className='font-semibold px-2'>CREATE NEW</p>
                  <div 
                    onClick={handleDayAdd}
                    className='border-[2.5px] border-teal-400 text-teal-400 w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-400  hover:text-white'>
                        <FiPlus className='text-xl font-extrabold'/>
                  </div>
                </div>
                }
                {dayAdd &&
                <div className="boder-2 bg-white h-full md:h-full w-full rounded-xl shadow-xl py-2">
                  <AddCodeDay/>
                </div>
                }
              </div>
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