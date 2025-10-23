import butDataIcon from "../pictures/cloud_hosting.png";
import airtimeIcon from "../pictures/airtime.png";
import airtimeToCash from "../pictures/airtime_to_cash.png";
import electricityIcon from "../pictures/electricity.png";
import resultPinIcon from "../pictures/school.png";
import tvSubIcon from "../pictures/tv_show.png";
import dataCardIco from "../pictures/gift_card.png";
import bulksmsIco from "../pictures/bulksms.png";
import { MDBCard, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useContext } from "react";
import { ServiceComContext } from "./dashboard";
import { useNavigate } from "react-router-dom";

const ServicesMenu = () => {
  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <BarIcons id={1} img={butDataIcon} name="Buy Data" />
          </MDBCol>
          <MDBCol>
            <BarIcons id={10} img={dataCardIco} name="Buy Data Card" />
          </MDBCol>
          <MDBCol>
            <BarIcons id={2} img={airtimeIcon} name="Buy Airtime" />
          </MDBCol>
          <MDBCol>
            <BarIcons id={3} img={airtimeToCash} name="Convert Airtime" />
          </MDBCol>
          <MDBCol>
            <BarIcons id={4} img={electricityIcon} name="Electricity" />
          </MDBCol>
          <MDBCol>
            <BarIcons id={11} img={bulksmsIco} name="BulkSMS" />
          </MDBCol>
          <MDBCol>
            <BarIcons id={5} img={resultPinIcon} name="Scratch Card" />
          </MDBCol>
          <MDBCol>
            <BarIcons id={6} img={tvSubIcon} name="TV Subscription" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

const BarIcons = (props) => {
  let id = props.id;
  const { setComIndex } = useContext(ServiceComContext);
  const navigate = useNavigate();

  return (
    <MDBCard
      onClick={(e) => {
        e.stopPropagation();
        setComIndex(id);

        switch (id) {
          case 1:
            navigate("data");
            break;
          case 2:
            navigate("airtime");
            break;
          case 3:
            navigate("airtime-to-cash");
            break;
          case 4:
            navigate("electric-sub");
            break;
          case 5:
            navigate("school-card");
            break;
          case 6:
            navigate("tv-sub");
            break;
          case 10:
            navigate("data-card");
            break;
          case 11:
            navigate("bulk-sms");
            break;
        }
      }}
      style={{ cursor: "pointer" }}
      className="d-flex align-items-center justify-content-center p-4 m-4 shadow-2"
    >
      <img style={{ width: 100, height: 100 }} src={props.img} />
      <div>{props.name}</div>
    </MDBCard>
  );
};

export default ServicesMenu;
