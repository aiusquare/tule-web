import * as React from "react";
import Paper from "@mui/material/Paper";
import "../admin/css/style.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import request from "superagent";
import { baseApiUrl } from "../../services/setup";
import ReactSearchBox from "react-search-box";
import CopyToClipboard from "react-copy-to-clipboard";
import { Toast } from "../alert";
import { loader } from "./alert";

export default function PendingTransactionsPage() {
  const [rows, setRows] = useState([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get(
          baseApiUrl + "transactions/pending/index.php"
        );

        const theData = response.body;

        if (!theData.message) {
          setRows(theData);
        }

        setInit(true);
      } catch (err) {
        console.error("Error message:", err.response);
      }
    };

    if (!init) {
      fetchData();
    }
  }, [init]);

  return (
    <div className="m-4 d-flex flex-column align-items-center">
      <MDBCardBody>
        <MDBCardText>
          <h4>Pending Transactions</h4>
        </MDBCardText>
      </MDBCardBody>
      <Paper className="p-2 w-100">
        <div className="w-50 m-2">
          <ReactSearchBox
            placeholder="Search for record by refrance number"
            data={rows}
            leftIcon={
              <>
                <i class="fas fa-magnifying-glass"></i>
              </>
            }
            iconBoxSize="48px"
            autoFocus
          />
        </div>

        {rows.map((row, id) => {
          return (
            <div>
              <StatusCard
                user={row.userId}
                desc={row.details}
                preBal={row.prevBal}
                curBal={row.newBal}
                referance={row.refNo}
                date={row.date}
                recipient={row.recipient}
              />
            </div>
          );
        })}
      </Paper>
    </div>
  );
}

const StatusCard = (props) => {
  const [copied, setCopied] = useState(false);
  const referance = props.referance;

  const handleRefund = async () => {
    const data = {
      ref: referance,
    };

    loader({ title: "Processing", text: "please wait..." });

    await request
      .post(baseApiUrl + "transactions/pending/refund/")
      .type("application/json")
      .send(data)
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: "Refunded successfully",
        });

        window.location.reload();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err,
        });
      });
  };

  const handleClear = async () => {
    const data = {
      ref: referance,
    };

    loader({ title: "Processing", text: "please wait..." });

    await request
      .post(baseApiUrl + "transactions/pending/clear/")
      .type("application/json")
      .send(data)
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: "Refunded successfully",
        });

        window.location.reload();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err,
        });
      });
  };

  return (
    <MDBContainer>
      <MDBCard className="p-2 shadow-1 m-1">
        <div>
          <strong>User:</strong> {props.user}
        </div>
        <div> {props.desc} </div>
        <MDBRow>
          <MDBCol>
            <strong>Previous Balance:</strong> N{props.preBal}
          </MDBCol>
          <MDBCol>
            <strong>Current Balance:</strong> N{props.curBal}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <strong>Transactions refrance:</strong>
            {props.referance}

            <MDBInputGroup
              className="mb-2"
              noWrap
              textAfter={
                <CopyToClipboard
                  text={props.recipient}
                  onCopy={() => {
                    setCopied(true);
                  }}
                >
                  <MDBIcon
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="zindex-alert"
                    style={{
                      cursor: "pointer",
                      color: "black",
                    }}
                    fas
                    icon="paste"
                  />
                </CopyToClipboard>
              }
            >
              <MDBInput
                type="text"
                value={props.recipient}
                disabled
                style={{
                  width: "130px",
                  background: "white",
                  color: "black",
                  fontStyle: "bold",
                }}
              />

              <Snackbar
                style={{ position: "absolute" }}
                open={copied}
                anchorOrigin={{
                  horizontal: "center",
                  vertical: "top",
                }}
                autoHideDuration={6000}
                onClose={() => {
                  setCopied(false);
                }}
              >
                <Alert severity="success" sx={4}>
                  referance copied
                </Alert>
              </Snackbar>
            </MDBInputGroup>
          </MDBCol>
          <MDBCol>
            <strong>Date:</strong> {props.date}
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <Button
              className="w-100 mb-3"
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "12",
                background: "#ff6600",
                borderRadius: "20px",
                "&:hover": { background: "#ff6600" },
                height: 35,
              }}
              onClick={handleRefund}
            >
              Refund
            </Button>
          </MDBCol>
          <MDBCol>
            <Button
              className="w-100 mb-3"
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "12",
                background: "#ff6600",
                borderRadius: "20px",
                "&:hover": { background: "#ff6600" },
                height: 35,
              }}
              onClick={handleClear}
            >
              Clear
            </Button>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};
