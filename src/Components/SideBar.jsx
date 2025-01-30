import React, { useState } from "react";
import { motion } from "framer-motion";
import { Outlet, NavLink } from "react-router-dom";
import { FaHome, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GiEntryDoor, GiRingmaster } from "react-icons/gi";
import { LuUtilityPole } from "react-icons/lu";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { BiSolidUserAccount } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import { FaBarsStaggered } from "react-icons/fa6";

const SidebarJson = [
  {
    path: "/home",
    name: "Home",
    icon: <FaHome />,
  },
  {
    name: "Entry",
    icon: <GiEntryDoor />,
    submenu: [
      { path: "/cash_entry", name: "Cash_Entry" },
      { path: "/balance", name: "Balance" },
      { path: "/journal", name: "Journal" },
      { path: "/dataentry", name: "Data_Entry" },
    ],
  },
  {
    name: "Master",
    icon: <GiRingmaster />,
    submenu: [
      { path: "/account_Head", name: "Account_Head" },
      { path: "/add_Others", name: "Add_Others" },
      { path: "/Dyreport", name: "Dynamic_Grid" },
      { path: "/Streport", name: "Static_Grid" },
      { path: "/MultiLevelGrid", name: "MultiLevelGrid" },
      { path: "/sidebar", name: "SideBar" },
      { path: "/email", name: "Email" },
      { path: "/PickPush", name: "PickPush" },
    ],
  },
  {
    path: "/utility",
    name: "Utility",
    icon: <LuUtilityPole />,
  },
  {
    path: "/others",
    name: "Others",
    icon: <PiDotsThreeOutlineFill />,
  },
  {
    path: "/",
    name: "Profile",
    icon: <BiSolidUserAccount />,
  },
  {
    path: "/aboutUs",
    name: "About Us",
    icon: <FcAbout />,
  },
  
];

const SideBar = ({ children }) => {
  const [Open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({});

  const toggleSidebar = () => setOpen(!Open);

  const toggleSubmenu = (name) => {
    setSubmenuOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <div className="flex h-screen w-full">
      
      <motion.div
        initial={{ width: "50px" }}
        animate={{ width: Open ? "200px" : "0" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-[rgb(0,7,61)] text-white h-screen overflow-hidden"
      >
        
        <div className="flex justify-between items-center p-4">
          {Open && (
            <NavLink
              className="text-xl hidden font-bold md:block cursor-pointer"
              to="/"
            >
              ERP_RAFTAR
            </NavLink>
          )}
        </div>

        
        <nav className="mt-4">
          {SidebarJson.map((route) => (
            <div key={route.name}>
              <NavLink
                to={route.path}
                className="flex items-center gap-4 p-3 hover:bg-[rgb(45,51,89)] hover:border-r-[4px] transition duration-200"
                onClick={() => route.submenu && toggleSubmenu(route.name)}
              >
                <div className="text-2xl">{route.icon}</div>
                <div
                  className={`text-lg ${!Open && "hidden"} md:block flex-grow`}
                >
                  {route.name}
                </div>
                {route.submenu && (
                  <div className="text-lg">
                    {submenuOpen[route.name] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                )}
              </NavLink>
              {route.submenu && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: submenuOpen[route.name] ? "auto" : 0,
                    opacity: submenuOpen[route.name] ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {route.submenu.map((submenu) => (
                    <NavLink
                      to={submenu.path}
                      key={submenu.name}
                      className="flex items-center gap-4 p-2 ml-6 hover:bg-[rgb(45,51,89)] hover:border-r-[4px] transition duration-200"
                    >
                      <div className="text-sm">{submenu.name}</div>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="bg-slate-500 w-full h-20 fixed top-0 flex items-center px-4">
          <FaBarsStaggered
            className="text-2xl cursor-pointer text-white"
            onClick={toggleSidebar}
          />
        </div>
        <div className="pt-20">{children}</div>
        <Outlet />
      </main>
    </div>
  );
};

export default SideBar;
