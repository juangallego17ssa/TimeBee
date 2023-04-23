import React, { useState,useRef,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from './BarChart';
import PieChart from '../PieChart/PieChart';
import { fetchTrackedTimeOwn } from '../../redux/Slices/trackedTimeOwnSlice';
import moment from "moment";
import RadialChart from './RadialChart';
import MyResponsiveBar from './BarChart';
import { axiosWithToken } from "../../api/axios";
import Calendar from 'react-calendar';
import "../ReportComp/Calendar_styles.css";
import { FaRegCalendarAlt } from "react-icons/fa";


function DataProject() {

    // Fetch all the TrackedItems of the actual user and store it in Redux
    const dispatch = useDispatch();
    // const reduxTrackedTime = useSelector((store) => store.trackedtime.trackedtime);
    
    useEffect(() => {
        dispatch(fetchTrackedTimeOwn());
    
    }, []);

    const [selectedOption, setSelectedOption] = useState('week');
    const [trackedTimerange, setTrackedTimeRange] = useState([]);
    const [value, setValue] = useState(new Date());
    const [datePicker, setDatePicker] = useState(false);
    const [inputChange, setInputChange] = useState(false)

   
    function handleOptionChange(event) {
        setSelectedOption(event.target.value);
    }

    function handleDatePickerChange() {
        setDatePicker(!datePicker)
    }

    function handleInputChange(event) {
        setInputChange(event.target.checked)
    }
    
    //------------------Select Date by Datepicker-----------------------

    console.log(value)
    let todayPick = value[1];
    let startdayPick = value[0];

    // console.log(todayPick)
    // console.log(startdayPick)

    //--------Filtering Data by Week, Month, Year with select--------
    const today = new Date();

    let startday; 

    if (selectedOption === 'week') {
        const OneWeekAgo = new Date();
        OneWeekAgo.setDate(today.getDate()-7)
        startday = OneWeekAgo;
    } else if (selectedOption === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        startday = oneMonthAgo;
    } else if (selectedOption === 'year') {
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        startday = oneYearAgo;
    }


    if (inputChange === false) {
        todayPick = today
        startdayPick = startday
    }
    
    console.log(inputChange)
    
    // console.log(startday)
    ///trackedtime/?start_date=2023-04-01&end_date=2023-04-30 endpoint to get user info an all tracked times

    useEffect(() => {
        const endDateString = moment(todayPick).format('YYYY-MM-DD');
        const startDateString = moment(startdayPick).format('YYYY-MM-DD');
        const getTrackedTime = async () => {
               const response = await axiosWithToken(`trackedtime/?start_date=${startDateString}&end_date=${endDateString}`)
               setTrackedTimeRange(response.data)   
           }
          getTrackedTime()
        
           console.log(startDateString)
           console.log(endDateString)
        
    }, [selectedOption,value])
    



 //--------FOR BAR CHART-------------------------------------------------    
// Filter all Task by project and by Day and not Clock in/out
    const dataTimeOwn = trackedTimerange.reduce((acc, item) => {
        if (item.stop !== null && item.type_of_input !== "0") {
          const project = item.project.name;
          const day = moment(item.stop).format('MMM DD');
          const duration = moment.duration(moment(item.stop).diff(moment(item.start)));
          
          // Add the item to the array for the current day
          if (!acc[day]) {
            acc[day] = [];
          }
          acc[day].push({ project, duration });
        }
        return acc;
    }, {});
      
    // Calculate the duration per project
    for (const day in dataTimeOwn) {
        dataTimeOwn[day] = dataTimeOwn[day].sort((a, b) => b.duration.asMilliseconds() - a.duration.asMilliseconds());
        const projectDurations = dataTimeOwn[day].reduce((acc, item) => {
        const { project, duration } = item;
        const hours = Math.abs(parseFloat((duration.asMinutes() / 60).toFixed(2))); // hours in decimal round to 2 digits
        // const minutes = Math.floor(duration.asMinutes() % 60);
        // const formattedDuration = `${hours}h ${minutes}m`;
        if (acc[project]) {
            acc[project] += hours;
        } else {
             acc[project] = hours;
        }
        return acc;
        }, {});
        dataTimeOwn[day] = projectDurations;
    }
   
      
    console.log(dataTimeOwn);
    
    // Preparing Data for Chart
    const newdata = Object.keys(dataTimeOwn).map((day) => {
        const projects = dataTimeOwn[day];
        const date = day;//.toISOString(); // convert day string to ISO date format
        const projectData = Object.keys(projects).reduce((acc, project) => {
            const duration = projects[project];
            acc[project] = duration;
            return acc;
        }, {});
        return { date, ...projectData };
    });
    //Sorting the dates for Chart from the PAST to FUTURE
    newdata.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();
    // console.log(newdata);

    //Getting the keys to pass to BAR CHarts
    const projects = Object.values(dataTimeOwn).reduce((acc, item) => {
        Object.keys(item).forEach(project => {
          if (!acc.includes(project)) {
            acc.push(project);
          }
        });
        return acc;
    }, []);
    //-------------------------------End BAR Chart---------------------------------
    //------------------Start Pie Chart--------------------------------------------
    // Group by Project and calculate duration from start stop by day and not Clock in/out
    const dataTimeOwnSum = trackedTimerange.reduce((acc, item) => {
        if (item.stop !== null && item.type_of_input !== "0") {
            const project = item.project.name;
            const day = moment(item.stop).format('MMM DD');
            const duration = moment.duration(moment(item.stop).diff(moment(item.start)));
    
            // Add the item to the array for the current day
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push({ project, duration });
        }
        return acc;
    }, {});
    
    // Calculate the duration per project
    const projectDurations = {};
    for (const day in dataTimeOwnSum) {
        dataTimeOwnSum[day].forEach(item => {
            const { project, duration } = item;
            const hours = Math.abs(parseFloat((duration.asMinutes() / 60).toFixed(2)));
            if (projectDurations[project]) {
                projectDurations[project] += hours;
            } else {
                projectDurations[project] = hours;
            }
        });
    }
    
    // Convert project durations object to array of objects and sort by duration
    const sortedProjects = Object.entries(projectDurations)
        .map(([project, duration]) => ({ project, duration }))
        .sort((a, b) => b.duration - a.duration);
    
    // console.log(sortedProjects);
    // Transfer data into Chart data
    const dataPie = sortedProjects.map((item, index) => ({
        id: item.project,
        label: item.project,
        value: item.duration,
    }));
    //---------------------PIE Chart ENDs---------------------
    //--------------------Start Radial Chart---------------------

    // Group by Project every task and duration and not Clock in/out
    const dataTimeOwnProject = trackedTimerange.reduce((acc, item) => {
         if (item.stop !== null && item.type_of_input !== "0") {
             const project = item.project.name;
             const task_name = item.task_name;
             const duration = moment.duration(moment(item.stop).diff(moment(item.start)));
             const hours = Math.abs(parseFloat((duration.asMinutes() / 60).toFixed(2)));
    
             // Add the item to the array for the current day
             if (!acc[project]) {
                 acc[project] = [];
             }
             acc[project].push({ task_name, hours });
         }
         return acc;
     }, {});

    // console.log(reduxTrackedTime)
    console.log(dataTimeOwnProject)

    const dataRadial = [];
    for (const [project, items] of Object.entries(dataTimeOwnProject)) {
        const projectData = {
          id: project,
          data: [],
        };
      
        for (const item of items) {
          const taskData = {
            x: item.task_name,
            y: item.hours,
          };
          projectData.data.push(taskData);
        }
      
        dataRadial.push(projectData);
    }

    console.log(dataRadial)


  return (
    // Create Barchart
      <div className=" Container flex flex-col flex-grow bg-stone-100 w-full md:h-full px-8 py-4 rounded-3xl overflow-scroll">
          <div className='flex flex-rows justify-start items-start'>
            <label htmlFor='toggle-switch'>
                <input type="checkbox" checked={inputChange} onChange={handleInputChange} id="toggle-switch" className="cursor-pointer h-5 w-8 rounded-full appearance-none border-teal-400 bg-opacity-10 border-2 checked:bg-teal-400 transition duration-200 relative"/>
            </label>
              {inputChange ?
                <div className='flex px-2'>
                  <FaRegCalendarAlt onClick={handleDatePickerChange} />
                  {datePicker &&
                      <div>
                          <Calendar onChange={setValue} value={value} showWeekNumbers={true}
                              selectRange={true}
                              defaultValue={value} />
                      </div>}
                </div>
                  :
                  <div className='flex px-2'>
                      <select value={selectedOption} onChange={handleOptionChange} className='bg-teal-400 text-white rounded-2xl px-2'>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                          <option value="year">Year</option>
                      </select>
                      {/* <p>You selected {selectedOption}</p> */}
                      <p className='text-sm px-2'>Start date: {moment(startday).format('YYYY-MM-DD')}</p>
                      <p className='text-sm px-2'>End date: {moment(today).format('YYYY-MM-DD')}</p>
                  </div>
              }
        </div>
        <div className=" Container flex flex-col flex-grow w-full md:h-full">
          <BarChart data={newdata} keys={projects}/>  
        </div >
          <div className=" Container flex flow-col md:flex-rows flex-grow w-full md:h-full">
            <div className=" Container flex flex-grow w-1/2 md:h-full ">
                <PieChart data={dataPie} />
            </div>
            <div className=" Container flex  flex-grow  w-1/2 md:h-full">
              <RadialChart data={dataRadial} />
            </div>
        </div>  
    </div>
  );
  }
  
  export default DataProject;