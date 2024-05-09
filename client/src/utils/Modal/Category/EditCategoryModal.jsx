import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from "../../../Styles/Styles.css"

const EditCategoryModal = ({ isOpen, onClose, categoryId, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    if (isOpen) {
      fetchCategory();
    }
  }, [isOpen, categoryId]);

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
      const response = await axios.put(`http://localhost:5001/api/category/${categoryId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Category updated successfully');
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    }
  };

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="ModalBg rounded-lg w-1/3">
              <div className="p-6">
                <div className="mb-4 text-4xl font-bold text-center ">
                  <h3>Edit Category</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block my-2 text-left text-sm font-medium">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="shadow-sm text-black fond-bold bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Enter Category Name"
                      required
                    />
                  </div>

                  <div className="flex flex-row">
                    <div className="w-1/2 pr-2">
                      <label className="block my-2 text-left text-sm font-medium">
                        Status
                      </label>
                      <div>
                        <input
                          type="radio"
                          id="active"
                          name="status"
                          value="active"
                          checked={formData.status === "active"}
                          onChange={handleChange}
                        />
                        <label htmlFor="active" className="ml-2">
                          Active
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="inactive"
                          name="status"
                          value="inactive"
                          checked={formData.status === "inactive"}
                          onChange={handleChange}
                        />
                        <label htmlFor="inactive" className="ml-2">
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center items-center gap-10">
                    <button type="submit" className=" mt-2 hover:scale-105 ModalBtnRound  ModalBtUpdate shadow-lg" >
                      Update Category
                    </button>
                    <button onClick={onClose} type="button" className="mt-2 ModalBtCancle hover:scale-105 ModalBtnRound">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditCategoryModal;
