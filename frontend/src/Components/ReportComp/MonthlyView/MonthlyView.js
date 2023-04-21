import { useState,useRef } from "react";
import moment from "moment";
import {MdKeyboardArrowLeft,MdKeyboardArrowRight} from 'react-icons/md'
import {useGetOwnTrackedTimeQuery,useGetClockedTimeQuery} from '../../../api/API'
import ReportTable from "./ReportTable";
import Holidays from "./Holidays";
import UserInfo from "./UserInfo";

export default function MonthlyView() {
  const DEFAULT_CLOCK_IN = '09:00';
  const DEFAULT_CLOCK_OUT = '18:00';
  const DEFAULT_WORKINK_TIME = (8.5)*3600000

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

    // const clockInOut = data?.filter(data=>data.type_of_input === '0')
    // console.log(data)

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
    console.log('groupedData:',groupedData)

/*  CURRENT MONTH  */
    const currentMonth = moment(currentDate).format('yyyy-MM');

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
/*  match DAYS in month with CLOCKED DATA  */
const CLOCK_DATA = daysInMonth.map(date=>{
  if(groupedData){
    if(groupedData[date]){
      const start = moment(groupedData[date].start[0])
      const stop = moment(groupedData[date].stop[groupedData[date].stop.length -1])
      const duration = moment.duration(stop.diff(start)).asMilliseconds()
      return { 
        track_id:'' ,
        date: date,
        start: moment(start).format('HH:mm') ,
        stop: moment(stop).format('HH:mm') ,
        duration: duration,
        worked_time: moment.utc(duration).format('HH:mm'),
        // over_time:moment.utc(duration-DEFAULT_WORKINK_TIME).format('HH:mm')
        over_time:duration-DEFAULT_WORKINK_TIME
      }
    }else{
      return { date:date, start:'', stop:'' }
    }
  }
})
// console.log('CLOCK_DATA=',JSON.stringify(CLOCK_DATA))


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
        <ReportTable data={CLOCK_DATA} currentMonth={currentMonth}/>
        
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
            <Holidays currentMonth={currentMonth} />

          </div>
        {/*  HOLIDAYS FOR THIS MONTH  */}
          <div className="boder-2 bg-white h-1/4 w-full rounded-xl shadow-md">

          </div>
        {/*  EXPORT EXCEL / PDF */}
          <div>
            <button className="bg-teal-500 text-white font-bold py-5 px-10 rounded-full">EXPORT REPO</button>
          </div>



      </section>
      </div>
    );
  }
