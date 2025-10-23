import React, { useContext, useEffect, useRef, useState } from "react";
// import Modal from "reboron/DropModal";
import {
  MDBBtn,
  MDBCard,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBModal,
  MDBModalDialog,
} from "mdb-react-ui-kit";
import {
  Alert,
  Collapse,
  Snackbar,
  Stack,
  TextField,
  alertClasses,
} from "@mui/material";
import logo from "../pictures/logo.png";
import { ServiceComContext } from "./dashboard";
import SuccessAlert from "./alert";
import { ErrorNotifier } from "./registration";
import buyData, {
  bulkSms,
  buyAirtime,
  buyDataCard,
  electricity,
  posOrder,
} from "./serviceProcessor";
import DataCard from "./dataCard";
import { firebase } from "../services/config";
import "firebase/compat/database";
import "firebase/compat/storage";
import Spinner from "./spinner";
import request from "superagent";
import { baseApiUrl } from "../services/setup";

const database = firebase.database();

const PinModel = (props) => {
  const refModal = useRef(null);
  const [provPin, setProvPin] = useState("");
  const [netConnection, setNetConnection] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [success, setSucess] = useState(false);
  const [toDataCard, setToDataCard] = useState(false);
  const [dataCardDetails, setDataCardDetails] = useState({});
  const [noAvailableBal, setNoAvailableBal] = useState(false);
  const [clientError, setClientError] = useState(false);
  const [inCorrectAmount, setIncorrectAmount] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [successNav, setSuccessNav] = useState("");
  const [serverResTimeoutId, setServerResTimeoutId] = useState(0);
  const [refKey, setRefKey] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [reqObj, setReqObj] = useState({});

  const showModal = () => {
    refModal.current.show();
  };

  useEffect(() => {
    const adminRef = database.ref("Admin");
    adminRef
      .child("servers")
      .once("value")
      .then((snapshot) => {
        try {
          const airtimeServer = parseInt(
            snapshot.child("availableServiceServers").val()
          );
          if (airtimeServer > 0) {
            setIsReady(true);
          }

          const dataServer = parseInt(
            snapshot.child("availableDataServers").val()
          );
          if (dataServer > 0) {
            setIsReady(true);
          }
        } catch (error) {
          setIsReady(false);
        }
      })
      .catch((error) => {});
  }, []);

  const clearAndApprove = async (snap) => {
    return new Promise((resolve) => {
      clearTimeout(serverResTimeoutId);

      console.log("Approval result:", snap);

      resolve(
        database.ref("/Admin/orders/" + refKey + "/client").set("approve")
      );
    });
  };

  useEffect(() => {
    if (refKey === "") return;

    try {
      database.ref("/Admin/orders/" + refKey).on("value", async (snap) => {
        const retOrder = snap.val();

        try {
          if (retOrder !== null && retOrder !== undefined) {
            if (retOrder.status !== null && retOrder.status !== undefined) {
              if (retOrder.status === "processing") {
                if (retOrder.client !== "approve") {
                  await clearAndApprove(retOrder);
                }
              } else if (retOrder.status === "successful") {
                handleRes("ok");
              } else if (retOrder.status === "failed") {
                handleRes(retOrder.statusDetails);
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [refKey]);

  const hideModal = () => {
    refModal.current.hide();
    setProvPin("");
    setDisableBtn(false);
  };

  const handleRes = (ret) => {
    try {
      if (ret && ret.status === "success") {
        hideModal();
        setAlertMessage(ret.message);
        setDisableBtn(true);
        setSucess(true);
      } else if (ret && ret.status === "fail") {
        setResMsg(ret.message);
        setDisableBtn(false);
        setClientError(true);

        console.log("FAILED REQ", ret);
      } else {
        // Handle unexpected response
        setResMsg(ret); // Here, you might want to set error.message instead if it's available
        setDisableBtn(false);
        setClientError(true);

        // console.log("Unexpected response:", ret);
      }
    } catch (error) {
      // Handle errors here
      // If the system responds with plain text
      setResMsg(ret); // Here, you might want to set error.message instead if it's available
      setDisableBtn(false);
      setClientError(true);
      console.error("It takes the failed route", error);
    }
  };

  useEffect(() => {
    handleBuyAirtimeThroughApi(reqObj);
  }, [reqObj]);

  const handleBuyAirtimeThroughApi = (req) => {
    request
      .post(baseApiUrl + "airtime.php")
      .type("application/json")
      .send(req)
      .then((response) => {
        if (response.data) {
          console.log("Success:", response.data.message);
          handleRes(response.data);
        } else {
          console.log("Response data is undefined or null");
          console.log("RESPONCE", response.body.message);

          handleRes(response.body);
        }
      })
      .catch((err) => {
        // console.log("Error message:", err.response); // or err.response.body

        if (err.response && err.response.status === 400) {
          // Handle the error response with status code 400
          const errorResponseData = err.response.body;

          handleRes(errorResponseData.message);
        } else {
          // Handle other types of errors (e.g., network errors)
          // console.error("Network error:", err);

          handleRes(err.text);
        }
      });
  };

  const showMe = props.showMe;
  const order = props.order;
  const userOder = order.order;
  const { userPin, walletBalance } = useContext(ServiceComContext);
  const confirmMsg = order.confirmMsg;

  useEffect(() => {
    if (showMe === true) {
      // const amount = userOder.amount;
      // if (walletBalance !== null) {
      //   if (amount > walletBalance) {
      //     setNoAvailableBal(true);
      //     return;
      //   }
      // }

      // if (order.serviceType === "airtime") {
      //   if (userOder.amount < 50) {
      //     setIncorrectAmount(true);
      //   } else {
      //     showModal();
      //   }
      // } else {
      //   showModal();
      // }

      props.resetModel(false);
    }
  });

  return (
    <div>
      <MDBModal>
        <MDBModalDialog>
          <MDBContainer className="d-flex flex-column align-items-center p-2">
            <MDBRow>
              <MDBCol>
                <MDBCard
                  className="m-4"
                  style={{ cursor: "pointer", width: "80px", height: "80px" }}
                >
                  <MDBCardImage position="top" src={logo}></MDBCardImage>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <div>
                  <div className="mx-4" style={{ textAlign: "justify" }}>
                    {confirmMsg}
                  </div>
                  <Snackbar
                    open={netConnection}
                    anchorOrigin={{ horizontal: "center", vertical: "top" }}
                    autoHideDuration={6000}
                    onClose={() => {
                      setNetConnection(false);
                    }}
                  >
                    <Alert severity="error" sx={8}>
                      Incorrect pin
                    </Alert>
                  </Snackbar>
                  <h4 style={{ textAlign: "center" }}>
                    please enter your pin to confirm
                  </h4>
                  <MDBCard>
                    <TextField
                      disabled={disableBtn}
                      onChange={(e) => {
                        setProvPin(e.target.value);
                      }}
                      value={provPin}
                      type="password"
                      InputProps={{
                        inputProps: {
                          maxLength: 4,
                          style: { textAlign: "center" },
                        },
                      }}
                    />
                  </MDBCard>
                  <Collapse className="m-3" in={disableBtn}>
                    <Stack style={{ color: "grey.500" }} spacing={0.5}>
                      <Spinner />
                    </Stack>
                  </Collapse>
                  <div className="center">
                    <MDBBtn
                      disabled={disableBtn}
                      onClick={async () => {
                        if (provPin === userPin && !(provPin === "")) {
                          setDisableBtn(true);
                          const serviceType = order.serviceType;

                          if (serviceType === "data") {
                            buyData(userOder).then((ret) => {
                              handleRes(ret);
                            });
                          } else if (serviceType === "airtime") {
                            const req = {
                              userId: userOder.userId,
                              url: "https://directortechs.com/api/topup/",
                              regBody: {
                                network: userOder.networkId,
                                amount: userOder.amount,
                                mobile_number: userOder.phone,
                                Ported_number: false,
                                airtime_type: userOder.plan,
                              },
                              amount: userOder.amount,
                              service: "airtime",
                              agent: userOder.userAgent,
                            };

                            if (isReady) {
                              try {
                                const ref = await database
                                  .ref("/Admin/orders")
                                  .push(userOder);
                                if (refKey === "") {
                                  setRefKey(ref.key);
                                }

                                setServerResTimeoutId(
                                  setTimeout(async () => {
                                    // delete the record
                                    await database
                                      .ref("/Admin/orders/" + refKey.key)
                                      .remove();

                                    // we are going to take api route then
                                    setReqObj(req);
                                  }, 5000)
                                );
                              } catch (error) {
                                handleRes(error.response.text);
                              }
                            } else {
                              // going straight to api using useEffect
                              setReqObj(req);
                            }
                          } else if (serviceType === "data card") {
                            buyDataCard(userOder).then((ret) => {
                              if (ret.status === "ok") {
                                setDataCardDetails({
                                  pin: ret.pin,
                                  serial: ret.serial,
                                  code: ret.code,
                                  cardName: ret.cardName,
                                });

                                setDisableBtn(true);
                                hideModal();
                                setToDataCard(true);
                              } else {
                                setResMsg(ret);
                                setDisableBtn(false);
                                setClientError(true);
                              }
                            });
                          } else if (serviceType === "bulksms") {
                            bulkSms(userOder).then((ret) => {
                              handleRes(ret);
                            });
                          } else if (serviceType === "electricity") {
                            electricity(userOder).then((ret) => {
                              handleRes(ret);
                            });
                          } else if (serviceType === "pos") {
                            console.log(userOder);
                            posOrder(userOder).then((ret) => {
                              handleRes(ret);
                            });
                          }
                        } else {
                          setNetConnection(true);
                          setProvPin("");
                        }
                      }}
                      className="m-2 p-2 w-50 button"
                    >
                      SEND
                    </MDBBtn>
                    <MDBBtn
                      disabled={disableBtn}
                      onClick={() => {
                        hideModal();
                      }}
                      className="m-2 p-2 w-50 button"
                    >
                      Cancel
                    </MDBBtn>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBModalDialog>
      </MDBModal>

      {/* </Modal> */}
      <ErrorNotifier
        show={inCorrectAmount}
        message="Amount must be N50 or greater."
        onErrClose={() => {
          setIncorrectAmount(false);
        }}
      />
      <ErrorNotifier
        show={clientError}
        message={resMsg}
        onErrClose={() => {
          setClientError(false);
        }}
      />
      <ErrorNotifier
        show={noAvailableBal}
        message="Insufficient Balance! Please fund your wallet and try again"
        onErrClose={() => {
          setNoAvailableBal(false);
        }}
      />
      <SuccessAlert showMe={success} message={alertMessage} nav={successNav} />
      <DataCard
        cardData={dataCardDetails}
        showMe={toDataCard}
        nav="/dashboard"
      />
    </div>
  );
};

export default PinModel;
