import React from 'react';
import { useGetUserProfileQuery } from '../../api/API';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from "react";
import { FiEdit } from "react-icons/fi";


function UserDisplay() {

    const user = useSelector((state) => state.user.user)
    const usernameFirstChar = user?.username?.charAt(0)

    const [avatarEdit, setAvatarEdit] = useState();
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseEnter() {
    setIsHovered(true);
    }
    console.log(isHovered)
    function handleMouseLeave() {
    setIsHovered(false);
    }

    function handleAvatarChange() {
        setAvatarEdit(!avatarEdit)
    }

    const {data:currentUser,isLoading,isSuccess,isError} = useGetUserProfileQuery()
    console.log(currentUser)

  // if(isSuccess)
    
    return (
        <div className="flex-1 flex-col flex-grow justify-evenly items-center bg-white  md:w-1/3 h-full shadow-xl rounded-3xl p-5">
            <div className="flex flex-col flex-grow justify-center items-center w-full h-[20%]">
                <div className="w-20 h-20 bg-teal-400 rounded-full flex justify-center items-center p-5" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {user.avatar ? (
                        <div className='relative'>
                        <img
                        src={currentUser?.avatar}
                        alt="avatar"
                        className="object-cover w-20 h-20 bg-teal-400 rounded-full flex justify-center items-center hover:opacity-70 hover:cursor "/>
                        <div className="relative w-5 h-5">
                            <FiEdit className={`text-white ${isHovered ? 'opacity-100' : 'opacity-0'} group-hover:opacity-70 w-5 h-5 cursor-pointer absolute bottom-0 right-0`} onClick={handleAvatarChange} />    
                        </div>
                    </div>
                    ) : (
                    <div>
                        <p className="uppercase text-center text-2xl font-bold text-white">
                        {usernameFirstChar ? usernameFirstChar : "A"}
                        </p>
                        <div className="relative w-5 h-5">
                            <FiEdit className={`text-white ${isHovered ? 'opacity-100' : 'opacity-0'} group-hover:opacity-70 w-5 h-5 cursor-pointer absolute bottom-0 right-0`} onClick={handleAvatarChange} />    
                        </div>
                    </div>        
                    )}
                </div>
                <div>
                    <p className='flex py-2'>{currentUser?.first_name} {currentUser?.last_name}</p>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full h-[10%] font-bold">
                <p>CONTRACT</p>
                <p>{currentUser?.workload} %</p>
            </div>
            <div className="flex flex-col justify-evenly items-center w-full h-4/6">
                <p className="flex flex-col justify-evenly items-start w-full h-1/6 font-bold">WORKING HOUR</p>
                <div className="Container Days flex flex-col justify-evenly items-center w-full h-5/6 gap-2 pl-3">
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6">
                        <div className="flex justify-evenly items-center w-1/5 h-full rounded-2xl p-1 bg-teal-400 text-white hover:opacity-70">MON</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">FROM</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">TO</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6">
                        <div className="flex justify-evenly items-center w-1/5 h-full rounded-2xl p-1 bg-teal-400 text-white hover:opacity-70">TUE</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">FROM</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">TO</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6">
                        <div className="flex justify-evenly items-center w-1/5 h-full rounded-2xl p-1 bg-teal-400 text-white hover:opacity-70">WED</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">FROM</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">TO</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6">
                        <div className="flex justify-evenly items-center w-1/5 h-full rounded-2xl p-1 bg-teal-400 text-white hover:opacity-70">THU</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">FROM</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">TO</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6">
                        <div className="flex justify-evenly items-center w-1/5 h-full rounded-2xl p-1 bg-teal-400 text-white hover:opacity-70">FR</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">FROM</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">TO</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6 ">
                        <div className="flex justify-evenly items-center w-1/5 h-full rounded-2xl p-1 bg-teal-400 text-white hover:opacity-70">SA</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">FROM</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">TO</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                    </div>
                    <div className="Container Day flex flex-row justify-evenly items-center w-full h-1/6">
                        <div className="flex justify-evenly items-center w-1/5 h-full rounded-2xl p-1 bg-teal-400 text-white hover:opacity-70">SO</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">FROM</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">TO</div>
                        <div className="flex justify-evenly items-center w-1/5 h-full">
                            <input type="time" className='bg-stone-100'/>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    );
  }
  
  export default UserDisplay;