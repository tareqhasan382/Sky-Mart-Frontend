// Slider.tsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Banner: React.FC = () => {
  return (
    <div className="max-w-[1280px] w-screen  overflow-x-hidden overflow-y-hidden px-6 mx-6 ">
      <Slider {...settings}>
        <div className=" w-[100%]  h-auto lg:h-[310px]">
          <img
            src=" https://i.ibb.co/stk713p/banner-Img-Two.webp"
            alt="Slide 1"
            className=" w-screen h-full rounded-md object-fill "
          />
        </div>
        <div className=" w-[100%] h-auto lg:h-[310px]">
          <img
            src="https://i.ibb.co/S3K9RRw/banner-Img-Three.webp"
            alt="Slide 2"
            className=" w-screen h-full rounded-md object-fill "
          />
        </div>
        <div className=" w-[100%] h-auto lg:h-[310px]">
          <img
            src="https://i.ibb.co/qmPH1bD/banner-Img-One.webp"
            alt="Slide 3"
            className=" w-screen h-full rounded-md object-fill "
          />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default Banner;
