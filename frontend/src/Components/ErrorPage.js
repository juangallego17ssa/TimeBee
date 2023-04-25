import React from 'react';
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate()
  return (
    <div className='w-screen h-fit flex flex-col items-center'>
      <div 
      id='sad-bee-img'
      className='h-40 w-40 animate-floating'
      style={{
         backgroundImage:`url(https://cdn4.iconfinder.com/data/icons/bee-emoticons/512/Sad-Emoji-Emotion-Face-Expression-Feeling-1024.png)`,
         backgroundSize:'cover' }}>
      </div>
      <h2 className='text-[4rem]'>Oopzzz!</h2>
      {/* <p className='text-lg'>I am lost bee...</p> */}
      <button
      className='text-teal-500 text-2xl hover:animate-bounce p-5'
      onClick={()=>navigate('/')}
      >let's back to beehive</button>
    </div>
  );
}
