import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Color } from "../shared/common";
// children에 width나 display 속성을 사용할 경우, !important를 붙여줄 것.
const Slick = ({
  width,
  children,
  is_arrow,
  is_variableWidth,
  is_infinite,
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
          width: "30px",
          height: "30px",
          position: "absolute",
          right: "5%",
          top: "24px",
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
          width: "30px",
          height: "30px",
          position: "absolute",
          left: "5%",
          top: "24px",
          zIndex: 1,
        }}
        onClick={onClick}
      ></LeftArrow>
    );
  };

  if (is_arrow) {
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

const LeftArrow = styled.div`
  &::before {
    content: "〈" !important;
    position: absolute;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 23px !important;
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
    font-size: 23px !important;
    color: ${Color.black} !important;
    font-weight: bold;
  }
`;
export default Slick;
