import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// children에 width나 display 속성을 사용할 경우, !important를 붙여줄 것.
const Slick = ({ width, children, ...props }) => {
  return (
    <SliderWrap infinite speed="300" slidesToShow="1" draggable variableWidth>
      {children}
    </SliderWrap>
  );
};

Slick.defaultProps = {
  width: "90%",
};

const SliderWrap = styled(Slider)`
  width: ${({ width }) => width};
  margin: 0 auto;
`;

export default Slick;
