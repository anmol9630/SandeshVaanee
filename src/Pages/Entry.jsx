// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { toast, ToastContainer } from "react-toastify";
// import debounce from "lodash.debounce";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import Search from "./Search";


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
//           <div>
//             <Search/>
//           </div>
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




