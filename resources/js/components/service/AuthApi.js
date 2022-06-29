import axios from "axios";
import jwtDecode from "jwt-decode";
import { get } from "lodash";
import swl from "sweetalert";
import { getItem, setItem, removeItem } from "./LocalStorage";

function hasAuthenticated() {
    if (getItem("user")) {
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
                setItem("user", response.data.data.id);
                return response.data.success;
            }
        })
        .catch((err) => {
            loading(false);
            console.log(err);
            return false;
        });
}
function logout() {
    removeItem("user");
    return true;
}

export { hasAuthenticated, login, logout };
