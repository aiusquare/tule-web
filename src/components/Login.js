import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import request from "superagent";
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";
import "../css/style.css";
import { Alert, Collapse, Stack } from "@mui/material";
import logo from "../pictures/logo.png";
import TextInput from "./textField";
import { ErrorNotifier } from "./registration";
import Spinner from "./spinner";
import ForgotPassword from "./forgotPassword";
import { baseApiUrl } from "../services/setup";

export default function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(false);
  const [userCorrect, setUserCorrect] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [netConnection, setNetConnection] = useState(false);
  const [reset, setReset] = useState(false);

  const handleSubmit = () => {
    if (email === "") {
      setUserCorrect(true);
      return;
    } else if (password === "") {
      setPasswordCorrect(true);
      return;
    }
    setProgress(true);
    setUserCorrect(false);
    setPasswordCorrect(false);

    if (navigator.onLine) {
      fetch("https://www.google.com/", { mode: "no-cors" })
        .then(async () => {
          const req = {
            id: email,
            password: password,
          };

          await request
            .post(baseApiUrl + "login.php")
            .type("application/json")
            .send(req)
            .then((response) => {
              const resData = response.body;
              navigate("/dashboard", { state: { data: resData } });

              localStorage.setItem("email", email);
              localStorage.setItem("pin", response.body.agent);
              localStorage.setItem("userName", response.body.firstname);
              localStorage.setItem("pin", response.body.pin);
              localStorage.setItem("balance", response.body.accountBalance);
              localStorage.setItem("agent", response.body.userAgent);

              // setting login session
              localStorage.setItem("lastActivityTime", Date.now().toString());
            })
            .catch((err) => {
              setProgress(false);
              // console.log(err);

              // Regular expressions to match error messages
              const emailOrPhonePattern = /Incorrect email or phone number/;
              const passwordPattern =
                /Incorrect password\. Authentication failed\./;

              // Check if the error message matches the patterns
              if (emailOrPhonePattern.test(err)) {
                setUserCorrect(true);
              } else if (passwordPattern.test(err)) {
                setPasswordCorrect(true);
              }
            });
        })
        .catch((err) => {});
    } else {
      setNetConnection(true);
      setProgress(false);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="login-bg">
      <div style={{ height: "95%" }}>
        <MDBContainer>
          <MDBCard className="shadow-2 d-flex flex-column align-items-center m-4 p-4">
            <MDBCard
              onClick={handleLogoClick}
              className="shadow-2 p-4"
              style={{ cursor: "pointer", width: "100px" }}
            >
              <MDBCardImage position="top" src={logo}></MDBCardImage>
            </MDBCard>
            <MDBRow className="m-2">
              <MDBCol>
                <div class="text-center m-3">
                  <h3>Login</h3>
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow className="m-2">
              <MDBCol>
                <TextInput tValue={setEmail} tLabel="Email" tType="email" />

                <Collapse in={userCorrect}>
                  <Alert className="pt-1" severity="error">
                    Incorrect email
                  </Alert>
                </Collapse>

                <TextInput
                  tValue={setPassword}
                  tType="password"
                  tLabel="password"
                />

                <Collapse in={passwordCorrect}>
                  <Alert className="pt-1" severity="error">
                    Incorrect password
                  </Alert>
                </Collapse>
              </MDBCol>
            </MDBRow>
            <MDBRow className="m-2 ">
              <MDBCol>
                <Collapse in={progress}>
                  <Stack style={{ color: "grey.500" }} spacing={0.5}>
                    <Spinner />
                  </Stack>
                </Collapse>
                <MDBBtn
                  className="mt-1"
                  style={{ background: "#200647" }}
                  type="submit"
                  onClick={handleSubmit}
                  disabled={progress}
                >
                  SUBMIT
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBRow className="m-2">
              <MDBCol>
                <ForgotPassword />
              </MDBCol>
            </MDBRow>
            <MDBRow className="m-2">
              <MDBCol>
                <div>
                  Not yet registered?
                  <b>
                    <Link className="d_link" to="/registration">
                      Register here
                    </Link>
                  </b>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
        {
          <ErrorNotifier
            show={netConnection}
            message="No internet connection"
            onErrClose={() => {
              setNetConnection(false);
            }}
          />
        }
      </div>
    </div>
  );
}
