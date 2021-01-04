import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "material-ui-formik-components/TextField";
import { Select } from "material-ui-formik-components/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth } from "../contexts/AuthContext";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";

function SignUpCompany() {
  const [loadingCircle, setLoadingCircle] = useState("block");
  const [content, setContent] = useState("none");
  const [city, setCity] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false); //for firebase
  const { signup } = useAuth();
  const history = useHistory();

  const signUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Company name is too short")
      .required("Company name is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    city: Yup.number().required("Please select a city"),
    password: Yup.string().required("Password is required").min(8, "pass 8"),
    confirmPassword: Yup.string()
      .required("Passwords must match")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  function formatCity(data) {
    var formatted_array = [];
    for (var i = 0; i < data.length; i++) {
      formatted_array.push({
        value: data[i]._id,
        label: data[i].name,
      });
    }
    return formatted_array;
  }

  async function getCity() {
    const response = await fetch("/GetCity");
    const data = await response.json();
    const cities = formatCity(data);
    setCity(cities);
    setLoadingCircle("none");
    setContent("block");
  }

  async function postData(company) {
    delete company.confirmPassword;
    const response = await fetch("/SignUpCompany", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(company),
    });
    console.log(response.status);
    return response;
  }
  //TODO: If one of the sign up attempts fails the other one sould be deleted
  async function handleSubmit(values) {
    try {
      setError("");
      setLoading(true);
      const response = await postData(values);
      await signup(values.email, values.password);
      if (response.ok) {
        console.log("okkkk");
        history.push("/Home");
      } else {
        console.log("nöööö");
        setError("Failed to create an account on mongoDB");
      }
    } catch {
      console.log("catch");
      setError("Failed to create an account on firebase");
    }

    setLoading(false);
  }

  if (city.length < 1) {
    getCity();
  }
  //TODO: There should bu be an alert if sign up fails
  return (
    <div>
      <div style={{ display: loadingCircle }}>
        <CircularProgress />
      </div>

      <div style={{ display: content }}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            city: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={signUpSchema}
        >
          {(formik) => (
            <Form>
              <Field required name="name" label="Name" component={TextField} />
              <Field
                required
                name="email"
                label="Email"
                type="email"
                component={TextField}
              />
              <Field
                required
                fullWidth
                name="city"
                label="City"
                options={city}
                component={Select}
              />
              <Field
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                component={TextField}
              />
              <Field
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                component={TextField}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formik.dirty || !formik.isValid || loading}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        Forgot password?
        <Link to="/ResetPassword">Reset password</Link>
      </div>
      <div>
        Have an account?
        <Link to="/Home/SignIn">Sign in</Link>
      </div>
    </div>
  );
}

export default SignUpCompany;
