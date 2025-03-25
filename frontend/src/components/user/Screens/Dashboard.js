import React from "react";
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";  
import { AnimatedSunMoon } from "./AnimatedBackground .js";  
import Meet from "./meet.js";
import LobbyScreen from "./Lobby.jsx";
import ChatComponent from "../Div/ChatComponent.js";
import TaskComponent from "../Div/TaskComponent.js";

const Container = styled.div`
  display: flex;
  width: 100vh;
  height: 100vh;
  background-color: ${({ $isDarkMode }) =>
    $isDarkMode ? "#2c3e50" : "#f2f3f7"};
  color: ${({ $isDarkMode }) => ($isDarkMode ? "#ecf0f1" : "#2c3e50")};
  padding: 8px 30px;
  transition: all 0.5s ease;
  position-right :auto
`;

const RightSide = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  background-color: ${({ $isDarkMode }) =>
    $isDarkMode ? "#2c3e50" : "#f2f3f7"};
  color: ${({ $isDarkMode }) => ($isDarkMode ? "#ecf0f1" : "#2c3e50")};
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const HeaderContainer = styled.div`
  display: flex;
 top:2px:
  align-items: center;
  padding: 10px;
  overflow: hidden;  /* Ensures no overflow */
  white-space: nowrap; /* Prevents text from wrapping */
  max-width: 100%; /* Ensures it stays within the container */
  box-sizing: border-box; /* Includes padding in width calculations */
`;


const Dashboard = ({ isDarkMode, moonSunControls }) => {
  return (
    <Container $isDarkMode={isDarkMode}>
      <RightSide $isDarkMode={isDarkMode}>
        <div
          className="Dashboard"
          style={{
            "--bg-color": isDarkMode ? "#180161" : "#f2f3f7",
            "--text-color": isDarkMode ? "#ecf0f1" : "#2c3e50",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "90%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            zIndex: 1,
            color: "#333",
            overflow: "auto", 
            display: "flex",  
            flexDirection: "column",  
            justifyContent: "center",  
            alignItems: "center",
            // border:"2px solid black"  
          }}
        >
          <HeaderContainer>
            <Meet />
          </HeaderContainer>

      
          <Outlet />
        </div>

        <Content>
          <AnimatedSunMoon moonSunControls={moonSunControls} />
        </Content>
      </RightSide>
    </Container>
  );
};

export default Dashboard;
