import * as React from "react";
import { useState, useEffect } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "./components/Loader";
import swl from "sweetalert";

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
                SIMPLON CHAT
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail_error, setMailError] = useState(false);
    const [error, setError] = useState(false);
    const [error_p, setError_p] = useState(false);
    const [error_e, setError_e] = useState(false);
    const [error_n, setError_n] = useState(false);
    const [error_pw, setError_pw] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError(true);
        }
        if (email === "" || mail_error) {
            setError_e(true);
        }

        if (firstName === "") {
            setError_p(true);
        }
        if (lastName === "") {
            setError_n(true);
        }
        if (password === "") {
            setError_pw(true);
        }
        if (
            email !== "" &&
            mail_error === false &&
            firstName !== "" &&
            password !== "" &&
            password === confirmPassword
        ) {
            setLoading(true);
            const data = {
                nom: lastName,
                prenom: firstName,
                email: email,
                password: password,
                c_password: confirmPassword,
            };
            axios
                .post("api/user", data)
                .then((response) => {
                    setLoading(false);
                    console.log(response.data);
                    if (response.data.success) {
                        swl({
                            title: "Success",
                            text: "Enregistrement réussi",
                            icon: "success",
                            button: "OK",
                        });
                        navigate("/");
                    } else {
                        swl({
                            title: "Error",
                            text: response.data.message,
                            icon: "error",
                            button: "OK",
                        });
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    swl({
                        title: "Error",
                        text: "Erreur lors de l'enregistrement",
                        icon: "error",
                        button: "OK",
                    });
                });
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
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    mass: 0.5,
                }}
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
                            INSCRIPTION
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            {" "}
                            <Grid container spacing={2}>
                                <Loader isLoading={loading} />

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="Prenom"
                                        required
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            fieldRequired(
                                                e.target.value,
                                                setError_p
                                            );
                                        }}
                                        error={error_p}
                                        fullWidth
                                        id="prenom"
                                        label="Prenom"
                                        helperText={error_p && "Prenom requis"}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="Nom"
                                        label="Nom"
                                        name="nom"
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            fieldRequired(
                                                e.target.value,
                                                setError_n
                                            );
                                        }}
                                        error={error_n}
                                        autoComplete="family-name"
                                        helperText={error_n && "Nom requis"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required={true}
                                        fullWidth
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            validateEmail(
                                                e.target.value,
                                                setMailError
                                            );
                                        }}
                                        id="email"
                                        type={"email"}
                                        error={error_e || mail_error}
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            fieldRequired(
                                                e.target.value,
                                                setError_pw
                                            );
                                        }}
                                        name="password"
                                        error={error_pw}
                                        helperText={
                                            error_pw &&
                                            "Le mot de passe doit contenir au moins 8 caractères"
                                        }
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="c_password"
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            if (
                                                e.target.value !==
                                                document.getElementById(
                                                    "password"
                                                ).value
                                            ) {
                                                setError(true);
                                            } else setError(false);
                                        }}
                                        error={error}
                                        label="Confirmer le mot de passe"
                                        type="password"
                                        id="c_password"
                                        helperText={
                                            error &&
                                            "Les mots de passe ne correspondent pas"
                                        }
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                S'inscrire
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <NavLink to="/">
                                        <Link href="#" variant="body2">
                                            Vous avez déja un compte ? inscrivez
                                            vous ?
                                        </Link>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </motion.div>
        </ThemeProvider>
    );
}
