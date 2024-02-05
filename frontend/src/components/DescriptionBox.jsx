import React, { useState, useEffect } from 'react';

import "../App.css"
import { Button } from "reactstrap";

import axios from 'axios';

const DescriptionBox = ({ onSubmit }) => {

    const [descriptionValue, setDescriptionValue] = useState('');

    const handleChange = (e) => {
        setDescriptionValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(descriptionValue)
        onSubmit(descriptionValue)
    };

    useEffect(() => {

        fetch("http://127.0.0.1:5000/api/get_description").then(
            res => {
                return res.json();
            }
        ).then(
            descriptionValue => {
                setDescriptionValue(descriptionValue.response[0])
                console.log(descriptionValue);
            });

    }, []);

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
    
        const [recordingToggle, setRecordingToggle] = useState(false)
        let can_record = false;
        
        let recorder = null;
        let is_recording = false;
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
                //audio.play();
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
            Authorization: 'Bearer OPEN AI API KEY',
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
        <form className="form-group" onSubmit={handleSubmit}>
            <textarea
                className="form-control"
                rows={15}
                type="text"
                value={descriptionValue}
                onChange={handleChange}
            />
            <br/>
            
                <div>
                    <Button outline className="bi bi-mic m-3 px-2" onClick={ToggleMic}>
                    </Button>  
                    <p>Click the mic to record</p>
                </div>
                <div >
                   <button className="btn btn-primary" type="submit">Generate Slide Summaries</button> 
                </div>

            
            
            

        </form>
    );
};

export default DescriptionBox;