import { useLocation, useNavigate } from "react-router-dom";
import TimeBee from "../../assets/TimeBeeNav.png";
import { FaClock, FaChartArea, FaFileAlt } from "react-icons/fa";
import { HiMenu }from 'react-icons/hi';
import { RxCross2 }from 'react-icons/rx';
import { FiLogOut,FiUser } from "react-icons/fi";
import React, { useState } from 'react';
import UserAvator from "../UserAvator";
import TimerCountdown from "../TimetrackerComp/TimerCountdown";
import {
    useCreateTrackedTimeMutation,

} from "../../api/API";
import Timetracker from "../../pages/Timetracker";


function Header({ children }) {
//---- RTK Query ----//
    const [createTrackedTime,{isloading,error}]=useCreateTrackedTimeMutation()

//---- Local States ----//
    const [showMenu, setShowMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [isHoverTimetracker, setIsHoverTimetracker] = useState(false);
    const [isHoverDashboard, setIsHoverDashboard] = useState(false);
    const [isHoverReport, setIsHoverReport] = useState(false);
    
    
    const [clock, setClock] = useState(false);
    
//---- get the current date ----//
    let today = new Date();
    let options = {
        weekday:'short',
        day:'numeric',
        month:'long',
        year:'numeric'
    } 
    
//---- navigations ----//
    const navigate = useNavigate();
    
    const goToReports = () => {
        navigate("/reports");
        setShowMenu(false)
    };
    
    const goToTimetracker = () => {
        navigate("/timetracker");
        setShowMenu(false)
        
    };
    const goToDashboard = () => {
        navigate("/dashboard");
        setShowMenu(false)
    };
    
    const goToHome = () => {
        navigate("/");
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
        let currentTime = new Date();
        const data={
            "type_of_input": 0,
            "start": currentTime
        }
        createTrackedTime(data)
    }


  return (
    <>
{/* ------- HEADER ------ */}
    <div className="relative m-0 flex justify-between bg-stone-100 w-screen py-2 px-4 shadow-sm">
 {/* ------- logo ------ */}      
        <img onClick={goToHome} src={TimeBee}className="h-10"></img>  

        <div className="flex justify-end md:flex-row md:items-center flex-grow">
    {/* ------- navigation icons ------ */}
        <div className="hidden md:w-1/4 justify-evenly gap-10 mr-10 md:flex md:flex-row"> 
     
        {/*---- to Timetracker ----*/}
            <div id='timetracker' className="relative flex justify-center items-center p-2 box-border w-10 h-10 "
                onClick={goToTimetracker}
                onMouseEnter ={()=>setIsHoverTimetracker(true)}
                onMouseLeave ={()=>setIsHoverTimetracker(false)} >
            {isHoverTimetracker?
            <p className="font-semibold text-zinc-600 hover:cursor-pointer">Timetracker</p>
            :
            <FaClock  className=" text-zinc-500 " /> 
            }
            </div> 
        {/*----  to Dashborad  ----*/}                   
            <div className="relative flex justify-center items-center p-2 box-border w-10 h-10 "
                onClick={goToDashboard}
                onMouseEnter ={()=>setIsHoverDashboard(true)}
                onMouseLeave ={()=>setIsHoverDashboard(false)} >
            {isHoverDashboard?
            <p className="font-semibold text-zinc-600 hover:cursor-pointer">Dashborad</p>
            :
            <FaChartArea  className=" text-zinc-500 " /> 
            }
            </div>  
        {/*----  to Report  ----*/}
            <div className="relative flex justify-center items-center p-2 box-border w-10 h-10 "
                onClick={goToReports}
                onMouseEnter ={()=>setIsHoverReport(true)}
                onMouseLeave ={()=>setIsHoverReport(false)} >
            {isHoverReport?
            <p className="font-semibold text-zinc-600 hover:cursor-pointer">Report</p>
            :
            <FaFileAlt  className=" text-zinc-500 " /> 
            }
            </div>  
        
        </div>
            <div className="flex w-fit items-center gap-2">
                <p className="p-0.5 text-zinc-600 font-normal ">
                    {today.toLocaleDateString('en-GB',options)}</p>
            
                <TimerCountdown  start={clock} />

                {clock ?
                    <button onClick={handleClick}
                    className="w-28 h-10 rounded-full  text-teal-500 border-2 text-sm font-semibold
                     border-teal-500 bg-transparent"
                    >CLOCK OUT</button>
                    :
                    <button onClick={handleClick}
                    className="w-28 h-10 rounded-full  text-white text-sm font-semibold
                    bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% "
                    >CLOCK IN</button>
                }
                <div className="relative" onClick={()=>setShowSettings(!showSettings)}>
                 <UserAvator />
                    {showSettings &&
                    <div className="absolute flex flex-col right-4 top-12 gap-2 bg-white shadow-md py-2 z-20 rounded-md">
                        <div
                         className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer">
                         <FiUser/>
                         <p>Profile</p>
                        </div>
                        <div
                         className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer">
                         <FiLogOut/>
                         <p>LogOut</p>
                        </div>
                    </div>
                    }
                </div>

    {/* ------- menu icons ------ */}
                {showMenu?
                <RxCross2 onClick={()=>setShowMenu(!showMenu)}
                className="text-2xl text-zinc-500 md:hidden hover:cursor-pointer hover:text-zinc-800"/>
                :<HiMenu onClick={()=>setShowMenu(!showMenu)}
                className="text-2xl text-zinc-500 md:hidden hover:cursor-pointer hover:text-zinc-800"/>
                }
                {showMenu &&
                <div className="absolute flex flex-col right-4 top-12 gap-2 bg-white shadow-md py-2 z-20 rounded-md">     
                    <div onClick={goToTimetracker} 
                         className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer">
                     <FaClock className="text-zinc-500" />
                     <p>Timetracker</p>
                    </div>      
                    <div onClick={goToDashboard} 
                         className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer">
                     <FaChartArea  className="text-zinc-500" />
                     <p>Dashbord</p>
                    </div>      
                    <div onClick={goToReports}
                         className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer">
                     <FaFileAlt className="text-zinc-500" />
                     <p>Report</p>
                    </div>      
           
                </div>
                }
            </div> 
        </div>

    </div>
    {/* ------- PAGES ------ */}
        {children}
    </>
  );
}

export default Header;
