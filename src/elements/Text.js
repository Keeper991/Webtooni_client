import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, width, height, padding, margin, color, bgColor, fontSize, fontWeight, whiteSpace } = props;

  const styles = {
    width: "auto",
    height: "auto",
    padding: 0,
    margin: 0,
    color: "#222831",
    bgColor: "#fff",
    fontSize: "1rem",
    fontWeight: "normal",
    whiteSpace: whiteSpace,
  };

  return (
    <React.Fragment>
      <ElP {...styles}>
        {children}
      </ElP>
    </React.Fragment>
  );
};

Text.defaultProps = {
  children: null,
  width: false,
  height: false,
  padding: false,
  margin: false,
  color: false,
  bgColor: false,
  fontSize: false,
  fontWeight: false,
  whiteSpace: "nowrap",
};

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
`;

export default Text;
