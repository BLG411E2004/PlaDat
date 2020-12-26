import React, { Fragment, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Phone from "material-ui-phone-number";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { InputAdornment } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionActions from "@material-ui/core/AccordionActions";
import Divider from "@material-ui/core/Divider";

export default function PrepareCV() {
  const [phone, setPhone] = useState();
  const [title, setTitle] = useState();
  const [open, setOpen] = React.useState(false);
  const [birthday, setBirthday] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [birthdayButton, setBirthdayButton] = useState(
    "Click to select date of birth"
  );
  const [address, setAddress] = useState({
    city: "",
    district: "",
  });
  const [cities, setCities] = useState([]);
  const [github, setGithub] = useState();
  const [linkedin, setLinkedin] = useState();
  const [districts, setDistricts] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openWorkExp, setOpenWorkExp] = useState(false);
  const [error, setError] = useState("");
  const [timeD, setTimeD] = useState(false);
  const [timePicker, setTimePicker] = useState({
    month: "",
    year: "",
  });
  const [workExp, setWorkExp] = useState({
    companyName: "",
    startDate: "",
    endDate: "",
    stillWorking: "",
    type: "",
    description: "",
  });
  const workType = [
    { value: "ft", label: "Full Time" },
    { value: "pt", label: "Part Time" },
    { value: "s", label: "Seasonal" },
    { value: "t", label: "Temporary" },
    { value: "i", label: "Intern" },
    { value: "v", label: "Voluntary" },
  ];

  const days = Array(31)
    .fill()
    .map((_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array(101)
    .fill()
    .map((_, i) => i + 1920);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setBirthdayButton("Click to select date of birth");
    setOpen(false);
  };
  const handleOpenWorkExp = () => {
    setOpenWorkExp(true);
  };
  const handleCloseWorkExp = () => {
    setOpenWorkExp(false);
  };
  const handleOpenTime = () => {
    setTimeD(true);
  };
  const handleCloseTime = () => {
    setTimeD(false);
  };
  const handleOK = () => {
    setOpen(false);
    var b_string =
      birthday.day.toString() +
      " " +
      birthday.month +
      " " +
      birthday.year.toString();
    console.log(b_string);
    setBirthdayButton(b_string);
  };
  const handleEntryTimeCancelClose = () => {
    setTimePicker({
      month: "",
      year: "",
    });
    setTimeD(false);
  };
  const handleEntryTimeSaveClose = () => {
    var sTime = timePicker.month + "-" + timePicker.year;
    setWorkExp({
      ...workExp,
      startDate: sTime,
    });

    setTimePicker({
      month: "",
      year: "",
    });
    setTimeD(false);
  };
  if (cities.length < 1) {
    getCity();
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setBirthdayButton("Click to select date of birth");
  };

  async function postData(data, item) {
    var url = "/CreateCV/<" + item + ">";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    console.log(response.status);
    return response;
  }
  async function personalInfoSave() {
    setError("");
    setLoading(true);
    const data = {
      title: title,
      phone: phone,
      birthday: birthday,
      address: address,
      github: github,
      linkedin: linkedin,
    };
    const response = await postData(data, "personalInfo");
    if (response.ok) {
      console.log("okkkk");
    } else {
      console.log("nöööö");
      setError("Failed to update information");
    }
    setLoading(false);
    handleChange();
  }

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Personal Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Paper elevation={2}>
            <form>
              <TextField
                value={title}
                label="Title"
                onChange={(title) => setTitle(title)}
              ></TextField>
              <Phone
                label="Phone Number"
                defaultCountry={"tr"}
                onChange={(phone) => setPhone(phone)}
              />
              <br />
              <div>
                <Button onClick={handleClickOpen}>{birthdayButton}</Button>
                <Dialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  fullWidth={true}
                  maxWidth="xs"
                  open={open}
                  onClose={handleClose}
                >
                  <DialogTitle>Choose Birthday</DialogTitle>
                  <DialogContent>
                    <form>
                      <FormControl
                        style={{ minWidth: 100, margin: "0 2% 0 2%" }}
                      >
                        <InputLabel htmlFor="demo-dialog-native">
                          Day
                        </InputLabel>
                        <Select
                          value={birthday.day}
                          onChange={(e) =>
                            setBirthday({
                              ...birthday,
                              day: e.target.value,
                            })
                          }
                          input={<Input id="demo-dialog-native" />}
                        >
                          {days.map((d) => {
                            return <MenuItem value={d}>{d}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                      <FormControl
                        style={{ minWidth: 100, margin: "0 2% 0 2%" }}
                      >
                        <InputLabel id="demo-dialog-select-label">
                          Month
                        </InputLabel>
                        <Select
                          labelId="demo-dialog-select-label"
                          id="demo-dialog-select"
                          value={birthday.month}
                          onChange={(e) =>
                            setBirthday({
                              ...birthday,
                              month: e.target.value,
                            })
                          }
                          input={<Input />}
                        >
                          {months.map((m) => {
                            return <MenuItem value={m}>{m}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                      <FormControl
                        style={{ minWidth: 100, margin: "0 2% 0 2%" }}
                      >
                        <InputLabel id="demo-dialog-select-label">
                          Year
                        </InputLabel>
                        <Select
                          labelId="demo-dialog-select-label"
                          id="demo-dialog-select"
                          value={birthday.year}
                          onChange={(e) =>
                            setBirthday({
                              ...birthday,
                              year: e.target.value,
                            })
                          }
                          input={<Input />}
                        >
                          {years.map((y) => {
                            return <MenuItem value={y}>{y}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleOK} color="primary">
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <br />
              <div>
                <form>
                  <Typography>Address</Typography>
                  <FormControl style={{ minWidth: 100, margin: "0 2% 0 2%" }}>
                    <InputLabel id="demo-dialog-select-label">City</InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={address.city}
                      onChange={(e) => {
                        setAddress({
                          ...address,
                          city: e.target.value,
                        });
                        formatDistrict(e.target.value);
                      }}
                      input={<Input />}
                    >
                      {cities.map((c) => {
                        return <MenuItem value={c.value}>{c.label}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                  <FormControl style={{ minWidth: 100, margin: "0 2% 0 2%" }}>
                    <InputLabel id="demo-dialog-select-label">
                      District
                    </InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={address.district}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          district: e.target.value,
                        })
                      }
                      input={<Input />}
                    >
                      {districts.map((d) => {
                        return <MenuItem value={d.value}>{d.label}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </form>
              </div>
              <br />
              <div>
                <TextField
                  id="input-with-icon-textfield"
                  label="Github Page"
                  onChange={(github) => setGithub(github)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GitHubIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="input-with-icon-textfield"
                  label="LinkedIn Page"
                  onChange={(linkedin) => setLinkedin(linkedin)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedInIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <br />
            </form>
          </Paper>
        </AccordionDetails>
        <AccordionActions>
          <Button size="small" onClick={() => setExpanded(false)}>
            Cancel
          </Button>
          <Button
            size="small"
            color="primary"
            disabled={loading}
            onClick={personalInfoSave}
          >
            Save
          </Button>
        </AccordionActions>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography>Work Experiences</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <div></div>
          <br />
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenWorkExp}
            >
              Add New
            </Button>
            <Dialog
              open={openWorkExp}
              onClose={handleCloseWorkExp}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Add New Work Experience
              </DialogTitle>
              <DialogContent>
                <TextField autoFocus label="Company Name" fullWidth />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenTime}
                >
                  Start Time
                </Button>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseWorkExp} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleCloseWorkExp} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={timeD}
              onClose={handleCloseTime}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                <form>
                  <Typography>Select Time</Typography>
                  <Divider />
                  <FormControl style={{ minWidth: 100, margin: "0 2% 0 2%" }}>
                    <InputLabel id="demo-dialog-select-label">Month</InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={timePicker.month}
                      onChange={(e) =>
                        setTimePicker({
                          ...timePicker,
                          month: e.target.value,
                        })
                      }
                      input={<Input />}
                    >
                      {months.map((m) => {
                        return <MenuItem value={m}>{m}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                  <FormControl style={{ minWidth: 100, margin: "0 2% 0 2%" }}>
                    <InputLabel id="demo-dialog-select-label">Year</InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={timePicker.year}
                      onChange={(e) =>
                        setTimePicker({
                          ...timePicker,
                          year: e.target.value,
                        })
                      }
                      input={<Input />}
                    >
                      {years.map((y) => {
                        return <MenuItem value={y}>{y}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseWorkExp} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleCloseWorkExp} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
