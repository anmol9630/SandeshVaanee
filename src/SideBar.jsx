import React, { useState } from "react";

const SideBar = ({ menuData }) => {
  const [activeMenu, setActiveMenu] = useState(null); // Store active MainMenuSno

  const handleMenuClick = (menuSno) => {
    setActiveMenu(activeMenu === menuSno ? null : menuSno); // Toggle SubMenu
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      {/* Main Menu */}
      {menuData
        .filter((item) => item.SubMenuSno === 0) // Only display MainMenu items
        .map((mainMenu) => (
          <div key={mainMenu.MainMenuSno} className="border-b border-gray-600">
            <button
              onClick={() => handleMenuClick(mainMenu.MainMenuSno)}
              className="flex items-center w-full p-4 hover:bg-gray-700"
            >
              <span className="mr-3">{mainMenu.MainMenuIcon}</span>
              {mainMenu.MainMenuCaption}
            </button>
            {/* SubMenu */}
            {activeMenu === mainMenu.MainMenuSno && (
              <div className="pl-8 bg-gray-700">
                {menuData
                  .filter(
                    (item) =>
                      item.SubMenuSno !== 0 &&
                      item.MainMenuSno === mainMenu.MainMenuSno
                  )
                  .map((subMenu) => (
                    <a
                      href={subMenu.SubMenuPath}
                      key={subMenu.SubMenuSno}
                      className="block py-2 hover:text-yellow-400"
                    >
                      {subMenu.SubMenuIcon} {subMenu.SubMenuCaption}
                    </a>
                  ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

// Example JSON
const menuData = [
  {
    MainMenuSno: 1,
    MainMenuCaption: "Dashboard",
    MainMenuIcon: "📊",
    SubMenuSno: 0,
  },
  {
    MainMenuSno: 1,
    SubMenuSno: 101,
    SubMenuCaption: "Reports",
    SubMenuPath: "/reports",
    SubMenuName: "Reports",
    SubMenuIcon: "📄",
  },
  {
    MainMenuSno: 1,
    SubMenuSno: 102,
    SubMenuCaption: "Analytics",
    SubMenuPath: "/analytics",
    SubMenuName: "Analytics",
    SubMenuIcon: "📈",
  },
  {
    MainMenuSno: 2,
    MainMenuCaption: "Settings",
    MainMenuIcon: "⚙️",
    SubMenuSno: 0,
  },
  {
    MainMenuSno: 2,
    SubMenuSno: 201,
    SubMenuCaption: "Profile",
    SubMenuPath: "/profile",
    SubMenuName: "Profile",
    SubMenuIcon: "👤",
  },
];


// export default function App() {
//   return <Sidebar menuData={menuData} />;
// }
export default SideBar;
