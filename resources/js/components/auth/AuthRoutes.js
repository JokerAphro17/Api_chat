import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Auth";

export default function AuthRoutes({ path, element }) {
    const { isAuthenticated } = React.useContext(Auth);
    return isAuthenticated ? (
        <Route path={path} element={element} />
    ) : (
        <Redirect to="/" />
    );
}
