import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewProductStock() {
    const [formData, setFormData] = useState({
        category: '',
        product_name: '',
        published: false,
        stockCount: 0,
        lastCount: 0, // Changed from lastStock to lastCount
        quality: '',
        vendor: ''
    });
    const [activeUsers, setActiveUsers] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : (type === 'radio' ? (value === 'true') : value)
        }));
    };
    useEffect(() => {
      const fetchCategories = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
              console.error('Authentication token not found.');
              return;
          }
          try {
              const response = await axios.get('http://localhost:5001/api/category', {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              const activeCategories = response.data.filter(category => category.status === 'active');
              setActiveUsers(activeCategories);
          } catch (error) {
              console.error('Error fetching categories:', error);
          }
      };

      fetchCategories();
  }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token is missing");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5001/api/productStock/",
                {
                    ...formData,
                    published: formData.published === true ? 'true' : 'false' // Convert to string here
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            console.log(response.data);
            toast.success("ProductStock added successfully!");
            setFormData({
                category: '',
                product_name: '',
                published: false,
                stockCount: 0,
                lastCount: 0, // Changed from lastStock to lastCount
                quality: '',
                vendor: ''
            });
        } catch (error) {
            console.error("Error adding ProductStock:", error);
            toast.error("Failed to add ProductStock. Please try again.");
        }
    };

    return (
        <>
        <ToastContainer />
        <div className='pt-6 mb-4 text-4xl item-center font-bold text-center text-gray-900'>
          <h3>Add ProductStock</h3>
        </div>
      
        <div className="border border-black rounded-lg py-5 px-6 mx-auto max-w-screen-md">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <div className="w-1/2 pr-2">
                <label htmlFor="category" className="block my-2 text-left text-sm font-medium text-gray-900">Category</label>
                <select
                                name='category'
                                id='category'
                                value={formData.category}
                                onChange={handleChange}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            >
                                <option value=''>Select Category</option>
                                {activeUsers.map((category) => (
                                    <option key={category._id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="product_name" className="block my-2 text-left text-sm font-medium text-gray-900">Product Name</label>
                <input type="text" name="product_name" id="product_name" value={formData.product_name} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Product Name" required />
              </div>
            </div>
      
            <div className="flex flex-row">
              <div className="w-1/2 pr-2">
                <label className="block my-2 text-left text-sm font-medium text-gray-900">Published</label>
                <div>
                  <label htmlFor="published_yes">
                    <input type="radio" id="published_yes" name="published" value="true" checked={formData.published === true} onChange={handleChange} /> Yes
                  </label>
                </div>
                <div>
                  <label htmlFor="published_no">
                    <input type="radio" id="published_no" name="published" value="false" checked={formData.published === false} onChange={handleChange} /> No
                  </label>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="stockCount" className="block my-2 text-left text-sm font-medium text-gray-900">Stock Count</label>
                <input type="number" name="stockCount" id="stockCount" value={formData.stockCount} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Stock Count" required />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="lastCount" className="block my-2 text-left text-sm font-medium text-gray-900">Last Count</label>
                <input type="number" name="lastCount" id="lastCount" value={formData.lastCount} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Last Count" required />
              </div>
            </div>
      
            <div className="flex flex-row">
              <div className="w-1/2 pr-2">
                <label htmlFor="quality" className="block my-2 text-left text-sm font-medium text-gray-900">Quality</label>
                <select name="quality" id="quality" value={formData.quality} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required>
                  <option value="">Select Quality</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="vendor" className="block my-2 text-left text-sm font-medium text-gray-900">Vendor</label>
                <input type="text" name="vendor" id="vendor" value={formData.vendor} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Vendor" required />
              </div>
            </div>
      
            <div className='mt-6 item-center'>
              <button type="submit" className="mt-2 p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105">Add Purchase</button>
            </div>
          </form>
        </div>
      </>
      
    );
}

export default AddNewProductStock;
