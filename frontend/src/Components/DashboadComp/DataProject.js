import React, { useState,useRef,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from './BarChart';
import PieChart from '../PieChart/PieChart';
import { fetchTrackedTimeOwn } from '../../redux/Slices/trackedTimeOwnSlice';
import moment from "moment";
import RadialChart from './RadialChart';


function DataProject() {

    // Fetch all the TrackedItems of the actual user and store it in Redux
    const dispatch = useDispatch();
    const reduxTrackedTime = useSelector((store) => store.trackedtime.trackedtime);
    
    useEffect(() => {
        dispatch(fetchTrackedTimeOwn());
    
    }, []);
    
    const [selectedDate, setSelectedDate] = useState('')
    
       
    // console.log(reduxTrackedTime)
    

 //--------FOR BAR CHART-------------------------------------------------    
// Filter all Task by project and by Day
    const dataTimeOwn = reduxTrackedTime.reduce((acc, item) => {
        if (item.stop !== null) {
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
        const hours = parseFloat((duration.asMinutes() / 60).toFixed(2)); // hours in decimal round to 2 digits
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
   
      
    // console.log(dataTimeOwn);
    
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
    
    const dataTimeOwnSum = reduxTrackedTime.reduce((acc, item) => {
        if (item.stop !== null) {
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
            const hours = parseFloat((duration.asMinutes() / 60).toFixed(2));
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

    const dataPie = sortedProjects.map((item, index) => ({
        id: item.project,
        label: item.project,
        value: item.duration,
    }));
    //---------------------PIE Chart ENDs---------------------
    //--------------------Start Radial Chart---------------------


    const dataTimeOwnProject = reduxTrackedTime.reduce((acc, item) => {
         if (item.stop !== null) {
             const project = item.project.name;
             const task_name = item.task_name;
             const duration = moment.duration(moment(item.stop).diff(moment(item.start)));
             const hours = parseFloat((duration.asMinutes() / 60).toFixed(2));
    
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

    // const dataRadial = Object.keys(dataTimeOwnProject).map((project, index) => {
    //     const data = dataTimeOwnProject[project].map(item => ({
    //       x: item.task_name,
    //       y: item.duration.asHours()
    //     }));
      
    //     return {
    //       id: project,
    //       data
    //     };
    // });
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
      <div className=" Page flex flex-col flex-grow bg-stone-100 w-full md:h-screen gap-4 px-8 py-4">
          <input type="date"/>
          <BarChart data={newdata} keys={projects} />
          <PieChart data={dataPie} />
          <RadialChart data={dataRadial} />
    </div>
  );
  }
  
  export default DataProject;