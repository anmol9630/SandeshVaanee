import React, { useState, useEffect } from 'react';

const PickPush = () => {
  // Sample JSON data for groups and items
  const groups = [
    { GroupId: 1, GroupName: 'Group 1' },
    { GroupId: 2, GroupName: 'Group 2' },
  ];

  const items = [
    { ItemId: 1, GroupId: 1, ItemName: 'Item 1' },
    { ItemId: 2, GroupId: 1, ItemName: 'Item 2' },
    { ItemId: 3, GroupId: 2, ItemName: 'Item 3' },
    { ItemId: 4, GroupId: 2, ItemName: 'Item 4' },
    { ItemId: 5, GroupId: null, ItemName: 'Item 5' },
    { ItemId: 6, GroupId: null, ItemName: 'Item 6' },
  ];

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupItems, setGroupItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [checkedItemsInGroup, setCheckedItemsInGroup] = useState([]);
  const [checkedItemsOutOfGroup, setCheckedItemsOutOfGroup] = useState([]);

  // Handle the selection of a group
  const handleGroupChange = (e) => {
    const groupId = parseInt(e.target.value);
    setSelectedGroup(groupId);
  };

  // Set the items belonging to the selected group
  useEffect(() => {
    if (selectedGroup) {
      const itemsInGroup = items.filter(item => item.GroupId === selectedGroup);
      const itemsOutOfGroup = items.filter(item => item.GroupId !== selectedGroup);

      setGroupItems(itemsInGroup);
      setAvailableItems(itemsOutOfGroup);
    } else {
      setGroupItems([]);
      setAvailableItems(items);
    }
  }, [selectedGroup]);

  // Handle shifting items from bottom grid to top grid
  const moveItemsToGroup = () => {
    const movedItems = availableItems.filter(item => checkedItemsOutOfGroup.includes(item.ItemId));
    
    // Remove selected items from available items
    const newAvailableItems = availableItems.filter(item => !checkedItemsOutOfGroup.includes(item.ItemId));
    
    // Add the moved items to the group
    const updatedGroupItems = [...groupItems, ...movedItems];
    
    setGroupItems(updatedGroupItems);
    setAvailableItems(newAvailableItems);
    setCheckedItemsOutOfGroup([]);
  };

  return (
    <div className="container mx-auto p-8">
      {/* Dropdown to select group */}
      <div className="mb-6">
        <label className="text-xl font-semibold">Select Group: </label>
        <select
          value={selectedGroup || ''}
          onChange={handleGroupChange}
          className="p-2 border rounded mt-2"
        >
          <option value="">-- Select a Group --</option>
          {groups.map(group => (
            <option key={group.GroupId} value={group.GroupId}>
              {group.GroupName}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Grid for selected group items */}
        <div className="col-span-1 p-4 border rounded bg-white">
          <h3 className="text-xl font-semibold mb-4">Items in Selected Group</h3>
          <div className="space-y-3">
            {groupItems.map(item => (
              <div key={item.ItemId} className="flex items-center">
                <input
                  type="checkbox"
                  checked={checkedItemsInGroup.includes(item.ItemId)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckedItemsInGroup([...checkedItemsInGroup, item.ItemId]);
                    } else {
                      setCheckedItemsInGroup(checkedItemsInGroup.filter(id => id !== item.ItemId));
                    }
                  }}
                  className="mr-3"
                />
                <span>{item.ItemName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Button to move items */}
        <div className="flex justify-center items-center flex-col p-4">
          <button
            onClick={moveItemsToGroup}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Move Items to Group
          </button>
        </div>

        {/* Grid for available items */}
        <div className="col-span-1 p-4 border rounded bg-white">
          <h3 className="text-xl font-semibold mb-4">Items not in Group</h3>
          <div className="space-y-3">
            {availableItems.map(item => (
              <div key={item.ItemId} className="flex items-center">
                <input
                  type="checkbox"
                  checked={checkedItemsOutOfGroup.includes(item.ItemId)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckedItemsOutOfGroup([...checkedItemsOutOfGroup, item.ItemId]);
                    } else {
                      setCheckedItemsOutOfGroup(checkedItemsOutOfGroup.filter(id => id !== item.ItemId));
                    }
                  }}
                  className="mr-3"
                />
                <span>{item.ItemName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickPush;
