import React,{ useState,useRef } from 'react';
import ErrorPage from '../../ErrorPage';
import Loader from '../../Loader';
import { useSelector } from 'react-redux';
import moment from "moment";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useGetTrackedTimeFromToDateQuery, useGetpublicHolidayYearQuery } from '../../../api/API';
import AnnualTable from "./AnnualTable";
import UserInfo from "../MonthlyView/UserInfo";
import * as XLSX from 'xlsx';

export default function AnnualView() {
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
    const clocledData = data?.filter(data=>data.type_of_input === '0') 
  //  console.log('clocledData for this month:',clocledData)

  // console.log("data=",data)


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
  console.log("groupedData:", groupedData);

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
    // for (let i = 0; i < holidayDates?.length; i++) {
    //   if (
    //     date.includes(holidayDates[i]) &&
    //     moment(date).format("ddd") !== "Sat" &&
    //     moment(date).format("ddd") !== "Sun"
    //     ) {
    //       return {
    //         date: date,
    //         duration: DEFAULT_WORKINK_TIME,
    //         worked_time: moment.utc(DEFAULT_WORKINK_TIME).format("HH:mm"),
    //       };
    //     }
    //   }
    let notes = ''
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
  // console.log('CLOCK_DATA=',CLOCK_DATA?.filter(data=>data.start).length)
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
    <div className="flex flex-col relative lg:flex-row item-center  bg-stone-100  h-[98%]">
      {/* ================// REPORT SECTIION //================ */}
      <p className='absolute z-20 top-[30%] left-[40%] uppercase text-lg bg-teal-400 text-white font-extrabold p-20 rounded-lg shadow-lg'>Coming soon</p>
      <section className="blur-sm items-center justify-center  bg-white  m-4 lg:w-3/5 shadow-md rounded-xl py-4 flex-col h-[full] ">
        <div className=" flex justify-center items-center   ">
          <MdKeyboardArrowLeft
            className="w-6 h-6 text-zinc-400 hover:cursor-pointer hover:text-zinc-800"
            // onClick={nextMonth}
          />
          <h2 className="w-60 text-center text-xl">
            {currentYear}
          </h2>
          <MdKeyboardArrowRight
            className="w-6 h-6 text-zinc-400 hover:cursor-pointer hover:text-zinc-800"
            // onClick={prevMonth}
          />
        </div>
          <AnnualTable
            data={CLOCK_DATA}
            currentMonth={currentMonth}
            publicHolidaysOfMonth={publicHolidaysOfMonth}
          />
      </section>

      {/* ================// SUMMARY SECTIION //================ */}

      <section className="calendar blur-sm m-4 flex flex-col items-center md:w-2/5 gap-3">
        {/*  USER INFO  */}
        <div className="boder-2 bg-white h-1/4 w-full rounded-xl shadow-md">
          <UserInfo />
        </div>
        {/* SUMARY OF THIS MONTH  */}
        <div className="boder-2 bg-white h-3/4 w-full rounded-xl shadow-md p-5">
          <h2 className="felx text-center text font-bold ">SUMMARY</h2>

          <div className="grid grid-cols-2 mt-3">
            <p className="uppercase">Working day</p>
            <p>
              {CLOCK_DATA.filter((data) => data.start).length} /{" "}
              {WORKDAYS.length} days
            </p>
          </div>

          <div className="grid grid-cols-2">
            <p className="uppercase">Worked Time</p>
            <p>
              {millisecToHr(TOTAL_WORKED_TIME)} hr{" "}
              {millisecTomin(TOTAL_WORKED_TIME)} min
            </p>
          </div>

          {TOTAL_WORKED_TIME - WORKDAYS.length * DEFAULT_WORKINK_TIME > 0 ? (
            <div className="grid grid-cols-2 text-teal-500">
              <p className="uppercase">OVER TIME</p>
              <div className="flex">
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
