import { useLocation, useNavigate } from "react-router-dom";
import TimeBee from "../../assets/TimeBeeNav.png";
import { FaClock, FaChartArea, FaFileAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import React, { useState } from 'react';
import TimerCountdown from "../TimetrackerComp/TimerCountdown";

function Header({ children }) {
    
    const navigate = useNavigate();
    const location = useLocation().pathname;
    let loggedIn = localStorage.getItem("access");

    const [clock, setClock] = useState(false);

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

    const handleClick=()=> {
        setClock(!clock);
        console.log(clock);
    }

  return (
    <>
        <div className="flex flex-row bg-stone-100 w-screen h-56 md:h-16 justify-between m-2 items-center flex-wrap">
            <div className="flex content-center w-48 h-12 ml-5 bg-stone-100 flex-wrap">
                <img onClick={goToHome} src={TimeBee}></img>  
            </div>
            <div className="flex flex-row justify-end items-center w-auto md:w-2/5 h-8 bg-stone-100 flex-wrap">                     
                <FaClock onClick={goToTimetracker} className="flex mx-10 bg-stone-100 w-10 h-6 text-zinc-500   hover:text-pink-500" />
                <FaChartArea onClick={goToDashboard} className="flex mx-10 bg-stone-100 w-10 h-6 text-zinc-500 hover:text-orange-500"/>
                <FaFileAlt onClick={goToReports} className="flex mx-10 bg-stone-100 w-10 h-6 text-zinc-500 hover:text-yellow-500"/>
            </div>
            <div className="flex flex-row justify-end items-center w-auto h-8 mr-7 bg-stone-100 flex-wrap">
                <button className="flex flex-row border-solid justify-center items-center mx-2 w-15 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% text-center rounded-3xl">
                    <MdKeyboardArrowLeft className="flex w-10 h-8 text-white" />
                    <p className="flex flex-wrap justify-center content-center p-0.5 text-white font-semibold text-xl text-center">the Date</p>
                    <MdKeyboardArrowRight className="flex w-10 h-8 text-white" />  
                </button>
                  {clock ?
                      <button onClick={handleClick} className="flex justify-center items-center mx-10 border-2 border-teal-500 w-40 h-6 bg-white text-center text-lg p-0.5 rounded-2xl text-teal-500">CLOCK OUT</button>
                      :
                      <button onClick={handleClick} className="flex justify-center items-center mx-10 border-solid w-40 h-6 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% text-center text-lg p-0.5 rounded-xl text-white">CLOCK IN</button>
                  }
                  <TimerCountdown start={clock} />
            </div>  

        </div>
        {children}
    </>
  );
}

export default Header;
