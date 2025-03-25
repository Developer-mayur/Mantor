import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    transform-style: preserve-3d;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    --cbz: cubic-bezier(0.68, -0.55, 0.27, 1.55);
    background: linear-gradient(180deg, #000, #080212, #341c5e, #50587e, #0079d9, #39a7ff, #70c6ed);
    transition: background 2s ease-in-out;
  }
`;

const Building = () => {
  const [isDay, setIsDay] = useState(false);
  const moonSunControls = useAnimation();
  const bgControls = useAnimation();
  const starsControls = useAnimation();

  useEffect(() => {
    const screenWidth = window.innerWidth;
  
    let xValue, yValue;
  
    if (screenWidth < 576) {
      // xs (Extra Small) - Mobile
      xValue = "40vmin";
      yValue = "25vmin";
    } else if (screenWidth < 768) {
      // sm (Small) - Tablets
      xValue = "50vmin";
      yValue = "30vmin";
    } else if (screenWidth < 992) {
      // md (Medium) - Small Laptops
      xValue = "70vmin";
      yValue = "32vmin";
    } else if (screenWidth < 1200) {
      // lg (Large) - Desktops
      xValue = "80vmin";
      yValue = "35vmin";
    } else {
      // xl (Extra Large) - Large Screens
      xValue = "85vmin";
      yValue = "40vmin";
    }
  
    moonSunControls.start({
      x: xValue,
      y: yValue,
      background: "radial-gradient(circle at 26% 71%, #ffffff 8%, #fff0 12%)",
      boxShadow: "0 0 8vmin 2vmin #6493a9",
      filter: "drop-shadow(0px 1px 6vmin #6493a9)",
    });
  }, []);
  
  
  

  const toggleDayNight = async () => {
    setIsDay((prevIsDay) => !prevIsDay);

    await moonSunControls.start({
      y: isDay ? "35vmin" : "-35vmin",
      background: isDay
        ? "radial-gradient(circle at 45% 55%, #fff -13%, yellow 35%, orange 90%, #fff0 90%)"
        : "radial-gradient(circle at 26% 71%, #ffffff 8%, #fff0 12%)",
      boxShadow: isDay
        ? "0 0 6em 3em #ff9800, 0 0 8em 0 #ff9800 inset"
        : "0 0 8vmin 2vmin #6493a9",
      filter: isDay
        ? "drop-shadow(0px 1px 6vmin #ff9800)"
        : "drop-shadow(0px 1px 6vmin #6493a9)",
      transition: { duration: 2, ease: "easeInOut" },
    });

    bgControls.start({
      background: isDay
        ? "linear-gradient(180deg, #39a7ff, #70c6ed)"
        : "linear-gradient(180deg, #000, #080212, #341c5e)",
      transition: { duration: 2, ease: "easeInOut" },
    });

    starsControls.start({
      opacity: isDay ? 0 : 1,
      transition: { duration: 2 },
    });
  };

  return (
    <Container>
      <GlobalStyle />
      <Checkbox type="checkbox" id="day-night" checked={isDay} onChange={toggleDayNight} />
      <Label htmlFor="day-night">
        <ToggleHandle animate={{ x: isDay ? 60 : 0 }} />
      </Label>

      <Content>
        <Background animate={bgControls} initial={{ backgroundPosition: "0% 10%" }} />
        <Stars animate={starsControls} initial={{ opacity: 0 }} />
        <MoonSun animate={moonSunControls} initial={{ y: "35vmin" }} />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  width: 80vmin;
  height: 100vh;
  margin: 0 auto;
`;

const Background = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 100%;
  background-size: cover;
  transition: background 2s ease-in-out;
`;

const Stars = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 200%;
  background-image: radial-gradient(0.1vmin 0.1vmin at 50% 50%, #ffffff, #fff0),
    radial-gradient(0.2vmin 0.2vmin at 50% 50%, #ffffff, #fff0);
  background-repeat: repeat-x;
  filter: drop-shadow(0px 0px 2px #fff);
  opacity: 0;
`;

const MoonSun = styled(motion.div)`
  position: absolute;
  width: 18vmin;
  height: 18vmin;
  border-radius: 50%;
  right: 10vmin;
  z-index: 10;
  transform: translateZ(20vmin);
  background: radial-gradient(circle at 26% 71%, #ffffff 8%, #fff0 12%);
`;

const Checkbox = styled.input`
  display: none;
`;

const Label = styled.label`
  position: absolute;
  right: 3vmin;
  bottom: 3vmin;
  width: 13vmin;
  height: 5vmin;
  background: #0008;
  border-radius: 4vmin;
  cursor: pointer;
  z-index: 1000;
`;

const ToggleHandle = styled(motion.div)`
  position: absolute;
  width: 6vmin;
  height: 6vmin;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 0 1vmin 0 #fffc;
  top: -0.5vmin;
  left: -0.5vmin;
`;

export default Building;
