import React, { useState, useEffect } from 'react';

import "../App.css"

const InputForm = ({ onSubmit }) => {

    const [inputValue, setInputValue] = useState('');
    const [title, setTitle] = useState([{}]);
    const [slides, setSlides] = useState([]);
    const [inputValues, setInputValues] = useState([
        
    ]);

    useEffect(() => {

        fetch("http://127.0.0.1:5000/api/get_title").then(
            res => {
                return res.json();
            }
        ).then(
            title => {
                setTitle(title);
                setInputValue(title.response)
                console.log(title);
            });

        fetch("http://127.0.0.1:5000/api/get_slides").then(
            res => {
                return res.json();
            }
        ).then(
            slides => {
                setSlides(slides);
                setInputValues(slides.response)
                console.log(slides);
            });
    }, []);




    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const addInput = () => {
        setInputValues(prev => [...prev, '']);
    };

    const removeInput = (index) => {
        const newValues = [...inputValues];
        newValues.splice(index, 1);
        setInputValues(newValues);
    };

    const handleInputChange = (index, value) => {
        const newValues = [...inputValues];
        newValues[index] = value;
        setInputValues(newValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValues)
        onSubmit(inputValues, inputValue)
    };

    const renderInputs = () => {
        return inputValues.map((value, index) => (
            <div key={index}>
                <label className="form-label">Slide {index + 1} Description</label>
                <div className="flex">
                    <textarea
                        className="form-control"
                        rows="3"
                        key={index}
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    <button className="btn btn-secondary" type="button" onClick={() => removeInput(index)}>
                        Remove Slide {index + 1}
                    </button>
                </div>
                <br /><br />
            </div>
        ));
    };

    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <label className="form-label">
                Project Title: <input className="form-control" type="text" value={inputValue} onChange={handleChange} />
            </label>
            <br /><br />
            <hr />
            <button className="btn btn-primary" type="button" onClick={addInput}>Add Slide</button>
            <hr/>
            {renderInputs()}
            <hr/>
            <br />
            <button className="btn btn-primary" type="submit">Generate Slides</button>
        </form>
    );
};

export default InputForm;