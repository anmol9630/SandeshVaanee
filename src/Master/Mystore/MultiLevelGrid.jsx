import React, { useState, useEffect } from "react";

const MultiLevelGrid = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const sampleData = {
      groups: [
        {
          groupName: "Group A",
          items: [
            { itemName: "Item 1", price: 100 },
            { itemName: "Item 2", price: 150 },
          ],
        },
        {
          groupName: "Group B",
          items: [
            { itemName: "Item 3", price: 200 },
            { itemName: "Item 4", price: 250 },
          ],
        },
      ],
    };
    
    setData(sampleData.groups);
  }, []);

  const calculateGroupSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const calculateGrandTotal = () => {
    return data.reduce(
      (total, group) => total + calculateGroupSubtotal(group.items),
      0
    );
  };

  return (
    <div className="min-w-screen bg-gray-100">
      <div className="max-w-10xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Grouped Items</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((group, index) => (
            <div key={index} className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">{group.groupName}</h3>
              
              <div className="space-y-4">
                {group.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between">
                    <span>{item.itemName}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between font-bold">
                <span>Subtotal</span>
                <span>${calculateGroupSubtotal(group.items)}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-gray-100 p-4 border-t border-gray-300 text-right">
          <div className="font-semibold text-lg">
            <span>Grand Total: </span>
            <span>${calculateGrandTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLevelGrid;

