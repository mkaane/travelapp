import React from 'react'
import "./register.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
export default function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault(); //Means dont refresh the page
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        try {
            await axios.post("/users/register", newUser)
            setError(false)
            setSuccess(true)
        } catch (err) {
            setError(true)
        }
    }
  return (
    <div className='registerContainer'>
        <div className='logoReg'>
        <LocationOnIcon />
        Travel App
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' ref={nameRef}/>
            <input type="text" placeholder='E-mail' ref={emailRef}/>
            <input type="password" placeholder='Password (Minimum 6 characters)' ref={passwordRef} minLength={6}/>
            <button className='registerButton'>Register</button>
            {success && (
                <span className='success'>Successful! You can login now.</span>
                )}
            {error && (
                <span className='fail'>Something went wrong, try again.</span>
            )}
        </form>
        <CloseIcon className='registerCancel' onClick={() => setShowRegister(false)}/>
    </div>
  )
}
