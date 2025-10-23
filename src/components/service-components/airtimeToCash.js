import { useContext, useEffect, useState } from "react";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
  MDBInput,
} from "mdb-react-ui-kit";

import { useRef } from "react";
import "firebase/compat/storage";
import { firebase } from "../../services/config";
import "firebase/compat/database";
import {
  Alert,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { ServiceComContext } from "../dashboard";
import Swal from "sweetalert2";
import request from "superagent";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  appMainColor,
  baseApiUrl,
  monnifyApiParams,
} from "../../services/setup";

// const db = firebase.database();

const AirtimeToCash = () => {
  const [init, setInit] = useState(true);
  const [orderInitiated, setOrderInitiated] = useState(false);

  return (
    <div
      className="d-flex flex-column align-items-center mt-4"
      // ref={refBuydata}
      style={{ padding: "30px" }}
    >
      {init && <OrderCard show={setInit} toggle={setOrderInitiated} />}
      {orderInitiated && (
        <DetailsCard show={setInit} toggle={setOrderInitiated} />
      )}
    </div>
  );
};

const OrderCard = (props) => {
  const navigate = useNavigate();
  const networks = [
    { network: "MTN", id: 1 },
    { network: "AIRTEL", id: 4 },
    { network: "GLO", id: 2 },
    { network: "9MOBILE", id: 3 },
  ];

  const userId = localStorage.getItem("email");
  const userAgent = localStorage.getItem("agent");
  const userPin = localStorage.getItem("pin");

  const [network, setNetwork] = useState(networks[0].network);
  const [networkId, setNetworkId] = useState(networks[0].id);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authKey, setAuthKey] = useState("");

  const [paymentMode, setPaymentMode] = useState("byBank");
  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [airtimeAmount, setAirtimeAmount] = useState(0);
  const [amountToRecieve, setAmountToRecieve] = useState(0);
  const [allBanks, setAllBanks] = useState([]);

  const [validity, setvalidity] = useState(false);

  const refBuydata = useRef(null);

  const generateAuth = () => {
    const fetchData = async () => {
      try {
        const url = "https://api.monnify.com/api/v1/auth/login";
        const apiParams = monnifyApiParams;
        const apiKey = btoa(apiParams); // Using btoa to encode in Base64

        const response = await axios.post(url, null, {
          headers: {
            Authorization: `Basic ${apiKey}`,
          },
        });

        const resBody = response.data.responseBody;

        getNigerianBanks(resBody.accessToken);
        setAuthKey(resBody.accessToken);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  };

  function getNigerianBanks(token) {
    const url = "https://api.monnify.com/api/v1/banks";

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        const resBanks = data.responseBody;

        setAllBanks(resBanks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }

  const handleSubmit = () => {
    withReactContent(Swal).fire({
      title: "Enter your Pin",
      html:
        "You are about to start a process of selling " +
        network +
        " Airtime, please confirm your intent by giving your pin to set you on process.",
      input: "password",
      // allowOutsideClick: false,
      // allowEscapeKey: false,
      preConfirm: () => {
        if (Swal.getInput().value === userPin) {
          Swal.fire({
            title: "Processing...",
            html: "Please wait while we process your transaction",
            // allowOutsideClick: false,
            // allowEscapeKey: false,
            timerProgressBar: false,
            didOpen: async () => {
              Swal.showLoading();

              const req = {
                airtimeAmount: airtimeAmount,
                amountToRecieve: amountToRecieve,
                phoneNumber: phoneNumber,
                paymentMode: paymentMode,
                bankName: bankName,
                accountName: accountName,
                accountNumber: accountNumber,
                userId: userId,
              };

              await request
                .post(baseApiUrl + "airtime_to_cash/order.php")
                .type("application/json")
                .send(req)
                .then((response) => {
                  if (response.body.status === "success") {
                    Swal.fire({
                      title: "Success",
                      text: "Order created successfully",
                      icon: "success",
                    }).then((res) => {
                      console.log("RESPONCE", res);
                      props.show(false);
                      props.toggle(true);
                    });
                  }
                })
                .catch((err) => {
                  let errorMsg = "";

                  console.log(err);

                  if (err.response && err.response.status === 400) {
                    // console.log("ERROR HERE", err.response.text);
                    errorMsg = err.response.text;
                  } else {
                    // console.error("Network error:", err);
                    errorMsg = err;
                  }

                  Swal.fire({
                    title: "Error",
                    text: errorMsg,
                    icon: "error",
                  });
                });
            },
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "The code provided is incorrect, please  check and try again",
            icon: "error",
          }).then(() => {
            handleSubmit();
          });
        }
      },
    });
  };

  const validateAccountNumber = async (token, accNum, bankCode) => {
    try {
      const response = await axios.get(
        `https://api.monnify.com/api/v1/disbursements/account/validate?accountNumber=${accNum}&bankCode=${bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resBody = response.data.responseBody;
      setAccountName(resBody.accountName);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    generateAuth();
  }, []);

  const validateInput = () => {
    if (network === "") return false;
    if (airtimeAmount === 0) return false;
    if (phoneNumber === "") return false;
    if (bankName === "") return false;
    if (accountName === "") return false;
    if (accountNumber === "") return false;

    return true;
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <MDBCardBody>
        <MDBCardText>
          <h3>AIRTIME SWAP</h3>
        </MDBCardText>
      </MDBCardBody>
      <MDBCard className="center service-container shadow-2 m-2">
        <MDBDropdown>
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            NETWORK
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {networks.map((e, index) => {
              return (
                <MDBDropdownItem
                  key={index}
                  onClick={() => {
                    setNetwork(e.network);
                  }}
                  link
                  childTag="button"
                >
                  {e.network}
                </MDBDropdownItem>
              );
            })}
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBCardBody>
          <MDBCardText>{network}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="shadow-2 service-container m-1">
        <TextField
          className="m-3 w-2"
          label="Enter Airtime Amount"
          type="number"
          onBlur={(e) => {
            setAirtimeAmount(e.target.value);

            let amountEntered = e.target.value;
            let amountToRecieve = amountEntered - (10 / 100) * amountEntered;

            setAmountToRecieve(amountToRecieve);
          }}
        />
      </MDBCard>
      <MDBCard className="shadow-2 service-container m-1">
        <TextField
          value={amountToRecieve}
          className="m-3 w-2"
          label="Amount in Naira"
          type="number"
          onBlur={(e) => {
            setAmountToRecieve(e.target.value);
          }}
          disabled
        />
      </MDBCard>

      <MDBCard className="shadow-2 service-container m-1">
        <TextField
          className="m-3 "
          label="Sending phone number"
          type="number"
          InputProps={{
            inputProps: {
              maxLength: 11,
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </MDBCard>
      <MDBCard className="shadow-2 service-container p-4 m-1">
        Payment mode:
        <RadioGroup
          value={paymentMode}
          onChange={(e) => {
            setPaymentMode(e.target.value);
          }}
          className="m-2"
        >
          <FormControlLabel
            value="fundWallet"
            control={<Radio />}
            label="Fund my Wallet"
          />
          <FormControlLabel
            value="byBank"
            control={<Radio />}
            label="Via Bank"
          />
        </RadioGroup>
      </MDBCard>

      <MDBCard className="shadow-2 service-container p-2 m-1">
        Bank details:
        <FormControl className="w-100" fullWidth margin="normal">
          <InputLabel>Select Bank</InputLabel>
          <Select
            value={bankName}
            label={bankName}
            onChange={(e) => {
              const selectedBank = allBanks.find(
                (bank) => bank.name === e.target.value
              );

              setBankName(e.target.value);
              setBankCode(selectedBank.code);
            }}
          >
            {allBanks.map((bank, i) => {
              return (
                <MenuItem key={bank.bankName} value={bank.name}>
                  {bank.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          className="my-2 w-100"
          label="Account number"
          type="number"
          InputProps={{
            inputProps: {
              maxLength: 11,
              style: { textAlign: "center" },
            },
          }}
          onChange={(e) => {
            const enteredValue = e.target.value;
            // Remove non-digit characters
            const digitCount = enteredValue.replace(/\D/g, "").length;
            if (digitCount === 10) {
              // setValitedAccount(true);
              setAccountNumber(enteredValue);

              validateAccountNumber(authKey, enteredValue, bankCode);
            } else {
              setAccountNumber("");
              setAccountName("");
            }
          }}
        />
        <TextField
          className="my-2 w-100"
          label="Account name"
          value={accountName}
          type="text"
          disabled
        />
      </MDBCard>

      <MDBBtn
        onClick={() => {
          if (validateInput()) {
            handleSubmit();
          } else {
            setvalidity(true);
          }
        }}
        className="m-2 button"
        style={{ background: appMainColor, color: "white" }}
      >
        PROCEED
      </MDBBtn>
      <Snackbar
        open={validity}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={6000}
        onClose={() => {
          setvalidity(false);
        }}
      >
        <Alert severity="error" sx={4}>
          Invalid input please check and try again.
        </Alert>
      </Snackbar>
    </div>
  );
};

const DetailsCard = (props) => {
  const [copied, setCopied] = useState(false);
  const [receivingNumber, setReceivingNumber] = useState("");

  // Example expiration time: 1 hour from now
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 1);

  return (
    <div className="shadow-2 p-4">
      <div className="p-4 center" style={{ fontWeight: 500 }}>
        Order Details
      </div>

      <table className="w-100 airtime-to-cash-table">
        <tr className="p-4">
          <td>Sending number</td>
          <td>09064548722</td>
        </tr>
        <tr className="p-4">
          <td>Receiving number</td>
          <td>
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
                Number copied
              </Alert>
            </Snackbar>

            <MDBInputGroup
              noWrap
              textAfter={
                <CopyToClipboard
                  text={receivingNumber}
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
                value={receivingNumber}
                disabled
                style={{
                  width: "130px",
                  background: "white",
                  color: "black",
                  fontStyle: "bold",
                }}
              />
            </MDBInputGroup>
          </td>
        </tr>
        <tr className="p-4">
          <td>Swap amount</td>
          <td>NGN6400</td>
        </tr>
        <tr className="p-4">
          <td>Amount of Airtime</td>
          <td>NGN6000</td>
        </tr>

        <tr className="p-4">
          <td>Expiration time</td>
          <td>{<CountdownTimer expirationTime={expirationTime} />}</td>
        </tr>
      </table>
    </div>
  );
};

function CountdownTimer({ expirationTime }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = new Date(expirationTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <div>
      {timeLeft.hours !== undefined && (
        <p>
          {("0" + timeLeft.hours).slice(-2)}:
          {("0" + timeLeft.minutes).slice(-2)}:
          {("0" + timeLeft.seconds).slice(-2)}
        </p>
      )}
    </div>
  );
}

export default AirtimeToCash;
