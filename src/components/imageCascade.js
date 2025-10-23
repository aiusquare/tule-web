import React from "react";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import t1 from "../pictures/t1.jpg";
import {
  MDBCardImage,
  MDBCardText,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBAnimation,
} from "mdbreact";
import "../css/style.css";

export default function ImageCascade() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          zIndex: 300,
          height: "200px",
          width: "200px",
          marginLeft: "25%",
          overflow: "hidden",
          padding: "1%",
        }}
      >
        <img
          alt="cascaded image"
          className="img-fluid img-thumbnail rounded"
          src={t1}
        />
      </div>

      <div
        className="card"
        style={{
          top: "100px",
          paddingTop: "110px",
          position: "absolute",
          width: "100%",
          height: "200px",
          textAlign: "center",
        }}
      >
        here we're
      </div>
    </div>
  );
}
