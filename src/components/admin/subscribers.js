import * as React from "react";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import "../admin/css/style.css";
import {
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import request from "superagent";
import { baseApiUrl } from "../../services/setup";

export default function SubscribersPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [init, setInit] = useState(false);

  const [copied, setCopied] = useState(false);

  const columns = [
    { id: "user", label: "User" },
    { id: "refrance", label: "Refrance" },
    { id: "description", label: "Description", minWidth: 150 },
    { id: "prevBal", label: "Previous Balance" },
    { id: "curBal", label: "Current Balance" },
    { id: "date", label: "Date" },
  ];

  useEffect(() => {
    if (!init) {
      handleDataFetch();
    }
  }, [init]);

  const handleDataFetch = async () => {
    await request
      .get(baseApiUrl + "admin/subscribers/index.php")
      .then((response) => {
        const basicDetails = response.body;

        // console.log("SUBSCRIBERS", basicDetails);
        setRows(basicDetails);

        setInit(true);
      })
      .catch((err) => {
        // console.log("Error message:", err.response);
        // console.log("ERROR", err);
      });
  };

  return (
    <div className="m-4 d-flex flex-column align-items-center">
      <MDBCardBody>
        <MDBCardText>
          <h4>Subscribers</h4>
        </MDBCardText>
      </MDBCardBody>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <MDBRow style={{ padding: "10px" }}>
          <MDBCol>
            <div>
              <table className="subscribers-table">
                <thead>
                  <tr>
                    <th>User Balance</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phonenumber</th>
                    <th>Referrer</th>
                    <th>Pin</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((user, index) => (
                    <tr key={index}>
                      <td>₦{user.accountBalance}</td>
                      <td>{user.email}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.phonenumber}</td>
                      <td>{user.userAgent}</td>
                      <td className="pin-cell">
                        ****
                        <CopyToClipboard
                          text={user.pin}
                          onCopy={() => setCopied(true)}
                        >
                          <MDBIcon
                            fas
                            icon="eye-slash"
                            className="copy-icon"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </CopyToClipboard>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={() => setCopied(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert onClose={() => setCopied(false)} severity="success">
                  PIN copied to clipboard
                </Alert>
              </Snackbar>
            </div>
          </MDBCol>
        </MDBRow>
      </Paper>
    </div>
  );
}
