import React from 'react';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../../api/API';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdInsertPhoto } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";


function UserDisplay() {

    const user = useSelector((state) => state.user.user)
    const usernameFirstChar = user?.username?.charAt(0)

    const [avatarEdit, setAvatarEdit] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const Token = localStorage.getItem("access");


    
    

    function handleMouseEnter() {
    setIsHovered(true);
    }

    function handleMouseLeave() {
    setIsHovered(false);
    }

    function handleAvatarChange() {
        setAvatarEdit(!avatarEdit)
    }

    const handleImageUploade = (e) => {
        e.preventDefault()
        const files = e.target.files;
        console.log(files);
        const fileList = Array.from(e.target.files);
        setImages(fileList);
    
        const newPictures = [];
    
        for (let i = 0; i < files.length; i++) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files[i]);
    
            fileReader.onload = (event) => {
                newPictures.push(event.target.result);
                // console.log(event.target.result);
                setPreview([...newPictures]);
            };
        }
    }

    const [updateProfile, { isLoadingProfile, errorProfile }] = useUpdateUserProfileMutation();
    
    console.log(user.id)

    const handleUpdateChange = async (e) => {
        e.preventDefault()
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Token}`);
   
    
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("avatar", image);
        });

        console.log(images)

        try {
              const response = await fetch(
                "https://timebee.propulsion-learn.ch/backend/api/me/",
                {
                 method: "PATCH",
                 headers: myHeaders,
                 body: formData,
                redirect: "follow",
                }
              );
      
             console.log("File upload response:", response);
             } catch (error) {
             console.error("Error uploading file:", error);
        }
        
        setAvatarEdit(!avatarEdit)
        };

    const removeImageFromArray=(e)=>{
        const index = e.target.id;
        let newPreview = [...preview];
    
        newPreview.splice(index,1);
        setPreview(newPreview);
      }

    const {data:currentUser,isLoading, isSuccess, isError} = useGetUserProfileQuery()
    console.log(currentUser)

  // if(isSuccess)
    
    return (
        <div className="flex-1 flex-col justify-evenly items-center bg-white  md:w-1/4 h-full shadow-xl rounded-3xl p-5">
            <div className="flex flex-col flex-grow justify-center items-center w-full h-[30%]">
                <div className="relative w-20 h-20 bg-teal-400 rounded-full flex justify-center items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {user.avatar ? (
                    <div>
                        <img
                        src={currentUser?.avatar}
                        alt="avatar"
                        className="object-cover rounded-full flex justify-center items-center hover:cursor "/>
                    </div>
                    ) : (
                    <div>
                        <p className="uppercase text-center text-2xl font-bold text-white">
                        {usernameFirstChar ? usernameFirstChar : "A"}
                        </p>
                    </div>        
                    )}
                </div>
                <div className="relative">
                    {avatarEdit &&
                        <div className="absolute top-0 left-0 z-50 justify-center items-center overflow-hidden">
                            <div className="flex flex-col bg-white md:h-full rounded-xl  w-60 shadow-xl border-2 p-2">
                                <div className="flex h-8 w-full justify-end"> 
                                    <div className="flex  justify-end items-center text-center w-6 h-6">
                                        <p onClick={handleAvatarChange} className="flex text-semibold text-teal-600">x</p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <label htmlFor='avatarPic'>
                                        <MdInsertPhoto style={{ fontSize: '2em', color:'rgba(0, 0, 0, 0.3)' }}/>
                                        <input onChange={handleImageUploade} type='file' id='avatarPic' name='avatarPic' accept='image/' className='hidden'/>
                                    </label>
                                    <p className="text-sm text-zinc-600">CHOOSE YOUR BEE !</p>
                                </div>
                                <div className="flex flex-col justify-center items-center md:h-50 rounded-xl  w-full border-2">
                                    <div className='relative top-0 flex justify-start items-start w-full pl-2'>
                                        <p className='text-zinc-300'>Preview</p>
                                    </div>
                                    {preview.map((img) => (
                                        <div className='flex flex-row items-center'>
                                            <img src={img} key={img} alt="upload pic1" width="100" height="100"/>
                                            <FaTrashAlt onClick={(e) => { removeImageFromArray(e); }} className=" w-8 h-8 text-md text-zinc-200 hover:text-red-500 " />
                                            {/* <div className={`text-white ${isHoveredPre ? 'opacity-100' : 'opacity-0'} group-hover:opacity-70 w-5 h-5 cursor-pointer absolute bottom-0 right-0`}></div> */}
                                                {/* <button  key={img} onClick={(e) => { removeImageFromArray(e);}}>x</button> */}
                                        </div>
                                            ))}
                                </div>
                                <div className="flex flex-col justify-center items-center md:h-full rounded-xl  w-full py-1"> 
                                        <label htmlFor='submit'>
                                            <button onClick={handleUpdateChange} type='submit' id='submit' className="flex flex-wrap justify-center items-center text-white w-32 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500">Update</button>
                                        </label>
                                    </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="flex flex-row justify-center w-[50%] items-center py-2">
                    <p className='flex px-10 '>{currentUser?.first_name} {currentUser?.last_name}</p>
                    <div className='flex'>
                        <FiEdit className={`text-zinc-600 ${isHovered ? 'opacity-100' : 'opacity-50'} w-8 h-8 cursor-pointer`} onClick={handleAvatarChange} />    
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full h-[5%] font-bold">
                <p>CONTRACT</p>
                <p>{currentUser?.workload} %</p>
            </div>
            <div className="flex flex-col justify-evenly items-center w-full h-4/6">
                <p className="flex flex-col justify-evenly items-start w-full h-[5%] font-bold">WORKING HOUR</p>
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