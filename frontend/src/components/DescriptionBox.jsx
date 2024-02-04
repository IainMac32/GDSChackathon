import React, { useState, useEffect } from 'react';

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
                <button className="btn btn-primary" type="submit">Generate Slide Summaries</button>

        </form>
    );
};

export default DescriptionBox;