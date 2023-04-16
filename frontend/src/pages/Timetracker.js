import React, { useState } from 'react';
import { GiBee } from "react-icons/gi";
import { AiFillTag } from "react-icons/ai";
import TimerBar from '../Components/TimetrackerComp/TimerBar';
import Timer from '../Components/TimetrackerComp/Timer';
import ProjectOptions from '../Components/ProjectTagComp/ProjectOptions';


function Timetracker() {

  const [addProject, setAddProject] = useState('');

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

    return (
      <div className="Page flex flex-row bg-stone-100 w-full h-full">
        <div className="Leftcontainer flex flex-col flex-wrap bg-teal-500 w-1/2 h-full">
          <div className="Inputwraper flex flex-row flex-wrap justify-center items-center bg-stone-100 w-full h-1/6">
            <div className="relative flex flex-row flex-wrap justify-start items-center bg-white w-5/6 h-16 border-2 border-teal-500 rounded-full caret-teal-500 p-2 m-2 shadow-lg">
              <input
              className="flex flex-row flex-wrap justify-start"
              placeholder="Add new Busy Bee.." 
              value={addProject} 
              onChange={handleAddChange} 
              />
              <AiFillTag className='absolute right-1/4 text-2xl'/>
              <ProjectOptions className="absolute right-0" setTag={setTag}/>
            </div>
            <button class="Addbutton flex flex-row flex-wrap justify-center items-center shadow-lg bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% w-16 h-16 rounded-full text-white text-4xl">
              <GiBee class="hover:animate-bounce flex h-8 w-8" />+</button>
          </div>
          <div class="grid grid-cols-1 justify-start items-center gap-1 bg-stone-100 w-full h-5/6">
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
          </div>
        </div>
        <div class="flex flex-col flex-wrap bg-emerald-400 w-1/2 h-full">
          <div></div>
        </div>
      </div>
    );
  }
  
  export default Timetracker;