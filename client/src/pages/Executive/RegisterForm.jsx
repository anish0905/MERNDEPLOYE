import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch executive email ID from localStorage
      const executiveEmailId = localStorage.getItem("email");

      // Add executiveEmailId to form data
      const dataToSend = { ...formData, stockistEmailId: executiveEmailId };

      // Send POST request to register endpoint with form data
      const response = await axios.post(
        "http://localhost:5001/api/qrGeneraterBoy/register",
        dataToSend
      );

      console.log("User registered successfully:", response.data);
      // Optionally, you can redirect the user to a different page upon successful registration
      // Clear the form fields after successful registration
    setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNo: "",
        address: "",
      });
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false} className="bg-blue-200 p-10">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label htmlFor="username" className="text-blue-gray-500">
              Your Name
            </label>
            <Input
              type="text"
              size="lg"
              placeholder="Your Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="text-blue-gray-500">
              Your Email
            </label>
            <Input
              type="email"
              size="lg"
              placeholder="Your Email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-blue-gray-500">
              Password
            </label>
            <Input
              type="password"
              size="lg"
              placeholder="Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="text-blue-gray-500">
              Confirm Password
            </label>
            <Input
              type="password"
              size="lg"
              placeholder="Confirm Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phoneNo" className="text-blue-gray-500">
              Phone Number
            </label>
            <Input
              type="tel"
              size="lg"
              placeholder="Phone Number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="phoneNo"
              id="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="text-blue-gray-500">
              Address
            </label>
            <Input
              type="text"
              size="lg"
              placeholder="Address"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="mt-6 bg-blue-400" fullWidth>
            Sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;
