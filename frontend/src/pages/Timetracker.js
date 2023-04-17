import React, { useState,useRef } from 'react';
import { GiBee } from "react-icons/gi";
import { AiFillTag } from "react-icons/ai";
import TimerBar from '../Components/TimetrackerComp/TimerBar';
import Timer from '../Components/TimetrackerComp/Timer';
import Calendar from '../Components/TimetrackerComp/Outlook';
import { FaRegCalendarAlt } from "react-icons/fa";
import ProjectOptions from '../Components/ProjectTagComp/ProjectOptions';

import { useGetProjectsQuery } from '../api/API';


function Timetracker() {
  const name = useRef();
  // const { data : projects, isLoading, error, refetch } = useGetProjectsQuery()
  // console.log(projects);

  const [addProject, setAddProject] = useState([
    {
     "id":"1",
     "type_of_input":"00",
     "start":"2023-04-13T23:22:22Z",
     "task_name":'task 5',
     "project":{
        "id":"1",
        "name":"frontend",
        "description":"react app",
        "created_by":{
          "id":"1",
          "username":"John Doe",
        },
        "tag_color":"green",
     },
    },
  ]);
  const [showProjectTags, setShowProjectTags] = useState(false);

  const [ tag , setTag ] = useState(''); 
  // console.log(tag)

  const handleAddChange = (event) => {
    setAddProject(event.target.value);
  }

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
      <div className=" Page flex flex-col flex-grow bg-stone-100 w-full md:flex-row gap-4">
        <div className=" Leftcontainer md:w-3/5 flex flex-col px-6">
        {/* -----  Inputwraper ----- */}
          <div className="flex flex-row justify-center items-center w-full gap-2 ">
          <div className='flex flex-row flex-grow  px-6 justify-start items-center bg-white border-2 border-teal-500 rounded-full  shadow-md'>
            <input class="caret-teal-500 py-2 px-4 bg-transparent focus:outline-none flex-grow"
            placeholder="Add new Busy Bee.."
            ref={name}
            onChange={handleAddChange}/>
            <div className='relative'>
            <AiFillTag className=' text-zinc-500 text-xl' onClick={()=>{setShowProjectTags(!showProjectTags)}}/>
            {showProjectTags && <ProjectOptions/>}
            </div>
          </div>
            <button className="flex justify-center items-center shadow-lg bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% w-16 h-16 rounded-full text-white text-4xl">

            <GiBee className="hover:animate-bounce flex h-8 w-8" />+</button>
          </div>
          <div>
          </div>
            <div className='flex'>Monday
            <FaRegCalendarAlt 
              className="flex flexwrap w-5 h-5 text-black hover:text-pink-500"
              onClick={handelDateChanged}
              />
            </div>
          <div className="flex flex-col justify-start items-center gap-4 bg-stone-100 w-full h-4/6 md:h-screen overflow-y-scroll">
            {addProject.map(task=><TimerBar key={task.name} task={task} />)}
         
            {/* <TimerBar addProject={addProject} /> */}
          </div>
        </div>
        <div className="md:w-2/5 flex-grow flex flex-col bg-emerald-400 px-6">
          <Calendar/>
        </div>
      </div>
    );
  }
  
  export default Timetracker;