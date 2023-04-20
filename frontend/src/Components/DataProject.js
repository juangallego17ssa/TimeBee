import React, { useState,useRef,useEffect } from 'react';
import { 
    useGetOwnProjectsQuery,
  useGetOwnTrackedTimeQuery,
} from '../api/API';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from '../Components/BarChart';
import { fetchTrackedTimeOwn } from '../redux/Slices/trackedTimeOwnSlice';





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
    const [showProjectTags, setShowProjectTags] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    
    // GET all project created by USER
    const { data: projects, isLoadingProject, isSuccessProject, isErrorProject } = useGetOwnProjectsQuery()
    console.log(projects)
    


    // GET all tasks created by USER 
    const { data: tasks, isLoading, isSuccess, isError } = useGetOwnTrackedTimeQuery()
    // filter by project
    const projectTask = tasks?.filter(task => task.type_of_input !== "0");
    
    //console.log(filteredTask)
    console.log(projectTask)
    //   const TasksOfDay = filteredTask?.filter(task=>new Date(task.start).toDateString() === new Date().toDateString())
    //     console.log('task for the day:',TasksOfDay)
    // console.log(new Date(tasks[0].start).toDateString())
    // console.log(new Date().toDateString())
      
    const data = [
        {
            "days": "2023-04-20T14:12:04.424000+02:00",
            "unassigned": 50,
            "unassignedColor": "hsl(89, 70%, 50%)",
            "burger": 42,
            "burgerColor": "hsl(71, 70%, 50%)",
            "sandwich": 121,
            "sandwichColor": "hsl(124, 70%, 50%)",
            "kebab": 141,
            "kebabColor": "hsl(115, 70%, 50%)",
            "fries": 195,
            "friesColor": "hsl(316, 70%, 50%)",
            "donut": 95,
            "donutColor": "hsl(3, 70%, 50%)"
        },
        {

            "days": "2023-05-20T14:12:04.424000+02:00",
            "unassigned": 50,
            "unassignedColor": "hsl(89, 70%, 50%)",
            "burger": 42,
            "burgerColor": "hsl(71, 70%, 50%)",
            "sandwich": 121,
            "sandwichColor": "hsl(124, 70%, 50%)",
            "kebab": 141,
            "kebabColor": "hsl(115, 70%, 50%)",
            "fries": 195,
            "friesColor": "hsl(316, 70%, 50%)",
            "donut": 95,
            "donutColor": "hsl(3, 70%, 50%)"
        }]

 

  return (
    // Create Barchart
      <div className=" Page flex flex-col flex-grow bg-stone-100 w-full md:h-screen gap-4 px-8 py-4">
          <input type="date"/>
       <BarChart data={data}/>
    </div>
  );
  }
  
  export default DataProject;