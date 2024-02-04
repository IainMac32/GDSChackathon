import React, { useState } from 'react';

import "../App.css"
import { NavLink } from 'react-router-dom';

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



    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <textarea
                className="form-control"
                rows="3"
                type="text"
                value={descriptionValue}
                onChange={(e) => handleChange(e)}
            />
            <NavLink to="/edit" >
                <button className="btn btn-primary" type="submit">Generate Slide Summaries</button>
            </NavLink>
        </form>
    );
};

export default DescriptionBox;