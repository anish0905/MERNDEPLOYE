import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import EditPurchaseModal from "../../utils/Modal/Purchase/EditPurchaseModal";
import DeleteModal from "../../utils/Modal/Purchase/DeleteModal";
import Logout from "../../utils/Logout";

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePurchaseId, setDeletePurchaseId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPurchaseId, setEditPurchaseId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [purchasesPerPage] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    fetch("http://localhost:5001/api/purchase", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setPurchases(data);
        setFilteredPurchases(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    setFilteredPurchases(
      purchases.filter((purchase) =>
        purchase.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, purchases]);

  const handleDelete = (purchaseId) => {
    setDeletePurchaseId(purchaseId);
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
        `http://localhost:5001/api/purchase/${deletePurchaseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setPurchases(
          purchases.filter((purchase) => purchase._id !== deletePurchaseId)
        );
        setFilteredPurchases(
          filteredPurchases.filter(
            (purchase) => purchase._id !== deletePurchaseId
          )
        );
        console.log("purchase deleted successfully");
      } else {
        console.error("Failed to delete purchase");
      }
    } catch (error) {
      console.error("Error deleting purchase:", error);
    }

    setShowDeleteModal(false);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false); // Close edit modal as well
  };

  const openEditModal = (purchaseId) => {
    setEditPurchaseId(purchaseId);
    setShowEditModal(true);
  };

  const updatePurchase = (updatedPurchase) => {
    const updatedPurchases = purchases.map((purchase) =>
      purchase._id === updatedPurchase._id ? updatedPurchase : purchase
    );
    setPurchases(updatedPurchases);
    setFilteredPurchases(updatedPurchases);
  };

  // Logic to calculate the current purchases to display based on pagination
  const indexOfLastPurchase = currentPage * purchasesPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - purchasesPerPage;
  const currentPurchases = filteredPurchases.slice(
    indexOfFirstPurchase,
    indexOfLastPurchase
  );

  // Logic to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex font-sans bg-slate-400">
      <div className="p-5 sm:">
        <Navbar />
      </div>
      <div className="w-full ml-60 h-screen">
      <div>
          <Logout/>
        </div>
        <div>
          <Add
            name="Purchase"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="overflow-x-auto  md:px-5 px-4 mx-5 mt-10 ">
          <table className="w-full">
            <thead className=" text-gray-600  uppercase bg-gray-300 text-base h-11 justify-between dark:bg-gray-700  dark:text-gray-400 text-inherit shadow-sm shadow-black rounded-b  ">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th scope="col" className="p-4">
                  <div className="flex items-center"></div>
                </th>
                <th scope="col">S.NO</th>
                <th scope="col">VENDOR</th>
                <th className="text-center " scope="col">
                  CATEGORY
                </th>
                <th className="text-center " scope="col">
                  PRODUCTS
                </th>
                <th className="text-center " scope="col">
                  UNITS
                </th>
                <th className="text-center " scope="col">
                  PURCHASE PRICE
                </th>
                <th className="text-center " scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {currentPurchases.map((purchase, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center"></div>
                  </td>
                  <td className="text-center">
                    {indexOfFirstPurchase + index + 1}
                  </td>
                  <td className="text-center">{purchase.vendor}</td>
                  <td className="text-center">{purchase.category}</td>
                  <td className="text-center">
                    {purchase.products.map((product) => (
                      <div key={product._id}>{product.name}</div>
                    ))}
                  </td>
                  <td className="text-center">
                    {purchase.products.map((product) => (
                      <div key={product._id}>{product.units}</div>
                    ))}
                  </td>
                  <td className="text-center">
                    {purchase.products.map((product) => (
                      <div key={product._id}>{product.purchase_price}</div>
                    ))}
                  </td>
                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div className="flex justify-start items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1">
                      <FaEdit className="text-xl" />
                      <div
                        onClick={() => openEditModal(purchase._id)}
                        className="hidden lg:inline md:inline cursor-pointer"
                      >
                        Edit Purchase
                      </div>
                    </div>
                    <div
                      onClick={() => handleDelete(purchase._id)}
                      className="flex justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                    >
                      <MdDelete className="text-xl" />
                      <div>Delete Purchase</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <nav className="mt-4 fixed bottom-5 left-1/2">
            <ul className="flex justify-center">
              {Array.from({
                length: Math.ceil(filteredPurchases.length / purchasesPerPage),
              }).map((_, index) => (
                <li key={index}>
                  <button
                    className="px-3 py-1 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      <EditPurchaseModal
        isOpen={showEditModal}
        onClose={closeModal}
        purchaseId={editPurchaseId}
        onUpdate={updatePurchase}
      />
    </div>
  );
}

export default Purchases;
