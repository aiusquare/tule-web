import * as React from "react";
import Paper from "@mui/material/Paper";
import "../admin/css/style.css";
import {
  MDBBtn,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useState } from "react";
import request from "superagent";
import { programmes } from "../Arrays.js";
import TextInput from "../textField.js";
import { loader } from "../LoadingSpinner.js";
import Swal from "sweetalert2";
import { Toast } from "../errorNotifier.js";
import { baseApiUrl } from "../../services/setup.js";

export default function SiteAdminTab() {
  const [rows, setRows] = useState([]);
  const [init, setInit] = useState(false);

  const [resetEmail, setResetEmail] = useState("");

  const resetUserPassword = async () => {
    console.log("COURSES ON OFFER", resetEmail);

    if (navigator.onLine) {
      // progress spinner
      loader({
        title: "Resetting",
        text: "Please! wait.",
      });

      const data = { Email: resetEmail };

      await request
        .post(baseApiUrl + "admin/user_password_reset.php")
        .type("application/json")
        .send(data)
        .then((response) => {
          Toast.fire({
            icon: "success",
            title: "Resetted successfully",
          });

          setResetEmail("");
        })
        .catch((err) => {
          let errorText = err.response.text;
          console.log(errorText);

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
  };

  return (
    <div className="m-4 d-flex flex-column align-items-center">
      <MDBCardBody>
        <MDBCardText>
          <h4>Site Management</h4>
        </MDBCardText>
      </MDBCardBody>
      <Paper className="p-2 my-2 w-100">
        <div style={{ fontWeight: "900", padding: "20px" }}>
          User Password Reset
        </div>

        <MDBRow>
          <MDBCol>
            <div className="d-flex align-items-center">
              <MDBInput
                label="Reset email"
                value={resetEmail}
                type="text"
                onChange={(e) => {
                  setResetEmail(e.target.value);
                }}
                size="lg"
              />

              <MDBBtn
                className="w-25"
                size="lg"
                style={{ background: "#05321e" }}
                onClick={resetUserPassword}
              >
                Reset
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </Paper>
    </div>
  );
}
