import React, { useEffect, useRef } from "react";
import fastIcn from "../pictures/fast.png";
import secureIcn from "../pictures/shield.png";
import reliableIcn from "../pictures/features.png";
import efficiantIcn from "../pictures/efficiency.png";
import "../css/style.css";
import {
  MDBCard,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

export default function Features(props) {
  const refFT = useRef(null);

  useEffect(() => {
    if (props.scrollMe === true) {
      refFT.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  return (
    <div className="p-4 custom_features_bg" ref={refFT}>
      <MDBContainer className="d-flex flex-column align-items-center justify-content-center p-4">
        <div style={{ margin: "5px" }}>
          <h2>Features</h2>
        </div>
        <MDBRow>
          <MDBCol md={4} center>
            <MDBCard className="features-cards d-flex flex-column align-items-center  p-4">
              <MDBCardImage className="features-images" src={reliableIcn} />
              <div style={{ fontWeight: "bolder" }}>
                <h4>RELIABLE</h4>
              </div>
              <div>
                With a flawless track record of 100% uptime. We have invested in
                advanced technology and a robust infrastructure. Our dedicated
                team monitors our service round-the-clock, proactively
                addressing any potential issues.
              </div>
            </MDBCard>
          </MDBCol>
          <MDBCol md={4}>
            <MDBCard className="features-cards d-flex flex-column align-items-center  p-4">
              <MDBCardImage className="features-images" src={efficiantIcn} />
              <div style={{ fontWeight: "bolder" }}>
                <h4>EFFICIANT</h4>{" "}
              </div>
              <div>
                Our transactions are designed to be efficient and free from
                glitches. We prioritize smooth and seamless processes to ensure
                a hassle-free experience for our users.
              </div>
            </MDBCard>
          </MDBCol>
          <MDBCol md={4}>
            <MDBCard className="features-cards d-flex flex-column align-items-center  p-4">
              <MDBCardImage className="features-images" src={secureIcn} />
              <div style={{ fontWeight: "bolder" }}>
                <h4>SECURE</h4>{" "}
              </div>
              <div>
                Our network is highly secure and backed by Google's
                industry-leading security infrastructure. Our dedicated security
                team monitors for suspicious activities and responds swiftly to
                any incidents.
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
