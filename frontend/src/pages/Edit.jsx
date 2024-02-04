import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"

import Sidebar from '../components/SideBar';
import InputForm from '../components/InputForm';

const Edit = (args) => {

  const handleFormSubmit = (inputValues, inputValue) => {
    console.log(inputValues)
    console.log(inputValue)

    axios.post("http://127.0.0.1:5000/api/submit_title", { inputValue })
      .then(response => {
        console.log('Backend response:', response.data);
        window.location.reload(false)
      })
      .catch(error => {
        console.error('Error submitting input:', error);
      });

    axios.post("http://127.0.0.1:5000/api/submit", { inputValues })
      .then(response => {
        console.log('Backend response:', response.data);
        window.location.reload(false)
      })
      .catch(error => {
        console.error('Error submitting input:', error);
      });
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
              <InputForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
        <div className="p-2 flex-grow-1">
          
        </div>
      </div>
    </div>

  )
}

export default Edit
