import { Route, Routes } from "react-router-dom";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./PrivateRoute";  
 
function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* 🔥 Protected Routes inside PrivateRoute */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} /> 
       </Route>
    </Routes>
  );
}

export default RouteConfig;
