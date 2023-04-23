import { useState,useRef } from "react";
import moment from "moment";
import {MdKeyboardArrowLeft,MdKeyboardArrowRight} from 'react-icons/md'
import {useGetOwnTrackedTimeQuery,useGetClockedTimeQuery,useGetpublicHolidayYearQuery } from '../../../api/API'
import ReportTable from "./ReportTable";
import Holidays from "./Holidays";
import UserInfo from "./UserInfo";

export default function MonthlyView() {
  const DEFAULT_CLOCK_IN = '09:00';
  const DEFAULT_CLOCK_OUT = '18:00';
  const DEFAULT_WORKINK_TIME = (9)*3600000

  const CODE = [
    {code:'00',value:'Arbeit'},
    {code:'01',value:'Kranheit'},
    {code:'02',value:'Unfall'},
    {code:'03',value:'Ferien'},
    {code:'04',value:'Urlaub bezahlt'},
    {code:'05',value:'Urlaub unbezahlt'},
    {code:'06',value:'Militär, Zivilschutz'},
    {code:'07',value:'Dienstreise'},
    {code:'08',value:'Ausbildung'},
  ]

  const [currentDate,setCurrentDate]=useState(new Date());
  const [startTimes, setStartTimes] = useState('');
  const [stopTimes, setStopTimes] = useState('');
  const [isEditing,setIsEditing]=useState(false);


  

//FETCH CLOCK IN/OUT DATA  /* filter:type_of_input === "0" */
    const { data ,isLoading,isSuccess,isError} = useGetClockedTimeQuery()
    // console.log("data=",JSON.stringify(data))

/*  CURRENT MONTH  */
        const currentMonth = moment(currentDate).format('yyyy-MM');

/* group the data by date */
    const groupedData = data?.reduce((acc, item) => {
      const date = item.start.substring(0, 10); // extract the date from the start timestamp
      if (!acc[date]) {
        acc[date] = { start: [], stop: [] }; // create a new object for the date if it doesn't exist
      }
      acc[date].start.push(item.start);
      if (item.stop) {
        acc[date].stop.push(item.stop);
      }
      return acc;
    }, {});  
    // console.log('groupedData:',groupedData)


/*  handel change MONTH  */
    const prevMonth =()=>{
      setCurrentDate(new Date(currentDate.getFullYear(),currentDate.getMonth() +1,1));
    }
    const nextMonth =()=>{
      setCurrentDate(new Date(currentDate.getFullYear(),currentDate.getMonth() -1,1));
    }

/*  get first and last day of SELECTED MONTH  */
    const firstDayOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(),1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0);

/*  get DAYS in month */
    const daysInMonth = [];
    for (let date=firstDayOfMonth ; date <=lastDayOfMonth; date.setDate(date.getDate()+1)){
      const day = new Date(date)
      daysInMonth.push(moment(day).format('yyyy-MM-DD'))
    }

/* PUBLIC HOLIDAYS OF CURRENT MONTH*/
    const currentYear = new Date().getFullYear()
    const { data:PUBLIC_HOLIDAYS }=useGetpublicHolidayYearQuery(currentYear)
    // console.log(currentMonth)
    const publicHolidaysOfMonth = PUBLIC_HOLIDAYS?.filter(holiday => holiday.date.substring(0,7) === currentMonth)
    console.log('publicHolidaysOfMonth:',publicHolidaysOfMonth)
    const holidayDates = publicHolidaysOfMonth?.map(holiday=>holiday.date)
/* WORKING DAY */
    const WORKDAYS = []
    for(let i=0 ; i<daysInMonth.length; i++){
      if(moment(daysInMonth[i]).format('ddd') !== 'Sat' && moment(daysInMonth[i]).format('ddd') !== 'Sun' && !holidayDates?.includes(daysInMonth[i])){
        WORKDAYS.push(daysInMonth[i])
      }
    }
    console.log('WORKDAYS:',WORKDAYS.length)
    

    // console.log(holidayDates.includes('2023-04-07'))


/*  match DAYS in month with CLOCKED DATA  */
const CLOCK_DATA = daysInMonth?.map(date=>{
  for (let i = 0; i<holidayDates?.length;i++){
    if(date.includes(holidayDates[i]) && moment(date).format('ddd')!=='Sat' && moment(date).format('ddd')!=='Sun'){
      return {
        date:date,
        duration:DEFAULT_WORKINK_TIME,
        worked_time : moment.utc(DEFAULT_WORKINK_TIME).format('HH:mm'),
      }
    }
  }

  if(groupedData){
    if(groupedData[date]){
      const start = moment(groupedData[date]?.start[0])
      const stop = moment(groupedData[date]?.stop[groupedData[date].stop.length -1])
      
      const duration =stop>start?moment.duration(stop.diff(start)).asMilliseconds():''
      const worked_time = moment.utc(duration).format('HH:mm')
      return { 
        track_id:'' ,
        date: date,
        start: moment(start).format('HH:mm') ,
        stop: `${stop>start&&moment(stop).format('HH:mm')}`,
        // stop: moment(stop).format('HH:mm') ,
        duration: duration,
        worked_time: worked_time,
        over_time:DEFAULT_WORKINK_TIME-duration
      }
    }else{
      return { date:date, start:'', stop:'' }
    }
  }
  return
})
// console.log('CLOCK_DATA=',CLOCK_DATA?.filter(data=>data.start).length)

