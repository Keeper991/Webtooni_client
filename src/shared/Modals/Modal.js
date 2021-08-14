import React from "react";
import styled from "styled-components";
import { Color } from "../common";
import { ConfirmModal, AlertModal } from ".";
import { ReactComponent as Delete } from "../../images/Delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as modalActions } from "../../redux/modules/modal";
import profileImgList from "../../images/profiles";
import { Text } from "../../elements";

const Modal = () => {
  const dispatch = useDispatch();
  const { userName, userImg } = useSelector((state) => state.user.info);
  const { isActiveModal, modalKind } = useSelector((state) => state.modal);
  const kinds = {
    logout: (
      <ConfirmModal
        icon={Delete}
        handleConfirm={() => dispatch(userActions.logOut())}
      >
        로그아웃 하시겠습니까?
      </ConfirmModal>
    ),
    welcome: (
      <AlertModal
        icon={profileImgList[userImg]}
        handleConfirm={() => {
          dispatch(userActions.shownWelcomeModal());
          dispatch(modalActions.inactiveModal());
        }}
      >
        <Text fontWeight="bold">{userName} 님 반가워요!</Text>
        <br />
        <Text textAlign="center" lineHeight="1.5">
          지금부터 취향에 맞는 웹툰을
          <br /> 추천받을 수 있습니다.
        </Text>
      </AlertModal>
    ),
  };
  return (
    <Container isActive={isActiveModal}>
      <Content>{kinds[modalKind]}</Content>
      <ModalBg onClick={() => dispatch(modalActions.inactiveModal())} />
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
  z-index: 999;
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
