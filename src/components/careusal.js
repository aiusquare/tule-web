import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import playimg from "../pictures/download_btn.png";
import { useNavigate } from "react-router-dom";
import { MDBCard } from "mdb-react-ui-kit";
import { appApkUrl, appname, baseApiUrl } from "../services/setup";

export default function CarouselComp() {
  const [init, setInit] = useState(false);
  const refPc = useRef(null);
  const navigate = useNavigate();

  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = appApkUrl;
    link.download = appname;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // useEffect(() => {
  //   if (!init) {
  //     refPc.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //     setInit(true);
  //   }
  // });

  return (
    <div ref={refPc} className="mt-2 mb-2 rounded wallet-card-bal-bg">
      <MDBCard
        className="m-2 p-2 rounded wallet-card-bal-bg"
        style={{ flex: 1 }}
      >
        <Carousel autoPlay infiniteLoop interval={4000} showArrows={true}>
          <div className="sec-slide rounded">
            <div>
              <h2 style={{ color: "white" }}>HURREY!</h2>
              <p style={{ color: "white" }}>
                YOU CAN DOWNLOAD OUR ANDROID APP INSTANTLY
                <br />
              </p>
            </div>
            <div className="p-2">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <a
                  onClick={() => {
                    handleDownloadClick();
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={playimg}
                      className="w-75"
                      style={{
                        width: "100%",
                        height: "auto",
                        cursor: "pointer",
                      }}
                      alt="Play Store Link"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="slide rounded" style={{ padding: "10px" }}>
            <h2 style={{ color: "white" }}>MAJOR UPGRADE</h2>
            <p>
              We are highly trilled to announce that we had a major upgrade of
              our system, we hope this to be even more stable than before.
            </p>
          </div>
        </Carousel>
      </MDBCard>
    </div>
  );
}
