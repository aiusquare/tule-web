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
} from "mdb-react-ui-kit";
import { useRef } from "react";
import "firebase/compat/storage";
import { firebase } from "../../services/config";
import "firebase/compat/database";
import { Alert, Snackbar, TextField } from "@mui/material";
import PinModel from "../PinModel";
import { ServiceComContext } from "../dashboard";
import Swal from "sweetalert2";
import request from "superagent";
import { baseApiUrl } from "../../services/setup";

const db = firebase.database();

export default function BuyDataCardComponent() {
  const networks = [
    { network: "MTN", id: 1 },
    { network: "AIRTEL", id: 2 },
    { network: "GLO", id: 3 },
    { network: "9MOBILE", id: 4 },
  ];

  const { uniqueId, userAgent, smsSender } = useContext(ServiceComContext);
  const userId = uniqueId;

  const [network, setNetwork] = useState(networks[0].network);
  const [networkId, setNetworkId] = useState(networks[0].id);
  const [dataPlan, setDataPlan] = useState("choose data plan");
  const [quantity, setQuantity] = useState(1);
  const [dataPlanId, setDataPlanId] = useState("00");
  const [unit, setDataUnit] = useState("");

  const [recepient, setRecepient] = useState("");
  const [submit, setSubmit] = useState(false);
  const [services, setServices] = useState([]);
  const [dataPlans, setDataPlans] = useState([]);
  const [dataPlanIds, setDataPlanIds] = useState([]);
  const [units, setUnits] = useState([]);
  const [price, setPrice] = useState(0);

  const [prices, setPrices] = useState([]);
  const [init, setInit] = useState(false);
  const [order, setOrder] = useState({});
  const [validity, setvalidity] = useState(false);

  const refBuydata = useRef(null);

  useEffect(() => {
    if (navigator.onLine) {
      fetch("https://www.google.com/", { mode: "no-cors" }).then(async () => {
        await request
          .get(baseApiUrl + "pricing/prices.php")
          .type("application/json")
          .then((response) => {
            const prices = response.body;
            setServices(prices);
          })
          .catch((err) => {
            let errorMsg = "";

            if (err.response && err.response.status === 400) {
              // console.log("ERROR HERE", err.response.text);
              errorMsg = err.response.text;
            } else {
              // console.error("Network error:", err);
              errorMsg = err;
            }

            Swal.fire({
              title: "Error",
              text: "Data price loading error try again or contact admin",
              icon: "error",
            });
          });

        //   db.ref("/Admin/servicePackages").on("value", function (snap) {
        //     try {
        //       let services = [];
        //       snap.forEach((child) => {
        //         let fetchedData = child.val();

        //         services.push(fetchedData);
        //       });

        //       setServices(services);
        //     } catch (e) {
        //       console.log(e);
        //     }
        //   });
      });
    }
  }, [network]);

  useEffect(() => {
    if (!init) {
      refBuydata.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      setInit(true);
    }
  }, []);

  useEffect(() => {
    dataPlanSearch();
  }, [network]);

  const dataPlanSearch = () => {
    let plans = [];
    let planIds = [];
    let prices = [];
    let units = [];

    services.forEach((servicePack) => {
      let isExisting;
      if (servicePack.network === network) {
        if (servicePack.planType === "DATA CARD") {
          let dataPlan =
            servicePack.unit +
            " - " +
            servicePack.price +
            " - " +
            servicePack.validity;

          plans.push(dataPlan);
          planIds.push(servicePack.planID);
          prices.push(servicePack.price);
          units.push(servicePack.unit);
        }
      }
    });

    setDataPlans(plans);
    setDataPlanIds(planIds);
    setPrices(prices);
    setUnits(units);

    setDataPlan(plans[0]);
    setDataUnit(units[0]);
    setPrice(prices[0]);
    setDataPlanId(planIds[0]);
  };

  const validateInput = () => {
    if (network === "choose network") return false;
    if (dataPlan === "choose data plan" || dataPlan === undefined) {
      return false;
    }
    // if (quantity === null) return false;
    // if (cardName === null) return false;

    return true;
  };

  return (
    <div
      className="d-flex flex-column align-items-center mt-4"
      ref={refBuydata}
      style={{ padding: "30px" }}
    >
      <MDBCardBody>
        <MDBCardText>
          <h3>BUY DATA CARD</h3>
        </MDBCardText>
      </MDBCardBody>
      <MDBCard className="center service-container shadow-2 m-2">
        <MDBDropdown>
          <MDBDropdownToggle color="secondary">NETWORK</MDBDropdownToggle>
          <MDBDropdownMenu dark>
            {networks.map((e, index) => {
              return (
                <MDBDropdownItem
                  onClick={async () => {
                    setNetwork(e.network);
                    setNetworkId(e.id);

                    await dataPlanSearch();
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
      <MDBCard className="shadow-2 service-container center m-2">
        <MDBDropdown>
          <MDBDropdownToggle color="secondary">Plan Type</MDBDropdownToggle>
          <MDBDropdownMenu>
            {dataPlans.map((dataPln, index) => {
              return (
                <MDBDropdownItem
                  onClick={(e) => {
                    setDataPlanId(dataPlanIds[index]); // send to api
                    setDataPlan(dataPlans[index]); // this will be used for user validation
                    setDataUnit(units[index]);
                    setPrice(prices[index]);
                  }}
                  link
                  childTag="button"
                >
                  {dataPln}
                </MDBDropdownItem>
              );
            })}
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBCardBody>
          <MDBCardText>{dataPlan}</MDBCardText>
        </MDBCardBody>
      </MDBCard>

      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="RECEPIENT PHONE NUMBER (OPTIONAL)"
          type="number"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {
            setRecepient(e.target.value);
          }}
        />
      </MDBCard>

      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="CARD NAME"
          type="text"
          value={smsSender}
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {}}
          disabled
        />
      </MDBCard>

      <MDBBtn
        onClick={() => {
          if (validateInput()) {
            const uniqueOrderID = Math.floor(Date.now() / 1000);
            const orderReg = {
              network: network,
              networkId: networkId,
              plan: Number(dataPlanId),
              quantity: Number(quantity),
              cardName: smsSender,
              amount: price * quantity,
              userId: userId,
              userAgent: userAgent,
              recepient: recepient,
              orderId: uniqueOrderID + "",
            };

            let confirmMsg = "You are about to buy " + unit + " " + "DATA CARD";

            setSubmit(true);
            setOrder({
              serviceType: "data card",
              order: orderReg,
              confirmMsg: confirmMsg,
            });
          } else {
            setvalidity(true);
          }
        }}
        className="m-2 button"
        size="lg"
      >
        BUY DATA CARD
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
          Invalid input please check.
        </Alert>
      </Snackbar>
      {/* <PinModel order={order} showMe={submit} resetModel={setSubmit} /> */}
    </div>
  );
}
