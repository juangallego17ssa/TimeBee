import React, { useState } from 'react';
import { GiBee } from "react-icons/gi";
import TimerBar from '../Components/TimetrackerComp/TimerBar';
import Timer from '../Components/TimetrackerComp/Timer';
import Calendar from '../Components/TimetrackerComp/Calendar';


function Timetracker() {

  const [addProject, setAddProject] = useState('');

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
            <input placeholder="Add new Busy Bee.." value={addProject} onChange={handleAddChange} class="flex flex-row flex-wrap justify-center items-center bg-white w-5/6 h-16 border-2 border-teal-500 rounded-full caret-teal-500 p-2 m-2 shadow-lg"></input>
            <button className="Addbutton flex flex-row flex-wrap justify-center items-center shadow-lg bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% w-16 h-16 rounded-full text-white text-4xl">
              <GiBee className="hover:animate-bounce flex h-8 w-8" />+</button>
          </div>
          <div className="grid grid-cols-1 justify-start items-center gap-1 bg-stone-100 w-full h-5/6 overflow-y-scroll">
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
            <TimerBar addProject={addProject} />
          </div>
        </div>
        <div className="flex flex-col flex-wrap bg-emerald-400 w-1/2 h-full">
          <Calendar/>
        </div>
      </div>
    );
  }
  
  export default Timetracker;