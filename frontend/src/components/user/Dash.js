import React from "react";
import { Outlet } from "react-router-dom";  // ✅ Import Outlet for nested routes
import { useSelector } from "react-redux";
import Right from "./right.js";
import Nav from "./Screens/nav.js";

function Dash() {
  const isDarkMode = useSelector((state) => state.Theme.isDarkMode);

  return (
    <div style={appStyles(isDarkMode)}>
      <Nav />
      
      {/* ✅ Main Content Area */}
      <div style={styles.content}>
        <Right />
        
        {/* ✅ Render Nested Routes */}
        <Outlet />
      </div>
    </div>
  );
}

const appStyles = (isDarkMode) => ({
  display: "flex",
  height: "20vh",
  width: "100%",
  
  position: "sticky",
 
  backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
  color: isDarkMode ? "white" : "black",
  transition: "background 0.5s, color 0.5s",
});

const styles = {
  content: {
    flexGrow: 1,
    padding: "20px",
  },
};

export default Dash;
