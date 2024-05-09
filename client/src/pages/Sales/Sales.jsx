import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Add } from '../../utils/Add';
import DeleteModal from '../../utils/Modal/Sales/DeleteModal'; // Assuming you have a DeleteModal component
import EditSaleModal from '../../utils/Modal/Sales/EditSales'; // Assuming you have an EditSaleModal component
import Logout from '../../utils/Logout';

function Sales() {
  const [salesData, setSalesData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteSaleId, setDeleteSaleId] = useState(null);
  const [editSaleId, setEditSaleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    fetch('http://localhost:5001/api/sales', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSalesData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handleDelete = async (saleId) => {
    setDeleteSaleId(saleId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication token not found.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/api/sales/${deleteSaleId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setSalesData(salesData.filter((sale) => sale._id !== deleteSaleId));
        console.log('Sale deleted successfully');
      } else {
        console.error('Failed to delete sale');
      }
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
    setShowDeleteModal(false);
  };

  const openEditModal = (saleId) => {
    setEditSaleId(saleId);
    setShowEditModal(true);
  };

  const updateSale = (updatedSale) => {
    const updatedSalesData = salesData.map((sale) => (sale._id === updatedSale._id ? updatedSale : sale));
    setSalesData(updatedSalesData);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const filteredSalesData = salesData.filter((sale) => sale.email_Id.toLowerCase().includes(searchQuery.toLowerCase()));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSalesData = filteredSalesData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!Array.isArray(salesData)) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  

  return (
    <div className="flex">
      <div className="p-5 sm:">
        <Navbar />
      </div>
      <div className="w-full ml-80">
        <div> 
          <Logout />
        </div>
        <div>
          <Add name="Sales" searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        </div>
        <div className="overflow-x-auto justify-start flex md:px-5 px-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead  className="Table uppercase text-base h-11  dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className='text-center' scope="col">S No</th>
                <th className='text-center' scope="col">Product Name</th>
                <th className='text-center' scope="col">Order Quantity</th>
                <th className='text-center' scope="col">Price Per Unit</th>
                <th className='text-center' scope="col">Total Price</th>
                {/* <th scope="col">Email ID</th> */}
                <th className='text-center' scope="col">Date</th>
                <th className='text-center' scope="col">Time</th>
               
                {/* <th scope="col">State</th>
                <th scope="col">District</th> */}
                
                <th scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSalesData.map((sale, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                >
                  <td className="text-center font-normal">{indexOfFirstItem + index + 1}</td>
                  {/* <td>{sale.email_Id}</td> */}
                  <td className='text-center text-normal font-semibold'>{sale.ProductName}</td>
                  <td className='text-center'>{sale.order_qty}</td>
                  <td className='text-center'>{sale.price_per_unit}</td>
                  <td className='text-center'>{sale.totalPrice}</td>
                  <td className='text-center'>{formatDate(sale.date)}</td>
                  <td className='text-center'>{sale.time}</td>
                 
                  {/* <td>{sale.state}</td>
                  <td>{sale.district}</td> */}
                 
                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div onClick={() => openEditModal(sale._id)} className="flex justify-start items-center EditButton">
                      <FaEdit className="text-xl" />
                      <div>Edit Sale</div>
                    </div>
                    <div onClick={() => handleDelete(sale._id)} className="flex justify-start items-center DeleteButton">
                      <MdDelete className="text-xl" />
                      <div>Delete Sale</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4 fixed bottom-5 left-1/2">
          <ul className="flex gap-2">
            {Array.from({ length: Math.ceil(filteredSalesData.length / itemsPerPage) }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 ${
                    currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'
                  } rounded-md`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DeleteModal isOpen={showDeleteModal} onClose={closeModal} onConfirm={confirmDelete} />
      <EditSaleModal isOpen={showEditModal} onClose={closeModal} saleId={editSaleId} onUpdate={updateSale} />
    </div>
  );
}

export default Sales;
