import { MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useRef } from "react";
import callUsImg from "../pictures/call_us_bg.png";
import contactUsImg from "../pictures/contact_us.png";
import chatIco from "../pictures/chat.png";

import "../css/style.css";
import { contactNumber } from "../services/setup";

export default function Support(props) {
  const refSp = useRef(null);

  useEffect(() => {
    if (props.scrollMe === true) {
      refSp.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  return (
    <div id="support-bg" ref={refSp}>
      <div className="overlay">
        <MDBContainer className="d-flex flex-column align-items-center">
          <img
            style={{ width: "300px", height: "200px", top: 0 }}
            src={contactUsImg}
          />
          <MDBRow>
            <MDBCol>
              <div
                className="card p-4 mx-4 d-flex flex-column align-items-center"
                // style={{ float: "left" }}
              >
                <div>
                  <h2>{contactNumber}</h2>
                  <h2>{contactNumber}</h2>
                </div>
                <img src={callUsImg} style={{ width: "80px" }} alt="call us" />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <img
          style={{
            width: "100px",
            height: "100px",
            top: 0,
            float: "right",
            padding: "10px",
          }}
          src={chatIco}
        />
      </div>
    </div>
  );
}
