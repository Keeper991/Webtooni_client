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
    children,
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
        <ElLabel width={width}>
          <span>{children}</span>
          <ElTextArea
            {...styles}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
          ></ElTextArea>
        </ElLabel>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElLabel width={width}>
        <span>{children}</span>
        <ElInput
          {...styles}
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
        ></ElInput>
      </ElLabel>
    </React.Fragment>
  );
};

Input.defaultProps = {
  _onChange: () => {},
  width: "auto",
  height: "auto",
  padding: "13px 16px",
  margin: 0,
  color: Color.black,
  bgColor: Color.white,
  fontSize: "14px",
  fontWeight: "400",
  border: `1px solid ${Color.gray200}`,
  multiLine: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  children: "",
};

const ElLabel = styled.label`
  display: flex;
  flex-direction: column;
  & > span {
    margin-bottom: 4px;
  }
  width: ${(props) => props.width};
`;

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
  border-radius: 8px;
  font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;

  &::placeholder {
    color: ${Color.gray300};
    font-size: 16px;
    font-weight: 400;
  }

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
  resize: none;
  font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;

  &::placeholder {
    color: ${Color.gray300};
    font-size: 16px;
    font-weight: 400;
  }

  &:focus,
  &:active {
    outline: none;
  }
`;

export default Input;
