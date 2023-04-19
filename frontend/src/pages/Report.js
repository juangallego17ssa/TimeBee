import { useState } from "react";
import ReportCalendar from "../Components/ReportComp/ReportCalendar";
import {MdKeyboardArrowLeft,MdKeyboardArrowRight} from 'react-icons/md'



function Report() {
const [currentDate,setCurrentDate]=useState(new Date());

const [clockIn, setClockIn] = useState('');
const [clockOut, setClockOut] = useState('');


const startMins = parseInt(clockIn.split(':')[0]*60) + parseInt(clockIn.split(':')[1]); 
const endMins = parseInt(clockOut.split(':')[0]*60) + parseInt(clockOut.split(':')[1]);
const durationMins = endMins-startMins
// console.log(durationMins)
const hours = Math.floor(durationMins / 60);
const minutes = durationMins % 60;



const currentMonth = currentDate.toLocaleString('default',{month:'long'});

//Change dispalyed Month 
const prevMonth =()=>{
  setCurrentDate(new Date(currentDate.getFullYear(),currentDate.getMonth() +1, 1));
}
const nextMonth =()=>{
  setCurrentDate(new Date(currentDate.getFullYear(),currentDate.getMonth() -1, 1));
}
const firstDayOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(),1);
const lastDayOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0);

const daysInMonth = [];
for (let date = new Date(firstDayOfMonth);date <=lastDayOfMonth; date.setDate(date.getDate()+1)){
  daysInMonth.push(new Date(date))
}
// console.log(daysInMonth[1].toDateString())
// console.log(`${currentMonth}:first day=${firstDayOfMonth},last day=${lastDayOfMonth}`);

const handleSetClockIn = (e)=>{
  console.log(e.target.name)
}
const handleSetClockOut = (e)=>{
  console.log(e.target.name)
}
const handleSetCode = (e)=>{
  console.log(e.target.name)
}
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];



    return (
      <div className="flex flex-col md:flex-row bg-stone-100">

      <div className="bg-white w-fit box-border  m-2 md:w-3/5 md:h-screen shadow-md rounded-md">
        <div className=" flex justify-center items-center">
          <MdKeyboardArrowLeft className="w-8 h-8 text-zinc-400 hover:cursor-pointer hover:text-zinc-800" onClick={nextMonth}/>
          <h2 className="my-4 w-20 text-center">{currentMonth}</h2>
          <MdKeyboardArrowRight className="w-8 h-8 text-zinc-400 hover:cursor-pointer hover:text-zinc-800" onClick={prevMonth} />
        </div>
        <div>           
           <div className="grid grid-cols-6 gap-2">
            <div></div>
            <p>clock in</p>
            <p>clock out</p>
            <p>code</p>
            <p>working hours</p>
            <p>over time</p>
            </div>

          {daysInMonth.map(day=>(
            <div key={day} className={`${day.getDay()===0 |day.getDay()===6 ?'text-zinc-300':'text-zinc-800'} grid grid-cols-6 gap-2 px-4 flex-nowrap`}>
              <div className="grid grid-cols-2">
                <p className="text-center w-4">{day.getDate()}</p>
                <p className="text-center w-4">{WEEKDAY[day.getDay()]}</p>
              </div>
                <label htmlFor="clock-in">
                  <input id="clock-in"
                        name={day}
                        value={clockIn}
                        onChange={handleSetClockIn}
                        onClick={()=>console.log(day)}
                        disabled={day.getDay()===0 | day.getDay()===6}
                        className="border-2 w-16 text-center bg-transparent"/>
                </label>
                <label htmlFor="clock-out">
                  <input id="clock-out"
                        value={clockOut}
                        onChange={handleSetClockOut}
                        disabled={day.getDay()===0 | day.getDay()===6}
                        className="border-2 w-16 text-center bg-transparent"/>
                </label>
                <label htmlFor="code">
                  <input id="code"
                        className="border-2 w-16 text-center bg-transparent"
                        value="0"
                        disabled={day.getDay()===0 | day.getDay()===6}
                        onChange={handleSetCode}
                        />
                </label>
              
              {/*   working time   */}
              <p>{durationMins?`${hours}:${minutes}`:""}</p> 
            </div>
          ))}
        </div>
      </div>

      
      <div className="calendar flex flex-col  bg-slate-500 justify-center items-center md:w-2/5">
          {/* <ReportCalendar /> */}
      </div>
      </div>
    );
  }
  
  export default Report;

  const woking_hour_data={}