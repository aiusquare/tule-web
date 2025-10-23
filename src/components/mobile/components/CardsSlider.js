import React, { useState, useRef, useEffect } from "react";
import "./CardsSlider.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import sldImg1 from "../../../pictures/slide/first.png";
import sldImg2 from "../../../pictures/slide/second.png";
import sldImg3 from "../../../pictures/slide/third.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MDBContainer } from "mdb-react-ui-kit";

const CardSlider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="slider-container nav-card">
      <div style={{ height: "100%" }} className="">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={sldImg1} className="swipe-images" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={sldImg2} className="swipe-images" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={sldImg3} className="swipe-images" />
          </SwiperSlide>
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default CardSlider;
