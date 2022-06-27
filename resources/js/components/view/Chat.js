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
});

const Chat = () => {
    const classes = useStyles();
    const [message, setMessage] = React.useState("");
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/user")
            .then((res) => {
                console.log(res.data);
                setUsers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(users);
    }, []);

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" className="header-message">
                        Chat
                    </Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="Aphro CG">
                            <ListItemIcon>
                                <Avatar color="primary">AC</Avatar>
                            </ListItemIcon>
                            <ListItemText primary="Aphro CG"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: "10px" }}>
                        <TextField
                            id="outlined-basic-email"
                            label="Search"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Divider />
                    <List
                        // scrollable liste
                        style={{
                            height: "60vh",
                            overflowY: "auto",
                        }}
                    >
                        {users.map((user) => (
                            <ListItem button key={user.id}>
                                <ListItemIcon>
                                    <Avatar
                                        sx={{
                                            // rendom color for each users
                                            bgcolor: `${
                                                Math.random() *
                                                0xffffff *
                                                user.id
                                            }`,
                                        }}
                                    >
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
                <Grid item xs={9}>
                    
                    <List className={classes.messageArea}>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="C'est comment?"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        secondary="09:30"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        className="bg-primary rounded-pill"
                                        align="left"
                                        primary="Wesh sava et chez toi ?"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="left"
                                        secondary="09:31"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Bien aussi? "
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        secondary="10:30"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid container style={{ padding: "20px" }}>
                        <Grid item xs={11}>
                            <TextField
                                id="outlined-basic-email"
                                label="Ecrivez votre message"
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add">
                                <SendIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Chat;
