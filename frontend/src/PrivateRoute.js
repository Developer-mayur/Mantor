import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.User?.isLoggedIn);
  const location = useLocation();

  console.log("Is Logged In:", isLoggedIn);  

  return isLoggedIn ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;
