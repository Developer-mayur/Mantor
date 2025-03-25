import React from "react";

const styles = {
  container: {
    width: "100%",  // Full width navbar
    height: "60px",  // Navbar height
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly", // Even spacing
    background: "#f5f5f5",
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: 1000,
  },
  item: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "10px 15px",
    borderRadius: "5px",
    background: "#fff",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  icon: {
    width: "25px",
    marginRight: "10px",
  },
};

function Massage() {
  return (
    <div style={styles.container}>
      <div style={styles.item}>
        <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
        <span>Ram</span>
      </div>
      <div style={styles.item}>
        <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
        <span>Shyam</span>
      </div>
      <div style={styles.item}>
        <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
        <span>dhaam</span>
      </div>
      <div style={styles.item}>
        <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
        <span>naam</span>
      </div>
      <div style={styles.item}>
        <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
        <span>kam</span>
      </div>
      <div style={styles.item}>
        <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
        <span>jaam</span>
      </div>
      <div style={styles.item}>
        <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
        <span>aam</span>
      </div>
    </div>
  );
}

export default Massage;
