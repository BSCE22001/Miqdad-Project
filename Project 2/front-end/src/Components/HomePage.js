import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchData } from './Fucntions';
import { buttonHandlerSignOut } from './Fucntions';
import Home from './Home';
import DataEntry from './DataEntry';
import Loader from './Loader';

export default function HomePage() {

    const [data, setData] = useState('');
    const [wait, setWait] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(navigate, setData, buttonHandlerSignOut, setWait);
    }, [])


    if(wait)
        return(<Loader />)
    
    if (data === '' || !data)
        return (<DataEntry />)

    else
        return (
            <Home 
            schemaAge={data["schemaAge"]} 
            schemaGender={data["schemaGender"]} 
            schemaLastName={data["schemaFirstName"]} 
            schemaFirstName={data["schemaFirstName"]} 
            schemaProfession={data["schemaProfession"]}
            />
        )
}
