import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore"
import { actionCreators as modalActions } from "../redux/modules/modal";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text } from "../elements/index";
import ModalBox from "./Modals/ModalBox";
import LoginRegisterForm from "./Modals/LoginRegisterForm";

const Header = () => {

  const dispatch = useDispatch();

  const is_modal = useSelector(state => state.modal.is_modal);
  const is_login = useSelector((state) => state.user.is_login);

  const [login, setLogin] = React.useState(false);
  const [signUp, setSignUp] = React.useState(false);

  const handleLogOut = () => {
    dispatch(userActions.logOut());
  }

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

  if (is_login) {
    return (
      <React.Fragment>
        <Container>
          <Button _onClick={()=>{history.push('/')}} margin="0 0 0 15px" fontWeight="bold" fontSize="17px" color="#fff" border="none" bgColor="#333">Webtooniverse</Button>
          <Button color="#fff" bgColor="#333" border="none" _onClick={handleLogOut}>로그아웃</Button>
        </Container>
      </React.Fragment>
    );
  }
  


  return (
    <React.Fragment>
      <Container>
        <Button _onClick={()=>{history.push('/')}} margin="0 0 0 15px" fontWeight="bold" fontSize="17px" color="#fff" border="none" bgColor="#333">Webtooniverse</Button>
        <FlexGrid>
          <Button color="#fff" bgColor="#333" border="none" _onClick={showLoginModal}>로그인</Button>
          <Button margin="0 10px" color="#fff" bgColor="#333" border="none" _onClick={showSignUpModal}>회원가입</Button>
        </FlexGrid>
      </Container>
              
      { is_modal && (
        <ModalBox getLogin={getLogin} getSignUp={getSignUp}>
          <LoginRegisterForm loginModal={login} getLogin={getLogin} signUpModal={signUp} getSignUp={getSignUp}></LoginRegisterForm>
        </ModalBox>
        ) 
      }

    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  height: 70px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;