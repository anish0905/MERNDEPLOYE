import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orderscard = ({ c }) => {
  const [orderData, setOrderData] = useState([]);
const user = localStorage.getItem("email")
console.log(user)
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return;
    }
    axios
      .get('http://localhost:5001/api/stockist/order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

 
  // Filter orders based on logged-in user's email
  const filteredOrders = orderData.filter((order) => order.email === user);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-10'>
      {filteredOrders.map((order) => (
        <div key={order._id} className='max-w-lg w-full mx-auto bg-white shadow-md px-5 py-5 rounded-lg'>
          <div className='py-4 px-4 w-full flex gap-10 content-center items-center'>
            <div>
              <p className='mb-2'>
                <span className='font-semibold'>Username:</span> {order.username}
              </p>
              <p className='mb-2'>
                <span className='font-semibold'>Email:</span> {order.email}
              </p>
            </div>
            <div className='flex gap-10 content-center items-center w-1/2'>
              <div>
                <p className='mb-2'>
                  <span className='font-semibold'>Date:</span>{' '}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className='mb-2'>
                  <span className='font-semibold'>Status:</span> {order.status}
                </p>
              </div>
            </div>
          </div>
          <h3 className='text-2xl font-bold mb-2 text-center'>Products:</h3>
          <div className='flex'>
            {order.products.map((product) => (
              <div key={product._id} className='border-b border-gray-200 py-4'>
                <p className='mb-2'>
                  <span className='font-semibold'>Name:</span>{' '}
                  {product.productNames.join(', ')}
                </p>
                <p className='mb-2'>
                  <span className='font-semibold'>Description:</span>{' '}
                  {product.productDescription}
                </p>
                <p className='mb-2'>
                  <span className='font-semibold'>Flavour:</span> {product.flavour}
                </p>
                <p className='mb-2'>
                  <span className='font-semibold'>Size:</span> {product.productSize}
                </p>
                <p className='mb-2'>
                  <span className='font-semibold'>Quantity:</span> {product.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orderscard;
