import React, { useEffect, useState } from "react";
import Dash from "../components/user/Dash.js";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
      localStorage.setItem("userId", user.id); // Store userId in localStorage
    }
  }, [user]);

  console.log("Current User ID in Dashboard:", userId);

  return (
    <>
      <Dash />
    
      <Outlet />
    </>
  );
};

export default Dashboard;
