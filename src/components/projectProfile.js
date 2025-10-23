import React from "react";
import { useState } from "react";
import {
  Link,
  Navigate,
  Router,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  MDBInput,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../css/style.css";
import Footer from "./Footer";
import DashboardNavbar from "./dashboardNavbar";
import "firebase/compat/storage";
import { firebase } from "../services/config";
import "firebase/compat/database";
import { usePaystackPayment } from "react-paystack";

const db = firebase.database();

export default function ProjectProfile() {
  const location = useLocation();
  const [proDataList, setProDataList] = useState([]);
  let pathRef = location.state.project;
  pathRef = "projects/" + pathRef;

  const paystackConfig = {
    reference: new Date().getTime.toString,
    email: "aiu@gmail.com",
    amount: 23000,
    publicKey: "pk_test_d45a3431f0a021d77680cf52aad750bc2bd1efa7",
  };

  const initialisePayment = usePaystackPayment(paystackConfig);

  const onSuccessfulPayment = (reference) => {
    console.log(reference);
  };

  const onPaymentCancelled = () => {
    console.log("payment cancelled");
  };

  // connectivity check
  if (navigator.onLine) {
    fetch("https://www.google.com/", { mode: "no-cors" }).then(() => {
      const tref = db.ref(pathRef).on("value", function (snap) {
        try {
          let projectData = snap.val().projectData;

          const objProjects = Object.values(projectData);
          let dataList = [];
          objProjects.forEach((data) => {
            let dataPath = data.dataPath;
            dataPath = "projectsData/" + dataPath;
            const dataRef = db.ref(dataPath).on("value", (dataSnap) => {
              const row = {
                fullName: dataSnap.val().fullName,
                address: dataSnap.val().address,
                phoneNumber: dataSnap.val().phoneNumber,
              };
              dataList.push(row);
            });
          });
          setProDataList(dataList);
        } catch (e) {
          console.log(e);
        }
      });
    });
  }

  return (
    <div>
      <DashboardNavbar />
      <MDBContainer>
        <MDBRow className="gy-3">
          <MDBCol md={8}>
            <MDBCard className="shadow-2 m-2">
              <MDBRow className="gy-3">
                <MDBCol>
                  <div className="prj-header-label">
                    <h3>Payment</h3>
                  </div>
                  <table class="table">
                    <tbody>
                      <tr>
                        <td>Number of Partcipants</td>
                        <td>
                          <div className="prj-table-label ">53</div>
                        </td>
                      </tr>
                      <tr>
                        <td>Amount per user</td>
                        <td>
                          <div className="prj-table-label ">N15</div>
                        </td>
                      </tr>
                      <tr>
                        <td>Total Amount</td>
                        <td>
                          <div className="prj-table-label ">N573</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </MDBCol>
                <MDBCol>
                  <div className="prj-header-label">
                    <h3>Print Settings</h3>
                  </div>
                  <table class="table">
                    <tbody>
                      <tr>
                        <td>Number of Copies</td>
                        <td>
                          <div className="prj-table-label ">50</div>
                        </td>
                      </tr>
                      <tr>
                        <td>Amount per copy</td>
                        <td>
                          <div className="prj-table-label ">N300</div>
                        </td>
                      </tr>
                      <tr>
                        <td>Total Amount</td>
                        <td>
                          <div className="prj-table-label ">N15,000</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </MDBCol>
                <div>
                  <MDBBtn
                    className=" mb-4"
                    onClick={() => {
                      initialisePayment(
                        onSuccessfulPayment,
                        onPaymentCancelled
                      );
                    }}
                  >
                    PAY
                  </MDBBtn>
                </div>
              </MDBRow>
            </MDBCard>
          </MDBCol>
          <MDBCol md={4}>
            <MDBCard className="shadow-2 m-2">
              <div className="prj-header-label">
                <h3>Output</h3>
              </div>

              <table class="table">
                <tbody>
                  <tr>
                    <td>Out put format</td>
                    <td>
                      <div className="prj-table-label ">JPEG</div>
                    </td>
                  </tr>
                  <tr>
                    <td>Download your project</td>
                    <td>
                      <div>
                        <MDBBtn>DOWNLOAD</MDBBtn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <MDBBtn className=" mb-4">GENERATE PROJECT</MDBBtn>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBCard className="shadow-2 m-2">
              <table>
                <thead className="p-1">
                  <th>SN</th>
                  <th>Full name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                </thead>
                <tbody>
                  {proDataList.map((row, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{row.fullName}</td>
                        <td>{row.address}</td>
                        <td>{row.phoneNumber}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}
