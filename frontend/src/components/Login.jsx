import React from 'react'
import "./login.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
export default function Login({setShowLogin}) {
    
    const [error, setError] = useState(false)
    const nameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault(); //Means dont refresh the page
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        }
        try {
            await axios.post("/users/login", user)
            setError(false)
        } catch (err) {
            setError(true)
        }
    }
  return (
    <div className='loginContainer'>
        <div className='logoReg'>
        <LocationOnIcon />
        Travel App
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' ref={nameRef}/>
            <input type="text" placeholder='Password' ref={passwordRef}/>
            <button className='loginButton'>Login</button>
            {error && (
                <span className='fail'>Something went wrong, try again.</span>
            )}
        </form>
        <CloseIcon className='loginCancel' onClick={() => setShowLogin(false)}/>
    </div>
  )
}
