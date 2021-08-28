import React from "react";
import styled from "styled-components";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Color } from "../shared/common";
import { Text } from "../elements";

const ToolTip = (props) => {
  const { position, children, align } = props;
  const [yPos, xPos] = position.split("-");
  const translateX = `translateX(${
    xPos === "left" ? `-100%` : xPos === "right" ? `0` : `-50%`
  })`;
  const translateY = `translateY(${yPos === "bottom" ? `2px` : `-100%`})`;
  const left = xPos === "left" ? `0` : xPos === "right" ? `100%` : `50%`;
  const top = yPos === "bottom" ? `100%` : `-2px`;
  return (
    <>
      <Container
        xPos={translateX}
        yPos={translateY}
        left={left}
        top={top}
        length={children.length}
        align={align}
      >
        <QuestionCircleOutlined style={{ color: Color.gray400 }} />
        <Text
          tag="p"
          type="small"
          color={Color.gray700}
          whiteSpace="normal"
          lineHeight="1.2"
          wordBreak="break-word"
        >
          {children}
        </Text>
      </Container>
    </>
  );
};

ToolTip.defaultProps = {
  position: "top-center",
  align: false,
};

const Container = styled.div`
  position: relative;
  & > p {
    display: none;
    z-index: 9;
    ${({ align }) => (align ? "justify-content:center" : "text-align: left")};
    width: 200px;
    /* width: ${({ length }) =>
      length * 10 + 12 > 200 ? 200 : length * 10 + 6}px; */
    border: 1px solid ${Color.primaryLight};
    padding: 6px;
    background-color: ${Color.white};
    position: absolute;
    left: ${({ left }) => left};
    top: ${({ top }) => top};
    transform: ${({ xPos, yPos }) => `${xPos} ${yPos}`};
  }
  & > span:hover ~ p {
    display: flex;
  }
`;

export default ToolTip;
