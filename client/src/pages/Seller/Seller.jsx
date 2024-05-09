import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import EditSeller from "../../utils/Modal/Seller/EditSeller";
import DeleteModal from "../../utils/Modal/Seller/DeleteModal";
import Logout from "../../utils/Logout";

function Seller() {
  const [sellers, setSellers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteSellerId, setDeleteSellerId] = useState(null);
  const [editSellerId, setEditSellerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    fetch("http://localhost:5001/api/seller/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSellers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (sellerId) => {
    setDeleteSellerId(sellerId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5001/api/seller/${deleteSellerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setSellers(sellers.filter((seller) => seller._id !== deleteSellerId));
        console.log("Seller deleted successfully");
      } else {
        console.error("Failed to delete seller");
      }
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
    setShowDeleteModal(false);
  };

  const openEditModal = (sellerId) => {
    setEditSellerId(sellerId);
    setShowEditModal(true);
  };

  const updateSeller = (updatedSeller) => {
    const updatedSellers = sellers.map((seller) =>
      seller._id === updatedSeller._id ? updatedSeller : seller
    );
    setSellers(updatedSellers);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const filteredSellers = sellers.filter((seller) =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastSeller = currentPage * itemsPerPage;
  const indexOfFirstSeller = indexOfLastSeller - itemsPerPage;
  const currentSellers = filteredSellers.slice(
    indexOfFirstSeller,
    indexOfLastSeller
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex font-sans bg-slate-400">
      <div className="p-5">
        <Navbar />
      </div>
      <div className="w-full ml-60 h-screen">
      <div>
          <Logout/>
        </div>
        <div>
          <Add
            name="Seller"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="overflow-x-auto md:px-5 px-4 mx-5 mt-10">
          <table className="w-full">
            <thead  className="Table uppercase text-base h-11  dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className="text-center" scope="col">
                  S No
                </th>
                <th className="text-center" scope="col">
                  Seller
                </th>
                <th className="text-center" scope="col">
                  Address
                </th>
                <th className="text-center" scope="col">
                  Products
                </th>
                <th className="text-center" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {currentSellers.map((seller, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                >
                  <th className="text-center font-normal" scope="row">
                    {index + 1}
                  </th>
                  <td className="text-center font-normal">{seller.name}</td>
                  <td className="text-center font-normal">{seller.address}</td>
                  <td className="text-center font-normal">{seller.products}</td>
                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div
                      onClick={() => openEditModal(seller._id)}
                      className="flex justify-start items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                    >
                      <FaEdit className="text-xl" />
                      <div>Edit Seller</div>
                    </div>
                    <div
                      onClick={() => handleDelete(seller._id)}
                      className="flex justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                    >
                      <MdDelete className="text-xl" />
                      <div>Delete Seller</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4 fixed bottom-5 left-1/2">
          <ul className="flex gap-2 justify-center">
            {Array.from(
              { length: Math.ceil(filteredSellers.length / itemsPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      <EditSeller
        isOpen={showEditModal}
        onClose={closeModal}
        sellerId={editSellerId}
        onUpdate={updateSeller}
      />
    </div>
  );
}

export default Seller;
