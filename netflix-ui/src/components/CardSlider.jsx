import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Card from "./Card";

function CustomArrowMobile(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "none" }} onClick={onClick} />;
}
const CardSlider = ({ title, data, isLiked = false }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    // autoplay: true,
    // autoplaySpeed: 3000,
    // pauseOnHover: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          nextArrow: <CustomArrowMobile />,
          prevArrow: <CustomArrowMobile />,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden px-7 py-5">
      <h1 className="text-lg font-medium md:text-3xl capitalize my-4">{title}</h1>

      <div className="h-[8rem] md:h-[18rem] transition-all ease-in-out duration-500">
        <Slider {...settings}>
          {data.map((movie) => (
            <Card key={movie.id} movieData={movie} isLiked={isLiked} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardSlider;
