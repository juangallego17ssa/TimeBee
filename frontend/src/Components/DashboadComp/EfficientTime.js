import {useEffect, useState} from "react";


import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip, ResponsiveContainer,
} from 'recharts';
import {axiosWithToken} from "../../api/axios";

const EfficientTime = () => {

    function getISOWeek(date) {
      const januaryFourth = new Date(date.getFullYear(), 0, 4);
      januaryFourth.setDate(januaryFourth.getDate() + (1 - januaryFourth.getDay()));
      const diff = date - januaryFourth;
      return Math.ceil((diff / 86400000 + 1) / 7);
    }


    function formatTimeFromMinutes(totalMinutes) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      // Format hours and minutes with leading zeros if necessary
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');

      return formattedHours + ':' + formattedMinutes;
    }

    function formatTimeFromMinutes2(totalMinutes) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes;
      return (hours ? hours.toString() + " h" : "") + ' ' + (minutes ? minutes.toString().padStart(2, '0') + " min" : "00 min" );
    }

    function getMonthName(monthNumber) {
      const months = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
      return months[monthNumber];
    }

    const [dataClock, setDataClock] = useState([])

    const [weekNum, setWeekNum] = useState("-")
    const [weekDate, setWeekDate] = useState("-")
    const [weekClockIn, setWeekClockIn] = useState("08:00")
    const [weekClockOut, setWeekClockOut] = useState("18:00")
    const [weekBreakTime, setWeekBreakTime] = useState("02:00")
    const [weekWorkTime, setWeekWorkTime] = useState("08:00")
    const [weekBreakNum, setWeekBreakNum] = useState(4)
    const [weekBreakTimePerBreak, setWeekBreakTimePerBreak] = useState("20 min")
    const [weekDataChart, setWeekDataChart] = useState([])
    const [isWeek, setIsWeek] = useState(true)



    const getDateString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const getWeekInfo = async (myDay) => {
        setIsWeek(true)
        let day = new Date(2023,3,22);
        let weekNum = getISOWeek(day)
        let dayOfWeek = day.getDay()
        day.setDate(day.getDate() - dayOfWeek)
        setWeekDate(day)
        let firstDate = getDateString(day);
        day.setDate(day.getDate() + 6)
        let lastDate = getDateString(day)
        if (myDay) {
            console.log(myDay)
            day = myDay;
            weekNum = getISOWeek(day)
            dayOfWeek = day.getDay()
            day.setDate(day.getDate() - dayOfWeek)
            setWeekDate(day)
            firstDate = getDateString(day);
            day.setDate(day.getDate() + 6)
            lastDate = getDateString(day)
        }

        const config = {
            params: {
                from: firstDate,
                to: lastDate
            }
        }
        try {
            const response = await axiosWithToken(`trackedtime/listownfromtoclock/`, config)

            console.log(response)
            setWeekNum(`Week ${weekNum}`)


            //get clock in and out
            for (let week of response.data.detail_weekly) {
                if (week.week === weekNum) {

                    setWeekClockIn(week.first_clock_average.slice(0,5))
                    setWeekClockOut(week.last_clock_average.slice(0,5))
                    setWeekBreakTime(formatTimeFromMinutes(Math.round((week.time_span_average-week.duration_average)/60)))
                    setWeekWorkTime(formatTimeFromMinutes(Math.round(week.duration_average/60)))
                    setWeekBreakNum(week.breaks_average.toFixed(1))
                    setWeekBreakTimePerBreak(formatTimeFromMinutes2(Math.round((week.time_span_average-week.duration_average)/60/week.breaks_average)))
                    const dataArray = []
                    for (let day of response.data.detail) {
                        const dayDate = new Date(parseInt(day.date.slice(0,4)),parseInt(day.date.slice(5,7))-1,parseInt(day.date.slice(8,10)))
                        if (getISOWeek(dayDate) === weekNum) {
                            const inHours = parseInt(day.first_clock.slice(11,13))
                            const inMinutes = parseInt(day.first_clock.slice(14,16))/60
                            const inSeconds = parseInt(day.first_clock.slice(17,19))/3600
                            const inClock = Math.round(inHours + inMinutes + inSeconds).toFixed(1)
                            const outHours = parseInt(day.last_clock.slice(11,13))
                            const outMinutes = parseInt(day.last_clock.slice(14,16))/60
                            const outSeconds = parseInt(day.last_clock.slice(17,19))/3600
                            const outClock = (outHours + outMinutes + outSeconds).toFixed(1)
                            const dataEntry = {
                                "Day": `${dayDate.getFullYear()}.${dayDate.getMonth()+1}.${dayDate.getDate()}`,
                                "Time at work" : [inClock, outClock]
                            }

                            dataArray.push(dataEntry)
                        }
                    }
                    console.log(dataArray)
                    setWeekDataChart(dataArray)


                }

            }
        } catch (error) {
            setWeekNum(`Week ${weekNum}`)
            setWeekClockIn("08:00")
            setWeekClockOut("18:00")
            setWeekBreakTime("02:00")
            setWeekWorkTime("08:00")
            setWeekBreakNum(4)
            setWeekBreakTimePerBreak("20 min")
            setWeekDataChart([])

        }
    }


    const getMonthInfo = async (myDay) => {


        setIsWeek(false)

        let day = new Date();
        let monthNum = day.getMonth()
        let monthYear = day.getFullYear()
        setWeekDate(day)
        let firstDate = getDateString(new Date(monthYear,monthNum,1));
        let lastDate = getDateString(new Date(monthYear,monthNum+1,1));
        if (myDay) {
            console.log(myDay)
            day = myDay;
            monthNum = day.getMonth()
            monthYear = day.getFullYear()
            setWeekDate(day)
            firstDate = getDateString(new Date(monthYear,monthNum,1));
            lastDate = getDateString(new Date(monthYear,monthNum+1,1));
            console.log("finish")
        }

        const config = {
            params: {
                from: firstDate,
                to: lastDate
            }
        }
        try {
            const response = await axiosWithToken(`trackedtime/listownfromtoclock/`, config)

            setWeekNum(getMonthName(monthNum).toString())

            //get clock in and out
            for (let month of response.data.detail_monthly) {
                if (month.month === monthNum+1) {

                    setWeekClockIn(month.first_clock_average.slice(0,5))
                    setWeekClockOut(month.last_clock_average.slice(0,5))
                    setWeekBreakTime(formatTimeFromMinutes(Math.round((month.time_span_average-month.duration_average)/60)))
                    setWeekWorkTime(formatTimeFromMinutes(Math.round(month.duration_average/60)))
                    setWeekBreakNum(month.breaks_average.toFixed(1))
                    setWeekBreakTimePerBreak(formatTimeFromMinutes2(Math.round((month.time_span_average-month.duration_average)/60/month.breaks_average)))
                    const dataArray = []
                    for (let day of response.data.detail) {
                        const dayDate = new Date(parseInt(day.date.slice(0,4)),parseInt(day.date.slice(5,7))-1,parseInt(day.date.slice(8,10)))
                        if (dayDate.getMonth() === monthNum) {
                            const inHours = parseInt(day.first_clock.slice(11,13))
                            const inMinutes = parseInt(day.first_clock.slice(14,16))/60
                            const inSeconds = parseInt(day.first_clock.slice(17,19))/3600
                            const inClock = Math.round(inHours + inMinutes + inSeconds).toFixed(1)
                            const outHours = parseInt(day.last_clock.slice(11,13))
                            const outMinutes = parseInt(day.last_clock.slice(14,16))/60
                            const outSeconds = parseInt(day.last_clock.slice(17,19))/3600
                            const outClock = (outHours + outMinutes + outSeconds).toFixed(1)
                            const dataEntry = {
                                "Day": `${dayDate.getFullYear()}.${dayDate.getMonth()+1}.${dayDate.getDate()}`,
                                "Time at work" : [inClock, outClock]
                            }

                            dataArray.push(dataEntry)
                        }
                    }
                    console.log(dataArray)
                    console.log(weekNum)
                    setWeekDataChart(dataArray)

                }
            }
        } catch (error) {
            setWeekNum(getMonthName(monthNum))
            setWeekClockIn("08:00")
            setWeekClockOut("18:00")
            setWeekBreakTime("02:00")
            setWeekWorkTime("08:00")
            setWeekBreakNum(4)
            setWeekBreakTimePerBreak("20 min")
            setWeekDataChart([])

        }
    }


    const handleWeekMonthChange = () => {
        const selectElement = document.getElementById("weekMonthSelector");
        const selectedValue = selectElement.value;
        if (selectedValue === "week"){
            const myDate = new Date()
            getWeekInfo(myDate)
        } else {
            console.log("month")
            const myDate = new Date()
            getMonthInfo(myDate)
        };
    }


    const handleClickLeft = () => {
        if (isWeek){
            // const num = parseInt(weekNum.slice(6))
            const myDate = weekDate
            myDate.setDate(myDate.getDate() - 7)
            getWeekInfo(myDate)
        } else {
            const year = weekDate.getFullYear();
            const month = weekDate.getMonth();
            const day = weekDate.getDate();

            let myMonthYear = year;
            let myMonthMonth = month - 1;
            if (myMonthMonth < 0) {
            myMonthMonth = 11; // December of previous year
            myMonthYear -= 1;
            }

            const myDate = new Date(myMonthYear, myMonthMonth, day);
            getMonthInfo(myDate)
        }
    }
    const handleClickRight = () => {
        if (weekNum.slice(0,4)==="Week"){
            // const num = parseInt(weekNum.slice(6))
            const myDate = weekDate
            myDate.setDate(myDate.getDate() + 7)
            getWeekInfo(myDate)
        } else {
            const year = weekDate.getFullYear();
            const month = weekDate.getMonth();
            const day = weekDate.getDate();

            let myMonthYear = year;
            let myMonthMonth = month + 1;
            if (myMonthMonth > 11) {
            myMonthMonth = 0; // December of previous year
            myMonthYear += 1;
            }

            const myDate = new Date(myMonthYear, myMonthMonth, day);
            getMonthInfo(myDate)
        }
    }

    const data = []

    useEffect(() => {
        getWeekInfo();
    }, []);


    return (
                <div className="bg-stone-100 h-full w-full py-4 rounded-3xl">
                    <div className="tracking-wider text-xl px-9">Efficient Time</div>
                    <div className="flex px-9">
                        <p className="mt-3 tracking-wider text-sm">Show result per</p>
                        <select className="text-sm mt-3" id="selector" id="weekMonthSelector" name="selector" onChange={handleWeekMonthChange}>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                    </div>
                    <div className="mt-3 flex px-9">
                        <div className="flex justify-center items-center cursor-pointer w-1/12 semi-bold text-sm text-sky-600" onClick={handleClickLeft}>&lt;&lt;</div>
                        <div className="flex justify-center items-center w-10/12 semi-bold text-xs text-sky-600">{weekNum}</div>
                        <div className="flex justify-center items-center cursor-pointer w-1/12 semi-bold text-sm text-sky-600" onClick={handleClickRight}>&gt;&gt;</div>
                    </div>
                    <div className="EfficientTimeChart1 mt-2 p-3  h-40 flex items-center justify-center w-full">
                        <div className="EfficientTimeChart1  flex justify-center items-center  h-32 w-full">
                         <div className="flex-col h-32">
                           <div className="flex flex-col border-t border-zinc-400 justify-start h-1/5 text-xs text-red-700 p-1">
                             <p>Av. Clock-Out:</p>
                             <p className="italic font-bold">{weekClockOut}</p>
                           </div>
                           <div className="flex flex-col justify-end border-b border-zinc-400  h-4/5 mt-1 text-xs text-emerald-600 p-1">
                             <div>Av. Clock-In:</div>
                             <div className="font-bold italic">{weekClockIn}</div>
                           </div>
                         </div>
                         <div className="flex-col h-32 w-16">
                           <div className="bg-gray-400 h-1/5 w-full rounded"></div>
                           <div className="bg-emerald-500 h-4/5 w-full mt-1 rounded"></div>
                         </div>
                         {/*<div className="flex-col h-32 ml-1 w-3 ">*/}
                         {/*  <div className="h-1/5 w-full border-t border-zinc-400"></div>*/}
                         {/*  <div className="h-4/5 w-full mt-1 border-b border-zinc-400"></div>*/}
                         {/*</div>*/}

                         <div className="flex flex-col h-32 pl-2">
                           <div className="flex flex-col justify-center items-center h-1/5 text-sm">
                             <p className="tracking-wider text-xs">Av. break time:</p>
                             <p className="tracking-wider font-bold">{weekBreakTime}</p>
                           </div>
                           <div className="flex flex-col justify-center items-center h-4/5 text-sm ">
                             <p className="tracking-wider text-xs">Av. work time:</p>
                             <p className="tracking-wider font-bold">{weekWorkTime}</p>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="breakInfo mt-2 flex items-center justify-center ">
                        <div>
                          <p className="text-xl font-bold border border-solid h-20 w-20 flex items-center justify-center bg-white bg-opacity-30 rounded-2xl">{weekBreakNum}</p>
                        </div>
                        <div className="flex items-center justify-center ml-3 text-sm">
                          <p>Av. breaks/day</p>
                        </div>
                     </div>
                     <div className="breakInfo mt-2 flex items-center justify-center ">
                        <div>
                          <p className="text-lg font-bold border border-solid h-20 w-20 flex items-center justify-center bg-white bg-opacity-30 rounded-2xl">{weekBreakTimePerBreak}</p>
                        </div>
                        <div className="flex items-center justify-center ml-3 text-sm">
                          <p>Av. time/break</p>
                        </div>
                     </div>
                    <div style={{ transform: "translateX(-25px)" }}>
                        <ResponsiveContainer width="100%" height={180}>
                           <BarChart height={180} width={280} data={weekDataChart} margin={{top: 10, right: 0, bottom: 5, left: 20}} >
                              <XAxis dataKey="Day"
                                     fontSize={10}
                                     angle={-30} // rotate labels by 45 degrees
                                     textAnchor="end" // align labels to the end of the tick
                                     interval={0} // display all ticks
                              />
                              <YAxis ticks={6} domain={[6, 22]} fontSize={12} />
                              <Tooltip />
                              <Bar dataKey="Time at work"  fill="#773377" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
    );
  }

export default EfficientTime