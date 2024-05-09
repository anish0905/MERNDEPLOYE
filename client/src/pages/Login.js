import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({state}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const adminResponse = await fetch('http://localhost:5001/api/administrators/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (adminResponse.ok) {
        const adminData = await adminResponse.json();
        console.log('Admin Response:', adminData);
        const { accessToken, email: adminEmail } = adminData;
        console.log('Admin Token:', accessToken);
        
        // Save email to local storage
        localStorage.setItem('email', email);
        
        navigate("/AdminDashBoard");
      } else {
        const executiveResponse = await fetch('http://localhost:5001/api/executives/loginexecutive', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        console.log(executiveResponse);
        if (executiveResponse.ok) {
          const executiveData = await executiveResponse.json();
          console.log('Executive Response:', executiveData);
          const { accessToken, email: executiveEmail } = executiveData;
          console.log('Executive Token:', accessToken);
          
          // Save email to local storage
          localStorage.setItem('email', email);
          localStorage.setItem('token', accessToken)
          localStorage.setItem('state',state)
          console.log('Email saved in localStorage:', email);
          toast.success('Singin is sucessfull', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
           
            });
          navigate("/ExecutiveDashBoard");
        } else {
          // alert('Invalid email or role');
          toast.error('Invalid email or Password', {
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
      console.error('Error occurred during login:', error.message);
    }
  };

  return (
    <>
      <div className="h-screen">
        {/* Navbar */}
        <Nav />
        <ToastContainer/>
        <div>
          <Link to="/stockistLogin">SuperStockist Login</Link>
        </div>
        <div className="flex h-screen">
          <div className="left w-1/2 flex items-center justify-center flex-col py-20 ">
            <div>
              <h1 className="text-7xl p-5 font-bold">Sign In</h1>
            </div>
            <h3 className="text-md font-sm">
              Enter your Email and Password for Sign in
            </h3>
            <div className="">
              <form action="" className="flex flex-col  my-5 ">
                <input
                  type="text"
                  placeholder="Email"
                  className="mb-4 px-20 py-5 my-2 font-bold bg-blue-200 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="mb-4 px-20 py-5 my-2 font-bold bg-blue-200 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
            </div>
            <div className="w-96">
              <p className="ml-16">
                Does not have an account ?{" "}
                <Link to="/SignUp" className="text-blue-300 hover:text-blue-700 ">
                  {" "}
                  Signup
                </Link>
              </p>
              <Link to="/ForgetPassword" className="text-blue-300 hover:text-blue-700 mt-3 ml-32">
                Forgot Password
              </Link>
              <button
                onClick={handleLogin}
                className="bg-blue-500 px-10 py-2 rounded-2xl font-bold text-white w-full mt-5 hover:bg-white border-2 border-black hover:text-blue-500 hover:shadow-xl transition all 0.2 ease-in-out "
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="right w-1/2 my-48">
            <img
              src="https://img.freepik.com/premium-vector/register-access-login-password-internet-online-website-concept-flat-illustration_385073-108.jpg?size=626&ext=jpg"
              alt="login image"
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Login;
