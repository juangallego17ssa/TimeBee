import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import Timer from './Timer';
import { useGetUserProfileQuery } from '../../api/API';


function TimerCountdown(props) {
    const {data:currentUser,isLoading,isSuccess,isError}=useGetUserProfileQuery()
    // console.log(currentUser.workload/100)


    let [timer, setTime] = useState(30600*(currentUser?currentUser.workload/100:1));
    const intervalId = useRef()
   
    useEffect(() => {
        if (props.start) {
            intervalId.current = setInterval(() => {
                setTime(--timer)
            }, 1000);
        } else {
            clearInterval(intervalId.current);
        };
        return () => clearInterval(intervalId.current);
    }, [props.start])
   

    const TimeFormat = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const mins_ = mins % 60
        const seconds_ = seconds % 60;
        const hours = Math.floor(mins / 60)
        // return (hours == 0 ? "00" : hours.toString()) + ":"+ (mins_ == 0 ? "00" : mins_.toString()) + ":" + (seconds_ == 0 ? "00" : seconds_.toString());
        return (
            (hours < 10? '0'+hours.toString():hours.toString()) +':'+( mins_ < 10? '0'+mins_.toString():mins_.toString())+':'+( seconds_ < 10? '0'+seconds_.toString():seconds_.toString())
            );
    };
    
    return (
        <div className="font-bold text-m w-20">{TimeFormat(timer)}</div>
    )
}
export default TimerCountdown; 