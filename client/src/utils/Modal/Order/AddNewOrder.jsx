import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewOrder() {
  const [formData, setFormData] = useState({
    products: "",
    quantity: "",
    status: "pending",
    supplier: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    try {
      const response = await axios.post(
        "http://localhost:5001/api/order/",
        formData,
        {
          headers: {
            // Provide authentication token here
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Log the response data
      toast.success("Order added successfully!");
      // Optionally, you can clear the form after successful submission
      setFormData({
        products: "",
        quantity: "",
        status: "pending",
        supplier: "",
      });
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Failed to add order. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="pt-6 mb-4 text-4xl item-center font-bold text-center text-gray-900">
        <h3>Add Order</h3>
      </div>
      <div className="border border-black rounded-lg py-5 px-6 mx-auto max-w-screen-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="supplier"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Supplier
              </label>
              <input
                type="text"
                name="supplier"
                id="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Supplier"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block my-2 text-left text-sm font-medium text-gray-900">
                Status
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full">
              <label
                htmlFor="products"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Products
              </label>
              <input
                type="text"
                name="products"
                id="products"
                value={formData.products}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Products (separate with comma)"
                required
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full">
              <label
                htmlFor="quantity"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Quantity (separate with comma)"
                required
              />
            </div>
          </div>
          <div className="mt-6 item-center">
            <button
              type="submit"
              className="mt-2 p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewOrder;
