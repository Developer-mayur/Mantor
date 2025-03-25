import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export const AnimatedSunMoon = ({ moonSunControls }) => (
  <SunContainer>
    <motion.div
      animate={moonSunControls}
      initial={{ y: "70vmin", x: "5vmin" }}
      style={{
        position: "absolute",
        width: "18vmin",
        height: "18vmin",
        borderRadius: "50%",
        zIndex: 10,
        boxShadow: "0 0 20px 10px rgba(255, 215, 0, 0.5)",
        background: "radial-gradient(circle at 45% 55%, #fff -13%, yellow 35%, orange 90%)",
      }}
    />
  </SunContainer>
);

const SunContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
`;