// total work time of the month in milliseconds
let TOTAL_WORKED_TIME = 0
let OVER_TIME = 0
if(CLOCK_DATA){
  for (let i = 0; i <CLOCK_DATA.length ; i++) {
    if(CLOCK_DATA[i]?.duration){
      TOTAL_WORKED_TIME += CLOCK_DATA[i]?.duration;
    }
    if(CLOCK_DATA[i]?.over_time){
      OVER_TIME += CLOCK_DATA[i].over_time;
    }
  }
  // console.log("TOATL:",TOTAL_WORKED_TIME)
  console.log("OVERTIME:",OVER_TIME)
}
const millisecToHr =(x)=>{
  const hours = Math.floor(x/ 3600000) //GET HOUR
  return hours
}
const millisecTomin =(x)=>{
  const minutes = Math.floor(x% 3600000/ 60000) //GET MINUTES
  return minutes
}
const hours = Math.floor(TOTAL_WORKED_TIME/ 3600000) //GET HOUR
const minutes = Math.floor(TOTAL_WORKED_TIME% 3600000 / 60000) //GET MINUTES





const handleChangeStartTime =(event)=>{
  const date = event.target.name;
  const value = event.target.value;
  setStartTimes(prevState => ({...prevState, [date]: value}));
  console.log(startTimes[date])
}
const handleChangeStopTime =(event)=>{
  const date = event.target.name;
  const value = event.target.value;
  setStopTimes(prevState => ({...prevState, [date]: value}));
  console.log(stopTimes[date])
}



if(isLoading){
  return <div>Loading...</div>
}else if(isError){
  console.log(Error)
  return(
  <div className="flex flex-col">
    <h2>Oops!</h2>
    <p>something is wrong here</p>
  </div>)
}
    return (
      <div className="flex flex-col lg:flex-row item-center bg-stone-100 h-screen">

{/* ================// REPORT SECTIION //================ */}

      <section className="items-center mx-auto bg-white w-fit box-border m-4 lg:w-3/5 lg:h-5/6 shadow-md rounded-xl py-4 ">
        <div className=" flex justify-center items-center mb-6">
          <MdKeyboardArrowLeft className="w-8 h-8 text-zinc-400 hover:cursor-pointer hover:text-zinc-800" onClick={nextMonth}/>
          <h2 className=" w-60 text-center text-2xl">{moment(currentMonth).format('yyyy MMMM')}</h2>
          <MdKeyboardArrowRight className="w-8 h-8 text-zinc-400 hover:cursor-pointer hover:text-zinc-800" onClick={prevMonth} />
        </div>
        <ReportTable data={CLOCK_DATA} currentMonth={currentMonth}  publicHolidaysOfMonth={publicHolidaysOfMonth}/>
        
      </section>
      
{/* ================// SUMMARY SECTIION //================ */}
      
      <section className="calendar m-4 h-full flex flex-col items-center md:w-2/5 gap-3">
        {/*  USER INFO  */}
          <div className="boder-2 bg-white h-1/4 w-full rounded-xl shadow-md">
            <UserInfo />
          </div>
        {/*  PUBLIC HOLIDAYS FOR THIS MONTH  */}
          <div className="boder-2 bg-white h-1/4 w-full rounded-xl shadow-md py-2">
          <h2 className='felx text-center text font-bold my-3'>HOLIDAYS</h2>
            <Holidays currentMonth={currentMonth} publicHolidaysOfMonth={publicHolidaysOfMonth}/>

          </div>
        {/* SUMARY OF THIS MONTH  */}
          <div className="boder-2 bg-white h-1/4 w-full rounded-xl shadow-md">
          <h2 className='felx text-center text font-bold my-3'>SUMMARY</h2>

            <div className="grid grid-cols-2"> 
              <p className="uppercase">Working day</p>
              <p>{CLOCK_DATA.filter(data=>data.start).length} / {WORKDAYS.length} days</p>
            </div>

            <div className="grid grid-cols-2"> 
              <p className="uppercase">Worked Time</p>
              <p>{millisecToHr(TOTAL_WORKED_TIME)} hr {millisecTomin(TOTAL_WORKED_TIME)} min</p>
            </div>

              {TOTAL_WORKED_TIME-WORKDAYS.length*DEFAULT_WORKINK_TIME>0?
              <div className="grid grid-cols-2 text-teal-500">
                <p className="uppercase">OVER TIME</p>
                <div className="flex">
                  <p>{millisecToHr(TOTAL_WORKED_TIME-WORKDAYS.length*DEFAULT_WORKINK_TIME)}hr</p> 
                  <p>{millisecTomin(TOTAL_WORKED_TIME-WORKDAYS.length*DEFAULT_WORKINK_TIME)}min</p>
                </div>
                
              </div>
              :
              <div className="grid grid-cols-2 text-red-500">
                <p className="uppercase">under TIME</p>
                <div className="flex">
                  <p>{millisecToHr(WORKDAYS.length*DEFAULT_WORKINK_TIME-TOTAL_WORKED_TIME)}hr</p> 
                  <p>{millisecTomin(WORKDAYS.length*DEFAULT_WORKINK_TIME-TOTAL_WORKED_TIME)}min</p>
                </div>            
              </div>
              }


          </div>
        {/*  EXPORT EXCEL / PDF */}
          <div>
            <button className="bg-teal-500 text-white font-bold py-5 px-10 rounded-full">EXPORT REPO</button>
          </div>



      </section>
      </div>
    );
  }
