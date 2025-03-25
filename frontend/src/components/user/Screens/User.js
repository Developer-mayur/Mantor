 import React, { useState } from "react";
 import Building from "../new.js";  // Import the new component
 
 const styles = {
   container: {
     width: "270px",
     borderRight: "1px solid #ddd",
     padding: "20px",
   },
   backButton: {
     padding: "10px",
     backgroundColor: "#f093fb",
     color: "white",
     border: "none",
     borderRadius: "5px",
     cursor: "pointer",
     marginBottom: "10px",
   },
 };
 
 function User({ setShowMeet }) {
   const [showBuilding, setShowBuilding] = useState(false);   
 
   return (
     <div style={styles.container}>
       {showBuilding ? (
         <Building /> 
       ) : (
         <>
           <div>
             <img
               src="https://i.ibb.co/KxBtx6QV/g-removebg-preview.png"
               alt="logo"
               style={{ width: "120px", marginBottom: "30px" }}
             />
           </div>
           <div style={{ marginTop: "30px", color: "#b8b8b8", fontSize: "14px" }}>
             Messages
           </div>
           <div>
         <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" />
         <span style={{ marginLeft: "10px", fontWeight: "bold" }}>Password </span>
       </div>
       <div>
         <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" />
         <span style={{ marginLeft: "10px", fontWeight: "bold" }}>Profile Picture </span>
       </div>
       <div>
         <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" />
         <span style={{ marginLeft: "10px", fontWeight: "bold" }}>Notifications </span>
       </div>  
         </>
       )}
     </div>
   );
 }
 
 export default User;
 