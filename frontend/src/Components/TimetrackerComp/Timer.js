import React, { useRef, useState } from 'react';
import { useEffect } from 'react';




function Timer(props) {

    let [timer, setTime] = useState(0);
    const intervalId = useRef()
   
    useEffect(() => {
        if (props.start) {
            intervalId.current = setInterval(() => {
                setTime(++timer)
            }, 1000);
        } else {
            clearInterval(intervalId.current);
        };
        return () => clearInterval(intervalId.current);
    }, [props.start])
   

    const TimeFormat = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const seconds_ = seconds % 60;
        const hours = Math.floor(mins / 60)
        return (hours == 0 ? "00" : hours.toString()) + ":"+ (mins == 0 ? "00" : mins.toString()) + ":" + (seconds_ == 0 ? "00" : seconds_.toString());
    };

    return (
        <div className='w-20'>{TimeFormat(timer)}</div>
    )
}
export default Timer;