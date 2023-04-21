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
    // const reduxTrackedTime = useSelector((store) => store.trackedtime);
    // console.log(reduxTrackedTime);

    const [selectedDate, setSelectedDate] = useState('')
    const [pieChart, setPieChart] = useState([
        
    ])

       
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
    console.log(newdata);

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
    
    console.log(sortedProjects);

    const dataPie = sortedProjects.map((item, index) => ({
        id: item.project,
        label: item.project,
        value: item.duration,
    }));
    //---------------------PIE Chart ENDs---------------------
    //--------------------Start Radial Chart---------------------

    








    const data=[
        {
          "id": "Supermarket",
          "data": [
            {
              "x": "Vegetables",
              "y": 70
            },
            {
              "x": "Fruits",
              "y": 45
            },
            {
              "x": "Meat",
              "y": 179
            },
            {
              "x": "Fish",
              "y": 117
            }
          ]
        },
        {
          "id": "Combini",
          "data": [
            {
              "x": "Vegetables",
              "y": 169
            },
            {
              "x": "Fruits",
              "y": 108
            },
            {
              "x": "Meat",
              "y": 79
            },
            {
              "x": "Fish",
              "y": 78
            }
          ]
        },
        {
          "id": "Online",
          "data": [
            {
              "x": "Vegetables",
              "y": 58
            },
            {
              "x": "Fruits",
              "y": 133
            },
            {
              "x": "Meat",
              "y": 122
            },
            {
              "x": "Fish",
              "y": 74
            }
          ]
        },
        {
          "id": "Marché",
          "data": [
            {
              "x": "Vegetables",
              "y": 82
            },
            {
              "x": "Fruits",
              "y": 249
            },
            {
              "x": "Meat",
              "y": 212
            },
            {
              "x": "Fish",
              "y": 289
            }
          ]
        }
      ]
  return (
    // Create Barchart
      <div className=" Page flex flex-col flex-grow bg-stone-100 w-full md:h-screen gap-4 px-8 py-4">
          <input type="date"/>
          <BarChart data={newdata} keys={projects} />
          <PieChart data={dataPie} />
          <RadialChart data={data} />
    </div>
  );
  }
  
  export default DataProject;