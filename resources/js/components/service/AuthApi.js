import axios from "axios";
import jwtDecode from "jwt-decode";
import { get } from "lodash";
import swl from "sweetalert";
import { getItem, setItem, removeItem } from "./LocalStorage";

function hasAuthenticated() {
    if (getItem("token")) {
        return true;
    }
    return false;
}
function login(data, loading) {
    return axios
        .post("/api/login", data)
        .then((response) => {
            loading(false);
            if (response.data.success) {
                console.log(response.data);
                setItem("token", response.data.data.token);
                setItem("user", response.data.data.user.id);
                return true;
            } else {
                swl("Error", response.data.message, "error");
            }
        })
        .catch((error) => {
            loading(false);
            swl("Error", "probleme de connexion", "error");
            return false;
        });
}
function logout() {
    removeItem("token");
    removeItem("user");
    return true;
}

export { hasAuthenticated, login, logout };
