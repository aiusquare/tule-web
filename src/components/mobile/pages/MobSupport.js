import "./Login.css";

import "./MobSupport.css";
import callUsImg from "../../../pictures/call_us_bg.png";
import helpHImg from "../../../pictures/help_h.png";
import helpImg from "../../../pictures/help.png";
import contactUsImg from "../../../pictures/contact_us.png";
import whatsappIco from "../../../pictures/whatsapp.png";
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import {
  contactAddress,
  contactEmail,
  contactNumber,
  whatsappGroup,
} from "../../../services/setup";
import ChatButton from "../components/ChatButton";

const MobileSupport = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="overlay d-flex flex-column align-items-center"
    >
      <img
        style={{
          position: "absolute",
          left: "20px",
          width: "200px",
          height: "150px",
          top: 0,
        }}
        src={helpHImg}
      />
      <img
        style={{
          position: "absolute",
          right: "50px",
          width: "120px",
          height: "100px",
          top: "100px",
        }}
        src={helpImg}
      />

      <section
        style={{
          position: "absolute",
          top: "200px",
          width: "85%",
          margin: "20px auto",
          padding: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          fontSize: "14px",
        }}
      >
        <p>
          <b>For information and further inquiries</b>
        </p>

        <div
          onClick={() => {
            window.open(whatsappGroup);
          }}
          className="shadow-2 p-2"
          style={{ cursor: "pointer" }}
        >
          <img src={whatsappIco} style={{ width: "44px", height: "44px" }} />
          Join our anouncement group here
        </div>
      </section>

      <section
        style={{
          position: "absolute",
          top: "370px",
          width: "85%",
          margin: "20px auto",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          fontSize: "14px",
        }}
      >
        <address>
          <MDBIcon color="green" fas icon="envelope" /> {contactEmail}
          <br />
          <MDBIcon fas icon="phone" /> {contactNumber}
          <br />
          <MDBIcon fas icon="phone" /> 08087440197
          <br />
          <MDBIcon fas icon="phone" /> 08069390510
          <br />
          <MDBIcon fas icon="map-marked-alt" /> {contactAddress}
        </address>
      </section>

      <ChatButton />

      <div
        style={{
          position: "fixed",
          bottom: "65px",
          right: "0px",
          fontSize: "9px",
        }}
      >
        Chat us via whatsapp
      </div>
    </div>
  );
};

export default MobileSupport;
