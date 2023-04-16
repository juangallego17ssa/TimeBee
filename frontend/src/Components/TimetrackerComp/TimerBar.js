import React, { useState } from 'react';
import { FaPlayCircle, FaRegPauseCircle, FaRegStopCircle, FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Timer from './Timer';


function TimerBar(props) {
  console.log(props)

  const [play, setPlay] = useState(false);
  const [edit, setEdit] = useState(false);
  const [BusyBee, setBusyBee] = useState('');
  const [updated, setUpdated] = useState('');

  const handleChangeBusyBee = (event) => {
    setBusyBee(event.target.value);
  }

  const handleAddChange = (event) => {
    setPlay(event.target.value);
  }

  const handlePlayStop = (event) => {
    event.preventDefault();
    setPlay(!play)
    // refetch();
    // perform the search operation here
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setEdit(!edit)
    console.log(edit)
    // refetch();
    // perform the search operation here
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setUpdated(BusyBee);
      setEdit(!edit)
    }
  };

  return (
    <div className=" bg-white flex justify-between items-center py-2 px-4 rounded-full shadow-md">
        <div className="relative flex items-center">
            {/* {edit ? */}
                <input className=" bg-transparent focus:outline-teal-500 caret-teal-500 flex-grow "
                  // placeholder="BusyBee1"
                  value={props.name}
                  disabled={!edit}
                  onChange={handleChangeBusyBee} 
                  onKeyDown={handleKeyDown} 
                 />
              
            {edit &&
              <FaTrashAlt className="absolute right-0 text-md text-zinc-300 hover:text-red-500"/>
            }
              {/* <div className="">{updated}</div> */}
            {/* } */}
            </div>
            <Timer className="border-2 border-red w-24" start={play}/>
            <FiEdit onClick={()=>{setEdit(true)}}
              className="text-md text-zinc-400 hover:text-yellow-500" />
          
          <div className="flex gap-2 ">
            {play ?
              <FaRegPauseCircle onClick={handlePlayStop} 
              className="text-2xl text-zinc-400 hover:text-rose-500" />
            :
              <FaPlayCircle onClick={handlePlayStop} 
              className="text-2xl text-zinc-400 hover:text-emerald-500" />
            }   
            <FaRegStopCircle 
              className="text-2xl text-zinc-400 hover:text-rose-500" />
          </div>
    </div>    
    );
  }
  
  export default TimerBar;