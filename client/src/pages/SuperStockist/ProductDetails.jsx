import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [orders, setOrders] = useState([{ product: "", quantity: "", size: "" }]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate =useNavigate();
  const superstockistEmail = localStorage.getItem("superstockistEmail");
  console.log(superstockistEmail)

  const handleAddOrder = () => {
    setOrders([...orders, { product: "", quantity: "", size: "" }]);
  };

  const handleRemoveOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };

  const handleOrderChange = (index, key, value) => {
    const updatedOrders = [...orders];
    updatedOrders[index][key] = value;
    setOrders(updatedOrders);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      // Retrieve superstockist email from local storage
      
      
      if (!superstockistEmail) {
        throw new Error("Superstockist email not found");
      }

      const orderData = {        
superstockistEmail: superstockistEmail,
        products: orders.map((order) => ({
          productNames: order.product,
          productSize: order.size,
          quantity: parseInt(order.quantity)
        })),
        status: "pending", // Default status
        date: new Date().toISOString(), // Add the current date
        message: message, // Add the message if needed
        time: ""
      };

      const response = await axios.post("http://localhost:5001/api/stockist/order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Order placed successfully:", response.data);
      if (!response) {
        toast('Order placed successfully', {
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
      navigate('/superStockist')
      // Optionally, you can perform any necessary UI updates or show a success message to the user
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error('Error placing order', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
  
        });
      setError(error.response?.data?.error || "Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-1/2 bg-white p-8 rounded-md shadow-md border border-gray-300">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <form onSubmit={handleSubmit}>
          {orders.map((order, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor={`product${index}`} className="block text-gray-700 font-semibold mb-2">
                  Product
                </label>
                <select
                  id={`product${index}`}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                  value={order.product}
                  onChange={(e) => handleOrderChange(index, 'product', e.target.value)}
                >
                  <option value="">Select product</option>
                  <option value="Gold Flavor">Gold Flavor</option>
                  <option value="Silver Flavor">Silver Flavor</option>
                  <option value="Diamond Flavor">Diamond Flavor</option>
                  <option value="Elaichi Flavor">Elaichi Flavor</option>
                </select>
              </div>
              <div>
                <label htmlFor={`quantity${index}`} className="block text-gray-700 font-semibold mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  id={`quantity${index}`}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                  value={order.quantity}
                  onChange={(e) => handleOrderChange(index, 'quantity', e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label htmlFor={`size${index}`} className="block text-gray-700 font-semibold mb-2">
                  Size
                </label>
                <select
                  id={`size${index}`}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                  value={order.size}
                  onChange={(e) => handleOrderChange(index, 'size', e.target.value)}
                >
                  <option value="">Select Size</option>
                  <option value="Sm Bora">Sm Bora</option>
                  <option value="Medium Bora">Medium Bora</option>
                  <option value="Big Bora">Big Bora</option>
                </select>
              </div>
              <button type="button" className="bg-red-500 rounded-md w-10 text-center font-bold text-xl" onClick={() => handleRemoveOrder(index)}>-</button>
            </div>
          ))}
          <button type="button" className="bg-green-500 rounded-md w-10 text-center font-bold text-xl" onClick={handleAddOrder}>+</button>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
              Custom Message
            </label>
            <textarea
              id="message"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter product details"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Order"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
