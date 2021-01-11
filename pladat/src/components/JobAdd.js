import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "0 2% 0 2%",
    minWidth: 120,
  },
  formControl2: {
    margin: "0 2% 0 2%",
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    width: theme.spacing(50),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const reqs = [
  "C",
  "C++",
  "JAVA",
  "JavaScript",
  "C#",
  "Python",
  "Dart",
  "Flutter",
];

export default function JobAdd() {
  const classes = useStyles();
  const [jobTitle, setTitle] = useState("");
  const [requirements, setRequirements] = React.useState([]);
  const [studentGrade, setGrade] = useState(0);
  const [university, setUniversity] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [address, setAddress] = useState({
    city: "",
    district: "",
  });
  const { currentUser } = useAuth();
  const [details, setDetails] = useState("");
  const [jobUni, setJobUni] = useState("");
  const [workTime, setWorkTime] = useState("0");

  const handleWorkTime = (event) => {
    console.log(event.target.value);
    setWorkTime(event.target.value);
  };

  const handleJobUni = (event) => {
    console.log(event.target.value);
    setJobUni(event.target.value);
  };

  const handleRequChange = (event) => {
    console.log(requirements);
    setRequirements(event.target.value);
  };

  const jobChangeHandler = (event) => {
    console.log(event.target.value);
    setTitle(event.target.value);
  };

  const handleGradeChange = (event) => {
    console.log(event.target.value);
    setGrade(event.target.value);
  };

  const handleDetailChange = (event) => {
    console.log(event.target.value);
    setDetails(event.target.value);
  };

  function formatCity(data) {
    var formatted_array = [];
    for (var i = 0; i < data.length; i++) {
      formatted_array.push({
        value: data[i]._id,
        label: data[i].name,
        dist: data[i].districts,
      });
    }
    return formatted_array;
  }
  function formatDistrict(data) {
    console.log(data);
    for (var i = 0; i < cities.length; i++) {
      if (cities[i].value === data) {
        var dist_array = cities[i].dist;
      }
    }
    console.log(dist);
    var dist = [];
    for (var i = 0; i < dist_array.length; i++) {
      dist.push({
        value: i,
        label: dist_array[i],
      });
    }
    setDistricts(dist);
  }

  async function getCity() {
    const response = await fetch("/GetCity");
    const data = await response.json();
    const cities = formatCity(data);
    setCities(cities);
  }

  if (cities.length < 1) {
    getCity();
  }

  function formatUniversity(data) {
    var formatted_array = [];
    for (var i = 0; i < data.length; i++) {
      formatted_array.push({
        value: data[i]._id,
        label: data[i].name,
      });
    }
    return formatted_array;
  }

  async function getUniversity() {
    const response = await fetch("/GetUniversity");
    const data = await response.json();
    const universities = formatUniversity(data);
    setUniversity(universities);
  }

  if (university.length < 1) {
    getUniversity();
  }

  async function jobAddHandler() {
    const jobObj = {
      title: jobTitle,
      requ: requirements,
      grade: studentGrade,
      uni: jobUni,
      time: workTime,
      jobaddress: address,
      jobdetails: details,
      comp: currentUser.email,
    };
    const response = await fetch("/SaveAd", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(jobObj),
    });
    console.log(response.status);
    console.log(jobObj);
    return response;
  }

  return (
    <div>
      <Paper elevation={2} square>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            //aria-controls="panel1a-content"
            //id="panel1a-header"
          >
            <Typography>Application Requirements</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={2} className={classes.paper}>
              <form>
                <TextField
                  required
                  id="outlined-required"
                  label="Job Title"
                  placeholder="Job title"
                  variant="outlined"
                  value={jobTitle}
                  onChange={jobChangeHandler}
                />
                <br />
                <br />
                <Typography>Grade-School Information</Typography>
                <Divider />
                <br />
                <Grid container spacing={2}>
                  <Grid item>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Grade
                      </InputLabel>
                      <Select
                        //labelId="demo-simple-select-outlined-label"
                        //id="demo-simple-select-outlined"
                        value={studentGrade}
                        onChange={handleGradeChange}
                        label="Grade"
                        autoWidth
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>First Grade</MenuItem>
                        <MenuItem value={2}>Second Grade</MenuItem>
                        <MenuItem value={3}>Third Grade</MenuItem>
                        <MenuItem value={4}>Fourth Grade</MenuItem>
                        <MenuItem value={5}>Master Degree</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        University
                      </InputLabel>
                      <Select
                        //labelId="demo-simple-select-outlined-label"
                        //id="demo-simple-select-outlined"
                        value={jobUni}
                        onChange={handleJobUni}
                        label="University"
                        autoWidth
                      >
                        <MenuItem value=""></MenuItem>
                        {university.map((c) => {
                          return <MenuItem value={c.value}>{c.label}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <br />
                <br />
                <Typography>Working Time Information</Typography>
                <br />
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl2}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Working Time
                  </InputLabel>
                  <Select
                    //labelId="demo-simple-select-outlined-label"
                    //id="demo-simple-select-outlined"
                    value={workTime}
                    onChange={handleWorkTime}
                    label="Working Time"
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={1}>Part Time</MenuItem>
                    <MenuItem value={2}>Full Time</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <br />
                <br />
                <Typography>Address Information</Typography>
                <br />
                <Grid container spacing={2}>
                  <Grid item>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        City
                      </InputLabel>
                      <Select
                        //labelId="demo-simple-select-outlined-label"
                        //id="demo-simple-select-outlined"
                        value={address.city}
                        onChange={(e) => {
                          setAddress({
                            ...address,
                            city: e.target.value,
                          });
                          formatDistrict(e.target.value);
                        }}
                        label="City"
                      >
                        <MenuItem value=""></MenuItem>
                        {cities.map((c) => {
                          return <MenuItem value={c.value}>{c.label}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        District
                      </InputLabel>
                      <Select
                        //labelId="demo-simple-select-outlined-label"
                        //id="demo-simple-select-outlined"
                        value={address.district}
                        onChange={(e) => {
                          setAddress({
                            ...address,
                            district: e.target.value,
                          });
                        }}
                        label="District"
                      >
                        <MenuItem value=""></MenuItem>
                        {districts.map((d) => {
                          return <MenuItem value={d.value}>{d.label}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          //aria-controls="panel1a-content"
          //id="panel1a-header"
        >
          <Typography>Job Details </Typography>
        </AccordionSummary>
        <Paper>
          <AccordionDetails>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={6}
              placeholder="Your job details in here..."
              value={details}
              onChange={handleDetailChange}
            />
          </AccordionDetails>
        </Paper>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          //aria-controls="panel1a-content"
          //id="panel1a-header"
        >
          <Typography>Job Requirements </Typography>
        </AccordionSummary>
        <Paper>
          <AccordionDetails>
            <form>
              <Typography>Select Job Requirements </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">
                  Requirements
                </InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={requirements}
                  onChange={handleRequChange}
                  input={<Input />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {reqs.map((req) => (
                    <MenuItem key={req} value={req}>
                      <Checkbox checked={requirements.indexOf(req) > -1} />
                      <ListItemText primary={req} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
            </form>
          </AccordionDetails>
        </Paper>
      </Accordion>
      <Button
        variant="outlined"
        size="medium"
        color="primary"
        className={classes.button}
        onClick={jobAddHandler}
      >
        Save
      </Button>
    </div>
  );
}
