import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const localStorageToken = localStorage.getItem("token");

  return localStorageToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
