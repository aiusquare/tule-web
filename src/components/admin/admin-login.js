import {
  MDBBtn,
  MDBCard,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import * as React from "react";
import logo from "../../pictures/logo.png";
import { Alert, Collapse, Stack } from "@mui/material";
import TextInput from "./textField";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../../components/alert.js";
import Swal from "sweetalert2";
import request from "superagent";
import axios from "axios"; // Ensure axios is imported
import { appMainColor, baseApiUrl } from "../../services/setup";
import { loader } from "./alert.js";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(false);
  const [userCorrect, setUserCorrect] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [reset, setReset] = useState(false);

  const handleLogin = async () => {
    setUserCorrect(false);
    setPasswordCorrect(false);

    const data = {
      AdminId: userName,
      Password: password,
    };

    if (validateForm()) {
      loader({
        title: "Logging in",
        text: "Please wait...",
      });

      if (navigator.onLine) {
        try {
          const response = await axios.post(
            baseApiUrl + "admin/login/index.php",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          Toast.fire({
            icon: "success",
            title: "Logged in successfully",
          });

          // Set login session
          localStorage.setItem("adminLogin", Date.now().toString());

          const responseData = response.data; // Use response.data to access response data

          navigate("/admin");
        } catch (err) {
          let errorMsg = "An unexpected error occurred.";

          // Handle specific errors
          if (err.response) {
            errorMsg = err.response.data.message; // Adjusted to access the correct error message
          }

          Swal.fire({
            title: "Error",
            text: errorMsg,
            icon: "error",
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: "No internet connection",
        });
      }
    }
  };

  const validateForm = () => {
    if (userName === "") {
      setUserCorrect(true);

      return false;
    }

    if (password === "") {
      setPasswordCorrect(true);

      return false;
    }

    return true;
  };

  return (
    <div className="login-bg">
      <MDBContainer>
        <MDBCard className="shadow-2 d-flex flex-column align-items-center m-4 p-4">
          <MDBCard
            className="shadow-2 p-4"
            style={{ cursor: "pointer", width: "100px" }}
          >
            <MDBCardImage position="top" src={logo}></MDBCardImage>
          </MDBCard>
          <MDBRow className="m-2">
            <MDBCol>
              <div class="text-center m-3">
                <h3>Admin Login</h3>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="m-2">
            <MDBCol>
              <TextInput tValue={setUserName} tLabel="User name" tType="text" />

              <Collapse in={userCorrect}>
                <Alert className="pt-1" severity="error">
                  Fill the user name
                </Alert>
              </Collapse>

              <TextInput
                tValue={setPassword}
                tType="password"
                tLabel="password"
              />

              <Collapse in={passwordCorrect}>
                <Alert className="pt-1" severity="error">
                  Fill the password
                </Alert>
              </Collapse>
            </MDBCol>
          </MDBRow>

          <MDBRow className="m-2 ">
            <MDBCol>
              <Collapse in={progress}>
                <Stack style={{ color: "grey.500" }} spacing={0.5}></Stack>
              </Collapse>
              <MDBBtn
                style={{ background: appMainColor }}
                className="mt-1 button"
                type="submit"
                onClick={handleLogin}
                disabled={progress}
              >
                SUBMIT
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow className="m-2">
            <MDBCol>
              <Link
                style={{ color: appMainColor }}
                className="d_link"
                to={""}
                onClick={() => {
                  setReset(true);
                }}
              >
                Forgot Password?
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}
