import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewSales() {
  const email = localStorage.getItem("email");
  

  const [formData, setFormData] = useState({
    email_Id: email,
    date: "",
    time: "",
    order_qty: "",
    state: "",
    city: "",
    ProductName: "",
    price_per_unit: "",
    totalPrice: ""
  });
  const [error, setError] = useState("");


  
  // Calculate total price whenever price per unit or order quantity changes
  useEffect(() => {
    const { order_qty, price_per_unit } = formData;
    if (order_qty && price_per_unit) {
      const totalp = order_qty * price_per_unit;
      setFormData({
        ...formData,
        totalPrice: totalp
      });
    }
  }, [formData.order_qty, formData.price_per_unit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    // Fetch state and district based on user's email
    async function fetchStateAndDistrict() {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/executives/getStateCity/${email}`
        );
        console.log(response.data)
        
            const { state,city } = response.data;
        setFormData((prevData) => ({
          ...prevData,
          state: state,
          city: city
        }));
        localStorage.setItem('state', state);
        localStorage.setItem('city', city);
      } catch (error) {
        console.error("Error fetching state and city:", error);
      }
    }

    if (email) {
      fetchStateAndDistrict();
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/sales/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      toast.success("Sales added successfully!", { position: "top-center" });

      setFormData({
        email_Id: "",
        date: "",
        time: "",
        order_qty: "",
        state: "",
        city: "",
        ProductName: "",
        price_per_unit: "",
        totalPrice: ""
      });
      setError("");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="pt-6 mb-4 text-4xl item-center font-bold text-center text-gray-900">
        <h3>Add Sales</h3>
      </div>

      <div className="border border-black rounded-lg py-5 px-6 mx-auto max-w-screen-md">
        <form onSubmit={handleSubmit}>
        <div className="flex flex-row">
            <div className="w-full pr-2">
              <label
                htmlFor="ProductName"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                type="text"
                name="ProductName"
                id="ProductName"
                value={formData.ProductName}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Product Name"
                required
              />
            </div>
          <div className="flex flex-row">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="date"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Date"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="time"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Time"
                required
              />
            </div>
          </div>
         
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="order_qty"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Order Quantity
              </label>
              <input
                type="number"
                name="order_qty"
                id="order_qty"
                value={formData.order_qty}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Order Quantity"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="price_per_unit"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Price Per Unit
              </label>
              <input
                type="number"
                name="price_per_unit"
                id="price_per_unit"
                value={formData.price_per_unit}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Price Per Unit"
                required
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full pr-2">
              <label
                htmlFor="totalPrice"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Total Price
              </label>
              <input
                type="number"
                name="totalPrice"
                id="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Total Price"
                readOnly
              />
            </div>
          </div>
          {/* Submit button */}
          <div className="mt-6 item-center">
            <button
              type="submit"
              className="mt-2 p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
            >
              Add Sales
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewSales;
