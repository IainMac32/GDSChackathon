import React, { useState } from 'react';

import "../App.css"

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
                rows={15}
                type="text"
                value={descriptionValue}
                onChange={handleChange}
            />
                <button className="btn btn-primary" type="submit">Generate Slide Summaries</button>

        </form>
    );
};

export default DescriptionBox;