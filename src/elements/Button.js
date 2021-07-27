import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { _onClick, children, width, height, padding, margin, color, bgColor, fontSize, borderRadius, fontWeight, border } = props;

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
  };

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
  width: false,
  height: false,
  padding: false,
  margin: false,
  color: false,
  bgColor: false,
  fontSize: false,
  borderRadius: false,
  fontWeight: false,
  border: false,
};

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
  
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: no-wrap;

  &:focus,
  &:active {
    outline: none;
  }
  
`;

export default Button;
