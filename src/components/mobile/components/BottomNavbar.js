import "./BottomNavbar.css";
import homeIcn from "../../../pictures/icn/home_icn.png";
import supportIcn from "../../../pictures/icn/support_icn.png";
import fundIcn from "../../../pictures/icn/web.png";
import NavMenuItem from "./NavMenuItem";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const BottonNavbar = (props) => {
  const navigate = useNavigate();
  return (
    <footer className={"more-components-actions"}>
      <MDBContainer>
        <div className="nav-card">
          <MDBRow>
            <MDBCol className="d-flex justify-content-center align-items-center">
              <NavMenuItem labelText="Home" icon={homeIcn} />
            </MDBCol>
            <MDBCol className="d-flex justify-content-center align-items-center">
              <NavMenuItem
                handleClick={() => {
                  navigate("/dashboard");
                }}
                labelText="Our web"
                icon={fundIcn}
              />
            </MDBCol>
            <MDBCol className="d-flex justify-content-center align-items-center">
              <NavMenuItem
                handleClick={() => {
                  navigate("/mob-support");
                }}
                labelText="Support"
                icon={supportIcn}
              />
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
    </footer>
  );
};

export default BottonNavbar;
