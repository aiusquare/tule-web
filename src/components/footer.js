import React from "react";
import { MDBFooter, MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import logo from "../pictures/logo.png";
import {
  appname,
  contactAddress,
  contactEmail,
  contactNumber,
  siteName,
} from "../services/setup";

export default function Footer() {
  return (
    <MDBFooter className="text-center text-lg-start text-muted custom_footer_bg">
      <section
        style={{ color: "white" }}
        className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
      >
        <div className="me-5 d-none d-lg-block">
          <span>Connect with us on social networks:</span>
        </div>

        <div>
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#55acee" }}
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </a>
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#dd4b39" }}
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </a>
        </div>
      </section>

      <section className="">
        <div
          style={{ color: "white" }}
          className="container text-center text-md-start mt-5"
        >
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <img
                src={logo}
                alt="image"
                // className="m-2"
                style={{ width: "50px", height: "50px" }}
              />

              <p>
                We help you grow by simplifying your day. We are here for you
                and will always be
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Services</h6>
              <p>
                <Link style={{ color: "white" }} to={"dashboard"}>
                  Internet Data
                </Link>
              </p>
              <p>
                <Link style={{ color: "white" }} to={"dashboard"}>
                  Airtime
                </Link>
              </p>
              <p>
                <Link style={{ color: "white" }} to={"dashboard"}>
                  Airtime to Cash{" "}
                </Link>
              </p>
              <p>
                <Link style={{ color: "white" }} to={"dashboard"}>
                  Utility bill{" "}
                </Link>
              </p>
              <p>
                <Link style={{ color: "white" }} to={"dashboard"}>
                  Cable sub
                </Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i>
                {contactAddress}
              </p>
              <p>
                <i className="fas fa-envelope me-3 p2"></i>
                {contactEmail}
              </p>
              <p>
                <i className="fas fa-phone me-3"></i>
                {contactNumber}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:
        <a className="text-reset fw-bold" href="#!">
          {siteName} Data Service
        </a>
        <div style={{ fontSize: "12px" }}>
          <a href="">Foudhan Technologies</a>
        </div>
      </div>
    </MDBFooter>
  );
}
