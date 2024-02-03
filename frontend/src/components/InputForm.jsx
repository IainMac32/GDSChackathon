import React, { useState } from 'react';

import "../App.css"

const InputForm = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const [inputValues, setInputValues] = useState(['']);

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

    const renderInputs = () => {
        return inputValues.map((value, index) => (
            <div key={index}>
            <label class="form-label">Slide #{index + 1} Description</label>
            <input
            class="form-control"
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <button class="btn btn-secondary" type="button" onClick={() => removeInput(index)}>
            Remove
            </button>
            <br/><br/>
            </div>
          
        ));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputValue)
        onSubmit(inputValues)
        setInputValue('');
        console.log(inputValues)
    };


    return (
        <form class="form-group" onSubmit={handleSubmit}>
            
            <label class="form-label">
                Project Title: <input  class="form-control" type="text" value={inputValue} onChange={handleChange} />
            </label>
            
            <br/><br/>
            
            <hr/>
            <button class="btn btn-primary" onClick={addInput}>Add Input</button>
            <hr/>
            {renderInputs()}
            <br/>
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default InputForm;