import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import { Button } from "reactstrap";

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

  const handleVoiceSubmit = (voiceData) => {
    axios.post("http://127.0.0.1:5000/api/submit_voice", { voiceData })
      .then(response => {
        console.log('Backend response:', response.data);
        window.location.reload(false)
      })
      .catch(error => {
        console.error('Error submitting input:', error);
      });

  }

  let can_record = false;
    let is_recording = false;
    let recorder = null;
    
    let chunks = [];
    
    const setupAudio = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
          recorder = new MediaRecorder(stream);
          recorder.ondataavailable = e => {
            chunks.push(e.data);
          };
          recorder.onstop = e => {
            const blob = new Blob(chunks, { type: 'audio/mp3' });
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            callWhisper(blob);
            const audio = new Audio(audioURL);
            audio.play();
          }
          can_record = true;
        });
      }
    };
  setupAudio();
  
  const callWhisper = (blob) => {
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('model', 'whisper-1') // formData for Whisper-1
  
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: 'Bearer ',
      }
    };
  
    const response = axios.post('https://api.openai.com/v1/audio/transcriptions', formData, config).then(response => {
      console.log(response.data.text);
      handleVoiceSubmit(response.data.text); // this line submits the text to the backend
      return response.data.text;
    }).catch(error => { console.log(error) });
    return response;
  }
  
    const ToggleMic = () => {
      if (!can_record) return;
      
      is_recording = !is_recording;
  
      if (is_recording) {
        recorder.start();
      } else {
        recorder.stop();
        can_record = true;
      }
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
                <Button outline className="bi bi-mic m-3 px-2" onClick={ToggleMic}>
                </Button>
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
