import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "material-ui-formik-components/TextField";
import { useAuth } from "../contexts/AuthContext";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

function SignIn(props) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false); //for firebase
  const { signin } = useAuth();
  const history = useHistory();

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  async function postData(user) {
    var url = "";
    if (props.user == "student") {
      url = "/SignInStudent";
    } else if (props.user == "company") {
      url = "/SignInCompany";
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    });
    console.log(response.status);
    return response;
  }

  //TODO: If one of the sign up attempts fails the other one sould be deleted
  async function handleSubmit(values) {
    try {
      setError("");
      const response = await postData(values);
      await signin(values.email, values.password);
      if (response.ok) {
        console.log("okkkk");
        if (props.user == "student") {
          history.push("/HomeStudent");
        } else if (props.user == "company") {
          history.push("/HomeCompany");
        }
      } else {
        console.log("nöööö");
        setError("Failed to sign in");
      }
    } catch {
      console.log("catch");
      setError("Failed to sign in");
    }
  }

  //TODO: There should bu be an alert if sign in fails
  return (
    <div>
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={signInSchema}
        >
          {(formik) => (
            <Form>
              <Field
                name="email"
                label="Email"
                type="email"
                component={TextField}
              />

              <Field
                fullWidth
                name="password"
                label="Password"
                type="password"
                component={TextField}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formik.dirty || !formik.isValid || loading}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <p>
          Don't have an account?
          <Link to="/Home/SignUp"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
