import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Nav from "../components/NavSignUp";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Nav type="signup"></Nav>
      </Container>
    </React.Fragment>
  );
}
