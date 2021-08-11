import React from "react";
import styled from "styled-components";
import { Color } from "../shared/common";

const Input = (props) => {
  const {
    _onChange,
    width,
    minWidth,
    maxWidth,
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
    rows,
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
    minWidth: minWidth,
    maxWidth: maxWidth,
    rows: rows,
  };

  if (multiLine) {
    return (
      <React.Fragment>
        <ElLabel>
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
      <ElLabel>
        <span>{children}</span>
        <ElInput
          {...styles}
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
          minWidth={minWidth}
        ></ElInput>
      </ElLabel>
    </React.Fragment>
  );
};

Input.defaultProps = {
  _onChange: () => {},
  width: "auto",
  minWidth: "auto",
  maxWidth: "auto",
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
  rows: "",
};

const ElLabel = styled.label`
  display: flex;
  flex-direction: column;
  & > span {
    margin-bottom: 4px;
  }
`;

const ElInput = styled.input`
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  border: ${(props) => props.border};
  border-radius: 8px;
  &::placeholder {
    color: ${Color.gray300};
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
  rows: ${(props) => props.rows};

  &:focus,
  &:active {
    outline: none;
  }
`;

export default Input;
