import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function AddNewSupplies() {
  const [formData, setFormData] = useState({
    name: '',
    products: '',
    quantity: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5001/api/supplies',
        {
          name: formData.name,
          products: formData.products,
          quantity: formData.quantity,
          price: formData.price
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      setFormData({
        name: '',
        products: '',
        quantity: '',
        price: ''
      });
      toast.success("Supplies added successfully!");
    } catch (error) {
      console.error('Error adding supplies:', error);
      toast.error('Failed to add supplies. Please try again.');

    }
  };

  return (
    <>
    <ToastContainer />
      <div className='pt-6 mb-4 text-4xl item-center font-bold text-center text-gray-900'>
        <h3>Add Supplies</h3>
      </div>
      <div className='border border-black rounded-lg py-5 px-6 mx-auto max-w-screen-md'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-row'>
            <div className='w-1/2 pr-2 '>
              <label htmlFor='name' className='block my-2 text-left text-sm font-medium text-gray-900'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                value={formData.name}
                onChange={handleChange}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                placeholder='Enter Name'
                required
              />
            </div>
            <div className='w-1/2 pl-2'>
              <label htmlFor='products' className='block my-2 text-left text-sm font-medium text-gray-900'>
                Products
              </label>
              <input
                type='text'
                name='products'
                id='products'
                value={formData.products}
                onChange={handleChange}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                placeholder='Products'
                required
              />
            </div>
          </div>

          <div className='flex flex-row'>
            <div className='w-1/2 pr-2 '>
              <label htmlFor='quantity' className='block my-2 text-left text-sm font-medium text-gray-900'>
                Quantity
              </label>
              <input
                type='number'
                name='quantity'
                id='quantity'
                value={formData.quantity}
                onChange={handleChange}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                placeholder='Quantity'
                required
              />
            </div>
            <div className='w-1/2 pl-2 '>
              <label htmlFor='price' className='block my-2 text-left text-sm font-medium text-gray-900'>
                Price
              </label>
              <input
                type='number'
                name='price'
                id='price'
                value={formData.price}
                onChange={handleChange}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                placeholder='Price'
                required
              />
            </div>
          </div>

          <div className='mt-6 item-center'>
            <button
              type='submit'
              className='mt-2 p-6 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105'
            >
              Add Supplies
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewSupplies;
