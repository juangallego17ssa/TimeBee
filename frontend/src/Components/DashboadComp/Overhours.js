import React, {useEffect, useState} from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import {axiosTimeBee, axiosWithToken} from "../../api/axios";
import { ResponsiveTimeRange } from '@nivo/calendar'


const Overhours = () => {

  function getISOWeek(date) {
      const januaryFourth = new Date(date.getFullYear(), 0, 4);
      januaryFourth.setDate(januaryFourth.getDate() + (1 - januaryFourth.getDay()));
      const diff = date - januaryFourth;
      return Math.ceil((diff / 86400000 + 1) / 7);
    }

    function getMonthName(monthNumber) {
      const months = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
      return months[monthNumber];
    }

    function getDateString(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const [weekNum, setWeekNum] = useState("-")
    const [weekDate, setWeekDate] = useState("-")
    const [weekDataChart, setWeekDataChart] = useState([])
    const [overtimeChart, setOvertimeChart] = useState([])
    const [myFirstDate, setMyFirstDate] = useState("")
    const [myLastDate, setMyLastDate] = useState("")
    const [overtimeTotal, setOvertimeTotal] = useState(0)

    const getWeekInfo = async () => {

        let day = new Date();
        // setWeekDate(day)
        let weekNum = getISOWeek(day)
        // let dayOfWeek = day.getDay()
        let firstDate = getDateString(new Date(day.getFullYear(),0,1))
        setMyFirstDate(firstDate)
        let lastDate = day
        lastDate.setDate(lastDate.getDate() - 1)
        lastDate = getDateString(lastDate)
        setMyLastDate(lastDate)

        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
              "Content-Type": "application/json",
            },
            params: {
                from: firstDate,
                to: lastDate
            }
        }

        try {
            const response = await axiosTimeBee(`trackedtime/listownfromtoclock/`, config)
            // setWeekNum(`Week ${weekNum}`)

            const dataArray = []
            const overtimeArray = []
            let accOvertime = 0
            const lastDayPrevious = day
            let dayOfWeek = lastDayPrevious.getDay()
            lastDayPrevious.setDate(lastDayPrevious.getDate() - dayOfWeek)
            let accYearOvertime = 0
            for (let myDay of response.data.detail) {
                if(lastDayPrevious > new Date(parseInt(myDay.date.slice(0,4)),parseInt(myDay.date.slice(5,7))-1,parseInt(myDay.date.slice(8,10)))){
                    accYearOvertime += myDay.duration / 3600 - 8.5
                    overtimeArray.push({"value": (myDay.duration / 3600).toFixed(1), "day": myDay.date})
                }
            }
            for (let week of response.data.detail_weekly.sort((a, b) => a.week - b.week)) {
                if ((week.week >= weekNum -6) && (week.week < weekNum)){
                    accOvertime += week.duration_total/3600 - week.amount_days * 8.5
                    accYearOvertime += week.duration_total/3600 - week.amount_days * 8.5

                    const dataEntry = {
                        // "Day": `${dayDate.getFullYear()}.${dayDate.getMonth()+1}.${dayDate.getDate()}`,
                        // "Time at work" : [inClock, outClock]
                        "name": `Week ${week.week}`,
                        "Saldo Year": accYearOvertime.toFixed(1) ,
                        "Overtime": (week.duration_total/3600 - week.amount_days * 8.5).toFixed(1),
                        "Saldo Period": accOvertime.toFixed(1)
                    }
                    dataArray.push(dataEntry)
                }
            }
            setWeekDataChart(dataArray)
            setOvertimeChart(overtimeArray)
            setOvertimeTotal(dataArray[dataArray.length-1]["Saldo Year"])

        } catch (error) {
            setWeekNum(`Week ${weekNum}`)
        }
    }


    const getYearInfo = async (myDay) => {
        let day = new Date();
        setWeekDate(day)
        let weekNum = getISOWeek(day)
        // let dayOfWeek = day.getDay()
        let firstDate = getDateString(new Date(day.getFullYear(),0,1))
        setMyFirstDate(firstDate)
        let lastDate = day
        lastDate.setDate(lastDate.getDate() - 1)
        lastDate = getDateString(lastDate)
        setMyLastDate(lastDate)


        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
              "Content-Type": "application/json",
            },
            params: {
                from: firstDate,
                to: lastDate
            }
        }

        try {
            const response = await axiosTimeBee(`trackedtime/listownfromtoclock/`, config)

            setWeekNum(`Week ${weekNum}`)
            // setWeekDuration(week.first_clock_average.slice(0,5))

            //get clock in and out
            const dataArray = []
            const overtimeArray = []
            let accOvertime = 0
            const lastDayPrevious = day
            let dayOfWeek = lastDayPrevious.getDay()
            lastDayPrevious.setDate(lastDayPrevious.getDate() - dayOfWeek)
            let accYearOvertime = 0

            for (let day of response.data.detail) {
                if(lastDayPrevious > new Date(parseInt(day.date.slice(0,4)),parseInt(day.date.slice(5,7))-1,parseInt(day.date.slice(8,10)))){
                    overtimeArray.push({"value": (day.duration / 3600).toFixed(1), "day": day.date})
                }
            }

            for (let month of response.data.detail_monthly.sort((a, b) => a.month - b.month)) {

                accOvertime += month.duration_total/3600 - month.amount_days * 8.5
                accYearOvertime += month.duration_total/3600 - month.amount_days * 8.5

                const dataEntry = {
                    // "Day": `${dayDate.getFullYear()}.${dayDate.getMonth()+1}.${dayDate.getDate()}`,
                    // "Time at work" : [inClock, outClock]
                    "name": `${getMonthName(month.month-1)}`,
                    "Saldo Year": accYearOvertime ,
                    "Overtime": (month.duration_total/3600 - month.amount_days * 8.5),
                    "Saldo Period": accOvertime
                }
                dataArray.push(dataEntry)
            }
            setWeekDataChart(dataArray)
            setOvertimeChart(overtimeArray)
            console.log(overtimeArray[overtimeArray.length()-1])
            setOvertimeTotal(overtimeArray[overtimeArray.length()-1]["Saldo Year"])


        } catch (error) {
            setWeekNum(`Week ${weekNum}`)
        }
    }



    useEffect(() => {
        getWeekInfo();
    }, []);

    const handlelastOrYearChange = () => {
        const selectElement = document.getElementById("lastOrYearSelector");
        const selectedValue = selectElement.value;
        if (selectedValue === "weeks"){
            getWeekInfo()
        } else {
            getYearInfo()
        };
    }

    return (


        <div className="w-full h-full py-7 px-7">
            <div>
                <div className="topPart flex flex-row">
                    <div className="leftPart w-8/12 flex flex-col h-full">
                        <div className="tracking-wider text-xl">Overtime</div>
                        <div className="flex mt-3">
                            <p className="ml-8 tracking-wider text-sm">Show result for: </p>
                            <select className="text-sm ml-4 bg-teal-400 text-white rounded-2xl" id="selector" id="lastOrYearSelector" name="selector" onChange={handlelastOrYearChange}>
                                <option value="weeks">Last 6 Weeks</option>
                                <option value="year">Whole year</option>
                            </select>
                        </div>
                        <p className="ml-8 tracking-wider text-xs italic">All data in hours (h) </p>
                        <div className="h-80 mt-8">
                            <ResponsiveContainer>
                                <ComposedChart data={weekDataChart} className="">
                                    <XAxis dataKey="name"  fontSize={14}/>
                                    <YAxis label={{ value:'h'}} />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Area type="monotone" dataKey="Saldo Year" fill="#A5EDDD" stroke="#2ACCA6" />
                                    <Bar dataKey="Overtime" barSize={20} fill="#2ACCA6" />
                                    <Line type="monotone" dataKey="Saldo Period" stroke="#ff7300" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-10 ml-8">Yearly Overview:</div>
                    </div>
                    <div className="rigthPart w-4/12 flex flex-col justify-center items-center">
                        <div className="flex justify-center align-center">
                            <div className="h-40 w-40 p-3 text-7xl border border-solid text-zinc-500 border-zinc-300 flex justify-center items-center">
                                <div className="flex flex-row items-end">
                                    <p>{overtimeTotal?overtimeTotal.split(".")[0]:0}</p>
                                    <p className="text-3xl">,{overtimeTotal?overtimeTotal.split(".")[1]:0} </p>
                                    <p className="text-lg">h</p></div>
                                </div>
                        </div>
                        <p className="mt-5 flex text-zinc-600 justify-center items-center text-center">OVERTIME<br/>ACCUMULATED</p>
                    </div>
                </div>
                <div className="bottomPart">
                    <div className="h-80">
                        <ResponsiveTimeRange
                            data={overtimeChart}
                            from={myFirstDate}
                            to={myLastDate}
                            emptyColor="#eeeeee"
                            colors={[ '#000000', '#000000', '#000000', '#000000', '#000000', '#f47560', '#e8c1a0', '#97e3d5', '#61cdbb' ]}
                            margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
                            dayBorderWidth={2}
                            dayBorderColor="#ffffff"
                        />
                    </div>
                </div>
            </div>
        </div>

    )

}


export default Overhours

