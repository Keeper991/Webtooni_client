import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { width, height, padding, margin, shape, src, size } = props;

  const styles = {
    width: width,
    height: height,
    padding: padding,
    margin: margin,
    src: src,
    size: size,
  };

  if (shape === "circle") {
    return (
      <React.Fragment>
        <ElCircle {...styles}></ElCircle>
      </React.Fragment>
    );
  }

  if (shape === "square") {
    return (
      <React.Fragment>
        <ElSquare {...styles}></ElSquare>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElImage {...styles}></ElImage>
    </React.Fragment>
  );
};

Image.defaultProps = {
  _onClick: () => {},
  width: "auto",
  height: "auto",
  padding: 0,
  margin: 0,
  shape: "",
  src: "https://blog.kakaocdn.net/dn/cuKRq9/btq6skF4PU3/6dgz9y2RwrkJmwNITLgRBK/img.png",
  size: 0,
};

const ElCircle = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-image: url("${(props) => props.src}");

  background-size: cover;
  background-position: center;

  border-radius: 50%;
`;

const ElSquare = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-image: url("${(props) => props.src}");

  background-size: cover;
  background-position: center;
`;

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
