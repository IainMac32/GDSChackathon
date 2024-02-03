import React, { useEffect, useState } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"

import Sidebar from '../components/SideBar';
import InputForm from '../components/InputForm';


const Home = (args) => {

    const handleFormSubmit = (inputValues) => {
        console.log(inputValues)
      };

  return (
    
      <div>
        <div className=" flex-row p-2 ">
          <Sidebar />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-grow-1"></div>
          <div className="p-2 flex-grow-1 text-center">
            <div className="flex-column text-center">
              <h1 className='p-3'>Google Slides Generator</h1>
              <div>
                <InputForm onSubmit={handleFormSubmit}/>
            </div>
          </div>
        </div>
        <div className="p-2 flex-grow-1"></div>
      </div>
    </div>

  )
}

export default Home
