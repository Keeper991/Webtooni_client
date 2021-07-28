import React from "react";
import styled from "styled-components";
import { actionCreators as modalActions } from "../../redux/modules/modal";
import { useDispatch } from "react-redux";
import { Button } from "../../elements";

const ModalBox = (props) => {
  const { children } = props;

  const dispatch = useDispatch();

  const hideModal = () => {
    dispatch(modalActions.modalToggle(false));
    props.getLogin(false);
    props.getSignUp(false);
  }

  return (
    <React.Fragment>
      <Container>
        { children }
      </Container>
      <ModalBg onClick={hideModal}></ModalBg>
    </React.Fragment>
  );
}


const Container = styled.div`
  width: 60%;
  height: 500px;
  background: #ccc;
  position: fixed;
  top: 10%;
  left: 50%;
  margin-left: -30%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  background: #404040;
  position: fixed;
  top: 0;
  left: 0;

`;
export default ModalBox;