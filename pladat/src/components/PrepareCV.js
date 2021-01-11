import React, { useState } from "react";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

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
  const [type, setType] = useState();
  const [startTime, setStartTime] = useState("Start Time");
  const [endTime, setEndTime] = useState("End Time");
  const [workExp, setWorkExp] = useState({
    companyName: "",
    startDate: "",
    endDate: "",
    stillWorking: false,
    type: "",
    description: "",
  });
  const [allWorkExps, setAllWorkExps] = useState([1, 2, 3, 4]);
  const [checked, setChecked] = useState([]);
  const [languages, setLanguages] = useState([{ name: "jb" }]);
  const [left, setLeft] = useState([]); // languages
  const [right, setRight] = useState([]);
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

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  if (languages.length == 1) {
    console.log("efbjd");
    getLanguage();
  }

  function formatLang(data) {
    var lang_arr = [];
    data.map((d) =>
      lang_arr.push({
        code: d._id,
        name: d.name,
      })
    );
    return lang_arr;
  }

  async function getLanguage() {
    const response = await fetch("/GetLanguage");
    const data = await response.json();

    const lang = formatLang(data);
    const language = lang;
    setLanguages(lang);
    console.log(languages);
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };
  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <List
        dense
        component="div"
        style={{ width: 200, height: 230, overflow: "auto" }}
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.code}-label`;

          return (
            <>
              <ListItem
                key={value.name}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value.name) !== -1}
                    tabIndex={-1}
                    size="small"
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value.name}`} />
              </ListItem>
              <Divider />
            </>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

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
  const handleCancelCloseWorkExp = () => {
    setWorkExp({
      companyName: "",
      startDate: "",
      endDate: "",
      stillWorking: false,
      type: "",
      description: "",
    });
    setOpenWorkExp(false);
  };
  const handleSaveCloseWorkExp = () => {
    setAllWorkExps([...allWorkExps, workExp]);
    setStartTime("Start Time");
    setEndTime("End Time");
    setWorkExp({
      companyName: "",
      startDate: "",
      endDate: "",
      stillWorking: false,
      type: "",
      description: "",
    });
    setOpenWorkExp(false);
  };
  const handleOpenTime = (type) => {
    setType(type);
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
  const handleNewWorkTimeCancelClose = () => {
    setTimePicker({
      month: "",
      year: "",
    });
    setTimeD(false);
  };
  const handleNewWorkTimeSaveClose = () => {
    var sTime = timePicker.month + "-" + timePicker.year;
    if (type == "start") {
      setWorkExp({
        ...workExp,
        startDate: sTime,
      });
      setStartTime(sTime);
    } else if (type == "end") {
      setWorkExp({
        ...workExp,
        endDate: sTime,
      });
      setEndTime(sTime);
    }

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
            <Typography>Languages</Typography>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item>{customList("Choices", left)}</Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleAllRight}
                    disabled={left.length === 0}
                    aria-label="move all right"
                  >
                    ≫
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                  >
                    &lt;
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleAllLeft}
                    disabled={right.length === 0}
                    aria-label="move all left"
                  >
                    ≪
                  </Button>
                </Grid>
              </Grid>
              <Grid item>{customList("Selected", right)}</Grid>
            </Grid>
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
          <div>
            {allWorkExps.map((w) => {
              <Paper elevation={2}>
                <p>{w}</p>
              </Paper>;
            })}
          </div>
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
              onClose={handleCancelCloseWorkExp}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Add New Work Experience
              </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  label="Company Name"
                  fullWidth
                  onChange={(e) =>
                    setWorkExp({
                      ...workExp,
                      companyName: e.target.value,
                    })
                  }
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpenTime("start")}
                >
                  {startTime}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpenTime("end")}
                >
                  {endTime}
                </Button>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Work Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) =>
                      setWorkExp({
                        ...workExp,
                        type: e.target.value,
                      })
                    }
                  >
                    {workType.map((w) => {
                      return <MenuItem value={w.value}>{w.label}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <TextField
                  label="Work Definition"
                  multiline
                  placeholder="Enter work definition"
                  variant="outlined"
                  onChange={(e) =>
                    setWorkExp({
                      ...workExp,
                      definition: e.target.value,
                    })
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={workExp.stillWorking}
                      onChange={(e) =>
                        setWorkExp({
                          ...workExp,
                          stillWorking: !workExp.stillWorking,
                        })
                      }
                      name="checkedA"
                    />
                  }
                  label="Still working"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelCloseWorkExp} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSaveCloseWorkExp} color="primary">
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
                <Button onClick={handleNewWorkTimeCancelClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleNewWorkTimeSaveClose} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography>test</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <div></div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
