import React, { useState } from 'react';
import { FaPlayCircle, FaRegPauseCircle, FaRegStopCircle, FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";


function TimerBar(props) {

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
    <>
      {/* <div className="flex flex-row flex-wrap justify-center items-center bg-stone-100 w-full h-24"> */}
        <div className="flex flex-row flex-wrap justify-between items-center bg-white w-5/6 h-16 border-2 border-teal-500 rounded-full shadow-lg p-2 ml-9 ">
          <div className="flex flex-wrap flex-row justify-center items-center w-72">
            {edit ?
              <div className="flex flex-wrap flex-row justify-center items-center ml-9 w-72">
                <input placeholder="BusyBee1" value={BusyBee} onChange={handleChangeBusyBee} onKeyDown={handleKeyDown} className="InputEdit flex flex-wrap w-40 h-7 pl-2 bg-white border-2 border-teal-500 rounded-full caret-teal-500 shadow-lg " />
                <FaTrashAlt className="flex flexwrap w-7 h-7 ml-10 text-black hover:text-yellow-500"/>
              </div>
              :
              <div className="InputEdit flex flex-wrap w-40 h-7">{updated}</div>
            }
          </div>
          <div className="leftwraper flex flex-row w-2/5 flex-wrap justify-between items-center mr-3">
            <div>00:01:00</div>
            <FiEdit onClick={handleEdit} className="flex flexwrap w-7 h-7 text-black hover:text-yellow-500" />
            {play ?
              <FaRegPauseCircle onClick={handlePlayStop} className="flex flexwrap w-7 h-7 text-black hover:text-pink-500" />
            :
              <FaPlayCircle onClick={handlePlayStop} className="flex flexwrap w-7 h-7 text-black hover:text-emerald-500" />
            }   
            <FaRegStopCircle className="flex flexwrap w-7 h-7 text-black hover:text-pink-500" />
          </div>
        </div>
      {/* </div> */}
    </>    
    );
  }
  
  export default TimerBar;