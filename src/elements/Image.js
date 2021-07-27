import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { width, height, padding, margin, shape, src } = props;

  const styles = {
    width: width,
    height: height,
    padding: padding,
    margin: margin,
    src: src,
  };

  return (
    <React.Fragment>
      <ElImage {...styles}></ElImage>
    </React.Fragment>
  );
};

Image.defaultProps = {
  _onClick: () => {},
  width: false,
  height: false,
  padding: false,
  margin: false,
  shape: "",
  src: "https://blog.kakaocdn.net/dn/cuKRq9/btq6skF4PU3/6dgz9y2RwrkJmwNITLgRBK/img.png",
};

const ElImage = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-image: url("${(props) => props.src}");

  background-size: cover;
  background-position: center;
`;

export default Image;
