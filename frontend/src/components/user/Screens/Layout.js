import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./nav";        
import Meet from "./meet";      

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* ✅ Sidebar remains constant */}
      <Nav />

      {/* ✅ Dynamic Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Meet />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
