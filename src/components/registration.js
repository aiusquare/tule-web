import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from "../services/config";
import "firebase/compat/database";
import "firebase/compat/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import {
  Alert,
  Collapse,
  Stack,
  Snackbar,
  ToggleButton,
  Checkbox,
} from "@mui/material";
import "../css/style.css";
import logo from "../pictures/logo.png";
import TextInput from "./textField";
import SuccessAlert, { Toast } from "./alert";
import Spinner from "./spinner";
import request from "superagent";
import Swal from "sweetalert2";
import { baseApiUrl } from "../services/setup";

const database = firebase.database();

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [progress, setProgress] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [validate, setValidate] = useState(false);
  const [netCon, setNetCon] = useState(false); // network connection checker
  const [progressStatus, setProgressStatus] = useState("initialising...");
  const navigate = useNavigate();
  const [isAgent, setIsAgent] = useState(false);
  const [ninOrBvn, setNinOrBvn] = useState("");

  const handleSubmit = async () => {
    if (handleVerification()) {
      setProgress(true);
      if (navigator.onLine) {
        register();
      } else {
        setProgress(false);
        setNetCon(true);
      }
    } else {
      setProgress(false);
    }
  };

  function register() {
    try {
      fetch("https://www.google.com/", { mode: "no-cors" })
        .then(async () => {
          const req = {
            firstname: toSentenceCase(firstName),
            lastname: toSentenceCase(surname),
            phonenumber: phoneNumber,
            email: email,
            ninOrBvn: ninOrBvn,
            password: password,
            pin: pin,
            userAgent: agentEmail,
          };

          await request
            .post(baseApiUrl + "registration.php")
            .type("application/json")
            .send(req)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "Successful",
                text: "You have successfully register, please login to continue",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/login");
                }
              });
            })
            .catch((err) => {
              setProgress(false);

              Toast.fire({
                icon: "error",
                title: err,
              });
            });
        })
        .catch((err) => {});
    } catch (error) {
      alert(error);
      setProgress(false);
    }
  }

  function toSentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleVerification = () => {
    setValidate(true);
    setProgressStatus("varification");

    if (firstName === "") {
      Toast.fire({
        icon: "error",
        title: "First name must be provided",
      });
      return;
    }
    if (surname === "") {
      Toast.fire({
        icon: "error",
        title: "Surname must be provided",
      });
      return;
    }
    if (phoneNumber === "") {
      Toast.fire({
        icon: "error",
        title: "Phone number name must be provided",
      });
      return;
    }
    if (email === "") {
      Toast.fire({
        icon: "error",
        title: "Email must be provided",
      });
      return;
    }
    if (password === "") {
      Toast.fire({
        icon: "error",
        title: "Password must be provided",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "Password mismatched",
      });
      return;
    }

    if (pin === "") {
      Toast.fire({
        icon: "error",
        title: "Pin must be provided",
      });
      return;
    }
    if (pin !== confirmPin) {
      Toast.fire({
        icon: "error",
        title: "PIN mismatched",
      });
      return;
    }

    return true;
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div
      className="login-bg"
      style={{ height: "100vh", overflowY: "scroll", paddingTop: "200px" }}
    >
      <div style={{ marginTop: "20px" }}>
        <MDBContainer className="d-flex align-items-center justify-content-center">
          <MDBCard className="shadow-2 d-flex align-items-center m-4 p-4">
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
                  <h3>New User Account</h3>
                </div>
              </MDBCol>
            </MDBRow>
            {
              <ErrorNotifier
                show={netCon}
                message="No internet connection"
                onErrClose={() => {
                  setNetCon(false);
                }}
              />
            }
            <MDBRow>
              <MDBCol>
                <TextInput
                  tValue={setFirstName}
                  tType="text"
                  tLabel="First Name"
                  validate={validate}
                />

                <TextInput
                  tValue={setSurname}
                  tType="text"
                  tLabel="Last Name"
                  validate={validate}
                />

                <TextInput
                  tValue={setEmail}
                  tType="text"
                  tLabel="Email"
                  validate={validate}
                />

                <TextInput
                  tValue={setNinOrBvn}
                  tType="text"
                  tLabel="BVN or NIN"
                  validate={validate}
                />

                <TextInput
                  tValue={setPhoneNumber}
                  tType="text"
                  tLabel="Phone number "
                  validate={validate}
                />

                <TextInput
                  tValue={setPassword}
                  tType="password"
                  tLabel="password"
                  validate={validate}
                />

                <TextInput
                  tValue={setConfirmPassword}
                  tType="password"
                  tLabel="confirm password"
                  validate={validate}
                />

                <TextInput
                  tValue={setPin}
                  tType="password"
                  tLabel="pin"
                  maxLen="4"
                  validate={validate}
                />

                <TextInput
                  tValue={setConfirmPin}
                  tType="password"
                  tLabel="confirm pin"
                  maxLen="4"
                  validate={validate}
                />

                <ToggleButton
                  value="uncheck"
                  selected={isAgent}
                  onChange={() => {
                    setIsAgent(!isAgent);
                  }}
                >
                  i have a referal
                  <Checkbox />
                </ToggleButton>
                {isAgent && (
                  <div>
                    <TextInput
                      tValue={setAgentEmail}
                      tType="text"
                      tLabel="referal email"
                    />
                  </div>
                )}
              </MDBCol>
            </MDBRow>

            <MDBRow className="m-2">
              <MDBCol>
                <Collapse in={progress}>
                  <Stack style={{ color: "grey.500" }} spacing={0.5}>
                    <Spinner />
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "small",
                        color: "green",
                      }}
                    >
                      {progressStatus}
                    </div>
                  </Stack>
                </Collapse>

                <MDBBtn
                  className="mt-1"
                  style={{ background: "#200647" }}
                  type="submit"
                  onClick={handleSubmit}
                  disabled={progress}
                >
                  REGISTER
                </MDBBtn>
              </MDBCol>
            </MDBRow>

            <MDBRow className="m-2">
              <MDBCol>
                <div class="text-center m-2">
                  Already have an account?
                  <b>
                    <Link className="d_link" to={"/login"}>
                      Login
                    </Link>
                  </b>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
        <SuccessAlert showMe={regSuccess} nav="/login" />
      </div>
    </div>
  );
}

export const ErrorNotifier = (props) => {
  return (
    <div>
      <Snackbar
        open={props.show}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={6000}
        onClose={props.onErrClose}
      >
        <Alert style={{ textAlign: "center" }} severity="error" sx={4}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
