import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Color } from "../shared/common";
import React from "react";
// children에 width나 display 속성을 사용할 경우, !important를 붙여줄 것.
const Slick = ({
  width,
  children,
  custom_arrows,
  is_variableWidth,
  is_infinite,
  is_center,
  is_offer,
  is_banner,
  _beforeChange,
  _afterChange,
  ...props
}) => {
  const CustomNextArrows = (props) => {
    const { className, style, onClick } = props;
    return (
      <RightArrow
        className={className}
        style={{
          ...style,
          display: "flex",
          width: "14px",
          height: "14px",
          position: "absolute",
          right: "8%",
          top: "47px",
          zIndex: 1,
        }}
        onClick={onClick}
      ></RightArrow>
    );
  };

  const CustomPrevArrows = (props) => {
    const { className, style, onClick } = props;
    return (
      <LeftArrow
        className={className}
        style={{
          ...style,
          display: "flex",
          width: "14px",
          height: "14px",
          position: "absolute",
          left: "8%",
          top: "47px",
          zIndex: 1,
        }}
        onClick={onClick}
      ></LeftArrow>
    );
  };

  if (is_offer) {
    return (
      <OfferSliderWrap
        {...offerMode}
        beforeChange={_beforeChange}
        afterChange={_afterChange}
      >
        {children}
      </OfferSliderWrap>
    );
  }
  if (custom_arrows) {
    return (
      <ArrowSliderWrap
        infinite={is_infinite}
        speed={300}
        slidesToShow={1}
        draggable
        variableWidth={is_variableWidth}
        nextArrow={<CustomNextArrows></CustomNextArrows>}
        prevArrow={<CustomPrevArrows></CustomPrevArrows>}
        beforeChange={_beforeChange}
        afterChange={_afterChange}
        dots={true}
      >
        {children}
      </ArrowSliderWrap>
    );
  }

  if (is_banner) {
    return (
      <BannerSliderWrap
        infinite={true}
        speed={1000}
        slidesToShow={1}
        slidesToScroll={1}
        adaptiveHeight={true}
        draggable
        dots={false}
        autoplay={true}
        autoplaySpeed={4000}
      >
        {children}
      </BannerSliderWrap>
    );
  }

  if (is_center) {
    return <CenterSliderWrap {...centerMode}>{children}</CenterSliderWrap>;
  }

  return (
    <SliderWrap
      infinite={is_infinite}
      speed={300}
      slidesToShow={1}
      draggable
      variableWidth={is_variableWidth}
      arrows={false}
      beforeChange={_beforeChange}
      afterChange={_afterChange}
    >
      {children}
    </SliderWrap>
  );
};

Slick.defaultProps = {
  width: "90%",
  is_infinite: false,
  is_variableWidth: true,
  _beforeChange: () => {},
  _afterChange: () => {},
};

const offerMode = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  speed: 700,
  autoplaySpeed: 5000,
  cssEase: "ease-in-out",
};

const centerMode = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "0px",
  slidesToShow: 3,
  speed: 800,
  arrows: false,
};

const SliderWrap = styled(Slider)`
  width: ${({ width }) => width};
  margin: 0 auto;
`;

const BannerSliderWrap = styled(Slider)`
  width: 100%auto;
  margin: 0 auto;
  position: relative;
  &:before {
    content: "";
    width: 100%;
    height: 8px;
    background-color: ${Color.gray100};
    position: absolute;
    top: 2px;
    left: 0;
  }
`;

const ArrowSliderWrap = styled(Slider)`
  width: 100%auto;
  margin: 0 auto;

  .slick-dots li {
    margin: 0px !important;
  }

  .slick-dots li button:before {
    color: ${Color.gray400};
  }

  .slick-dots li.slick-active button:focus:before,
  .slick-dots li button:hover:before {
    opacity: 0.6;
  }

  .slick-dots li button:focus:before {
    opacity: 0.45;
  }
`;

const OfferSliderWrap = styled(Slider)`
  width: 100%auto;
  margin: 0 auto;

  .slick-dots li {
    margin: 0 2px !important;
  }

  .slick-dots li button:before {
    color: ${Color.primary};
  }

  .slick-dots li.slick-active button:focus:before,
  .slick-dots li button:hover:before {
    opacity: 1;
  }

  .slick-dots li button:focus:before {
    opacity: 0.25;
  }
`;

const CenterSliderWrap = styled(Slider)`
  width: 100% !important;
  height: 300px !important;

  .slick-track {
    display: flex;
    width: 100%;
    height: 220px;
    z-index: 10;
  }
  .slick-track .slick-slide {
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
  }
  .slick-center {
    -webkit-transform: scale(1.25);
    -moz-transform: scale(1.25);
    transform: scale(1.25);
    transition: all 0.2s;
    opacity: 1 !important;
  }

  .slick-list {
    margin: 0 -60px;
  }
`;

const LeftArrow = styled.div`
  &::before {
    content: "〈" !important;
    position: absolute;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 14px !important;
    color: ${Color.black} !important;
    font-weight: bold;
  }
`;

const RightArrow = styled.div`
  &::before {
    content: "〉" !important;
    position: absolute;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 14px !important;
    color: ${Color.black} !important;
    font-weight: bold;
  }
`;
export default Slick;
