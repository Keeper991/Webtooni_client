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
    _onClick,
    cursor,
    textAlign,
    lineHeight,
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
    textAlign: textAlign,
    lineHeight: lineHeight,
  };

  if (type === "title") {
    return (
      <React.Fragment>
        <ElTitle {...styles} onClick={_onClick} cursor={cursor}>
          {children}
        </ElTitle>
      </React.Fragment>
    );
  }

  if (type === "p") {
    return (
      <React.Fragment>
        <ElP {...styles} onClick={_onClick} cursor={cursor}>
          {children}
        </ElP>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElSpan {...styles} onClick={_onClick} cursor={cursor}>
        {children}
      </ElSpan>
    </React.Fragment>
  );
};

Text.defaultProps = {
  _onClick: () => {},
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
  cursor: false,
  textAlign: "",
  lineHeight: "",
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
  text-align: ${(props) => props.textAlign};
  line-height: ${(props) => props.lineHeight};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
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
  text-align: ${(props) => props.textAlign};
  line-height: ${(props) => props.lineHeight};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
`;

const ElSpan = styled.span`
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  white-space: ${(props) => props.whiteSpace};
  text-align: ${(props) => props.textAlign};
  line-height: ${(props) => props.lineHeight};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
`;

export default Text;
