import React, { useState,useRef,useEffect } from 'react';
import { GiBee } from "react-icons/gi";
import { AiFillTag } from "react-icons/ai";
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


function Timetracker() {

  // Fetch all the TrackedItems of the actual user and store it in Redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrackedTimeOwn());
  }, []);
  const reduxTrackedTime = useSelector((store) => store.trackedtime);
  // console.log(reduxTrackedTime);


  const [showProjectTags, setShowProjectTags] = useState(false);
  const [selectedProject,setSelectedProject] = useState({});
//GET all tasks created  ?by all user?? 
  const { data : tasks,isLoading,isSuccess,isError} = useGetOwnTrackedTimeQuery()
    // filter out login/logout
      const filteredTask = tasks?.filter(task=>task.type_of_input !== "0");
      // console.log(filteredTask)

  const name = useRef();
  
  //POST new time tracker for task
      const [createTrackedTime] = useCreateTrackedTimeMutation()




  const handleSearch = (event) => {
    event.preventDefault();
    // refetch();
    // perform the search operation here
  };
  const handleCreateNewTasks=(e)=>{
    e.preventDefault();
    
    const data = ({
      type_of_input:"1",
      start:new Date().toISOString(),
      task_name:name.current.value,
      project:selectedProject.id,
    })
    // console.log(data)
    createTrackedTime(data)
    .then(result=>console.log(result))
    
    name.current.value = '';
    setSelectedProject('');
  }
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
    <div className=" Page flex flex-col flex-grow bg-stone-100 w-full md:flex-row gap-4">
      <div className=" Leftcontainer md:w-3/5 flex flex-col px-6">
        {/* -----  Inputwraper ----- */}
        <div className="z-10 flex flex-row justify-center items-center w-full gap-2 ">
          <div className="flex flex-row flex-grow  px-6 justify-start items-center bg-white border-2 border-teal-500 rounded-full  shadow-md">
            <input
              class={`caret-teal-500 py-2 px-4 bg-transparent focus:outline-none flex-grow `}
              placeholder="Add new Busy Bee.."
              ref={name}
            />
            <div className="relative flex items-center">
              <AiFillTag
                className={`m-1 text-${selectedProject.tag_color?selectedProject.tag_color:'zinc'}-400 text-xl`}
                onClick={() => {
                  setShowProjectTags(!showProjectTags);
                }}
              />
              <p>{selectedProject ? selectedProject.name : ""}</p>

              {showProjectTags && (
                <ProjectOptions
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                  setShowProjectTags={setShowProjectTags}
                />
              )}
            </div>
          </div>

          <button
            onClick={handleCreateNewTasks}
            className="flex justify-center items-center shadow-lg bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% w-16 h-16 rounded-full text-white text-4xl"
          >
            {/* <GiBee className="hover:animate-bounce flex h-8 w-8" /> */}+
          </button>
        </div>

        <div></div>
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
      <div className=" md:w-1/3 flex justify-center h-full">
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
  );
  }
  
  export default Timetracker;