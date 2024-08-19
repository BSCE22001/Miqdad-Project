import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { onChangeHandler } from './Fucntions';
import { onClickHandler } from './Fucntions';
import Loader from './Loader';

export default function DataEntry() {
    const [data, setData] = useState('');
    const navigate = useNavigate();

    return (
        <div className='text-center'>
            <form onSubmit={e => e.preventDefault()}>
                <label htmlFor="FirstName">FirstName:</label><br />
                <input className='border-2 rounded-lg' type="text" id="FirstName" name="FirstName" onChange={event => onChangeHandler(event, data, setData)} /><br />
                <label htmlFor="LastName">LastName:</label><br />
                <input className='border-2 rounded-lg' type="text" id="LastName" name="LastName" onChange={event => onChangeHandler(event, data, setData)} /><br />
                <label htmlFor="Age">Age:</label><br />
                <input className='border-2 rounded-lg' type="number" id="Age" name="Age" onChange={event => onChangeHandler(event, data, setData)} /><br />
                <p htmlFor="Gender">Gender:</p>
                <label htmlFor="Gender">Male: </label>
                <input className='border-2 rounded-lg' type="radio" id="Male" name="Gender" onChange={event => onChangeHandler(event, data, setData)} />&nbsp;&nbsp;
                <label htmlFor="Gender">Female: </label>
                <input className='border-2 rounded-lg' type="radio" id="Female" name="Gender" onChange={event => onChangeHandler(event, data, setData)} /><br />
                <label htmlFor="Profession">Profession:</label><br />
                <input className='border-2 rounded-lg' type="Profession" id="Profession" name="Profession" onChange={event => onChangeHandler(event, data, setData)} /><br />
                <label htmlFor="sub"></label><br />
                <input className='border-2 rounded-lg' type="Submit" id="Profession" name="sub" onClick={() => onClickHandler('details','POST', navigate, data)} /><br />
            </form>            
        </div>
    )
}
