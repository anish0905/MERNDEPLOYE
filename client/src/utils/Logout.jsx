import React from 'react'
import { useNavigate } from "react-router-dom";
import UserImg from '../assets/user.png'
import Styles from "../Styles/Styles.css"

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('email');
      navigate("/");
    };
  return (
    <div className='flex justify-end p-4 gap-4'>
    <div className='flex items-center justify-center border-2 border-black px-4 py-2 rounded-full bg-white'>
      <img className='w-8 h-8 border-2 border-black rounded-full' src={UserImg} alt="Image" />
      <p className='ml-2'>{localStorage.getItem('email')}</p>
    </div>
   
   <div>
   <button className='px-4 py-2 shadow-lg m-3  Button' onClick={handleLogout}>logout</button>
   </div>
    
  </div>
  )
}

export default Logout