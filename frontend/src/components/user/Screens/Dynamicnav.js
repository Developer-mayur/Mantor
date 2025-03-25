import React, { useState } from "react";

const styles = {
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#3F51B5",
    transition: "transform 0.3s ease",
    padding: "10px 20px",
  },
  navItemHover: {
    transform: "scale(1.1)",
  },
};

const DynamicNav = ({ navItems }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <>
      {navItems.map((item, index) => (
        <button
          key={index}
          style={{
            ...styles.navItem,
            ...(hoverIndex === index ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          onClick={item.action}  // ✅ Handles the rendering dynamically
        >
          <svg
            width="150"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C10.343 2 9 3.343 9 5C9 5.307 9.035 5.605 9.101 5.894C8.308 6.352 7.682 7.032 7.316 7.841C6.553 7.406 5.638 7 4.5 7C2.567 7 1 8.567 1 10.5C1 12.433 2.567 14 4.5 14H12V2Z"
              fill="lightblue"
            />
            <path
              d="M13 22L15 17H12L14 12L10 18H13L11 22H13Z"
              fill="yellow"
              stroke="orange"
              strokeWidth="1.5"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              fontSize="8"
              fill="blue"
              fontFamily="Comic Sans MS"
              fontWeight="bold"
              dominantBaseline="middle"
            >
              {item.name}
            </text>
          </svg>
        </button>
      ))}
    </>
  );
};

export default DynamicNav;
