import React, { useState,useRef,useEffect } from 'react';
import { GiBee } from "react-icons/gi";
import { AiFillTag ,AiOutlineClockCircle, AiOutlineUnorderedList } from "react-icons/ai";
import TimerBar from '../Components/TimetrackerComp/TimerBar';
import Timer from '../Components/TimetrackerComp/Timer';
import { FaRegCalendarAlt } from "react-icons/fa";
import ProjectOptions from '../Components/ProjectTagComp/ProjectOptions';

import { 
  useGetTrackedTimeQuery, 
  useCreateTrackedTimeMutation,
  useGetOwnTrackedTimeQuery,
} from '../api/API';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackedTimeOwn } from '../redux/Slices/trackedTimeOwnSlice';
import CalendarComponent from '../Components/CalendarComp/Calendar';
import { Views } from 'react-big-calendar';
import AddTimeTracker from '../Components/TimetrackerComp/AddTimeTracker';


function Timetracker() {

// Fetch all the TrackedItems of the actual user and store it in Redux
  const dispatch = useDispatch();
  const reduxTrackedTime = useSelector((store) => store.trackedtime.trackedtime);
 
  useEffect(() => {
    dispatch(fetchTrackedTimeOwn());
    
  }, []);
  // const reduxTrackedTime = useSelector((store) => store.trackedtime);
  // console.log(reduxTrackedTime);

  const [selectedDate, setSelectedDate]=useState('')
  const [isManual, setIsManual] = useState(false);
  const [showProjectTags, setShowProjectTags] = useState(false);
  const [selectedProject,setSelectedProject] = useState({});

// GET all tasks created by USER 
  const { data : tasks,isLoading,isSuccess,isError} = useGetOwnTrackedTimeQuery()
    // filter out login/logout
      const filteredTask = tasks?.filter(task=>task.type_of_input !== "0");
      const TasksOfDay = filteredTask?.filter(task=>new Date(task.start).toDateString() === new Date().toDateString())
        console.log('task for the day:',TasksOfDay)
      // console.log(new Date(tasks[0].start).toDateString())
      // console.log(new Date().toDateString())
      
      const handleSearch = (event) => {
        event.preventDefault();
        // refetch();
        // perform the search operation here
      };
      

  const handelDateChanged =(e) =>{
    e.preventDefault();
    console.log('handelDateChanged')
  }

  return (
    // Create timer inputs
    <div className=" Page flex flex-col flex-grow bg-stone-100 w-full h-full gap-4 px-8 py-4">
      <div>
        <div className="flex items-center w-full gap-2 px-4">
          <AddTimeTracker isManual={isManual} />
          <div classNameName="flex flex-col">
            <div>
              <AiOutlineClockCircle
                className={`${
                  isManual ? "text-zinc-400" : "text-teal-400"
                } text-xl hover:cursor-pointer hover:text-teal-500`}
                onClick={() => setIsManual(false)}
              />
            </div>
            <div>
              <AiOutlineUnorderedList
                className={`${
                  isManual ? "text-teal-400" : "text-zinc-400"
                } text-xl hover:cursor-pointer hover:text-teal-500`}
                onClick={() => setIsManual(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-[80vh]">
        <div className=" Leftcontainer md:w-3/5 flex flex-col px-6 pb-3">
          <div className="flex my-2 mx-4">
            <p className="mr-4">Monday</p>
            <FaRegCalendarAlt
              className="flex flexwrap w-5 h-5 text-black hover:text-pink-500 mt-0.5"
              onClick={handelDateChanged}
            />
          </div>
          <div className="flex flex-col-reverse justify-end items-center gap-4 bg-stone-100  ">
            {isLoading && <div>Loading</div>}
            {filteredTask?.map((task) => (
              <TimerBar
                key={task.id}
                task={task}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
            ))}

            {/* <TimerBar addProject={addProject} /> */}
          </div>
        </div>
        <div className="flex-1  items-center px-6 pb-3 bg-stone-100">
          <CalendarComponent
            events={reduxTrackedTime}
            views={{
              day: true,
            }}
            defaultView={Views.DAY}
          />
        </div>
      </div>
    </div>
  );
  }
  
  export default Timetracker;