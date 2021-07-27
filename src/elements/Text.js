import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, width, height, padding, margin, color, bgColor, fontSize, fontWeight, whiteSpace } = props;

  const styles = {
    width: width,
    height: height,
    padding: padding,
    margin: margin,
    color: color,
    bgColor: bgColor,
    fontSize: fontSize,
    fontWeight: fontWeight,
    whiteSpace: whiteSpace,
  };

  return (
    <React.Fragment>
      <ElP {...styles}>
        {children}
      </ElP>
    </React.Fragment>
  );
};

Text.defaultProps = {
  children: null,
  width: "auto",
  height: "auto",
  padding: 0,
  margin: 0,
  color: "#222831",
  bgColor: "",
  fontSize: "1rem",
  fontWeight: "normal",
  whiteSpace: "nowrap",
};

const ElP = styled.p`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  white-space: ${(props) => props.whiteSpace};
`;

export default Text;
