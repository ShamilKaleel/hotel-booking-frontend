import React from "react";
import Slider from "react-infinite-logo-slider";

export default function InfinitySlider() {
  return (
    <Slider
      width="250px"
      duration={10}
      pauseOnHover={true}
      blurBorders={false}
      blurBorderColor={"#fff"}
    >
      <Slider.Slide>
        <img
          src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/626.png"
          alt="Booking.com"
          className="w-36"
        />
      </Slider.Slide>
      <Slider.Slide>
        <img
          src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/406.png"
          alt="Expedia"
          className="w-36"
        />
      </Slider.Slide>
      <Slider.Slide>
        <img
          src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/3340.png"
          alt="Hotels.com"
          className="w-36"
        />
      </Slider.Slide>
      <Slider.Slide>
        <img
          src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/54.png"
          alt="Agoda"
          className="w-36"
        />
      </Slider.Slide>
      <Slider.Slide>
        <img
          src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/14.png"
          alt="Trivago"
          className="w-36"
        />
      </Slider.Slide>
    </Slider>
  );
}
