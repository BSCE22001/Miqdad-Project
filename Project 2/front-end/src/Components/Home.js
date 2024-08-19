import React from 'react'
import { buttonHandlerDelete, buttonHandlerSignOut, buttonHandlerUpdate } from './Fucntions';

export default function Home(props) {

  return (
    <div className='border-cyan-600 border-2'>
      <h1>First Name: {props?.data?.schemaFirstName}</h1>
      <h1>Last Name: {props?.data?.schemaLastName}</h1>
      <p>Age: {props?.data?.schemaAge}</p>
      <p>Gender: {props?.data?.schemaGender}</p>
      <p>Profession: {props?.data?.schemaProfession}</p>
      <br />
      <br />
      <br />
      <br />
      <button onClick={buttonHandlerSignOut}>Sign Out</button><br />
      <button onClick={buttonHandlerUpdate}>Update</button><br />
      <button onClick={buttonHandlerDelete}>Delete Account</button><br />
    </div>
  )
}
