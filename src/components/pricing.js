import React, { useEffect, useRef, useState } from "react";
// import { MDBCard } from "mdbreact";
import "../css/style.css";
import { MDBCard, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Table } from "@mui/material";
import { firebase } from "../services/config";

import mtnLogo from "../pictures/mtn.png";
import glo from "../pictures/glo.png";
import airtel from "../pictures/airtel.png";
import ninMobile from "../pictures/nin_mobile.png";
import { useNavigate } from "react-router-dom";
import request from "superagent";
import { baseApiUrl } from "../services/setup";

export default function Pricing(props) {
  const db = firebase.database();
  const refPc = useRef(null);
  const [packages, setPackages] = useState([]);
  const [init, setInit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.scrollMe === true) {
      refPc.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (init) return;
    if (navigator.onLine) {
      fetch("https://www.google.com/", { mode: "no-cors" }).then(async () => {
        await request
          .get(baseApiUrl + "pricing/prices.php")
          .type("application/json")
          .then((response) => {
            const prices = response.body;

            setPackages(prices);

            if (packages) {
              setInit(true);
            } else {
              console.log("not yet");
            }
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
          });
      }, [init]);
    }
  });

  return (
    <div ref={refPc}>
      <MDBContainer
        style={{ width: "100%" }}
        className="d-flex flex-column align-items-center justify-content-center "
      >
        <div style={{ margin: "10px" }}>
          <h2>Pricing</h2>
        </div>
        <MDBRow className="w-100">
          <MDBCol md="6">
            <MDBCard className="pricing-cards flex-column align-items-center justify-content-center p-4">
              <div
                style={{
                  fontWeight: "bolder",
                  margin: "10px",
                  marginBottom: "20px",
                }}
              >
                AIRTIME
              </div>
              <table className="w-100">
                <tr className="p-4">
                  <td>MTN</td>
                  <td>2%</td>
                </tr>
                <tr className="p-4">
                  <td>AIRTEL</td>
                  <td>1%</td>
                </tr>
                <tr className="p-4">
                  <td>GLO</td>
                  <td>1%</td>
                </tr>
                <tr className="p-4">
                  <td>9MOBILE</td>
                  <td>1%</td>
                </tr>
              </table>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6">
            <MDBCard className="pricing-cards flex-column align-items-center justify-content-center p-4">
              <div
                style={{
                  fontWeight: "bolder",
                  margin: "10px",
                  marginBottom: "20px",
                }}
              >
                SCHOOL ID
              </div>
              <table className="w-100">
                <tr className="p-4">
                  <td>WAEC</td>
                  <td>₦2800</td>
                </tr>
                <tr className="p-4">
                  <td>NECO</td>
                  <td>₦850</td>
                </tr>
                <tr className="p-4">
                  <td>NABTEB</td>
                  <td>₦850</td>
                </tr>
              </table>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="w-100">
          <MDBCol md={6} className="text-center" center>
            <MDBCard className="pricing-cards flex-column align-items-center justify-content-center p-4">
              <div
                style={{
                  fontWeight: "bolder",
                  margin: "10px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <img className="circle" src={mtnLogo} />
                </div>
                <h5>MTN DATA</h5>
              </div>
              <div>
                <div>
                  <table>
                    {packages.map((e, i) => {
                      if (e.network == "MTN") {
                        return (
                          <tr className="p-4" key={i}>
                            <td>{e.unit}</td>
                            <td>{"₦" + e.price}</td>
                            <td>{e.planType}</td>
                            <td>{e.validity}</td>
                          </tr>
                        );
                      }
                    })}
                  </table>
                </div>

                <div>
                  <button
                    onClick={() => {
                      navigate("/registration");
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </MDBCard>
          </MDBCol>
          <MDBCol className="text-center" md={6}>
            <MDBCard className="pricing-cards d-flex flex-column align-items-center justify-content-center p-4">
              <div
                style={{
                  fontWeight: "bolder",
                  margin: "10px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={airtel}
                  />
                </div>
                <h5>AIRTEL DATA</h5>
              </div>
              <div>
                <table>
                  {packages.map((e, i) => {
                    if (e.network == "AIRTEL") {
                      return (
                        <tr className="p-4" key={i}>
                          <td>{e.unit}</td>
                          <td>{"₦" + e.price}</td>
                          <td>{e.planType}</td>
                          <td>{e.validity}</td>
                        </tr>
                      );
                    }
                  })}
                </table>
                <button
                  onClick={() => {
                    navigate("/registration");
                  }}
                >
                  Subscribe
                </button>
              </div>
            </MDBCard>
          </MDBCol>
          <MDBCol className="text-center" md={6}>
            <MDBCard className="pricing-cards d-flex flex-column align-items-center justify-content-center p-4">
              <div
                style={{
                  fontWeight: "bolder",
                  margin: "10px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <img className="circle" src={glo} />
                </div>
                <h5>GLO DATA</h5>
              </div>
              <div>
                <table>
                  {packages.map((e, i) => {
                    if (e.network == "GLO") {
                      return (
                        <tr className="p-4" key={i}>
                          <td>{e.unit}</td>
                          <td>{"₦" + e.price}</td>
                          <td>{e.planType}</td>
                          <td>{e.validity}</td>
                        </tr>
                      );
                    }
                  })}
                </table>
                <button
                  onClick={() => {
                    navigate("/registration");
                  }}
                >
                  Subscribe
                </button>
              </div>
            </MDBCard>
          </MDBCol>
          <MDBCol className="text-center" md={6}>
            <MDBCard className="pricing-cards d-flex flex-column align-items-center justify-content-center p-4">
              <div
                style={{
                  fontWeight: "bolder",
                  margin: "10px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <img
                    style={{ width: "80px", height: "100px" }}
                    src={ninMobile}
                  />
                </div>
                <h5>9MOBILE DATA</h5>
              </div>
              <div>
                <table>
                  {packages.map((e, i) => {
                    if (e.network == "9MOBILE") {
                      return (
                        <tr className="p-4" key={i}>
                          <td>{e.unit}</td>
                          <td>{"₦" + e.price}</td>
                          <td>{e.planType}</td>
                          <td>{e.validity}</td>
                        </tr>
                      );
                    }
                  })}
                </table>
                <button
                  onClick={() => {
                    navigate("/registration");
                  }}
                >
                  Subscribe
                </button>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
