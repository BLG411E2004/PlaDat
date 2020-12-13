import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "material-ui-formik-components/TextField";
import { useAuth } from "../contexts/AuthContext";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

function ForgotPassword() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false); //for firebase
  const history = useHistory();
  const { resetPassword } = useAuth();
  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  //TODO: Message for password mail sent
  async function handleSubmit(values) {
    try {
      setError("");
      setLoading(true);
      await resetPassword(values.email);
      setTimeout(history.push("/Home"), 100000);
    } catch {
      console.log("catch");
      setError("Failed to create an account on firebase");
    }

    setLoading(false);
  }

  return (
    <div>
      <Paper elevation={2} style={{ margin: "5% 15% 10% 15%" }}>
        <div style={{ margin: "5%" }}>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={signUpSchema}
          >
            {(formik) => (
              <Form>
                <h1>Reset Password</h1>
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  component={TextField}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!formik.dirty || !formik.isValid || loading}
                >
                  Reset Password
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </div>
  );
}

export default ForgotPassword;
