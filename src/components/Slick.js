import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Color } from "../shared/common";
// children에 width나 display 속성을 사용할 경우, !important를 붙여줄 것.
const Slick = ({
  width,
  children,
  custom_arrows,
  is_variableWidth,
  is_infinite,
  is_center,
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

  const centerMode = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 800,
    arrows: false,
  };

  if (custom_arrows) {
    return (
      <SliderWrap
        infinite={is_infinite}
        speed={300}
        slidesToShow={1}
        draggable
        variableWidth={is_variableWidth}
        nextArrow={<CustomNextArrows></CustomNextArrows>}
        prevArrow={<CustomPrevArrows></CustomPrevArrows>}
      >
        {children}
      </SliderWrap>
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
    >
      {children}
    </SliderWrap>
  );
};

Slick.defaultProps = {
  width: "90%",
  is_infinite: false,
  is_variableWidth: true,
};

const SliderWrap = styled(Slider)`
  width: ${({ width }) => width};
  margin: 0 auto;
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
  }
  .slick-center {
    -webkit-transform: scale(1.25);
    -moz-transform: scale(1.25);
    transform: scale(1.25);
    transition: all 0.2s;
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
