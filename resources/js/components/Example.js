import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Button from "@mui/material/Button";
import { AnimatePresence } from "framer-motion";
import Auth from "./Auth";
import Header from "./Header";
import SignUp from "./SignUp";
function Example() {
    return (
        <div className="container">
            <Header />
            <BrowserRouter>
                <AnimatePresence>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Auth />} />
                        <Route path="/register" element={<SignUp />} />
                        <Route
                            path="*"
                            element={
                                <div className="container justify-content-center align-content-center">
                                    Erreur 404 page non trouvé
                                </div>
                            }
                        />
                    </Routes>
                </AnimatePresence>
            </BrowserRouter>
        </div>
    );
}

export default Example;

if (document.getElementById("app")) {
    ReactDOM.render(<Example />, document.getElementById("app"));
}
