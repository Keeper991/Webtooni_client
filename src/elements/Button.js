import React from "react";
import styled from "styled-components";
import { Color } from "../shared/common";

const Button = (props) => {
  const {
    _onClick,
    children,
    width,
    height,
    padding,
    margin,
    color,
    bgColor,
    fontSize,
    borderRadius,
    fontWeight,
    border,
    shape,
    size,
    disabled,
    src,
    isSelect,
  } = props;

  const styles = {
    width: width,
    height: height,
    padding: padding,
    margin: margin,
    color: color,
    bgColor: bgColor,
    fontSize: fontSize,
    borderRadius: borderRadius,
    fontWeight: fontWeight,
    border: border,
    size: size,
    disabled: disabled,
    src: src,
    isSelect: isSelect,
  };

  if (shape === "circle") {
    return (
      <React.Fragment>
        <ElCircleButton {...styles} onClick={_onClick}>
          {children}
        </ElCircleButton>
      </React.Fragment>
    );
  }

  if (shape === "pill") {
    return (
      <React.Fragment>
        <ElPillButton {...styles} onClick={_onClick}>
          {children}
        </ElPillButton>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  _onClick: () => {},
  children: null,
  width: "auto",
  height: "auto",
  padding: "15px 16px",
  margin: 0,
  color: Color.white,
  bgColor: Color.black,
  fontSize: "16px",
  borderRadius: "8px",
  fontWeight: "500",
  border: `1px solid ${Color.black}`,
  shape: "",
  size: 0,
  src: "",
  disabled: false,
  isSelect: false,
};

const ElCircleButton = styled.button`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  border: ${(props) => props.border};
  border-radius: 100%;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  ${(props) => (props.isSelect ? `border: 1px solid ${Color.red2}` : "")};

  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const ElPillButton = styled.button`
  width: ${(props) => props.width};
  height: 36px;
  padding: 9px 12px;
  margin: ${(props) => props.margin};
  color: ${Color.gray700};
  background-color: ${(props) => props.bgColor};
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${Color.gray200};
  border-radius: 36px;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ElButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  background-image: url("${(props) => props.src}");
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  ${(props) =>
    props.disabled &&
    `background-color: ${Color.gray200}; color: ${Color.white}; border: 1px solid ${Color.gray200}; cursor: not-allowed;`}

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }
`;

export default Button;
