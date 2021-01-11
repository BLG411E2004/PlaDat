import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../static/styles/Navbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    textDecoration: "none",
    fontSize: "x-large",
    color: "#ffddc8",
  },
  title: {
    flexGrow: 1,
    fontSize: "xx-large",
    color: "#ffddc8",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          <Typography variant="h6" className={classes.title}>
            PlaDat
          </Typography>

          <Link to="/Home/SignIn">
            <Button
              className={classes.menuButton}
              color="inherit"
              variant="outlined"
            >
              Sign In
            </Button>
          </Link>

          <Link to="/Home/SignUp">
            <Button
              className={classes.menuButton}
              color="inherit"
              variant="outlined"
            >
              Sign Up
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
