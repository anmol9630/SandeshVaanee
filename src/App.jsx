import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Utility from "./Pages/Utility";
import Others from "./Pages/Others";
import Profile from "./Pages/Profile";
import AboutUs from "./Pages/AboutUs";
import SideBar from "./Components/SideBar";
import Cash_Entry from "./Entry/Cash_Entry";
import Journal from "./Entry/Journal";
import Display from "./Entry/Balance";
import Account_Head from "./Master/Account_Head";

import Add_Others from "./Master/Add_Others";
import Dataentry from "./Entry/Dataentry";
import DynamicReportTable from "./Master/Mystore/DynamicReportTable";
import StaticReportTable from "./Master/Mystore/StaticReportTable";
import MultiLevelGrid from "./Master/Mystore/MultiLevelGrid";
import Email from "./Master/Mystore/Email";
import PickPush from "./Master/Mystore/PickPush";
// import ProtectedRoutes from "./Components/Hooks/ProtectedRoutes";
// import SideBar from "./Components/SideBar";
const App = () => {
  const [user, setUser] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<ProtectedRoutes user={user} />}>
        </Route> */}
          <Route element={<SideBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/cash_entry" element={<Cash_Entry />} />
            <Route path="/balance" element={<Display />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/account_Head" element={<Account_Head />} />
            <Route path="/add_Others" element={<Add_Others />} />
            <Route path="/MultiLevelGrid" element={<MultiLevelGrid />} />
            <Route path="/utility" element={<Utility />} />
            <Route path="/others" element={<Others />} />
            <Route path="/" element={<Profile />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/dataentry" element={<Dataentry />} />
            <Route path="/Dyreport" element={<DynamicReportTable />} />
            <Route path="/Streport" element={<StaticReportTable />} />
            <Route path="/email" element={<Email />} />
            <Route path="/PickPush" element={<PickPush />} />
            <Route path="sidebar" element={<SideBar />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
