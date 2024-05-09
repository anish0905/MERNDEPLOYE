import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditItemModal = ({ isOpen, onClose, saleId, onUpdate }) => {
    const [formData, setFormData] = useState({
        email_Id: "",
         date: "",
         time: "",
         order_qty: "",
        //  state: "",
        //  district: "",
         ProductName: "",
         price_per_unit: "",
         totalPrice: ""
       });
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
    
     
    
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchsale = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/sales/${saleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    if (isOpen) {
      fetchsale();
    }
  }, [isOpen, saleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:5001/api/sales/${saleId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Sales updated successfully');
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error updating sale:', error);
      toast.error('Failed to update sale');
    }
  };

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 rounded-lg w-1/3">
            <div className="p-6">
              <div className="mb-4 text-4xl font-bold text-center text-gray-900">
                <h3>Edit Sale</h3>
              </div>
              <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="email_Id"
                className="block my-2 text-left text-sm font-medium text-gray-900"
              >
                Email Id
              </label>
              <input
                type="email"
                name="email_Id"
                id="email_Id"
                value={formData.email_Id}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Email Id"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
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
          </div>

          <div className="flex flex-row">
            <div className="w-1/2 pr-2">
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
            <div className="w-1/2 pl-2">
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
          </div>

         

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
          </div>

          <div className="flex flex-row">
            <div className="w-1/2 pr-2">
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
            <div className="w-1/2 pr-2">
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
                placeholder="Enter Total Price"
                required
              />
            </div>
          </div>

          <div className="mt-6 item-center">
                  <div className="flex gap-10 content-center items-center">
                    <button type="submit" className="mt-2 p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105">
                      Update Sale
                    </button>
                    <button onClick={onClose} type="button" className="mt-2 p-2 text-white rounded-lg border-green-600 bg-yellow-400 hover:scale-105">
                      Cancel
                    </button>
                  </div>
                </div>
        </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditItemModal;
