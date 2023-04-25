import React from 'react';
import {ReactComponent as Honeycomb} from '../assets/honeycomb.svg';
// import TimeBeeLogo from '../assets/TimeBeeLogo.png'

export default function Loader() {
  return (
    <div className="loader flex flex-col items-center justify-center animate-pulse">
      <Honeycomb />
      <h2 className='text-2xl font-bold text-zinc-700 uppercase'>Loading</h2>
    </div>
  );
}
