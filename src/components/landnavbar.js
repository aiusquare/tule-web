import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
  MDBInputGroup,
} from "mdb-react-ui-kit";

import logo from "../pictures/logo.png";
import playimg from "../pictures/download_btn.png";

import { Link } from "react-router-dom";
import { appApkUrl, appname, siteName } from "../services/setup";

export default function Landnavbar(props) {
  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = appApkUrl;
    link.download = appname;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [showNavSecond, setShowNavSecond] = useState(false);
  const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);

  return (
    <div className="land-bg">
      <MDBNavbar className="land-bg" expand="lg" light>
        <MDBContainer fluid>
          <MDBNavbarBrand>
            <Link className="logo-text" to={"/"}>
              <img
                src={logo}
                alt={siteName + " Logo"}
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenNavNoTogglerSecond(!openNavNoTogglerSecond)}
          >
            <MDBIcon icon="bars" fas style={{ color: "black" }} />
          </MDBNavbarToggler>

          <MDBCollapse navbar open={openNavNoTogglerSecond}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <Link className="d_link" to="/registration">
                    Registration
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <Link className="d_link" to="/login">
                    Login
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() => {
                    props.navScrol("ft");
                  }}
                >
                  <Link className="d_link" to={""}>
                    Features
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() => {
                    props.navScrol("pc");
                  }}
                >
                  <Link className="d_link" to={""}>
                    Pricing
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() => {
                    props.navScrol("sp");
                  }}
                >
                  <Link className="d_link" to={""}>
                    Services
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() => {
                    props.navScrol("sp");
                  }}
                >
                  <Link className="d_link" to={""}>
                    Support
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <div>
                    <img
                      onClick={() => {
                        handleDownloadClick();
                      }}
                      src={playimg}
                      className="w-100 apk-download-btn"
                      style={{ cursor: "pointer", height: "40px" }}
                    />
                  </div>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}
