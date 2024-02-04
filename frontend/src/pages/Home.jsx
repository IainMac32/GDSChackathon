import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"

import Sidebar from '../components/SideBar';
import Navbar from '../components/NavBar';
import DescriptionBox from '../components/DescriptionBox';

import { useNavigate } from 'react-router-dom';

const Home = (args) => {

  const navigate = useNavigate();

  const handleFormSubmit = (descriptionValue) => {
    console.log(descriptionValue)

    axios.post("http://127.0.0.1:5000/api/submit_description", { descriptionValue })
      .then(response => {
        console.log('Backend response:', response.data);
        window.location.reload(false)
      })
      .catch(error => {
        console.error('Error submitting input:', error);
      });

    navigate('/edit');
    
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
                <DescriptionBox onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
        <div className="p-2 flex-grow-1">
        </div>
      </div>
    </div>

  )
}

export default Home
