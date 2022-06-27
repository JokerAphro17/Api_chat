import axios from "axios";
import swl from "sweetalert";
export default function AuthApi(data, setdata, loading) {
    axios
        .post("/api/login", data)
        .then((response) => {
            loading(false);
            if (response.data.success) {
                setdata(response.data.user);
                swl("Success", response.data.message, "success");
                return true;
            } else {
                swl("Error", response.data.message, "error");
            }
        })
        .catch((error) => {
            loading(false);
            swl("Error", error.message, "error");
            return false;
        });
}
