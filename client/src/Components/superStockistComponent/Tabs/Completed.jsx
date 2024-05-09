import React, { useState } from 'react';
import OrderConfirmationButton from '../OrderConfirmationButton';
import ProductDetailsModal from './ProductDetailsModal'; // Import your modal component

function Completed({ data }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='p-10'>
      <table className='w-full border-collapse border border-gray-500'>
        <thead className='bg-[#001d3d] text-[#ffffff]'>
          <tr className='h-16'>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>MESSAGE</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>STOCKIST MESSAGE</th>
            <th>PRODUCTS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody className='bg-[#ffffff]'>
          {data.map((order) => (
            <tr key={order._id} className='h-12 border-b border-gray-300'>
              <td className="text-center">{order.username}</td>
              <td className="text-center">{order.email}</td>
              <td className="text-center">{order.message}</td>
              <td className="text-center">{new Date(order.date).toLocaleDateString()} <span className='pl-2'>{order.time}</span></td>
              <td className="text-center">{order.status}</td>
              <td className="text-center">{order.stockistMessage}</td>
              <td className="text-center">
                <button onClick={() => handleProductDetails(order.products)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Product Details
                </button>
              </td>
              <td className="text-center">
                <OrderConfirmationButton sms="Confirm Order" smsAlert="Are you sure you want to proceed with the order confirmation?" productId={order._id} status="pending" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {isModalOpen && selectedProduct && (
        <ProductDetailsModal
          selectedProduct={selectedProduct}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Completed;
