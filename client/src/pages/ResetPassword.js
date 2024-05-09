import React, { useState } from 'react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      const response = await fetch(`http://localhost:5001/api/resetPassword/${resetToken}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (data.success) {
        alert(data.msg);
        navigate('/');
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error occurred during reset password:', error.message);
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
              <h1 className="text-7xl p-5 font-bold">Reset Password</h1>
            </div>
            <h3 className="text-md font-sm">
              Enter your reset token and new password
            </h3>
            <div className="">
              <form action="" className="flex flex-col my-5">
                <input
                  type="text"
                  placeholder="Reset Token"
                  className="mb-4 px-20 py-5 my-2 font-bold bg-blue-200 rounded-xl"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="mb-4 px-20 py-5 my-2 font-bold bg-blue-200 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="mb-4 px-20 py-5 my-2 font-bold bg-blue-200 rounded-xl"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </form>
            </div>
            <div className="w-96">
              <button
                onClick={handleResetPassword}
                className="bg-blue-500 px-10 py-2 rounded-2xl font-bold text-white w-full mt-5 hover:bg-white border-2 border-black hover:text-blue-500 hover:shadow-xl transition all 0.2 ease-in-out "
              >
                Change Password
              </button>
            </div>
          </div>
          <div className="right w-1/2 my-72 ml-24">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/password-recovery-9065842-7343064.png?f=webp"
              alt="reset password image"
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default ResetPassword;
