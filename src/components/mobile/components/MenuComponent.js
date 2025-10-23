import Component1 from "./NavMenuItem";
import Component from "./MenuItem";
import PropTypes from "prop-types";
import "./MenuComponent.css";
import dataIcn from "../../../pictures/cloud_hosting.png";
import airtimeIcn from "../../../pictures/airtime.png";
import tvIcn from "../../../pictures/tv_show.png";
import airtimeToCashIcn from "../../../pictures/airtime_to_cash.png";
import electricIcn from "../../../pictures/electricity.png";
import resultIcn from "../../../pictures/school.png";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";

const MenuComponent = () => {
  const navigate = useNavigate();

  return (
    <MDBContainer>
      <div className="menu-container nav-card">
        <MenuItem
          handleClick={() => navigate("/mob-data")}
          labelText="Internet Data"
          icon={dataIcn}
        />
        <MenuItem
          handleClick={() => navigate("/mob-airtime")}
          labelText="Buy Airtime"
          icon={airtimeIcn}
        />
        <MenuItem
          handleClick={() => navigate("/mob-electric")}
          labelText="Electric Sub"
          icon={electricIcn}
        />
        <MenuItem
          handleClick={() => navigate("/mob-tv-sub")}
          labelText="TV Subscription"
          icon={tvIcn}
        />
        <MenuItem
          handleClick={() => navigate("/mob-airtime-to-cash")}
          labelText="Airtime to Cash"
          icon={airtimeToCashIcn}
        />
        <MenuItem
          handleClick={() => navigate("/mob-result")}
          labelText="Results Pin"
          icon={resultIcn}
        />
      </div>
    </MDBContainer>
  );
};

export default MenuComponent;
