import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { _onChange, children, width, height, padding, margin, color, bgColor, fontSize, fontWeight, border, type, placeholder, value, multiLine } = props;

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
      <ElInput {...styles} type={type} placeholder={placeholder} value={value} onChange={_onChange} rows={10}>
        {children}
      </ElInput>
    </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <ElInput {...styles} type={type} placeholder={placeholder} value={value} onChange={_onChange} >
        {children}
      </ElInput>
    </React.Fragment>
  );
};

Input.defaultProps = {
  _onChange: () => {},
  children: null,
  width: "auto",
  height: "auto",
  padding: 0,
  margin: 0,
  color: "#222831",
  bgColor: "#fff",
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
