import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Button from "@mui/material/Button";
import { AnimatePresence } from "framer-motion";
import Login from "./view/Login";
import SignUp from "./view/SignUp";
import Header from "./view/components/Header";
import Chat from "./view/Chat";
function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    return (
        <div className="container">
            <Header />
            <BrowserRouter>
                <AnimatePresence>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<SignUp />} />
                        <Route path="/chat" element={<Chat />} />
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

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
