import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import EditProductStock from "../../utils/Modal/ProductStock/EditProductStock";
import DeleteModal from "../../utils/Modal/ProductStock/DeleteModal";

function formatCurrency(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

function ProductStock() {
  const [productStocks, setProductStocks] = useState([]);
  const [filteredProductStocks, setFilteredProductStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductStockId, setDeleteProductStockId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductStockId, setEditProductStockId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchProductStocks();
  }, []);

  useEffect(() => {
    setFilteredProductStocks(
      productStocks.filter((productStock) =>
        productStock.product_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, productStocks]);

  const fetchProductStocks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/productStock/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch product stocks");
      }
      const data = await response.json();
      setProductStocks(data);
      setFilteredProductStocks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (productStockId) => {
    setDeleteProductStockId(productStockId);
    setShowDeleteModal(true);
  };

  const handleEdit = (productStockId) => {
    setEditProductStockId(productStockId);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/productStock/${deleteProductStockId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Filter out the deleted product from the state
        setProductStocks(
          productStocks.filter(
            (productStock) => productStock._id !== deleteProductStockId
          )
        );
        setFilteredProductStocks(
          filteredProductStocks.filter(
            (productStock) => productStock._id !== deleteProductStockId
          )
        );
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    setShowDeleteModal(false);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProductStocks = filteredProductStocks.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex font-sans bg-slate-400">
      <div className="p-5">
        <Navbar />
      </div>
      <div className="w-full ml-60 h-screen">
        <div>
          <Add
            name="ProductStock"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="overflow-x-auto md:px-5 px-4 mx-5 mt-10">
          <table className="w-full bg-white rounded shadow-sm shadow-black">
            <thead  className="Table uppercase text-base h-11  dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className="text-center" scope="col">
                  S.NO
                </th>
                <th className="text-center" scope="col">
                  Category
                </th>
                <th className="text-center" scope="col">
                  Product Name
                </th>
                <th className="text-center" scope="col">
                  Published
                </th>
                <th className="text-center" scope="col">
                  Stock Count
                </th>
                <th className="text-center" scope="col">
                  Last Count
                </th>
                <th className="text-center" scope="col">
                  Quality
                </th>
                <th className="text-center" scope="col">
                  Vendor
                </th>
                <th className="text-center" scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProductStocks.map((productStock, index) => (
                <tr
                  key={productStock._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base"
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{productStock.category}</td>
                  <td className="text-center">{productStock.product_name}</td>
                  <td className="text-center">
                    {productStock.published?.toString()}
                  </td>
                  <td className="text-center">{productStock.stockCount}</td>
                  <td className="text-center">{productStock.lastCount}</td>
                  <td className="text-center">{productStock.quality}</td>
                  <td className="text-center">{productStock.vendor}</td>

                  <td className="flex justify-end items-center gap-2 py-5 mr-3">
                    <div
                      className="flex justify-start items-center bg-blue-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                      onClick={() => handleEdit(productStock._id)}
                    >
                      <FaEdit className="text-xl" />
                      <div>Edit ProductStock</div>
                    </div>
                    <div
                      onClick={() => handleDelete(productStock._id)}
                      className="flex justify-start items-center bg-red-500 p-2 rounded-lg text-white hover:shadow-lg text-xs font-thin gap-1 cursor-pointer"
                    >
                      <MdDelete className="text-xl" />
                      <div>Delete ProductStock</div>
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
            {Array.from(
              {
                length: Math.ceil(filteredProductStocks.length / itemsPerPage),
              },
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
      <EditProductStock
        isOpen={showEditModal}
        onClose={closeModal}
        productStockId={editProductStockId}
      />
    </div>
  );
}

export default ProductStock;
