import React, { useState } from 'react';
function TimerBar() {

  const [addProject, setAddProject] = useState('');

  const handleAddChange = (event) => {
    setAddProject(event.target.value);
  }

  const handleSearch = (event) => {
    event.preventDefault();
    // refetch();
    // perform the search operation here
  };

    return (
        <div class="flex flex-row flex-wrap justify-center items-center bg-black w-full h-24">
            <div class="flex flex-row flex-wrap justify-center items-center bg-white w-full h-16 border-2 border-teal-500 rounded-full shadow-lg p-2 ml-9 mr-6">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
         
    );
  }
  
  export default TimerBar;