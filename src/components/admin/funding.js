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
import { useEffect, useState } from "react";
import request from "superagent";
import Swal from "sweetalert2";
import { appMainColor, baseApiUrl } from "../../services/setup";
import { loader } from "./alert";
import { Toast } from "../alert";

export default function FundingPage() {
  const [initBalance, setInitBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscriberName, setSubscriberName] = useState("");
  const [fundingAmount, setFundingAmount] = useState(0);

  const fetchUser = async (e) => {
    if (subscriberEmail === "") {
      Toast.fire({
        icon: "error",
        title: "Please enter user email",
      });

      return;
    }

    loader({
      title: "Searching user",
      text: "Please wait...",
    });

    const data = { email: subscriberEmail };

    await request
      .post(baseApiUrl + "admin/subscriber/index.php")
      .type("application/json")
      .send(data)
      .then((response) => {
        const retData = response.body;
        const name = retData.firstname + " " + retData.lastname;
        const curBal = retData.accountBalance;
        setInitBalance(parseFloat(curBal));
        setCurrentBalance(parseFloat(curBal));
        setSubscriberName(name);

        Toast.fire({
          icon: "success",
          title: "fetched successfully",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err,
        });
      });
  };

  const handleCredit = async (e) => {
    if (subscriberEmail === "" || fundingAmount === 0) {
      Toast.fire({
        title: "Email or Amount field Can't be empty",
        icon: "error",
      });
      return;
    }

    loader({
      title: "Crediting",
      text: "Please wait...",
    });

    const data = { email: subscriberEmail, amount: fundingAmount };

    try {
      await request
        .post(baseApiUrl + "admin/funding/credit/index.php")
        .send(data)
        .type("application/json")
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: res.text,
          });

          setFundingAmount(0);
        });
    } catch (err) {
      console.error("Error uploading file", err);
      Swal.fire({
        title: "Error!",
        text: err,
        icon: "error",
      });
    }
  };

  const handleDebit = async (e) => {
    if (subscriberEmail === "" || fundingAmount === 0) {
      Toast.fire({
        title: "Email or Amount field Can't be empty",
        icon: "error",
      });
      return;
    }

    loader({
      title: "Debitting",
      text: "Please wait...",
    });

    const data = { email: subscriberEmail, amount: fundingAmount };

    try {
      const res = await request
        .post(baseApiUrl + "admin/funding/debit/index.php")
        .send(data)
        .type("application/json")
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: res.text,
          });

          setFundingAmount(0);
        });
    } catch (err) {
      console.error("Error uploading file", err);
      Swal.fire({
        title: "Error!",
        text: err,
        icon: "error",
      });
    }
  };

  return (
    <div className="m-4 d-flex flex-column align-items-center">
      <MDBCardBody>
        <MDBCardText>
          <h4>Account Funding</h4>
        </MDBCardText>
      </MDBCardBody>

      <Paper className="mt-2 p-2" sx={{ width: "100%", overflow: "hidden" }}>
        <div>Subscriber name: {subscriberName}</div>
        <div>Initial balance: {initBalance}</div>
        <div>Current balance: {currentBalance}</div>
      </Paper>

      <Paper className="mt-2" sx={{ width: "100%", overflow: "hidden" }}>
        <MDBRow style={{ padding: "10px" }}>
          <MDBCol style={{ display: "flex", justifyContent: "center" }}>
            <MDBInput
              className="p-2"
              placeholder="Please enter user email"
              label="User email"
              onChange={(e) => {
                setSubscriberEmail(e.target.value);
              }}
            />
            <MDBBtn
              onClick={fetchUser}
              style={{
                background: appMainColor,
                // height: "56px",
                width: "150px",
              }}
              className="p-2"
            >
              search user
            </MDBBtn>
          </MDBCol>
        </MDBRow>

        <MDBRow style={{ padding: "10px" }}>
          <MDBCol style={{ display: "flex", justifyContent: "center" }}>
            <MDBInput
              onChange={(e) => {
                let amount = e.target.value;
                let numericAmount = parseFloat(amount); // Converts to a floating-point number

                // Check if the input is not a valid number
                if (isNaN(numericAmount)) {
                  Toast.fire({
                    title: "Must be numeric",
                    icon: "error",
                  });

                  setFundingAmount(fundingAmount); // Keep the previous value
                  return;
                } else {
                  setFundingAmount(numericAmount); // Update fundingAmount with numeric value
                  setCurrentBalance(initBalance + numericAmount); // Update the balance
                }
              }}
              value={fundingAmount}
              className="p-2"
              // placeholder="Please enter amount"
              label="Funding amount"
            />
          </MDBCol>
        </MDBRow>

        <MDBRow style={{ padding: "10px" }}>
          <MDBCol style={{ display: "flex", justifyContent: "center" }}>
            <MDBBtn
              onClick={handleCredit}
              style={{
                background: appMainColor,
              }}
              className="p-2 w-50"
            >
              Credit user
            </MDBBtn>
          </MDBCol>

          <MDBCol style={{ display: "flex", justifyContent: "center" }}>
            <MDBBtn
              onClick={handleDebit}
              style={{
                background: appMainColor,
              }}
              className="p-2 w-50"
            >
              Debit user
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </Paper>
    </div>
  );
}
