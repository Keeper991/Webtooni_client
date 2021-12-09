import React from "react";
import styled from "styled-components";
import Slick from "./Slick";

const Slider = ({
  children,
  isSlick = false,
  isBanner = false,
  isCenter = false,
  isCustomArrows = false,
  isInfinite = false,
  isVariableWidth = true,
}) => {
  const [dragging, setDragging] = React.useState(false);

  const handleBeforeChange = React.useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = React.useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const handleOnItemClick = React.useCallback(
    (e) => {
      if (dragging) e.stopPropagation();
    },
    [dragging]
  );

  return isSlick ? (
    <SliderBox onClickCapture={handleOnItemClick}>
      <Slick
        custom_arrows={isCustomArrows}
        is_variableWidth={isVariableWidth}
        is_infinite={isInfinite}
        is_center={isCenter}
        is_banner={isBanner}
        _afterChange={handleAfterChange}
        _beforeChange={handleBeforeChange}
      >
        {children}
      </Slick>
    </SliderBox>
  ) : (
    <CardSliderBox>{children}</CardSliderBox>
  );
};

const SliderBox = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
`;

const CardSliderBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

export default Slider;
