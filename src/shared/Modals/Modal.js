import React from "react";
import styled from "styled-components";
import { Color } from "../common";

const Modal = ({ isActive, setIsActive, children }) => {
  return (
    <Container isActive={isActive}>
      <Content>{children}</Content>
      <ModalBg onClick={() => setIsActive(false)} />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ isActive }) => (isActive ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 10;
  overflow: hidden;
`;

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: ${Color.gray400};
  opacity: 0.5;
`;

const Content = styled.div``;

export default Modal;
