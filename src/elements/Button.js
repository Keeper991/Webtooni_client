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
  padding: "12px 16px",
  margin: 0,
  color: Color.black,
  bgColor: Color.gray,
  fontSize: "1rem",
  borderRadius: "4px",
  fontWeight: "normal",
  border: `1px solid ${Color.darkGray}`,
  shape: "",
  size: 0,
  disabled: false,
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

  &:focus,
  &:active {
    outline: none;
  }
`;

const ElPillButton = styled.button`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  border: ${(props) => props.border};
  border-radius: calc(
    ${(props) => parseInt(props.padding.split(" ")[0]) * 2}px + 1em
  );

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
    `background-color: ${Color.lightGray}; color: ${Color.gray}; border: 1px solid transparent; cursor: not-allowed;`}

  &:focus,
  &:active {
    outline: none;
  }
`;

export default Button;
