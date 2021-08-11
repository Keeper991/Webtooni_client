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
    whiteSpace,
    fontWeight, // bold, medium, regular(default)
    type, // num(fontSize 필요), h1, h2, body(default), caption, small
    tag, // p, span(default)
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

  if (type === "num") {
    return (
      <React.Fragment>
        <ElNum {...styles}>{children}</ElNum>
      </React.Fragment>
    );
  }

  if (type === "h1") {
    return (
      <React.Fragment>
        <ElH1 {...styles}>{children}</ElH1>
      </React.Fragment>
    );
  }

  if (type === "h2") {
    return (
      <React.Fragment>
        <ElH2 {...styles}>{children}</ElH2>
      </React.Fragment>
    );
  }

  if (tag === "p") {
    return (
      <React.Fragment>
        <ElP {...styles} type={type}>
          {children}
        </ElP>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElSpan {...styles} onClick={_onClick} cursor={cursor} type={type}>
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
  fontSize: "14px",
  fontWeight: 400,
  whiteSpace: "nowrap",
  cursor: false,
  textAlign: "",
  lineHeight: "",
};

const ElNum = styled.span`
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) =>
    props.fontWeight === "bold"
      ? 700
      : props.fontWeight === "medium"
      ? 500
      : 400};

  white-space: ${(props) => props.whiteSpace};
`;

const ElH1 = styled.h1`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: 20px;
  font-weight: ${(props) =>
    props.fontWeight === "bold"
      ? 700
      : props.fontWeight === "medium"
      ? 500
      : 400};

  white-space: ${(props) => props.whiteSpace};
`;

const ElH2 = styled.h2`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: 16px;
  font-weight: ${(props) =>
    props.fontWeight === "bold"
      ? 700
      : props.fontWeight === "medium"
      ? 500
      : 400};

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
  font-size: ${(props) =>
    props.type === "caption"
      ? "12px"
      : props.type === "small"
      ? "10px"
      : "14px"};
  font-weight: ${(props) =>
    props.fontWeight === "bold"
      ? 700
      : props.fontWeight === "medium"
      ? 500
      : 400};

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
  font-size: ${(props) =>
    props.type === "caption"
      ? "12px"
      : props.type === "small"
      ? "10px"
      : "14px"};
  font-weight: ${(props) =>
    props.fontWeight === "bold"
      ? 700
      : props.fontWeight === "medium"
      ? 500
      : 400};

  white-space: ${(props) => props.whiteSpace};
  text-align: ${(props) => props.textAlign};
  line-height: ${(props) => props.lineHeight};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
`;

export default Text;
