import { NavLink, useLocation, useNavigate } from "react-router-dom";
import TimeBee from "../../assets/TimeBeeNav.png";
import { FaClock, FaChartArea, FaFileAlt,FaCalendarAlt } from "react-icons/fa";
import { HiMenu }from 'react-icons/hi';
import { RxCross2 }from 'react-icons/rx';
import { FiLogOut, FiUser } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import React, {useEffect, useState} from 'react';
import UserAvator from "../UserAvator";
import TimerCountdown from "../TimetrackerComp/TimerCountdown";
import {
  useCreateTrackedTimeMutation,
  useUpdateTrackedTimeByIDMutation,
} from "../../api/API";
import {useDispatch, useSelector} from "react-redux";
import {setClockID, setClockStart, setClockStop, setClockDuration} from "../../redux/Slices/clockSlice";
import {authHeaders, axiosTimeBee, axiosWithToken} from "../../api/axios";
import Timetracker from "../../pages/Timetracker";
import {setUser} from "../../redux/Slices/userSlice";


function Header({ children }) {
//---- RTK Query ----//
  const [createTrackedTime,{isloading,error}]=useCreateTrackedTimeMutation()
  const [updateTrackedTime ] =useUpdateTrackedTimeByIDMutation();

//---- Local States ----//
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isHoverTimetracker, setIsHoverTimetracker] = useState(false);
  const [isHoverDashboard, setIsHoverDashboard] = useState(false);
  const [isHoverReport, setIsHoverReport] = useState(false);
  const [isHoverCalendar, setIsHoverCalendar] = useState(false);
  const [shouldReload, setShouldReload] = useState(true);

  const [clock, setClock] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const config = authHeaders()


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
    navigate("/");
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
  const goToCalendar = () => {
      navigate("/calendar");
  };

  const goToProfil = () => {
    navigate("/profil");
};

  const logOut = () => {
    localStorage.removeItem("access");
    console.log('Access Token removed successfully')
    navigate("/login"); 
  };

  const dispatch = useDispatch();

  const handleShowSettings = ()=>{
      setShowSettings(!showSettings);
      setShowMenu(false)
  }
  const handleShowMenu =()=>{
      setShowMenu(!showMenu);
      setShowSettings(false)
  }

  const handleClockIn= async ()=> {
    let currentTime = new Date();
    const data={
        "type_of_input": 0,
        "start": currentTime
    }
    const response = await createTrackedTime(data)
    // console.log("clockin")
    // console.log(response)
    dispatch(setClockID(response.data.id))
    dispatch(setClockStart(response.data.start))
    dispatch(setClockStop(""))
    setClock(true);
  }


  const clockID = useSelector((state) => state.clock.clockID)



  // console.log(clockID)
  const handleClockOut= async ()=> {
    let currentTime = new Date();
    const trackedtimeId = clockID
    console.log("trackedTimeHEaders", trackedtimeId)

    const data={
        "stop": currentTime.toISOString()
    }
    // const response = await axiosTimeBee.patch(`trackedtime/${clockID}/`, data, config)
    const response =  await updateTrackedTime({ trackedtimeId, ...data })

    dispatch(setClockID(""))
    dispatch(setClockStart(""))
    dispatch(setClockStop(""))

    const startTime = new Date(response.data.start)
    const stopTime = new Date(response.data.stop)
    const newDuration = myState.clock.clockDuration+Math.round((stopTime.getTime()-startTime.getTime())/1000)
    dispatch(setClockDuration(newDuration))
    setClock(false)
  }

  const myState = useSelector( (state) => state)

  const getClock = async () => {
    const response = await axiosTimeBee(`trackedtime/getclockinfo/`, config)
    if (response.data.latest_time.id) {
        dispatch(setClockID(response.data.latest_time.id))
        dispatch(setClockStart(response.data.latest_time.start))
        setClock(true)
      }
      if (response.data.duration) {
          dispatch(setClockDuration(response.data.duration))
      }
    // if (!response.data.latest_time.stop) {
    //     console.log("found")
    //     console.log(response.data.latest_time.stop)
    //     setClock(true)
    // } else {
    //     console.log("not found")
    //     console.log(response.data.latest_time.stop)
    // }
    setLoaded(true)
  }



  useEffect(() => {
    const getWorkload = async () => {
      const response = await axiosTimeBee(`me/`, config)
      dispatch(setUser(response.data))   
    }
    getWorkload()
    getClock();
    
  }, [])
  
  

  return (
    <>
      {/* ------- HEADER ------ */}
      <div className="relative m-0 flex justify-between items-center bg-stone-100  py-2 pl-4 pr-8 shadow-lg">
        {/* ------- logo ------ */}
        <div className="flex justify-start mr-2">
          <img
            onClick={goToHome}
            src={TimeBee}
            className=" w-auto max-h-10 object-cover "
            alt="Logo"
          ></img>
        </div>

        <div className="flex justify-end md:flex-row md:items-center flex-grow">
          {/* ------- navigation icons ------ */}
          <div className="hidden md:w-2/6 justify-around mr-8 md:flex md:flex-row md:gap-4">
            <NavLink 
            to={"/"} 
            className={({isActive})=>isActive ?"nav-link-timetracker":"nav-link-inactive"}
            >Timetracker</NavLink>
            <NavLink 
            to={"/dashboard"} 
            className={({isActive})=>isActive ?"nav-link-dashboard":"nav-link-inactive"}
            >Dashborad</NavLink>
            <NavLink 
            to={"/reports"} 
            className={({isActive})=>isActive ?"nav-link-report":"nav-link-inactive"}
            >Report</NavLink>
            <NavLink 
            to={"/calendar"} 
            className={({isActive})=>isActive ?"nav-link-calendar":"nav-link-inactive"}
            >Calendar</NavLink>
            {/*---- to Timetracker ----*/}
            {/* <div
              id="timetracker"
              className="relative flex justify-center items-center p-2 box-border w-10 h-10 "
              onClick={goToTimetracker}
              onMouseEnter={() => setIsHoverTimetracker(true)}
              onMouseLeave={() => setIsHoverTimetracker(false)}
            >
              {isHoverTimetracker ? (
                <p className="font-semibold text-zinc-600 hover:cursor-pointer">
                  Timetracker
                </p>
              ) : (
                <FaClock className=" text-zinc-500 " />
              )}
            </div> */}
            {/*----  to Dashborad  ----*/}
            {/* <div
              className="relative flex justify-center items-center p-2 box-border w-10 h-10 "
              onClick={goToDashboard}
              onMouseEnter={() => setIsHoverDashboard(true)}
              onMouseLeave={() => setIsHoverDashboard(false)}
            >
              {isHoverDashboard ? (
                <p className="font-semibold text-zinc-600 hover:cursor-pointer">
                  Dashborad
                </p>
              ) : (
                <FaChartArea className=" text-zinc-500 " />
              )}
            </div> */}
            {/*----  to Report  ----*/}
            {/* <div
              className="relative flex justify-center items-center p-2 box-border w-10 h-10 "
              onClick={goToReports}
              onMouseEnter={() => setIsHoverReport(true)}
              onMouseLeave={() => setIsHoverReport(false)}
            >
              {isHoverReport ? (
                <p className="font-semibold text-zinc-600 hover:cursor-pointer">
                  Report
                </p>
              ) : (
                <FaFileAlt className=" text-zinc-500 " />
              )}
            </div> */}
            {/*----  to Calendar  ----*/}
            {/* <div
              className="relative flex justify-center items-center p-2 box-border w-10 h-10 "
              onClick={goToCalendar}
              onMouseEnter={() => setIsHoverCalendar(true)}
              onMouseLeave={() => setIsHoverCalendar(false)}
            >
              {isHoverCalendar ? (
                <p className="font-semibold text-zinc-600 hover:cursor-pointer">
                  Calendar
                </p>
              ) : (
                <FaCalendarAlt className=" text-zinc-500 " />
              )}
            </div> */}
      {/*-------  NAV END  ------*/}
          </div>
          <div className=" flex items-center gap-2">
            <div className="p-0.5 text-zinc-600 text-md hidden md:block h-full">
              {today.toLocaleDateString("en-GB", options)}
            </div>
            {!loaded ? (
              <div className="font-bold text-m w-20">Loading...</div>
            ) : (
              <TimerCountdown start={clock} firstLoad={loaded} />
            )}
            {clock ? (
              <button
                onClick={handleClockOut}
                className="w-28 h-10 rounded-full  text-teal-500 border-2 text-sm font-semibold
                     border-teal-500 bg-transparent"
              >
                CLOCK OUT
              </button>
            ) : (
              <button
                onClick={handleClockIn}
                className="w-28 h-10 rounded-full  text-white text-sm font-semibold
                    bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-pink-500 hover:to-yellow-500 to-80% "
              >
                CLOCK IN
              </button>
            )}
            <div className="relative" onClick={handleShowSettings}>
              <UserAvator />
              {showSettings && (
                <div className="animate-dropdown origin-top absolute flex flex-col right-2 top-12 gap-2 bg-white shadow-md py-2 z-20 rounded-md">
                  <div className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer">
                    <FiUser />
                    <p onClick={goToProfil}>Profile</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer">
                    <FiLogOut />
                    <p onClick={logOut}>Logout</p>
                  </div>
                </div>
              )}
            </div>

            {/* ------- menu icons ------ */}
            {showMenu ? (
              <RxCross2
                onClick={() => setShowMenu(!showMenu)}
                className="text-2xl text-zinc-500 md:hidden hover:cursor-pointer hover:text-zinc-800"
              />
            ) : (
              <HiMenu
                onClick={handleShowMenu}
                className="text-2xl text-zinc-500 md:hidden hover:cursor-pointer hover:text-zinc-800"
              />
            )}
            {showMenu && (
              <div className="animate-dropdown origin-top absolute flex flex-col right-4 top-14 gap-2 bg-white shadow-md py-2 z-20 rounded-md">
                <div
                  onClick={goToTimetracker}
                  className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer"
                >
                  <FaClock className="text-zinc-500" />
                  <p>Timetracker</p>
                </div>
                <div
                  onClick={goToDashboard}
                  className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer"
                >
                  <FaChartArea className="text-zinc-500" />
                  <p>Dashbord</p>
                </div>
                <div
                  onClick={goToReports}
                  className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer"
                >
                  <FaFileAlt className="text-zinc-500" />
                  <p>Report</p>
                </div>
                <div
                  onClick={goToCalendar}
                  className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer"
                >
                  <FaCalendarAlt className="text-zinc-500" />
                  <p>Calendar</p>
                </div>
                <div
                  onClick={goToProfil}
                  className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer"
                >
                  <CgProfile className="text-zinc-500" />
                  <p>Profil</p>
                </div>
                <div
                  onClick={logOut}
                  className="flex items-center gap-2 px-4 hover:bg-stone-100 hover:cursor-pointer"
                >
                  <RiLogoutBoxLine className="text-zinc-500" />
                  <p>Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ------- PAGES ------ */}
      {children}
    </>
  );
}

export default Header;
