import * as React from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "./components/Loader";
import AuthApi from "../service/AuthApi";
function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="#">
                Simplon Chat
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [mail_error, setMailError] = React.useState(false);
    const [password_error, setPasswordError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const location = useLocation();
    const [data, setData] = React.useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === "") {
            setMailError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }
        if (email !== "" && password !== "" && error === false) {
            const data = {
                email: email,
                password: password,
            };
            setIsLoading(true);
            AuthApi(data, setData, setIsLoading);
        }
    };

    const validateEmail = (email, setError) => {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            setError(false);
        } else {
            setError(true);
        }
    };
    const fieldRequired = (field, setError) => {
        if (field === "") {
            setError(true);
        } else {
            setError(false);
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <motion.div
                animate={{ scale: [0, 1] }}
                transition={{ times: [0, 0.5] }}
            >
                <Container component="main" maxWidth="sm" className="box">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Connexion
                        </Typography>
                        <Loader isLoading={isLoading} />
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                error={mail_error || error}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    validateEmail(event.target.value, setError);
                                }}
                                helperText={
                                    (mail_error || error) && "Email invalide"
                                }
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                error={password_error}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    fieldRequired(
                                        event.target.value,
                                        setPasswordError
                                    );
                                }}
                                helperText={password_error && "Champ requis"}
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Connexion
                            </Button>
                            <NavLink to="/register">
                                <Link href="#" variant="body2">
                                    {
                                        "Vous n'avez pas de compte? inscrivez vous"
                                    }
                                </Link>
                            </NavLink>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </motion.div>
        </ThemeProvider>
    );
}
