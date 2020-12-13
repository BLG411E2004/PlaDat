import React from "react";
import Navbar from "../components/Navbar";

function Page(props) {
  return (
    <div>
      <Navbar sign={props.sign}></Navbar>
    </div>
  );
}

export default Page;
