import React from "react";

const Button = () => {
  return <React.Fragment></React.Fragment>;
};

Button.defaultProps = {
  _onClick: () => {},
  color: false,
  bgColor: false,
  fontSize: false,
  borderRadius: false,
  fontWeight: false,
  children: false,
  border: false,
};

export default Button;
