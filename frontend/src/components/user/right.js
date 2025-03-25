import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux-config/ThemeSlice.js";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import Dashboard from "./Screens/Dashboard.js";  
import ToggleSwitch from "./Screens/ThemeToggle .js";
import { AnimatedSunMoon } from "./Screens/AnimatedBackground .js"; 

const Right = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.Theme.isDarkMode);

  const moonSunControls = useAnimation();

  useEffect(() => {
    moonSunControls.start({
      y: "0vh",          
        x: "80vw",
      background:
        "radial-gradient(circle at 45% 55%, #fff -13%, yellow 35%, orange 90%)",
      boxShadow: "0 0 6em 3em #ff9800, 0 0 8em 0 #ff9800 inset",
      filter: "drop-shadow(0px 1px 6vmin #ff9800)",
      transition: { duration: 1.5, ease: "easeInOut" },
    });
  }, [moonSunControls]);

  const toggleDayNight = async () => {
    dispatch(toggleTheme());
    const newIsDarkMode = !isDarkMode;

    await moonSunControls.start({
  





      
      y: newIsDarkMode ? "-12vh" : "0vh",
      x: newIsDarkMode ? "-1vh" : "80vw",
      background: newIsDarkMode
        ? "radial-gradient(circle at 30% 50%, #ffffff 30%, transparent 60%)"
        : "radial-gradient(circle at 45% 55%, #fff -13%, yellow 35%, orange 90%)",
      boxShadow: newIsDarkMode
        ? "0 0 8vmin 2vmin rgba(255, 255, 255, 0.3)"
        : "0 0 6em 3em #ff9800",
      filter: newIsDarkMode
        ? "drop-shadow(0px 1px 6vmin rgba(255, 255, 255, 0.2))"
        : "drop-shadow(0px 1px 6vmin #ff9800)",
      transition: { duration: 2, ease: "easeInOut" },
    });
  };

  return (
    <Container $isDarkMode={isDarkMode}>
      <RightSide $isDarkMode={isDarkMode}>
         <Dashboard
          isDarkMode={isDarkMode}
          toggleDayNight={toggleDayNight}
          moonSunControls={moonSunControls}
        />
        <ToggleSwitch isDarkMode={isDarkMode} toggleDayNight={toggleDayNight} />
      </RightSide>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? "#2c3e50" : "#f2f3f7")};
  transition: all 0.5s ease;
  overflow: hidden;
  position: relative;
  
`;

const RightSide = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? "#2c3e50" : "#f2f3f7")};
  overflow: hidden;
  position: relative;
`;

export default Right;
