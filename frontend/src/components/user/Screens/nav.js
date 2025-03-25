import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSection } from "../../../redux-config/SectionSlice";

const styles = {
  sidebar: {
    width: "80px",
    height: "100vh",
    background: "linear-gradient(-225deg, #5271c4 0%, #b19fff 48%, #eca1fe 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
    gap: "20px",
    overflow: "hidden",
  },
  icon: {
    cursor: "pointer",
    height: "40px",
    transition: "transform 0.3s",
  },
};

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    // Reset the section state to a default value (e.g., null or "Home")
    dispatch(setSection(null));  // Reset the section when navigating to home
    navigate("/");  // Navigate to the home page
  };

  return (
    <div style={styles.sidebar}>
      <img
        src="https://i.ibb.co/KpSV5yvK/meet-1.png"
        alt="Meet"
        style={styles.icon}
        onClick={() => dispatch(setSection("Meet"))}
      />
      <img
        src="https://i.ibb.co/LhBGy6s0/clipboard-354051.png"
        alt="Task"
        style={styles.icon}
        onClick={() => dispatch(setSection("Task"))}
      />
      <img
        src="https://i.ibb.co/j9fGdz7K/images.jpg"
        alt="User"
        style={styles.icon}
        onClick={() => dispatch(setSection("User"))}
      />
      <img
        src="https://i.ibb.co/twYQhJHq/gfg-removebg-preview.png"
        alt="Home"
        style={styles.icon}
        onClick={handleHomeClick}  
      />
    </div>
  );
}

export default Nav;
