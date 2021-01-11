import React from "react";
import Navbar from "../components/Navbar";
import "../static/styles/Home.css";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
  },
});

function Page(props) {
  const { classes } = props;
  return (
    <div className="flex-container">
      <div className="a">
        <div className="item" id="one">
          <Navbar sign={props.sign}></Navbar>
        </div>
        <div className="item" id="three">
          <Paper className="paper" elevation={2}>
            <Typography className="typo" id="one">
              Forget ordinary offers
            </Typography>
            <Typography className="typo" id="two">
              Explore Pladat!
            </Typography>
          </Paper>
        </div>
      </div>
      <Grid container className="maingrid">
        <Grid item xs={12} md={6} className="grid">
          <div className={classes.item}>
            <WorkOutlineIcon style={{ fontSize: "400%" }}></WorkOutlineIcon>
            <Typography variant="h3" className={classes.title}>
              If you are a company;
            </Typography>
            <Typography variant="h5">
              This site is the best place to find suitable interns for your
              need.
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={classes.item}>
            <AccessibilityIcon style={{ fontSize: "400%" }}></AccessibilityIcon>
            <Typography variant="h3" className={classes.title}>
              If you are a student;
            </Typography>
            <Typography variant="h5">
              We are here to place you to where you need to be in your
              internship experience.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
Page.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Page);
