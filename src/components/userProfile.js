import { React, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import "../css/style.css";

export default function UserProfile(props) {
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const userEmail = props.userEmail;

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="profile-label">
        <h3>User profile</h3>
        <img id="user-image" />
      </div>

      <div className="profile-bg">
        <MDBIcon className="icn" fas icon="user" />
        <div className="title">User name</div>
        <div className="desc">{userName}</div>
      </div>

      <div className="profile-bg">
        <MDBIcon className="icn" fas icon="map-marked-alt" />
        <div className="title">Address</div>
        <div className="desc">{address}</div>
      </div>

      <div className="profile-bg">
        <MDBIcon className="icn" fas icon="at" />
        <div className="title">Email</div>
        <div className="desc">{email}</div>
      </div>

      <div className="profile-bg">
        <MDBIcon className="icn" fas icon="phone" />
        <div className="title">Phone number</div>
        <div className="desc">{phoneNumber}</div>
      </div>
    </div>
  );
}
