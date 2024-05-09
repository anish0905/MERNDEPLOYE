import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@material-tailwind/react";
import Img from '../../src/assets/avataaars.png'

function ExecutiveDashBoard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-end gap-4 ">
        <Navbar />
        <div className="flex items-center justify-end gap-10 h-44 bg-gray-200 ml-96 rounded-xl mr-10 my-10 w-full">
          <div></div>
        <Avatar 
        className="-mr-8"
        alt="Remy Sharp" 
        src={Img} />
        <p className="text-2xl font-bold border-blue-400"
        >{localStorage.getItem("email")}</p>
        {/* <button className="mr-12"
         onClick={handleLogout}>logout</button> */}
         <Button 
         color="red" 
         onClick={handleLogout}
         className="mr-12"
         >Logout</Button>
        </div>
      </div>
      <div className="ml-96 mt-10">
        <Link
        to={{
          pathname:"/registerForm"
        }}
         className="bottom-0 left-0 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-center"
        >
        Register
        </Link>
      </div>
    </>
  );
}

export default ExecutiveDashBoard;
