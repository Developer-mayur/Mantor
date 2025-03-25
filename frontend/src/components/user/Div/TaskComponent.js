import React from "react";
 
const TaskComponent = ({ items = [] }) => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="col-md-4 mb-4 d-flex justify-content-center">
              
            
              <div className="card" style={{ width: "18rem" }}>  

              
               

                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>

                  {/* ✅ Status Badge */}
                  <span 
                    className={`badge ${item.status === "in-progress" ? "bg-warning" : "bg-success"}`}
                  >
                    {item.status}
                  </span>

                  {/* ✅ User ID Display */}
                  <p className="mt-2 text-muted">
                    <small>User ID: {item.userId}</small>
                  </p>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <h4>No tasks available</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskComponent;
