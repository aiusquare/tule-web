import { MDBCard, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import playimg from "../pictures/download_btn.png";
import dataWin from "../pictures/data_win.png";
import { appApkUrl, appname, baseApiUrl, siteName } from "../services/setup";

const OurApp = () => {
  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = appApkUrl;
    link.download = appname;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol md={8}>
            <div style={{ fontSize: "30px", marginTop: "20px" }}>
              Download {siteName} app for Android
            </div>
            <div>
              <a
                onClick={() => {
                  handleDownloadClick();
                }}
              >
                <img
                  src={playimg}
                  className="w-75"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </div>
          </MDBCol>
          <MDBCol md={4}>
            <div
              className="rounded m-2"
              style={{ width: "250px", height: "500px", overflow: "hidden" }}
            >
              <MDBCard>{/* <img src={dataWin} /> */}</MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default OurApp;
