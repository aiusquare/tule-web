import { Alert, Box, Snackbar, Tab, Tabs } from "@mui/material";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import * as React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ServiceComContext } from "./dashboard";
import ServicesMenu from "./serviceMenu";
import Atm from "./atm";
import { useNavigate } from "react-router-dom";
import CarouselComp from "./careusal";
import Marquee from "./marquee";

const MainDashboard = () => {
  const { accounts } = useContext(ServiceComContext);

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol sm={12} lg={6}>
          <WalletCard />
        </MDBCol>
        <MDBCol sm={12} lg={6}>
          <CarouselComp />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md={12}>
          <MDBCard
            style={{
              display: "flex",
            }}
          >
            <WalletFundingCard accounts={accounts} />
            <div style={{ overflow: "hidden" }}>
              <Marquee text="Check MTN SME data with *461*4#, MTN GIFTING data with *323*4#, MTN CG data with *460*260#, AIRTEL data with *323*4#, GLO data with *323*4#, 9Mobile data with *228#" />
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md={12}>{<ServicesMenu />}</MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

const WalletCard = () => {
  const { walletBalance, agent } = useContext(ServiceComContext);
  const [fund, setFund] = useState(false);
  const navigate = useNavigate();
  const withAgent = { position: "relative", top: "17%" };
  const withoutAgent = { position: "relative", top: "25%" };
  const colSpaceAgent = agent == null ? withoutAgent : withAgent;

  return (
    <div style={{ whiteSpace: "nowrap" }} className="wallet-card">
      <MDBCard
        className=" m-2 p-4 wallet-card-bal-bg"
        style={{ height: "340px" }}
      >
        <div style={{ fontSize: "20px", color: "white", fontWeight: 900 }}>
          <b>YOUR WALLET</b>
        </div>

        <div className="wallet-card-q" style={colSpaceAgent}>
          <MDBContainer>
            <MDBRow className="mb-2 w-100">
              <MDBCol className="text-center">
                <MDBCard className="wallet-label-cards d-flex flex-column align-items-center justify-content-center p-4">
                  <div style={{ color: "black" }}>
                    Wallet Balance
                    <br /> ₦{walletBalance}
                  </div>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow className="w-100">
              <MDBCol>
                <button
                  onClick={() => {
                    setFund(true);
                  }}
                  className="wallet-card-buttons"
                >
                  Fund wallet
                </button>
              </MDBCol>
              <MDBCol>
                <button
                  onClick={() => {
                    navigate("transactions");
                  }}
                  className="wallet-card-buttons"
                >
                  Transaction history
                </button>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </MDBCard>
      {fund && <Atm showMe={true} fund={setFund} />}
    </div>
  );
};

const WalletFundingCard = (props) => {
  const accounts = props.accounts;

  const [copied, setCopied] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [account, setAccount] = useState({});

  const handleChange = (e, i) => {
    setTabIndex(i);
    setAccount(accounts[i]);
  };

  useEffect(() => {
    if (accounts[0] !== undefined) {
      setAccount(accounts[0]);
    }
  }, [accounts]);

  return (
    <div>
      <MDBCard
        className="accounts-cards"
        style={{ height: "300px", whiteSpace: "nowrap", overflow: "hidden" }}
      >
        <MDBCardBody>
          <div style={{ fontSize: "20px" }}>
            <b>YOUR ACCOUNTS</b>
          </div>

          <div>
            <p style={{ fontSize: "12px", whiteSpace: "normal" }}>
              Transfer to any of the below account to make an automatic funding
              to your wallet.
            </p>
          </div>

          <Box>
            <Box>
              <Tabs
                textColor="white"
                variant="fullWidth"
                value={tabIndex}
                onChange={handleChange}
                scrollButtons="auto"
              >
                {accounts.map((e, i) => {
                  return (
                    <Tab
                      key={i}
                      className="tab-t-size wal-tab-labeler rounded"
                      indicatorColor="wal-tab-highlight"
                      textColor="primary"
                      // style={{ whiteSpace: "nowrap" }}
                      label={e.bank}
                    />
                  );
                })}
              </Tabs>
            </Box>
            <Box className="wallet-card-q">
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span className="wallet-q">Account Name:</span>
                      </td>
                      <td>
                        <span className="wallet-q">{account.name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <MDBRow className="mb-2">
                          <MDBCol sm={5} className="wallet-q">
                            Account Number:
                          </MDBCol>
                          <MDBCol sm={7}>
                            <Snackbar
                              style={{ position: "absolute" }}
                              open={copied}
                              anchorOrigin={{
                                horizontal: "center",
                                vertical: "top",
                              }}
                              autoHideDuration={6000}
                              onClose={() => {
                                setCopied(false);
                              }}
                            >
                              <Alert severity="success" sx={4}>
                                link copied
                              </Alert>
                            </Snackbar>

                            <MDBInputGroup
                              noWrap
                              textAfter={
                                <CopyToClipboard
                                  text={account.accountNumber}
                                  onCopy={() => {
                                    setCopied(true);
                                  }}
                                >
                                  <MDBIcon
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                    className="zindex-alert"
                                    style={{
                                      cursor: "pointer",
                                      color: "white",
                                    }}
                                    fas
                                    icon="paste"
                                  />
                                </CopyToClipboard>
                              }
                            >
                              <MDBInput
                                type="text"
                                value={account.accountNumber}
                                disabled
                                style={{
                                  width: "130px",
                                  background: "white",
                                  color: "black",
                                  fontStyle: "bold",
                                }}
                              />
                            </MDBInputGroup>
                          </MDBCol>
                        </MDBRow>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Box>
          </Box>
          <div>
            <p style={{ fontSize: "12px", whiteSpace: "normal" }}>
              We are charging <b>N45</b> to cover your processing fee.
            </p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default MainDashboard;
