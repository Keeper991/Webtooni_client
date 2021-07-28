import React from "react";
import styled from "styled-components";
import { actionCreators as modalActions } from "../redux/modules/modal";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../elements/index";
import ModalBox from "./Modals/ModalBox";
import ModalContents from "./Modals/ModalContents";

const Header = () => {

  const dispatch = useDispatch();

  const is_modal = useSelector(state => state.modal.is_modal);

  const [login, setLogin] = React.useState(false);
  const [signUp, setSignUp] = React.useState(false);

  const showLoginModal = () => {
    dispatch(modalActions.modalToggle(true));
    setLogin(true);
  }

  const showSignUpModal = () => {
    dispatch(modalActions.modalToggle(true));
    setSignUp(true);
  }

  const getLogin = (_) => {
    setLogin(_);
  }

  const getSignUp = (_) => {
    setSignUp(_);
  }

  return (
    <React.Fragment>
      <Button _onClick={showLoginModal}>로그인</Button>
      <Button _onClick={showSignUpModal}>회원가입</Button>
      { is_modal && (
        <ModalBox getLogin={getLogin} getSignUp={getSignUp}>
          <ModalContents loginModal={login} getLogin={getLogin} signUpModal={signUp} getSignUp={getSignUp}></ModalContents>
        </ModalBox>) 
      }
    </React.Fragment>
  );
}


export default Header;