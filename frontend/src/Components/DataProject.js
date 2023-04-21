import React, { useState,useRef,useEffect } from 'react';
import { 
    useGetOwnProjectsQuery,
  useGetOwnTrackedTimeQuery,
} from '../api/API';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from '../Components/BarChart';
import PieChart from '../Components/PieChart/PieChart';
import { fetchTrackedTimeOwn } from '../redux/Slices/trackedTimeOwnSlice';
import moment from "moment";





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
    const [dataChart, setDataChart] = useState([{}]);
    
    // GET all project created by USER
    const { data: projects, isLoadingProject, isSuccessProject, isErrorProject } = useGetOwnProjectsQuery()
    // console.log(projects)
    


    // GET all tasks created by USER 
    const { data: tasks, isLoading, isSuccess, isError } = useGetOwnTrackedTimeQuery()
    // filter by project
    const projectTask = tasks?.filter(task => task.type_of_input !== "0");
    
    //console.log(filteredTask)
    // console.log(projectTask)
    //   const TasksOfDay = filteredTask?.filter(task=>new Date(task.start).toDateString() === new Date().toDateString())
    //     console.log('task for the day:',TasksOfDay)
    // console.log(new Date(tasks[0].start).toDateString())
    // console.log(new Date().toDateString())
  

    const dataTimeOwn = reduxTrackedTime;

    const durations = dataTimeOwn
      .filter((item) => item.stop !== null)
      .reduce((acc, item) => {
        const project = item.project.name;
        const duration = moment.duration(
          moment(item.stop).diff(moment(item.start))
        );
        acc[project] = acc[project] ? acc[project].add(duration) : duration;
        // console.log(acc);
        return acc;
      }, {});
    
    // console.log(dataTimeOwn)

    console.log(durations)
    
    const data = [
        {
            "date": "2023-04-20T14:12:04.424000+02:00",
            "unassigned": 2,
            "unassignedColor": "hsl(89, 70%, 50%)",
            "project1": 4,
            "project1Color": "hsl(71, 70%, 50%)",
            "project2": 5,
            "project2Color": "hsl(124, 70%, 50%)",
            "project3": 2,
            "project3Color": "hsl(115, 70%, 50%)",
        },
        {
            "date": "2023-05-20T14:12:04.424000+02:00",
            "unassigned": 2,
            "unassignedColor": "hsl(89, 70%, 50%)",
            "project1": 4,
            "project1Color": "hsl(71, 70%, 50%)",
            "project2": 5,
            "project2Color": "hsl(124, 70%, 50%)",
            "project3": 2,
            "project3Color": "hsl(115, 70%, 50%)",
        },
        {
            "date": "2023-06-20T14:12:04.424000+02:00",
            "unassigned": 2,
            "unassignedColor": "hsl(89, 70%, 50%)",
            "project1": 4,
            "project1Color": "hsl(71, 70%, 50%)",
            "project2": 5,
            "project2Color": "hsl(124, 70%, 50%)",
            "project3": 2,
            "project3Color": "hsl(115, 70%, 50%)",
        },
        {
            "date": "2023-07-20T14:12:04.424000+02:00",
            "unassigned": 2,
            "unassignedColor": "hsl(89, 70%, 50%)",
            "project1": 4,
            "project1Color": "hsl(71, 70%, 50%)",
            "project2": 5,
            "project2Color": "hsl(124, 70%, 50%)",
            "project3": 2,
            "project3Color": "hsl(115, 70%, 50%)",
        },
        {
            "date": "2023-08-20T14:12:04.424000+02:00",
            "unassigned": 2,
            "unassignedColor": "hsl(89, 70%, 50%)",
            "project1": 4,
            "project1Color": "hsl(71, 70%, 50%)",
            "project2": 5,
            "project2Color": "hsl(124, 70%, 50%)",
            "project3": 2,
            "project3Color": "hsl(115, 70%, 50%)",
        },
        {

            "date": "2023-09-20T14:12:04.424000+02:00",
            "unassigned": 3,
            "unassignedColor": "hsl(89, 70%, 50%)",
            "project1": 6,
            "project1Color": "hsl(71, 70%, 50%)",
            "project3": 2,
            "project3Color": "hsl(124, 70%, 50%)",
        },
        {

            "date": "2023-10-20T14:12:04.424000+02:00",
            "unassigned": 3,
            "unassignedColor": "hsl(89, 70%, 50%)",
            "project1": 6,
            "project1Color": "hsl(71, 70%, 50%)",
            "project3": 2,
            "project3Color": "hsl(124, 70%, 50%)",
        },
        {

            "date": "2023-11-20T14:12:04.424000+02:00",
            "unassigned": 3,
            "unassignedColor": "hsl(89, 70%, 50%)",
            "project1": 6,
            "project1Color": "hsl(71, 70%, 50%)",
            "project3": 2,
            "project3Color": "hsl(124, 70%, 50%)",
        }]
    
    const dataPie = [
        {
          "id": "erlang",
          "label": "erlang",
          "value": 418,
          "color": "hsl(143, 70%, 50%)"
        },
        {
          "id": "sass",
          "label": "sass",
          "value": 341,
          "color": "hsl(194, 70%, 50%)"
        },
        {
          "id": "javascript",
          "label": "javascript",
          "value": 323,
          "color": "hsl(176, 70%, 50%)"
        },
        {
          "id": "java",
          "label": "java",
          "value": 126,
          "color": "hsl(329, 70%, 50%)"
        },
        {
          "id": "hack",
          "label": "hack",
          "value": 166,
          "color": "hsl(27, 70%, 50%)"
        }
      ]
    

  return (
    // Create Barchart
      <div className=" Page flex flex-col flex-grow bg-stone-100 w-full md:h-screen gap-4 px-8 py-4">
          <input type="date"/>
          <BarChart data={data} />
          <PieChart data={dataPie}/>
    </div>
  );
  }
  
  export default DataProject;