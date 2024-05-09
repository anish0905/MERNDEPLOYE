import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Add } from "../../utils/Add";
import DeleteModal from "../../utils/Modal/Category/DeleteModal";
import EditCategoryModal from "../../utils/Modal/Category/EditCategoryModal";
import Logout from "../../utils/Logout";
import Styles from '../../Styles/Styles.css'

function Category() {
  const [categorys, setCategorys] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    fetch("http://localhost:5001/api/category", {
      headers: {
        Authorization: `Bearer ${token}`,

      },
    })
       
      .then((response) => response.json())
      .then((data) => {
        setCategorys(data);
        console.log(token)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (categoryId) => {
    setDeleteCategoryId(categoryId);
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
        `http://localhost:5001/api/category/${deleteCategoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setCategorys(
          categorys.filter((category) => category._id !== deleteCategoryId)
        );
        console.log("Category deleted successfully");
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    setShowDeleteModal(false);
  };

  const openEditModal = (categoryId) => {
    setEditCategoryId(categoryId);
    setShowEditModal(true);
  };

  const updateCategory = (updatedCategory) => {
    const updatedCategories = categorys.map((category) =>
      category._id === updatedCategory._id ? updatedCategory : category
    );
    setCategorys(updatedCategories);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const filteredCategorys = categorys.filter((category) =>
    category.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // Logic to calculate the current categorys to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategorys = filteredCategorys.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Logic to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
   <div className="flex font-sans bg">
      <div className="p-5 sm:">
        <Navbar />
      </div>
      <div className="w-full ml-60 xl:ml-80 sm:ml-20 md-ml-40 h-screen">
        <div>
          <Logout/>
        </div>
        <div>
          <Add
            name="Category"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="overflow-x-auto justify-start flex md:px-5 px-4 mx-5 mt-10 Table_Container">
          <table className="w-full">
            <thead className="Table uppercase text-base h-11  dark:bg-gray-700 dark:text-gray-400 text-inherit justify-between">
              <tr className="lg:px-6 lg:py-3 md:px-2 px-1">
                <th className="text-center" scope="col">
                  S.NO
                </th>
                <th className="text-center" scope="col">
                  Name
                </th>
                <th className="text-center" scope="col">
                  Status
                </th>
                <th className="text-center" scope="col"></th>
              
              </tr>
            </thead>
            <tbody>
            {currentCategorys.map((category, index) => (
  <tr
    key={index}
    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 lg:px-6 lg:py-3 text-black md:px-2 px-1 text-xs md:text-sm lg:text-base`}
  >
    <td className="text-center font-normal">
      {indexOfFirstItem + index + 1}
    </td>
    <td className="text-center font-medium">{category.name}</td>
    <td className="text-center">
      <span
        className={`font-normal ${
          category.status === "active" ? "bg-green-500" : "bg-red-500"
        } text-white py-1 px-2 rounded`}
      >
        {category.status}
      </span>
    </td>
    <td
      className="flex justify-end items-center gap-2 py-5 mr-3"
    >
      <div
        onClick={() => openEditModal(category._id)}
        className="flex justify-start items-center EditButton"
      >
        <FaEdit className="text-xl" />
      </div>
      <div
        onClick={() => handleDelete(category._id)}
        className="flex justify-start items-center DeleteButton"
      >
        <MdDelete className="text-xl" />
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
            {Array.from({
              length: Math.ceil(filteredCategorys.length / itemsPerPage),
            }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 ${
                    currentPage === index + 1
                      ? "bg-gray-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  } rounded-md`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      <EditCategoryModal
        isOpen={showEditModal}
        onClose={closeModal}
        categoryId={editCategoryId}
        onUpdate={updateCategory}
      />
    </div>
  );
}

export default Category;
