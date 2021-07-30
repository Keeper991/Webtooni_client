import React from "react";
import styled from "styled-components";
import { Color } from "../shared/common";

const Input = (props) => {
  const {
    _onChange,
    width,
    height,
    padding,
    margin,
    color,
    bgColor,
    fontSize,
    fontWeight,
    border,
    type,
    placeholder,
    value,
    multiLine,
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
    border: border,
  };

  if (multiLine) {
    return (
      <React.Fragment>
        <ElTextArea
          {...styles}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
        ></ElTextArea>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElInput
        {...styles}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
      ></ElInput>
    </React.Fragment>
  );
};

Input.defaultProps = {
  _onChange: () => {},
  width: "auto",
  height: "auto",
  padding: "16px",
  margin: 0,
  color: Color.black,
  bgColor: Color.white,
  fontSize: "1rem",
  fontWeight: "normal",
  border: `1px solid ${Color.lightGray}`,
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
  border-radius: 4px;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ElTextArea = styled.textarea`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  border: ${(props) => props.border};
  border-radius: 4px;

  &:focus,
  &:active {
    outline: none;
  }
`;

export default Input;
