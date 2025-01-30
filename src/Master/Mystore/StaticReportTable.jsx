import React, { useEffect, useState, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import debounce from "lodash.debounce";
import jsPDF from "jspdf";
import "jspdf-autotable";

const StaticReportTable = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = useCallback(
    debounce((message, type) => {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    }, 100),
    []
  );

  useEffect(() => {
    const staticItems = [
      { _id: "1", itemNo: "001", itemName: "Item One", city: "City A", price: 100 },
      { _id: "2", itemNo: "002", itemName: "Item Two", city: "City B", price: 200 },
      { _id: "3", itemNo: "003", itemName: "Item Three", city: "City C", price: 300 },
      { _id: "4", itemNo: "004", itemName: "Item Four", city: "City C", price: 400 },
      { _id: "5", itemNo: "005", itemName: "Item Five", city: "City C", price: 500 },
    ];

    setItems(staticItems);
    showToast("Static items loaded successfully!", "success");
  }, [showToast]);

  const deleteItem = async (id) => {
    setItems(items.filter((item) => item._id !== id));
    showToast("Item deleted successfully!", "success");
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handlePdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Item No.", "Item Name", "City", "Price"]],
      body: items.map((item) => [item.itemNo, item.itemName, item.city, item.price]),
    });
    doc.save("items.pdf");
  };

  const sortItems = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setItems((prevItems) =>
      [...prevItems].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "asc" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      })
    );
  };

  const filteredItems = items.filter((item) => {
    return (
      item.itemNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price.toString().includes(searchQuery.toLowerCase())
    );
  });

  const getTotal = (key) => {
    return items.reduce((total, item) => total + (item[key] || 0), 0);
  };

  return (
    <>
      <div className="min-w-screen bg-gray-100">
        <ToastContainer position="top-center" />
        <div className="max-w-10xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Item List</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th
                  onClick={() => sortItems("itemNo")}
                  className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700 cursor-pointer text-sm"
                >
                  Item No.
                </th>
                <th
                  onClick={() => sortItems("itemName")}
                  className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700 cursor-pointer text-sm"
                >
                  Item Name
                </th>
                <th
                  onClick={() => sortItems("city")}
                  className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700 cursor-pointer text-sm"
                >
                  City
                </th>
                <th
                  onClick={() => sortItems("price")}
                  className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700 cursor-pointer text-sm"
                >
                  Price
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100 transition duration-150">
                  <td className="py-3 px-4 border-b border-gray-300">{item.itemNo}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{item.itemName}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{item.city}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{item.price}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 ml-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-bold">
                <td className="py-3 px-4 border-b border-gray-300 text-sm">Total</td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm"></td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm"></td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm">{getTotal("price")}</td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-5 w-full bg-white text-center">
          <button
            onClick={handlePdf}
            className="w-28 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="button"
          >
            Print PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default StaticReportTable;
