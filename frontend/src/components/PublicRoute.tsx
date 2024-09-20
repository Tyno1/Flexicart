import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute: React.FC = () => {
  const { user } = useContext(AuthContext);

  return user && user.token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
