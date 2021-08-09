import React from "react";
import styled from "styled-components";
import { Color } from "../shared/common";

const Text = (props) => {
  const {
    children,
    width,
    height,
    padding,
    margin,
    color,
    bgColor,
    fontSize,
    fontWeight,
    whiteSpace,
    type,
  } = props;

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

  if (type === "title") {
    return (
      <React.Fragment>
        <ElTitle {...styles}>{children}</ElTitle>
      </React.Fragment>
    );
  }

  if (type === "p") {
    return (
      <React.Fragment>
        <ElP {...styles}>{children}</ElP>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElSpan {...styles}>{children}</ElSpan>
    </React.Fragment>
  );
};

Text.defaultProps = {
  children: null,
  width: "auto",
  height: "auto",
  padding: 0,
  margin: 0,
  color: Color.black,
  bgColor: "transparent",
  fontSize: "1rem",
  fontWeight: "normal",
  whiteSpace: "nowrap",
};

const ElTitle = styled.h2`
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

const ElSpan = styled.span`
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};

  white-space: ${(props) => props.whiteSpace};
`;

export default Text;
