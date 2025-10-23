import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Landnavbar from "./landnavbar";
import "../css/landhome.css";
import Footer from "./footer";
import Features from "./features";
import Pricing from "./pricing";
import Support from "./support";

export default function Landhome() {
  const navigate = useNavigate();
  const [scrollFt, setScrollFt] = useState(false);
  const [scrollPc, setScrollPc] = useState(false);
  const [scrollSp, setScrollSp] = useState(false);
  const [scrollAh, setScrollAh] = useState(false);

  const handleScrollFt = (ctr) => {
    if (ctr === "ft") {
      setScrollFt(true);
    } else if (ctr === "pc") {
      setScrollPc(true);
    } else if (ctr === "ah") {
      setScrollAh(true);
    } else {
      setScrollSp(true);
    }
  };

  useEffect(() => {
    setScrollFt(false);
    setScrollPc(false);
    setScrollSp(false);
    setScrollAh(false);
  });

  return (
    <div>
      <Landnavbar navScrol={handleScrollFt} />
      <div className="home-card-bg">
        <div className="home-content">
          <div
            className="home-font"
            style={{ textTransform: "uppercase", width: "60%" }}
          >
            <h1>
              <div class="roller" style={{ textAlign: "left" }}>
                <span id="rolltext">
                  <div id="roller-one" style={{ padding: "5px" }}>
                    DEDICATED
                  </div>
                  <div id="roller-two" style={{ padding: "5px" }}>
                    TO STREAMLINING YOUR
                  </div>
                  <span id="spare-time">LIFE</span>
                </span>
              </div>
            </h1>
          </div>

          <div className="home-font ft" style={{ fontSize: "x-large" }}>
            <p>
              Our dependable software solution allows you to effortlessly access
              various services, such as data reselling, airtime top-ups, cable
              subscriptions, utility payments, and school scratch cards.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => {
                navigate("/registration");
              }}
            >
              Get Started...
            </button>
          </div>
        </div>
      </div>

      <Features scrollMe={scrollFt} />
      <Pricing scrollMe={scrollPc} />
      <Support scrollMe={scrollSp} />
      <Footer />
    </div>
  );
}
