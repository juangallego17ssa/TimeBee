import React, { useState } from 'react';
import { useEffect } from 'react';


const formatTime = (seconds) => {
  
  const mins = Math.floor(seconds / 60);
  const mins_ = mins % 60;
  const seconds_ = seconds % 60;
  const hours = Math.floor(mins / 60);

  return (
    (hours < 10 ? "0" + hours.toString() : hours.toString()) +
    ":" +
    (mins_ < 10 ? "0" + mins_.toString() : mins_.toString()) +
    ":" +
    (seconds_ < 10 ? "0" + seconds_.toString() : seconds_.toString())
  );
};


function Timer({play, startDate}) {
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);


    
    const startTimer = () => {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setIntervalId(interval);
    };
   
    useEffect(() => {
      if (startDate) {
        const startTime = new Date(startDate);
        const currentTime = new Date();
        setTimer(Math.floor((currentTime - startTime) / 1000));
        startTimer();
      }
    }, [startDate]);
   


    return (
        <div className='w-20'>{formatTime(timer)}</div>
    )
}
export default Timer;