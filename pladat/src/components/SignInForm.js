import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import $ from "jquery";
import { useHistory } from "react-router-dom";

function SignUpFormCompany(props) {
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [email_error, setEmailError] = useState(null);
  const [pass_error, setPassError] = useState([]);

  //TODO: Add proper validation
  function isValid() {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    function hasUpper(str) {
      return /[A-Z]/.test(str);
    }
    if (!email.trim()) {
      setEmailError((prevState) => (prevState = "Please enter email"));
    }
  }
  const history = useHistory();
  function redirect(url) {
    history.push(url);
  }

  function updateState(func, e) {
    func((prevState) => (prevState = e.target.value));
  }

  //FIXME: Con't show the error messages
  function handleError() {
    $(function () {
      $("#submit").on("click", function () {
        $("#emailInput").attr("error", { content: email_error });
        $("#passInput").attr("error", { content: pass_error });
      });
    });
  }

  async function postData() {
    var address = "";
    var response = null;
    const user = { email: email, password: pass };
    if (props.user === "student") {
      address = "/SignInStudent";
    } else if (props.user === "company") {
      address = "/SignInCompany";
    }
    response = await fetch(address, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log("okkkk");
    } else {
      //TODO: Put warning according to the code of the response
      //TODO: Maybe find a better way???
      console.log("nöööö");
    }
  }

  function hasError() {
    if (email_error === null || pass_error === null) {
      return false;
    } else {
      return true;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    isValid();
    if (!hasError()) {
      postData();
      if (props.user === "company") {
        redirect("/HomeCompany");
      } else if (props.user === "student") {
        redirect("/HomeStudent");
      }
    } else {
      handleError();
    }
    //handleError();
  }

  return (
    <div>
      <Form id="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <Form.Input
            id="emailInput"
            fluid
            type="email"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => updateState(setEmail, e)}
          />
        </div>
        <div>
          <Form.Input
            id="passInput"
            fluid
            label="Enter Password"
            type="password"
            value={pass}
            onChange={(e) => updateState(setPass, e)}
          />
        </div>
        <Form.Button id="submit">Sign In</Form.Button>
      </Form>
    </div>
  );
}

export default SignUpFormCompany;
