import React, { useState, useEffect } from 'react';
//import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import SignupImg from "../assets/undraw_sign_up_n6im.svg";
import SignIn from "../pages/Login";
import Styles from "../Styles/Styles.css";
import statesListData from './statesData.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [type, settype] = useState("");
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    country: 'India',
    state: '',
    city: ''
  });

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);

  const statesList = statesListData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handletypeadmin = () => {
    settype("admin");
    setState('');
    setCity('');
  };

  const handletypexecutive = () => {
    settype("executive");
    setCountry('India');
    setState('');
    setCity('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.password !== userData.confirmPassword) {
        toast.error('Password and Confirm Password do not match', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
         
          });
        return;
      }

      let url;
      if (userData.userType === 'Admin') {
        url = 'http://localhost:5001/api/administrators/register';
      } else if (userData.userType === 'Executive') {
        url = 'http://localhost:5001/api/executives/registerexecutive';
      } else {
        console.error('Invalid user type');
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        toast.success('User registered successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      } else {
        if (response.status === 409) {
          toast.error('Registration failed', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
           
            });
        } else {
          // console.error('Registration failed');
          toast.error('Registration failed', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
           
            });
        }
      }
    } catch (error) {
      console.error('Error occurred during registration:', error.message);
      toast.error('Error occurred during registration:', error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",

        });
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setUserData({ ...userData, country: selectedCountry });
    setCountry(selectedCountry);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setUserData({ ...userData, state: selectedState });
    setState(selectedState);

    const selectedStateObj = statesList.find((stateObj) => stateObj.state === selectedState);
    const cities = selectedStateObj ? selectedStateObj.districts : [];

    setCityList(cities);
    setCity('');
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setUserData({ ...userData, city: selectedCity });
    setCity(selectedCity);
  };

  return (
    <div>
     <ToastContainer/>
      <div className='flex h-full h-100vh '>
        <div className="left w-1/2 flex items-center justify-center text-white bg-blue-700">
          <img className='py-20 px-32' src={SignupImg} alt="Signup" />
        </div>
        <div className="right w-1/2 flex items-center justify-center flex-col py-5">
          <div>
            <h1 className='text-7xl p-3 font-extrabold'>Sign Up</h1>
          </div>
  
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col  my-5 '>
              <input type="text" name="username" placeholder='User Name' className="mb-4 px-8 py-5 my-2 font-bold bg-blue-200 rounded-xl" onChange={handleChange} value={userData.username} />
              <input type="text" name="email" placeholder='Email' className="mb-4 px-8 py-5 my-2 font-bold bg-blue-200 rounded-xl" onChange={handleChange} value={userData.email} />
              <input type="password" name="password" placeholder='Password must be greater than 8 characters' className="mb-4 px-8 py-5 my-2 font-bold bg-blue-200 rounded-xl text-sm" onChange={handleChange} value={userData.password} />
              <input type="password" name="confirmPassword" placeholder='Confirm Password' className="mb-4 px-8 py-5 my-2 font-bold bg-blue-200 rounded-xl" onChange={handleChange} value={userData.confirmPassword} />
              <div className='loginAs'>
                <div className=' gap-2 items-center justiy-center'>
                  <p className='font-bold text-center text-xl '>Sign Up As</p>
                  <div className="action buttons mx-2 mb-5 ">
                    <div className=" items-center mb-4 " onClick={handletypeadmin}>
                      <input id="admin" type="radio" value="Admin" name="userType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} checked={userData.userType === 'Admin'} />
                      <label htmlFor="admin" className="ms-2 text-xl font-bold text-gray-900 dark:text-gray-700">Admin</label>
                    </div>
                    <div className="block  " onClick={handletypexecutive}>
                      <input id="executive" type="radio" value="Executive" name="userType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} checked={userData.userType === 'Executive'} />
                      <label htmlFor="executive" className="ms-1  text-xl font-bold dark:text-grey-500">Executive</label>
                      {userData.userType === 'Executive' && (
                        <div className='flex w-20 gap-2 mt-5'>
                          <select
                            name="country"
                            value={country}
                            onChange={handleCountryChange}
                            className="mb-4 px-5 py-2 my-2 w-24  font-bold bg-blue-200 rounded-xl"
                          >
                            <option value="India">India</option>
                          </select>
                          <select
                            name="state"
                            value={userData.state}
                            onChange={handleStateChange}
                            className="mb-4 px-5 py-2 my-2 w-40 font-bold bg-blue-200 rounded-xl"
                          >
                            <option value="">Select State</option>
                            {statesList.map((stateObj, index) => (
                              <option key={index} value={stateObj.state}>{stateObj.state}</option>
                            ))}
                          </select>

                          <select
                            name="city"
                            value={userData.city}
                            onChange={handleCityChange}
                            className="mb-4 px-5 py-2 my-2 font-bold w-40 bg-blue-200 rounded-xl"
                          >
                            <option value="">Select City</option>
                            {cityList.map((cityName, index) => (
                              <option key={index} value={cityName}>{cityName}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button type="submit" className="bg-blue-500 px-10 py-2 rounded-2xl font-bold text-white w-full mt-1 hover:bg-white border-2 border-black hover:text-blue-500 hover:shadow-xl transition all 0.2 ease-in-out">
                  Sign Up
                </button>
                <p className='text-gray-500 mt-5 ps-8'>Have an account ? <a href="/" className='text-blue-300 hover:text-blue-700'> SignIn</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
