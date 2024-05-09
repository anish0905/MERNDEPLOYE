import React, { useState } from 'react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleForgetPassword = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/forgetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.success) {
        alert(data.msg);
        navigate('/ResetPassword');
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error occurred during forgot password:', error.message);
    }
  };

  return (
    <>
      <div className="h-screen">
        {/* Navbar */}
        <Nav />

        <div className="flex h-screen">
          <div className="left w-1/2 flex items-center justify-center flex-col py-20">
            <div>
              <h1 className="text-7xl p-5 font-bold">Forget Password</h1>
            </div>
            <h3 className="text-md font-sm">
              Enter your Email to reset password
            </h3>
            <div className="">
              <form action="" className="flex flex-col my-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="mb-4 px-20 py-5 my-2 font-bold bg-blue-200 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </form>
            </div>
            <div className="w-96">
              <button
                onClick={handleForgetPassword}
                className="bg-blue-500 px-10 py-2 rounded-2xl font-bold text-white w-full mt-5 hover:bg-white border-2 border-black hover:text-blue-500 hover:shadow-xl transition all 0.2 ease-in-out "
              >
                Reset Password
              </button>
            </div>
          </div>
          <div className="right w-1/2 my-48 ">
            <img
              src="https://img.freepik.com/premium-vector/forgot-password-illustration_65141-418.jpg"
              alt="forget password image"
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default ForgetPassword;
