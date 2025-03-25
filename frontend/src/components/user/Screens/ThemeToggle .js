import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ToggleSwitch = ({ isDarkMode, toggleDayNight }) => {
  return (
    <Switch>
      <Checkbox type="checkbox" checked={isDarkMode} onChange={toggleDayNight} />
      <Handle animate={{ x: isDarkMode ? 60 : 0}} />
    </Switch>
  );
};

const Switch = styled.label`
  position: absolute;
  right: 3vmin;
  bottom: 3vmin;
  width: 13vmin;
  height: 5vmin;
  background: #0008;
  border-radius: 4vmin;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
`;

const Checkbox = styled.input`
  display: none;
`;

const Handle = styled(motion.div)`
  width: 6vmin;
  height: 6vmin;
  border-radius: 100%;
  background:fff #;
  box-shadow: 0 0 1vmin 0 #fffc;
`;

export default ToggleSwitch;
