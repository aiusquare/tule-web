import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";
import "../css/style.css";
import { Alert, Collapse, Stack, Snackbar } from "@mui/material";
import TextInput from "./textField";
import Spinner from "./spinner";
import { appMainColor, baseApiUrl, siteLogo } from "../services/setup";
import { Toast } from "./alert";
import Swal from "sweetalert2";
import request from "superagent";
import { loader } from "./admin/alert";

export default function PasswordReset(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [progress, setProgress] = useState(false);
  const [netConnection, setNetConnection] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [vcode, setVCode] = useState(false);

  const handleSubmit = async () => {
    if (validateForm()) {
      const data = {
        email: userEmail,
        new_password: newPassword,
        vcode: vcode,
      };

      if (navigator.onLine) {
        loader({ title: "Recovering", text: "please wait..." });

        await request
          .post(baseApiUrl + "util/recover/")
          .type("application/json")
          .send(data)
          .then((response) => {
            Swal.fire({
              title: "Recovered",
              text: "We have successfully recover your password. you can now proceed",
              icon: "success",
            }).then(() => {
              if (location.state.device === "mobile") {
                navigate("/mob-login");
              } else {
                navigate("/login");
              }
            });
          })
          .catch((err) => {
            let errorText = err.response.text;
            Swal.fire({
              title: "Error!",
              text: errorText,
              icon: "error",
            });
          });
      } else {
        Toast.fire({
          icon: "error",
          title: "No internet connection",
        });
      }
    }
  };

  const validateForm = () => {
    if (newPassword === "") {
      Toast.fire({
        icon: "error",
        title: "New password must be provided",
      });

      return false;
    }

    if (newPassword !== confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "New password has a mismatch with confirm password",
      });

      return false;
    }

    if (vcode === "") {
      Toast.fire({
        icon: "error",
        title: "Verification code must be provided",
      });

      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!location.state || !location.state.userEmail) {
      navigate("/login");
    } else {
      setUserEmail(location.state.userEmail);
    }
  });

  return (
    <div className="login-bg">
      <MDBContainer className="d-flex align-items-center justify-content-center p-4">
        <MDBRow>
          <MDBCol>
            <MDBCard
              className="shadow-2 d-flex align-items-center"
              style={{ padding: "40px", margin: "10px" }}
            >
              <Snackbar
                style={{ position: "absolute" }}
                open={isSuccess}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                autoHideDuration={6000}
              >
                <Alert severity="success" sx={4}>
                  Password reset successfully
                </Alert>
              </Snackbar>
              <MDBCard
                className="shadow-2 d-flex justify-content-center align-item-center p-2"
                style={{ cursor: "pointer", width: "100px", height: "100px" }}
              >
                <MDBCardImage src={siteLogo}></MDBCardImage>
              </MDBCard>

              <div className="m-4">
                <strong>Password Recovery</strong>
              </div>

              <div>
                <Snackbar
                  style={{ position: "absolute" }}
                  open={netConnection}
                  anchorOrigin={{ horizontal: "center", vertical: "top" }}
                  autoHideDuration={6000}
                  onClose={() => {
                    setNetConnection(false);
                  }}
                >
                  <Alert severity="error" sx={4}>
                    No internet connection
                  </Alert>
                </Snackbar>

                <TextInput
                  tValue={(e) => {
                    setVCode(e);
                  }}
                  tLabel="Recovery code"
                  tType="password"
                />

                <TextInput
                  tValue={(e) => {
                    setNewPassword(e);
                  }}
                  tLabel="New password"
                  tType="password"
                />

                <TextInput
                  tValue={(e) => {
                    setConfirmPassword(e);
                  }}
                  tType="password"
                  tLabel="Confirm password"
                />
              </div>
              <div>
                <Collapse in={isMatched}>
                  <Alert className="pt-1" severity="error">
                    Password didn't match
                  </Alert>
                </Collapse>
              </div>
              <div>
                <Collapse in={progress}>
                  <Stack style={{ color: "grey.500" }} spacing={0.5}>
                    <Spinner />
                  </Stack>
                </Collapse>
                <MDBBtn
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="mt-1 button"
                  type="submit"
                  disabled={progress}
                  style={{ background: appMainColor }}
                >
                  SUBMIT
                </MDBBtn>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
