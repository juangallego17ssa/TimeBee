import { useLocation, useNavigate } from "react-router-dom";
import TimeBee from "../../assets/TimeBeeNav.png";
import { FaClock, FaChartArea, FaFileAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import React, { useState } from 'react';

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
        <div class="flex flex-row bg-stone-100 w-screen h-1/6 justify-between content-center p-5 flex-wrap">
            <div class="flex flex-row justify-evenly content-center w-1/6 h-10 bg-stone-100 p-10 flex-wrap">
                <img onClick={goToHome} class="w-80 h-50" src={TimeBee}></img>  
            </div>
            <div class="flex flex-row justify-evenly content-center w-2/5 h-10 bg-stone-100 p-10 flex-wrap">                     
                <FaClock onClick={goToTimetracker} class="flex bg-stone-100 w-10 h-10 text-zinc-500  hover:text-pink-500" />
                <FaChartArea onClick={goToDashboard} class="flex bg-stone-100 w-10 h-10 text-zinc-500 hover:text-orange-500"/>
                <FaFileAlt onClick={goToReports} class="flex bg-stone-100 w-10 h-10 text-zinc-500 hover:text-yellow-500"/>
            </div>
            <div class="flex flex-row justify-between content-center w-2/5 h-10 bg-stone-100 p-10 flex-wrap">
                <button class="flex flex-row border-solid justify-center content-center w-15 h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% text-center rounded-3xl">
                    <MdKeyboardArrowLeft class="flex w-10 h-10 text-white" />
                    <p class="flex justify-center content-center p-0.5 text-white font-semibold text-2xl text-center">Here is the Date</p>
                    <MdKeyboardArrowRight class="flex w-10 h-10 text-white" />  
                </button>
                  {clock ?
                      <button onClick={handleClick} class="flex justify-center content-center border-2 border-teal-500 w-40 h-10 bg-white text-center text-2xl p-0.5 rounded-2xl text-teal-500">CLOCK OUT</button>
                      :
                      <button onClick={handleClick} class="flex justify-center content-center border-solid w-40 h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% text-center text-2xl p-0.5 rounded-2xl text-white">CLOCK IN</button>
                  }
                <div class="font-bold text-2xl">08:54:12</div>
            </div>  

        </div>
        {children}
    </>
  );
}

export default Header;