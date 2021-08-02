import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#ccc",
          position: "absolute",
          right: "10%",
          top: "5%",
        }}
        onClick={onClick}
      ></div>
    );
  };

  const CustomPrevArrows = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#ccc",
          position: "absolute",
          left: "10%",
          top: "5%",
          zIndex: 1,
        }}
        onClick={onClick}
      ></div>
    );
  };

  if (is_arrow) {
    return (
      <SliderWrap
        infinite={is_infinite}
        speed="300"
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
      speed="300"
      slidesToShow="1"
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

export default Slick;
