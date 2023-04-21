import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import Timer from './Timer';
import { useGetUserProfileQuery } from '../../api/API';
import {useDispatch, useSelector} from "react-redux";
import {axiosWithToken} from "../../api/axios";
import { setClockTimer } from "../../redux/Slices/clockSlice";



function TimerCountdown(props) {

    const myState = useSelector((state) => state)
    
    

    const TimeFormat = (seconds) => {
        let x = 1
        if (seconds < 0) {
            x = -1
        }
        const mins = Math.floor(seconds*x / 60);
        const mins_ = mins % 60
        const seconds_ = seconds*x % 60;
        const hours = Math.floor(mins / 60)
        // return (hours == 0 ? "00" : hours.toString()) + ":"+ (mins_ == 0 ? "00" : mins_.toString()) + ":" + (seconds_ == 0 ? "00" : seconds_.toString());
        return (
            (x==-1? "-":"") + ( hours < 10? '0'+hours.toString():hours.toString()) +':'+( mins_ < 10? '0'+mins_.toString():mins_.toString())+':'+( seconds_ < 10? '0'+seconds_.toString():seconds_.toString())
            );
    };

    const dispatch = useDispatch()
    const updateTime = () => {
        const startTime = new Date(myState.clock.clockStart)
        const nowTime = Date.now()
        const userWorkload = myState.user.user.workload/100
        const previousWorkedHours = myState.clock.clockDuration
        const currentWorkedHours = Math.round(nowTime/1000-startTime.getTime()/1000)
        dispatch(setClockTimer(TimeFormat(30600*userWorkload-previousWorkedHours-(currentWorkedHours?currentWorkedHours:0))))
    }

    const intervalId = useRef()

    useEffect(() => {
      if (props.start) {
        intervalId.current = setInterval(() => {
          updateTime();
        }, 200);
        return () => clearInterval(intervalId);
      } else {
        updateTime();
        clearInterval(intervalId.current);
      }
      return () => clearInterval(intervalId.current);
    }, [props.firstLoad, props.start, props.workloadLoaded]);

    // const {data:currentUser,isLoading,isSuccess,isError}=useGetUserProfileQuery()
    // console.log(currentUser.workload/100)



    // let [timer, setTime] = useState(0);
    // const intervalId = useRef()
    // useEffect(() => {
    //     if (props.start) {
    //         intervalId.current = setInterval(() => {
    //             setTime(--timer)
    //         }, 1000);
    //     } else {
    //         clearInterval(intervalId.current);
    //     };
    //     return () => clearInterval(intervalId.current);
    // }, [props.start])

    // useEffect(() => {
    //     setTime((30600-3600*myState.clock.clockDuration)*(currentUser?currentUser.workload/100:1))
    // }, [props.firstLoad])
    // let timer = 0
    // useEffect(() => {
    //     setInterval(() => {
    //
    //         console.log("hey")
    //     }, 1000);
    // }, [myState])
    // let timer = (30600*myState.user.user.workload/100-3600*myState.clock.clockDuration)


    
    return (
        <div className="font-bold text-m w-20">{myState.clock.clockTimer}</div>
    )
}
export default TimerCountdown; 