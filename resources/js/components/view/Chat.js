import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import { useEffect } from "react";
import { logout } from "../service/AuthApi";
import Auth from "../auth/Auth";
import { ExitToApp } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
const id_user = localStorage.getItem("user");
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: "100%",
        height: "80vh",
    },
    headBG: {
        backgroundColor: "#e0e0e0",
    },
    borderRight500: {
        borderRight: "1px solid #e0e0e0",
    },
    messageArea: {
        height: "70vh",
        overflowY: "auto",
    },
    selected: {
        backgroundColor: "#000fff",
    },
});
const ChatBox = ({ messages, setMessages, receiver }) => {
    const [sms, setSms] = React.useState("");
    const classes = useStyles();

    useEffect(() => {
        const interval = setInterval(() => {
            getMessage();
        }, 2000);
        return () => clearInterval(interval);
    }, [receiver]);

    const sendMessage = () => {
        const data = {
            sender_id: parseInt(id_user),
            receiver_id: parseInt(receiver),
            message: sms,
        };
        axios.post("/api/message", data).then((res) => {
            setSms("");
            getMessage();
        });
    };
    const getMessage = () => {
        axios
            .get("/api/message/all/" + id_user + "/" + receiver)
            .then((res) => {
                setMessages(res.data.data);
                console.log(res.data.data);
            });
    };
    return (
        <Grid item xs={9}>
            <List className={classes.messageArea}>
                {messages
                    .sort((a, b) => {
                        var keyA = new Date(a.updated_at),
                            keyB = new Date(b.updated_at);
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    })
                    .map((message) => (
                        <ListItem key={message.id}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align={
                                            message.sender_id ===
                                            parseInt(
                                                localStorage.getItem("user")
                                            )
                                                ? "right"
                                                : "left"
                                        }
                                    >
                                        <span>{message.message}</span>
                                    </ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align={
                                            message.sender_id ===
                                            parseInt(
                                                localStorage.getItem("user")
                                            )
                                                ? "right"
                                                : "left"
                                        }
                                        secondary={
                                            message.created_at
                                                .split("T")[1]
                                                .split(".")[0] +
                                            " " +
                                            message.created_at.split("T")[0]
                                        }
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
            </List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
                <Grid item xs={11}>
                    <TextField
                        id="outlined-basic-email"
                        label="Ecrivez votre message"
                        fullWidth
                        value={sms}
                        onChange={(e) => setSms(e.target.value)}
                    />
                </Grid>
                <Grid xs={1} align="right">
                    <Fab color="primary" aria-label="add">
                        <SendIcon
                            onClick={() => {
                                sendMessage();
                            }}
                        />
                    </Fab>
                </Grid>
            </Grid>
        </Grid>
    );
};
const Chat = () => {
    const classes = useStyles();
    const [receiver, setReceiver] = React.useState(0);
    const [messages, setMessages] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const { isAuthenticated, setIsAuthenticated } = React.useContext(Auth);
    const history = useNavigate();
    const [currentUser, setCurrentUser] = React.useState([]);
    const [search, setSearch] = React.useState("");

    useEffect(() => {
        axios
            .get("/api/user")
            .then((res) => {
                console.log(res.data);
                setUsers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        axios.get("/api/user/" + localStorage.getItem("user")).then((res) => {
            console.log(res.data);
            setCurrentUser(res.data.data);
        });
    }, []);
    const handleChange = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value);
        axios.get("/api/user/search/" + event.target.value).then((res) => {
            console.log(res.data);
            setUsers(res.data.data);
        });
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" className="header-message">
                        Chat
                    </Typography>
                    <ListItemText
                        align="right"
                        aria-label="add"
                        className="logout-button"
                        onClick={() => {
                            logout();
                            setIsAuthenticated(false);
                            history("/");
                        }}
                    >
                        {" "}
                        <i
                            className="fas fa-sign-out-alt"
                            style={{
                                color: "#ff0000",
                                fontSize: "30px",
                                cursor: "pointer",
                            }}
                        ></i>
                    </ListItemText>
                </Grid>
            </Grid>
            <Grid
                container
                component={Paper}
                className={classes.chatSection}
                style={{
                    height: "80vh",
                    width: "100%",
                    border: "1px solid black",
                }}
            >
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key={currentUser.nom}>
                            <ListItemIcon>
                                <Avatar color="primary">{}</Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={currentUser.nom}
                            ></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: "10px" }}>
                        <TextField
                            id="outlined-basic-email"
                            label="Search"
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Divider />
                    <List
                        style={{
                            height: "60vh",
                            overflowY: "auto",
                        }}
                    >
                        {users
                            .filter((user) => {
                                return user.id !== currentUser.id;
                            })
                            .map((user) => (
                                <ListItem
                                    button
                                    key={user.id}
                                    onClick={() => {
                                        setReceiver(user.id);
                                    }}
                                    className={
                                        receiver === user.id
                                            ? classes.selected
                                            : ""
                                    }
                                >
                                    <ListItemIcon>
                                        <Avatar>
                                            {user.nom.charAt(0) +
                                                user.prenom.charAt(0)}
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={user.nom}>
                                        {user.nom + " " + user.prenom}
                                    </ListItemText>
                                    <ListItemText
                                        secondary="oneline"
                                        align="right"
                                    ></ListItemText>
                                </ListItem>
                            ))}
                    </List>
                </Grid>
                {receiver ? (
                    <ChatBox
                        receiver={receiver}
                        messages={messages}
                        setMessages={setMessages}
                    />
                ) : (
                    <div></div>
                )}
            </Grid>
        </div>
    );
};

export default Chat;
