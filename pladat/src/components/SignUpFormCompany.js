import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import $ from "jquery";
import { useAuth } from "../contexts/AuthContext";
import Message from "./Message";

function SignUpFormCompany() {
  const [company_name, setCompanyName] = useState(null);
  const [email, setEmail] = useState();
  const [company_city, setCompanyCity] = useState(null);
  const [pass, setPass] = useState();
  const [confirm_pass, setConfirmPass] = useState(null);
  const [company_name_error, setCompanyNameError] = useState(null);
  const [email_error, setEmailError] = useState(null);
  const [pass_error, setPassError] = useState([]);
  const [confirm_pass_error, setConfirmPassError] = useState(null);
  const [city, setCity] = useState(null);
  const [loaded, setLoaded] = useState(false); //for form select values
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false); //for firebase
  const { signup, currentUser } = useAuth();

  function isValid() {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    function hasUpper(str) {
      return /[A-Z]/.test(str);
    }
    if (!company_name) {
      setCompanyNameError("Company name is required");
    }
    if (!email) {
      setEmailError("Email required");
    } else if (!/^[A-Z0-9._%+-]+@[[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("Email is invalid");
    }
    if (pass === "") {
      setPassError((prevState) => {
        if (pass_error.indexOf("Password is required") === -1) {
          prevState.push("Password is required");
        }
      });
    }
    if (pass.length < 8) {
      setPassError((prevState) => {
        if (
          pass_error.indexOf("Password needs to be at least 8 characters") ===
          -1
        ) {
          prevState.push("Password needs to be at least 8 characters");
        }
      });
    }
    if (!format.test(pass)) {
      setPassError((prevState) => {
        if (
          pass_error.indexOf(
            "Passwords must contain at least one special character"
          ) === -1
        ) {
          prevState.push(
            "Passwords must contain at least one special character"
          );
        }
      });
    }
    if (!hasUpper(pass)) {
      setPassError((prevState) => {
        if (
          pass_error.indexOf(
            "Password must contain at leat one upper case character"
          ) === -1
        ) {
          prevState.push(
            "Password must contain at leat one upper case character"
          );
        }
      });
    }
    if (!confirm_pass) {
      setConfirmPassError((prevState) => {
        prevState = "This field is required";
      });
    } else if (pass !== confirm_pass) {
      setConfirmPassError((prevState) => {
        prevState = "Passwords must match";
      });
    }
  }

  function updateState(func, e) {
    func((prevState) => (prevState = e.target.value));
  }

  //FIXME: Con't show the error messages
  function handleError() {
    $(function () {
      $("#submit").on("click", function () {
        $("#companyNameInput").attr("error", { content: company_name_error });
        $("#companyEmailInput").attr("error", { content: email_error });
        $("#companyPassInput").attr("error", { content: pass_error });
        $("#companyConfirmPassInput").attr("error", {
          content: confirm_pass_error,
        });
      });
    });
  }

  //TODO: Check for if the email has already been used
  async function postData() {
    const company = {
      name: company_name,
      email: email,
      city: company_city,
      password: pass,
    };
    const response = await fetch("/SignUpCompany", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(company),
    });
    if (response.ok) {
      console.log("okkkk");
    } else {
      console.log("nöööö");
    }
  }

  function formatCity(data) {
    var formatted_array = [];
    for (var i = 0; i < data.length; i++) {
      formatted_array.push({
        key: data[i]._id,
        text: data[i].name,
        value: data[i]._id,
      });
    }
    return formatted_array;
  }

  async function getCity() {
    const response = await fetch("/GetCity");
    const data = await response.json();
    const city = formatCity(data);
    console.log(city);
    setCity((prevData) => (prevData = city));
    setLoaded((prevData) => (prevData = true));
  }

  function hasError() {
    if (
      company_name_error === null ||
      email_error === null ||
      pass_error === null ||
      confirm_pass_error === null ||
      company_city !== null
    ) {
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
      try {
        setError("");
        setLoading(true);
        await signup(email, pass);
      } catch {
        console.log("catch");
        setError("Failed to create an account on firebase");
      }
      setLoading(false);
    } else {
      setError("Failed to create an account on firebase");
    }
  }

  if (city === null) {
    getCity();
  }
  if (loaded === true) {
    const element = document.getElementById("form");
    element.classList.remove("loading");
  }

  return (
    <>
      <Form id="form" onSubmit={(e) => handleSubmit(e)} loading>
        {currentUser && currentUser.email}
        {error && <Message message={error} />}
        <div>
          <Form.Input
            id="companyNameInput"
            fluid
            label="Company Name"
            placeholder="Name"
            value={company_name}
            onChange={(e) => updateState(setCompanyName, e)}
          />
        </div>
        <br />
        <div>
          <Form.Input
            id="companyEmailInput"
            fluid
            type="email"
            label="Company Email"
            placeholder="Email"
            value={email}
            onChange={(e) => updateState(setEmail, e)}
          />
        </div>
        <br />
        <div>
          <Form.Select
            fluid
            selection
            label="City"
            options={city}
            placeholder="City"
            onChange={(e, { value }) =>
              setCompanyCity((prevData) => (prevData = value))
            }
          />
        </div>
        <br />
        <div>
          <Form.Input
            id="companyPassInput"
            fluid
            label="Enter Password"
            type="password"
            value={pass}
            onChange={(e) => updateState(setPass, e)}
          />
        </div>
        <br />
        <div>
          <Form.Input
            id="companyConfirmPassInput"
            fluid
            label="Confirm Password"
            type="password"
            value={confirm_pass}
            onChange={(e) => updateState(setConfirmPass, e)}
          />
        </div>
        <br />
        <Form.Button id="submit" disabled={loading}>
          Sign Up
        </Form.Button>
      </Form>
    </>
  );
}

export default SignUpFormCompany;
