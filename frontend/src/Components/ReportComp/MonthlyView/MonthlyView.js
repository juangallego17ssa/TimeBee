import { useState,useRef } from "react";
import { useSelector } from 'react-redux';
import Loader from "../../Loader";
import moment from "moment";
import {MdKeyboardArrowLeft,MdKeyboardArrowRight} from 'react-icons/md'
import {
  useGetTrackedTimeFromToDateQuery,
  useGetpublicHolidayYearQuery
       } from '../../../api/API'
import ReportTable from "./ReportTable";
import Holidays from "./Holidays";
import UserInfo from "./UserInfo";
import * as XLSX from 'xlsx'
import ErrorPage from "../../ErrorPage";

export default function MonthlyView() {
  const DEFAULT_CLOCK_IN = "09:00";
  const DEFAULT_CLOCK_OUT = "18:00";
  const DEFAULT_WORKINK_TIME = 8.5 * 3600000;

  const CODE = [
    { code: "00", value: "Arbeit" },
    { code: "01", value: "Kranheit" },
    { code: "02", value: "Unfall" },
    { code: "03", value: "Ferien" },
    { code: "04", value: "Urlaub bezahlt" },
    { code: "05", value: "Urlaub unbezahlt" },
    { code: "06", value: "Militär, Zivilschutz" },
    { code: "07", value: "Dienstreise" },
    { code: "08", value: "Ausbildung" },
  ];
  const userData = useSelector( (state) => state.user.user)

  const [currentDate, setCurrentDate] = useState(new Date());
  const [startTimes, setStartTimes] = useState("");
  const [stopTimes, setStopTimes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  /*  CURRENT MONTH  */
  const currentMonth = moment(currentDate).format("yyyy-MM");
    /*  get first and last day of SELECTED MONTH  */
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),currentDate.getMonth(),1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),currentDate.getMonth() + 1,0
    );


   const {data,isLoading,isSuccess,isError} = useGetTrackedTimeFromToDateQuery({
    start_date: moment(firstDayOfMonth).format('yyyy-MM-DD'),
    end_date: moment(lastDayOfMonth).format('yyyy-MM-DD'),
  })
    const clocledData = data?.filter(data=>data.type_of_input === '0' && data.code === '00') 
    const otherData = data?.filter(data=>data.type_of_input === '2' && data.code !== '00') 
  //  console.log('clocledData for this month:',clocledData)
  //  console.log('otherData for this month:',JSON.stringify(otherData))
   const OTHER_DATA = otherData?.map(data => {
    const start = moment(data.start);
    const stop = moment(data.stop);
    const duration = moment.duration(stop.diff(start));
    const days = [];
    const currentDate = moment(start);
    while(currentDate.isSameOrBefore(stop, 'day')) {
      days.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'day');
    }
    return {
      id: data.id,
      code: data.code,
      start: data.start,
      stop: data.stop,
      days: days,
      duration: duration
    };
  });


  // console.log(" OTHER_DATA=", OTHER_DATA)


  /* group the data by date */
  const groupedData = clocledData?.reduce((acc, item) => {
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
  // console.log("groupedData:", groupedData);

  /*  handel change MONTH  */
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };


  /*  get DAYS in month */
  const daysInMonth = [];
  for (
    let date = firstDayOfMonth;
    date <= lastDayOfMonth;
    date.setDate(date.getDate() + 1)
  ) {
    const day = new Date(date);
    daysInMonth.push(moment(day).format("yyyy-MM-DD"));
  }

  /* PUBLIC HOLIDAYS OF CURRENT MONTH*/
  const currentYear = new Date().getFullYear();
  const { data: PUBLIC_HOLIDAYS } = useGetpublicHolidayYearQuery(currentYear);
  // console.log(currentMonth)
  const publicHolidaysOfMonth = PUBLIC_HOLIDAYS?.filter(
    (holiday) => holiday.date.substring(0, 7) === currentMonth
  );
  // console.log("publicHolidaysOfMonth:", publicHolidaysOfMonth[0].holiday_name);
  const holidayDates = publicHolidaysOfMonth?.map((holiday) => holiday.date);
  
  /* WORKING DAY */
  const WORKDAYS = [];
  for (let i = 0; i < daysInMonth.length; i++) {
    if (
      moment(daysInMonth[i]).format("ddd") !== "Sat" &&
      moment(daysInMonth[i]).format("ddd") !== "Sun" &&
      !holidayDates?.includes(daysInMonth[i])
    ) {
      WORKDAYS.push(daysInMonth[i]);
    }
  }
  // console.log("WORKDAYS:", WORKDAYS.length);

  // console.log(holidayDates.includes('2023-04-07'))

  // sorting the start and stop array
  // Custom comparator function to compare ISO date strings
  const dateComparator = (a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  };

  
  
  // console.log(groupedData);
  
  /*  match DAYS in month with CLOCKED DATA  */
  const CLOCK_DATA = daysInMonth?.map((date) => {
    let notes = ''
    for (let i = 0; i < OTHER_DATA?.length; i++) { // Loop through each date in OTHER_DATA.days
      for (let j = 0; j < OTHER_DATA[i].days.length; j++) {
        const event_date = OTHER_DATA[i].days[j];
        if(date === event_date){
          notes = CODE.find((item) => item.code === OTHER_DATA[i].code).value
        }
      }
    }
    for (let i=0 ; i < publicHolidaysOfMonth?.length; i++){
      if(date.includes(publicHolidaysOfMonth[i].date)){
        notes = (publicHolidaysOfMonth[i].holiday_name)
      }
    }
    // console.log('notes:',notes)
      
      if (groupedData) {
        if (groupedData[date]) {
        // Sort the start and stop arrays separately
        groupedData[date].start?.sort(dateComparator);
        groupedData[date].stop?.sort(dateComparator);
        const start = moment(groupedData[date]?.start[0]);
        const stop = moment(
          groupedData[date]?.stop[groupedData[date].stop.length - 1]
        );

        const duration =
          stop > start
            ? moment.duration(stop.diff(start)).asMilliseconds()
            : "";
        const worked_time = moment.utc(duration).format("HH:mm");
        const notes = ""
        return {
          track_id: "",
          date: date,
          start: moment(start).format("HH:mm"),
          stop: `${stop > start && moment(stop).format("HH:mm")}`,
          // stop: moment(stop).format('HH:mm') ,
          duration: duration,
          worked_time: worked_time,
          over_time: DEFAULT_WORKINK_TIME - duration,
          notes:notes,
        };
      } else {
        return { date: date, start: "", stop: "", notes: notes };
      }
    }
    return;
  });
  // console.log('CLOCK_DATA=',CLOCK_DATA)

  // total work time of the month in milliseconds
  let TOTAL_WORKED_TIME = 0;
  let OVER_TIME = 0;
  if (CLOCK_DATA) {
    for (let i = 0; i < CLOCK_DATA.length; i++) {
      if (CLOCK_DATA[i]?.duration) {
        TOTAL_WORKED_TIME += CLOCK_DATA[i]?.duration;
      }
      if (CLOCK_DATA[i]?.over_time) {
        OVER_TIME += CLOCK_DATA[i].over_time;
      }
    }
    // console.log("TOATL:",TOTAL_WORKED_TIME)
    // console.log("OVERTIME:", OVER_TIME);
  }
  const millisecToHr = (x) => {
    const hours = Math.floor(x / 3600000); //GET HOUR
    return hours;
  };
  const millisecTomin = (x) => {
    const minutes = Math.floor((x % 3600000) / 60000); //GET MINUTES
    return minutes;
  };
  const hours = Math.floor(TOTAL_WORKED_TIME / 3600000); //GET HOUR
  const minutes = Math.floor((TOTAL_WORKED_TIME % 3600000) / 60000); //GET MINUTES
  const NUM_WORKED_DAY = CLOCK_DATA.filter((data) => data?.start).length
  const WORKD_PERCENTAGE= Math.floor(NUM_WORKED_DAY /WORKDAYS.length*100)
  const EXPECTED_WORK_TIME = WORKDAYS.length*DEFAULT_WORKINK_TIME
  const WORKED_TIME_PERCENTAGE= Math.floor(TOTAL_WORKED_TIME/EXPECTED_WORK_TIME*100)
  // console.log("WORKED_TIME_PERCENTAGE:",WORKED_TIME_PERCENTAGE)

/*    EXPORT TO EXCEL    */
const handleExportToExcel = () => {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.table_to_sheet(document.getElementById('my-table'));
  
  // const title = [
  //   ['Company',`${moment(currentMonth).format("MMM_yyyy")}`],
  //   ['EMPLOEE NAME',`${userData.first_name}${userData.last_name}`]
  // ];
  
  // const titleSheet = XLSX.utils.aoa_to_sheet(title); // create worksheet from title
  
  // XLSX.utils.book_append_sheet(workbook, titleSheet, 'Title'); // append title sheet
  XLSX.utils.book_append_sheet(workbook, sheet, `${moment(currentMonth).format("MMM_yyyy")}`); // append data sheet
  XLSX.writeFile(workbook, `${userData.username}_${moment(currentMonth).format("MMM_yyyy")}.xlsx`);
};

  if (isLoading) {
    return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <Loader />
      </div>
    );
  } else if (isError) {
    console.log(Error);
    return (
      <div className=" h-screen w-screen flex justify-center items-center">     
        <ErrorPage />   
      </div>
    );
  }
  return (
    <div className="flex flex-col lg:flex-row item-center  bg-stone-100  h-[98%]">
      {/* ================// REPORT SECTIION //================ */}

      <section className="items-center justify-center  bg-white  m-4 lg:w-3/5 shadow-md rounded-xl py-4 flex-col h-[full] ">
        <div className=" flex justify-center items-center ">
          <MdKeyboardArrowLeft
            className="w-6 h-6 text-zinc-400 hover:cursor-pointer hover:text-zinc-800"
            onClick={nextMonth}
          />
          <h2 className="w-60 text-center text-xl">
            {moment(currentMonth).format("yyyy MMMM")}
          </h2>
          <MdKeyboardArrowRight
            className="w-6 h-6 text-zinc-400 hover:cursor-pointer hover:text-zinc-800"
            onClick={prevMonth}
          />
        </div>

        <ReportTable
          data={CLOCK_DATA}
          currentMonth={currentMonth}
          publicHolidaysOfMonth={publicHolidaysOfMonth}
        />
      </section>

      {/* ================// SUMMARY SECTIION //================ */}

      <section className="calendar m-4 flex flex-col items-center md:w-2/5 gap-3">
        {/*  USER INFO  */}
        <div className="boder-2 bg-white h-1/4 w-full rounded-xl shadow-md">
          <UserInfo />
        </div>
        {/*  PUBLIC HOLIDAYS FOR THIS MONTH  */}
        <div className="boder-2 bg-white h-1/4 w-full rounded-xl shadow-md py-2">
          <Holidays
            currentMonth={currentMonth}
            publicHolidaysOfMonth={publicHolidaysOfMonth}
          />
        </div>
        {/* SUMARY OF THIS MONTH  */}
        <div className="boder-2 bg-white h-2/4 w-full rounded-xl shadow-md p-5 ">
          <h2 className="felx text-center text font-bold my-3">SUMMARY</h2>

          <div className="grid grid-cols-[1fr_2fr] mb-2">
            <p className="uppercase">Working day</p>

            {/* FROM HERE NEW */}
            <div className="percentage-bar flex items-center">
              <div className="relative w-36 h-5 bg-stone-200 shadow-inner rounded-full flex items-center">
                <div style={WORKD_PERCENTAGE>=100?{width:'100%',backgroundColor:'#22d3ee'}:{width:`${WORKD_PERCENTAGE}%`}}
                className={`absolute flex justify-end items-center h-5  bg-teal-400 rounded-full overflow-hidden`}>
                  <p className="px-2 rounded-full text-white text-sm font-semibold">{NUM_WORKED_DAY}</p>
                </div>
              </div>
                  <p className="inline-block text-zinc-500 text-xs">/{WORKDAYS.length}days</p>
            </div>
            {/* END */}

            {/* ORIGIN FROM HRER----------->
            <p>
              {CLOCK_DATA.filter((data) => data.start).length} /{" "}
              {WORKDAYS.length} days
            </p>
            <------------------------END */}
          </div>

          <div className="grid grid-cols-[1fr_2fr] mb-2">
            <p className="uppercase">Worked Time</p>
            {/*===> NEW <===*/}
            <div className="percentage-bar flex items-center">
              <div className="relative w-36 h-5 bg-stone-200 shadow-inner rounded-full flex items-center">
                <div 
                style={WORKED_TIME_PERCENTAGE>=100?{width:'100%',backgroundColor:'#22d3ee'}:{width:`${WORKED_TIME_PERCENTAGE}%`}}
                className={`absolute flex justify-end items-center h-5 bg-teal-400 rounded-full overflow-hidden`}>
                  <p className="px-2 rounded-full text-white text-sm font-semibold inline-block">       
                    {millisecToHr(TOTAL_WORKED_TIME)} hr{" "}
                    {millisecTomin(TOTAL_WORKED_TIME)} min
                  </p>
                </div>
              </div>
                  <p className="inline-block text-zinc-500 text-xs">
                     /{millisecToHr(EXPECTED_WORK_TIME)}hr{" "}
                     {millisecTomin(EXPECTED_WORK_TIME)}min
                  </p>
            </div>
            {/*===> END <===*/}
            {/* <p>
              {millisecToHr(TOTAL_WORKED_TIME)} hr{" "}
              {millisecTomin(TOTAL_WORKED_TIME)} min
            </p> */}
          </div>

          {TOTAL_WORKED_TIME - WORKDAYS.length * DEFAULT_WORKINK_TIME > 0 ? (
            <div className="grid grid-cols-[1fr_2fr] mb-2 text-teal-500">
              <p className="uppercase">OVER TIME</p>
              <div className="flex gap-1">
                <p>
                  {millisecToHr(
                    TOTAL_WORKED_TIME - WORKDAYS.length * DEFAULT_WORKINK_TIME
                  )}
                  hr
                </p>
                <p>
                  {millisecTomin(
                    TOTAL_WORKED_TIME - WORKDAYS.length * DEFAULT_WORKINK_TIME
                  )}
                  min
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 text-red-500">
              <p className="uppercase">under TIME</p>
              <div className="flex">
                <p>
                  {millisecToHr(
                    WORKDAYS.length * DEFAULT_WORKINK_TIME - TOTAL_WORKED_TIME
                  )}
                  hr
                </p>
                <p>
                  {millisecTomin(
                    WORKDAYS.length * DEFAULT_WORKINK_TIME - TOTAL_WORKED_TIME
                  )}
                  min
                </p>
              </div>
            </div>
          )}
        </div>
        {/*  EXPORT EXCEL / PDF */}
        <div>
          <button
            onClick={handleExportToExcel}
            className="py-5 px-10 rounded-full  text-white text-md font-bold 
                    bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% "
          >
            EXPORT REPORT
          </button>
        </div>
      </section>
    </div>
  );
}
