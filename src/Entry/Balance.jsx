import React, { useEffect, useState, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import debounce from "lodash.debounce";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import Search from "./Search";

const StaticReportTable = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    itemNo: "",
    itemName: "",
    city: "",
    price: "",
  });

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
    // Static fake JSON data with at least 10 entries
    const staticItems = [
      { _id: "1", itemNo: "001", itemName: "Item One", city: "City A", price: 100 },
      { _id: "2", itemNo: "002", itemName: "Item Two", city: "City B", price: 200 },
      { _id: "3", itemNo: "003", itemName: "Item Three", city: "City C", price: 300 },
      { _id: "4", itemNo: "004", itemName: "Item Four", city: "City D", price: 400 },
      { _id: "5", itemNo: "005", itemName: "Item Five", city: "City E", price: 500 },
      { _id: "6", itemNo: "006", itemName: "Item Six", city: "City F", price: 600 },
      { _id: "7", itemNo: "007", itemName: "Item Seven", city: "City G", price: 700 },
      { _id: "8", itemNo: "008", itemName: "Item Eight", city: "City H", price: 800 },
      { _id: "9", itemNo: "009", itemName: "Item Nine", city: "City I", price: 900 },
      { _id: "10", itemNo: "010", itemName: "Item Ten", city: "City J", price: 1000 },
    ];

    setItems(staticItems);
    showToast("Static items loaded successfully!", "success");
  }, [showToast]);

  const deleteItem = (id) => {
    setItems(items.filter((item) => item._id !== id));
    showToast("Item deleted successfully!", "success");
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      itemNo: item.itemNo,
      itemName: item.itemName,
      city: item.city,
      price: item.price,
    });
  };

  const handleUpdate = () => {
    setItems(
      items.map((item) =>
        item._id === editingItem._id ? { ...editingItem, ...formData } : item
      )
    );
    setEditingItem(null);
    setFormData({ itemNo: "", itemName: "", city: "", price: "" });
    showToast("Item updated successfully!", "success");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Item No.", "Item Name", "City", "Price"]],
      body: items.map((item) => [item.itemNo, item.itemName, item.city, item.price]),
    });
    doc.save("items.pdf");
  };

  return (
    <>
      <div className="min-w-screen bg-gray-100">
        <ToastContainer position="top-center" />
        <div className="max-w-10xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          {/* search open */}
          {/* <div>
            <Search />
          </div> */}
          {/* search close */}
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Item List
          </h2>
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700">
                  Item No.
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700">
                  Item Name
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700">
                  City
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700">
                  Price
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.itemNo}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.itemName}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.city}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.price}
                  </td>
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
            </tbody>
          </table>
        </div>

        {editingItem && (
          <div className="max-w-10xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Edit Item
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Item No.</label>
                  <input
                    type="text"
                    name="itemNo"
                    value={formData.itemNo}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Item Name</label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Update Item
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={handlePdf}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default StaticReportTable;







// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { toast, ToastContainer } from "react-toastify";
// import debounce from "lodash.debounce";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// // import Search from "./Search";

// const Display = () => {
//   const [items, setItems] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);

//   const showToast = useCallback(
//     debounce((message, type) => {
//       if (type === "success") {
//         toast.success(message);
//       } else if (type === "error") {
//         toast.error(message);
//       }
//     }, 100),
//     []
//   );

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/item");
//         setItems(response.data);
//         showToast("Items fetched successfully!", "success");
//       } catch (error) {
//         console.error(
//           "Error fetching items:",
//           error.response ? error.response.data : error.message
//         );
//         showToast("Failed to fetch items. Please try again.", "error");
//       }
//     };

//     fetchItems();
//   }, [showToast]);

//   const deleteItem = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/item/${id}`);
//       setItems(items.filter((item) => item._id !== id));
//       alert("Are you sure to delete item");
//       showToast("Item deleted successfully!", "success");
//     } catch (error) {
//       console.error(
//         "Error deleting item:",
//         error.response ? error.response.data : error.message
//       );
//       showToast("Failed to delete item. Please try again.", "error");
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//   };

//   const handlePdf = () => {
//     const doc = new jsPDF();
//     doc.autoTable({
//       head: [["Item No.", "Item Name", "City", "Price"]],
//       body: items.map((item) => [
//         item.itemNo,
//         item.itemName,
//         item.city,
//         item.price,
//       ]),
//     });
//     doc.save("items.pdf");
//   };

//   return (
//     <>
//       <div className="min-w-screen bg-gray-100">
//         <ToastContainer position="top-center" />
//         <div className="max-w-10xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
//           {/* search open */}
//           {/* <div>
//             <Search />
//           </div> */}
//           {/* search close */}
//           <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//             Item List
//           </h2>
//           <table className="min-w-full bg-white border-collapse">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700">
//                   Item No.
//                 </th>
//                 <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700">
//                   Item Name
//                 </th>
//                 <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700">
//                   City
//                 </th>
//                 <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700">
//                   Price
//                 </th>
//                 <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr
//                   key={item._id}
//                   className="hover:bg-gray-100 transition duration-150"
//                 >
//                   <td className="py-3 px-4 border-b border-gray-300">
//                     {item.itemNo}
//                   </td>
//                   <td className="py-3 px-4 border-b border-gray-300">
//                     {item.itemName}
//                   </td>
//                   <td className="py-3 px-4 border-b border-gray-300">
//                     {item.city}
//                   </td>
//                   <td className="py-3 px-4 border-b border-gray-300">
//                     {item.price}
//                   </td>
//                   <td className="py-3 px-4 border-b border-gray-300">
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteItem(item._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 ml-2 rounded-lg"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-5 w-full bg-white text-center">
//           <button
//             onClick={handlePdf}
//             className="w-28 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="button"
//           >
//             Print PDF
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Display;
