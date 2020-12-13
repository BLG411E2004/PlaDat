import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { KeyboardDatePicker } from "@material-ui/pickers";

export default function PrepareCV() {
  const [phone, setPhone] = useState();

  return (
    <div>
      <Paper elevation={2}>
        <Typography variant="h5" component="h2">
          Personal Information
        </Typography>
        <Divider variant="middle" />
        <form noValidate>
          <TextField label="Phone" value={phone}></TextField>
        </form>
      </Paper>
    </div>
  );
}
