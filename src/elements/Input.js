import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { _onChange, width, height, padding, margin, color, bgColor, fontSize, fontWeight, border, type, placeholder, value, multiLine } = props;

  const styles = {
    width: width,
    height: height,
    padding: padding,
    margin: margin,
    color: color,
    bgColor: bgColor,
    fontSize: fontSize,
    fontWeight: fontWeight,
    border: border,
  };

  if (multiLine) {
    return (
      <React.Fragment>
      <ElInput {...styles} type={type} placeholder={placeholder} onChange={_onChange} rows={10}></ElInput>
    </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <ElInput {...styles} type={type} placeholder={placeholder} onChange={_onChange}></ElInput>
    </React.Fragment>
  );
};

Input.defaultProps = {
  _onChange: () => {},
  width: "auto",
  height: "auto",
  padding: 0,
  margin: 0,
  color: "#222831",
  bgColor: "",
  fontSize: "1rem",
  fontWeight: "normal",
  border: "solid",
  multiLine: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
};

const ElInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  border: ${(props) => props.border};

  &:focus,
  &:active {
    outline: none;
  }
  
`;

export default Input;
