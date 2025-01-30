import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Item = ({ onClose }) => {
  const [item, setItem] = useState({
    itemNo: "",
    itemName: "",
    city: "",
    price: "",
  });

  const Clear = () => {
    setItem({
      itemNo: "",
      itemName: "",
      city: "",
      price: "",
    });
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const itemNoChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    item.itemNo = item.itemName;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonString = JSON.stringify(item);
      toast(jsonString);

      const response = await axios.post("http://localhost:5000/api/item", item);
      console.log(response.data);
      setItem({ itemNo: "", itemName: "", city: "", price: "" });
      toast.success("Item added successfully!");
    } catch (error) {
      console.error("Error inserting item", error);
      toast.error("Failed to add item. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 h-full w-full bg-cover bg-[url('./src/Images/back2.jpg')] p-4">
        <ToastContainer position="top-center" />
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border border-gray-200 mb-20">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Add New Items
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-2">
                Item No.
              </label>
              <input
                type="number"
                name="itemNo"
                value={item.itemNo}
                onChange={itemNoChange}
                required
                className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-2">
                Item Name
              </label>
              <input
                type="text"
                name="itemName"
                value={item.itemName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={item.city}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
              />
            </div>

            <div className="flex justify-center gap-5">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                ADD
              </button>

              <button
                onClick={Clear}
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Clear
              </button>

              <button
                onClick={onClose}
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Item;
