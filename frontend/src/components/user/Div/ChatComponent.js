import React from "react";

const ChatComponent = ( { items = [] } ) => {
  return (
    <div style={{ width: "300px", height: "400px", border: "2px solid #ccc", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
      <h2>Chat</h2>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          style={{ padding: "10px 20px", margin: "10px", backgroundColor: "#FF9800", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default ChatComponent;
