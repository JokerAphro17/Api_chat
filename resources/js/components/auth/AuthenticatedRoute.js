import React from "react";
import Auth from "./Auth";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
const AuthenticatedRoute = () => {
    const { isAuthenticated } = useContext(Auth);

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default AuthenticatedRoute;
