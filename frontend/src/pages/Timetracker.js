import React, { useState,useRef } from 'react';
import { GiBee } from "react-icons/gi";
import { AiFillTag } from "react-icons/ai";
import TimerBar from '../Components/TimetrackerComp/TimerBar';
import Timer from '../Components/TimetrackerComp/Timer';
import Calendar from '../Components/TimetrackerComp/Outlook';
import { FaRegCalendarAlt } from "react-icons/fa";
import ProjectOptions from '../Components/ProjectTagComp/ProjectOptions';


function Timetracker() {
  const name = useRef();

  const [addProject, setAddProject] = useState([
    {
     'name':'task 1',
     'tag_color':'red',
     'description':'',
    }
  ]);
  const [showProjectTags, setShowProjectTags] = useState(false);

  const [ tag , setTag ] = useState(''); 
  console.log(tag)

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
      <div className=" Page flex flex-col  bg-stone-100 w-full md:flex-row px-10 gap-4">

        <div className=" Leftcontainer w-2/3 flex flex-col">
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
          <div className="grid grid-cols-1 justify-start items-center gap-1 bg-stone-100 w-full h-4/6 overflow-y-scroll">
            {}
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            {/* <TimerBar addProject={addProject} /> */}
          </div>
        </div>
        <div className="md:w-1/3 flex flex-col  bg-emerald-400">
          <Calendar/>
        </div>
      </div>
    );
  }
  
  export default Timetracker;