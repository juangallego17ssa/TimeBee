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
import {axiosWithToken} from "../../api/axios";

const Overhours = () => {

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

    function getDateString(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const [weekNum, setWeekNum] = useState("-")
    const [isWeek, setIsWeek] = useState(true)
    const [weekDate, setWeekDate] = useState("-")
    const [weekDataChart, setWeekDataChart] = useState([])


    const getWeekInfo = async (myDay) => {
        setIsWeek(true)
        let day = new Date();
        setWeekDate(day)
        let weekNum = getISOWeek(day)
        let dayOfWeek = day.getDay()
        let firstDate = getDateString(new Date(day.getFullYear(),0,1))
        let lastDate = getDateString(day)



        // if (myDay) {
        //     console.log(myDay)
        //     setWeekDate(day)
        //     let weekNum = getISOWeek(day)
        //     let dayOfWeek = day.getDay()
        //     day.setDate(day.getDate() - dayOfWeek - 6*7)
        //
        //     let firstDate = getDateString(day);
        //     day.setDate(day.getDate() + 6 + 5*7)
        //     let lastDate = getDateString(day)
        // }

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
            // setWeekDuration(week.first_clock_average.slice(0,5))

            //get clock in and out
            const dataArray = []
            let accOvertime = 0
            const lastDayPrevious = day
            let dayOfWeek = lastDayPrevious.getDay()
            lastDayPrevious.setDate(lastDayPrevious.getDate() - dayOfWeek - 7*6)
            let accYearOvertime = 0
            for (let day of response.data.detail) {
                if(lastDayPrevious > new Date(parseInt(day.date.slice(0,4)),parseInt(day.date.slice(5,7))-1,parseInt(day.date.slice(8,10)))){
                    accYearOvertime += day.duration / 3600 - 8.5
                }
            }
            for (let week of response.data.detail_weekly) {
                if ((week.week >= weekNum -6) && (week.week < weekNum)){
                    console.log(week)
                    accOvertime += week.duration_total/3600 - week.amount_days * 8.5
                    accYearOvertime += week.duration_total/3600 - week.amount_days * 8.5

                    const dataEntry = {
                        // "Day": `${dayDate.getFullYear()}.${dayDate.getMonth()+1}.${dayDate.getDate()}`,
                        // "Time at work" : [inClock, outClock]
                        "name": `Week ${week.week}`,
                        "yearsaldo": accYearOvertime ,
                        "over/under-time": (week.duration_total/3600 - week.amount_days * 8.5),
                        "saldo": accOvertime
                    }
                    dataArray.push(dataEntry)
                }
            }
            console.log(dataArray)
            setWeekDataChart(dataArray)

        } catch (error) {
            setWeekNum(`Week ${weekNum}`)
        }
    }


    const getYearInfo = async (myDay) => {
        setIsWeek(true)
        let day = new Date();
        setWeekDate(day)
        let weekNum = getISOWeek(day)
        let dayOfWeek = day.getDay()
        let firstDate = getDateString(new Date(day.getFullYear(),0,1))
        let lastDate = day
        lastDate.setDate(lastDate.getDate() - 1)
        lastDate = getDateString(lastDate)



        // if (myDay) {
        //     console.log(myDay)
        //     setWeekDate(day)
        //     let weekNum = getISOWeek(day)
        //     let dayOfWeek = day.getDay()
        //     day.setDate(day.getDate() - dayOfWeek - 6*7)
        //
        //     let firstDate = getDateString(day);
        //     day.setDate(day.getDate() + 6 + 5*7)
        //     let lastDate = getDateString(day)
        // }

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
            // setWeekDuration(week.first_clock_average.slice(0,5))

            //get clock in and out
            const dataArray = []
            let accOvertime = 0
            const lastDayPrevious = day
            let dayOfWeek = lastDayPrevious.getDay()
            lastDayPrevious.setDate(lastDayPrevious.getDate() - dayOfWeek - 7*6)
            let accYearOvertime = 0

            for (let month of response.data.detail_monthly) {

                accOvertime += month.duration_total/3600 - month.amount_days * 8.5
                accYearOvertime += month.duration_total/3600 - month.amount_days * 8.5

                const dataEntry = {
                    // "Day": `${dayDate.getFullYear()}.${dayDate.getMonth()+1}.${dayDate.getDate()}`,
                    // "Time at work" : [inClock, outClock]
                    "name": `${getMonthName(month.month-1)}`,
                    "yearsaldo": accYearOvertime ,
                    "over/under-time": (month.duration_total/3600 - month.amount_days * 8.5),
                    "saldo": accOvertime
                }
                dataArray.push(dataEntry)
            }
            console.log(dataArray)
            setWeekDataChart(dataArray)

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
            console.log("year")
            getYearInfo()
        };
    }

    return (


        <div className="w-full h-full">
          <div className="leftPart w-9/12 flex flex-col h-full">
            <div className="tracking-wider text-xl px-9">Over-/Underhours</div>
            <div className="flex px-9">
              <p className="mt-3 tracking-wider text-sm">Show result per</p>
              <select className="text-sm mt-3" id="selector" id="lastOrYearSelector" name="selector" onChange={handlelastOrYearChange}>
              <option value="weeks">last 6 weeks</option>
              <option value="year">whole year</option>
            </select>
          </div>
          <div className="h-40 flex-1">
            <ResponsiveContainer>
              <ComposedChart width={400} height={235} data={weekDataChart} className="">
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area type="monotone" dataKey="yearsaldo" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="over/under-time" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="saldo" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rightPart w-3/12 h-full"></div>

        </div>

    )

}


export default Overhours

