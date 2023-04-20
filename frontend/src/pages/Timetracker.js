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
      const TasksOfDay = filteredTask?.filter(task=>new Date(task.start).toDateString() === new Date(selectedDate).toDateString())
        // console.log('task for the day:',TasksOfDay)
        // console.log('selectedDate',selectedDate)
      // console.log(new Date(tasks[0].start).toDateString())
      // console.log(new Date().toDateString())
      
      const handleSearch = (event) => {
        event.preventDefault();
      };
      

  const handelDateChanged =(e) =>{
    e.preventDefault();
    console.log('handelDateChanged')
  }

 if(isLoading){
  <div>
    Loading...
  </div>
 } else if(isError){
  console.log('fetch Error')
 }
  return (
    <div className="flex flex-col flex-grow bg-stone-100 w-full md:h-full gap-4 px-8 py-4">

{/* //---- Create timer inputs ----// */}
        <div className='flex items-center w-full gap-2 px-4'>
          <AddTimeTracker isManual={isManual}/>
          <div className='flex flex-col'>
            <div>
              <AiOutlineClockCircle 
              className={`${isManual?'text-zinc-400':'text-teal-400'} text-xl hover:cursor-pointer hover:text-teal-500`}
              onClick={()=>setIsManual(false)}
              />
            </div>
            <div>
              <AiOutlineUnorderedList 
              className={`${isManual?'text-teal-400':'text-zinc-400'} text-xl hover:cursor-pointer hover:text-teal-500`}
              onClick={()=>setIsManual(true)}
              />
            </div>
          </div>
        </div>

    <div className='h-4/5 flex-1 flex flex-col md:flex-row '>
{/* //---- LEFT SECTION ----// */}
      <section className="h-full md:w-3/5 flex flex-col px-6">
        <div className="flex  -2 ">
          <button onClick={()=>setSelectedDate(new Date())}>Today</button>
          <FaRegCalendarAlt
            className="flex flexwrap w-5 h-5 text-black hover:text-pink-500"
            onClick={handelDateChanged}
          />
        </div>
        <div className="flex flex-col justify-start items-center gap-4 bg-stone-100 w-full h-full md:h-screen overflow-y-scroll py-2">
          {selectedDate?TasksOfDay.map((task) => (
            <TimerBar key={task.id} 
            task={task} 
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}/>
          ))
          :filteredTask?.map((task) => (
            <TimerBar key={task.id} 
            task={task} 
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}/>
          ))}
        </div>
      </section>

{/* //---- RIGHT SECTION ----// */}
      <section className="md:w-2/5 h-full flex justify-center p-4 ">
        <CalendarComponent
          // events={events}
          // BackgroundEvent={BackgroundEvent}
          views={{
            day: true,
          }}
          defaultView={Views.DAY}
        />
      </section>

      </div>
    </div>
  );
  }
  
  export default Timetracker;