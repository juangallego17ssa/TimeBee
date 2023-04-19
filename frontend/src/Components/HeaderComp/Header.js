import { useLocation, useNavigate } from "react-router-dom";
import TimeBee from "../../assets/TimeBeeNav.png";
import { FaClock, FaChartArea, FaFileAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import React, { useState } from 'react';
import TimerCountdown from "../TimetrackerComp/TimerCountdown";
import {useCreateTrackedTimeMutation, useUpdateTrackedTimeByIDMutation} from "../../api/API";
import {useDispatch, useSelector} from "react-redux";
import {setClockID, setClockStart, setClockStop} from "../../redux/slices/clockSlice";
import {axiosWithToken} from "../../api/axios";


function Header({ children }) {

    const navigate = useNavigate();
    const location = useLocation().pathname;
    let loggedIn = localStorage.getItem("access");

    const [clock, setClock] = useState(false);

    let today = new Date();
    let options = {
        weekday:'short',
        day:'numeric',
        month:'long',
        year:'numeric'
    }


    const goToReports = () => {
        navigate("/reports");
    };

    const goToTimetracker = () => {
        navigate("/timetracker");

    };

    const goToHome = () => {
        navigate("/");
    };

    const goToDashboard = () => {
        navigate("/dashboard");
    };

    const goToLogIn = () => {
        navigate("/login");
    };

    const logOut = () => {
      localStorage.setItem("access", "");
      navigate("/login");
    };

    const [createTrackedTime,{isloading,error}]=useCreateTrackedTimeMutation()

    const dispatch = useDispatch();
    const handleClockIn= async ()=> {

        setClock(!clock);
        console.log(clock);
        let currentTime = new Date();
        const data={
            "type_of_input": 0,
            "start": currentTime
        }
        const response = await createTrackedTime(data)
        console.log(response)
        dispatch(setClockID(response.data.id))
        dispatch(setClockStart(response.data.start))
        dispatch(setClockStop(""))
    }

    const [updateTrackedTimeByID,{isloading2,error2}]=useUpdateTrackedTimeByIDMutation()
    const clockID = useSelector( (state) => state.clock.clockID)

    console.log(clockID)
    const handleClockOut= async ()=> {

        setClock(!clock);
        console.log(clock);
        let currentTime = new Date();
        const data={
            "stop": currentTime
        }
        // const response = await updateTrackedTimeByID(clockID, data)
        const response = await axiosWithToken.patch(`trackedtime/${clockID}/`, data)
        console.log("now must be stop")
        console.log(response)
        dispatch(setClockID(response.data.id))
        dispatch(setClockStart(response.data.start))
        dispatch(setClockStop(response.data.stop))
    }
  return (
    <>
    {/* ------- HEADER ------ */}
    <div className="relative m-0 flex flex-row justify-between bg-stone-100 w-screen p-2 shadow-sm">
        {/* ------- logo ------ */}

        <img onClick={goToHome} src={TimeBee}className="h-10"></img>

        <div className="flex flex-col-reverse items-end md:flex-row md:items-center gap-4">
        {/* ------- navigation icons ------ */}
        <div className=" flex flex-row gap-8">
            <FaClock onClick={goToTimetracker}
                className="text-zinc-500 hover:text-pink-500" />
            <FaChartArea onClick={goToDashboard}
                className=" text-zinc-500 hover:text-orange-500"/>
            <FaFileAlt onClick={goToReports}
                className=" text-zinc-500 hover:text-yellow-500"/>
        </div>
            <div className="flex flex-row items-center gap-2">
                <p className="p-0.5 text-black font-semibold ">
                    {today.toLocaleDateString('en-GB',options)}</p>

                <TimerCountdown start={clock} />

                {clock ?
                    <button onClick={handleClockOut}
                    className="w-28 h-10 rounded-full  text-teal-500 border-2 text-sm font-semibold
                     border-teal-500 bg-transparent"
                    >CLOCK OUT</button>
                    :
                    <button onClick={handleClockIn}
                    className="w-28 h-10 rounded-full  text-white text-sm font-semibold
                    bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% "
                    >CLOCK IN</button>
                }
                <div className="w-10 h-10 bg-slate-400 rounded-full">

                </div>
            </div> 
        </div>

    </div>
    {/* ------- PAGES ------ */}
        {children}
    </>
  );
}

export default Header;
