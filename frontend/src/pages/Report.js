import { useState,useRef } from "react";
import moment from "moment";
import {MdKeyboardArrowLeft,MdKeyboardArrowRight} from 'react-icons/md'
import {useGetOwnTrackedTimeQuery} from '../api/API'


function Report() {
  const DEFAUL_CLOCK_IN = '09:00'
  const DEFAUL_CLOCK_OUT = '18:00'
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
 
  

//FETCH CLOCK IN/OUT DATA
    const { data ,isLoading,isSuccess,isError} = useGetOwnTrackedTimeQuery()
/* filter out type_of_input === "0" */
    const clockInOut = data?.filter(data=>data.type_of_input === '0')
    // console.log(clockInOut)

/* group the data by date */
    const groupedData = clockInOut?.reduce((acc, item) => {
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

/*  CURRENT MONTH  */
    const currentMonth = moment(currentDate).format('yyyy MMMM');

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
      return { 
        date: date,
        start: moment(groupedData[date].start[0]).format('hh:mm'),
        stop: moment(groupedData[date].stop[groupedData[date].stop.length -1]).format('hh:mm'),
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
}

    return (
      <div className="flex flex-col lg:flex-row item-center bg-stone-100 h-screen">

{/* ================// REPORT SECTIION //================ */}

      <section className="items-center mx-auto bg-white w-fit box-border m-4 lg:mx-6 lg:w-3/5 lg:h-fit shadow-md rounded-xl py-4 ">
        <div className=" flex justify-center items-center mb-6">
          <MdKeyboardArrowLeft className="w-8 h-8 text-zinc-400 hover:cursor-pointer hover:text-zinc-800" onClick={nextMonth}/>
          <h2 className=" w-60 text-center text-2xl">{currentMonth}</h2>
          <MdKeyboardArrowRight className="w-8 h-8 text-zinc-400 hover:cursor-pointer hover:text-zinc-800" onClick={prevMonth} />
        </div>
        <div className="content">           
           <div className="grid grid-cols-6 gap-2">
            <div></div>
            <p>clock in</p>
            <p>clock out</p>
            <p>code</p>
            <p>working hours</p>
            <p>over time</p>
            </div>
          
          {CLOCK_DATA.map((item)=>
            <div key={item.date} 
            className={`${moment(item.date).format('ddd') === 'Sat'| moment(item.date).format('ddd') === 'Sun' && 'bg-stone-50 text-zinc-400'}
            box-border grid grid-cols-6 hover:bg-stone-100 px-6 py-1`}>
              <div className="grid grid-cols-[1fr_2fr] items-center">
              <p className="text-left">{moment(item.date).format('DD')}</p>
              <p className="text-left">{moment(item.date).format('ddd')}</p>
              </div>
        {/*  CLOCK IN  */}
              {moment(item.date).format('ddd') === 'Sat'| moment(item.date).format('ddd') === 'Sun'?
              <div></div>
              :
              <input
              className={`${item.start || startTimes[item.date]?"":'opacity-10'} bg-transparent text-sm`}
              type='time'
              name={item.date}
              value={item.start?item.start:startTimes[item.date]}
              onChange={handleChangeStartTime}
              />
              } 
        {/*  CLOCK OUT  */}
              {moment(item.date).format('ddd') === 'Sat'| moment(item.date).format('ddd') === 'Sun'?
              <div></div>
              :
              <input
              className={`${item.stop || stopTimes[item.date]?"":'opacity-10'} bg-transparent text-sm`}
              type='time'
              name={item.date}
              value={item.stop?item.stop:stopTimes[item.date]}
              onChange={handleChangeStopTime}
              />
              } 
        {/*  CODE  */} 
                {moment(item.date).format('ddd') === 'Sat'| moment(item.date).format('ddd') === 'Sun' ?
                <div></div>:
                <select className={`appearance-none bg-transparent`}>
                  {CODE.map(code=>
                    <option 
                    className={``}
                    key={code.code}>{code.value}</option>
                    )}    
                </select>
              }
        {/*  WORKED HOURS  */}
              <div>

              </div>
        {/*  OVER TIME */}
            </div>
          )}
          
        </div>
      </section>
      
{/* ================// SUMMARY SECTIION //================ */}
      
      <section className="calendar m-4 h-full flex flex-col items-center md:w-2/5 gap-3">
        {/*  PUBLIC HOLIDAYS FOR THIS MONTH  */}
          <div className="boder-2 bg-white h-1/4 w-full rounded-xl shadow-md">

          </div>
        {/*  HOLIDAYS FOR THIS MONTH  */}
          <div className="boder-2 bg-white h-1/4 w-full rounded-xl shadow-md">

          </div>
        {/*  REMAIN ANNUAL LEAVE  */}
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
  
  export default Report;

  const woking_hour_data={}