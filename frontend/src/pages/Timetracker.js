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
  useEffect(() => {
    dispatch(fetchTrackedTimeOwn());
  }, []);
  const reduxTrackedTime = useSelector((store) => store.trackedtime);
  // console.log(reduxTrackedTime);

  const [selectedDate, setSelectedDate]=useState('')
  const [isManual, setIsManual] = useState(false);
  const [showProjectTags, setShowProjectTags] = useState(false);
  const [selectedProject,setSelectedProject] = useState({});

// GET all tasks created by USER 
  const { data : tasks,isLoading,isSuccess,isError} = useGetOwnTrackedTimeQuery()
    // filter out login/logout
      const filteredTask = tasks?.filter(task=>task.type_of_input !== "0");
      const TasksOfDay = filteredTask.filter(task=>new Date(task.start).toDateString() === new Date().toDateString())
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

  // Data for the calendar component
  const BackgroundEvent = [
    {
      start: new Date(2023, 3, 17, 10, 30),
      end: new Date(2023, 3, 17, 18, 30),
    },
  ];

  const events = [
    {
      title: "Meeting with Bob",
      start: new Date(2023, 3, 17, 10, 30),
      end: new Date(2023, 3, 17, 12, 30),
    },
    {
      title: "Lunch with Alice",
      start: new Date(2023, 3, 19, 12, 0),
      end: new Date(2023, 3, 19, 13, 0),
    },

    {
      title: "Event 1",
      start: new Date("2023-04-17T07:30:00.000Z"),
      end: new Date("2023-04-17T13:30:00.000Z"),
    },
    {
      title: "Event 2",
      start: new Date("2023-04-17T09:00:00.000Z"),
      end: new Date("2023-04-17T11:00:00.000Z"),
    },
    // Add more events as needed
  ];


  return (
    // Create timer inputs
    <div className=" Page flex flex-col flex-grow bg-stone-100 w-full md:h-screen gap-4 px-8 py-4">
      <div>
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
      </div>
    <div className='flex flex-col md:flex-row '>
      <div className=" Leftcontainer md:w-3/5 flex flex-col px-6">
        <div className="flex">
          Monday
          <FaRegCalendarAlt
            className="flex flexwrap w-5 h-5 text-black hover:text-pink-500"
            onClick={handelDateChanged}
          />
        </div>
        <div className="flex flex-col justify-start items-center gap-4 bg-stone-100 w-full h-4/6 md:h-screen overflow-y-scroll">
          {isLoading && <div>Loading</div>
          
          }
          {filteredTask?.map((task) => (
            <TimerBar key={task.id} 
            task={task} 
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}/>
          ))}

          {/* <TimerBar addProject={addProject} /> */}
        </div>
      </div>
      <div className="md:w-2/5 md:h-2/3 flex justify-center h-full ">
        <CalendarComponent
          events={events}
          BackgroundEvent={BackgroundEvent}
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