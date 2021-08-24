import React from "react";
import styled from "styled-components";
import { Color } from "../common";
import { ConfirmModal, AlertModal } from ".";
import {
  FrownOutlined,
  MehOutlined,
  WarningOutlined,
  LockOutlined,
  DeleteOutlined,
  LoadingOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as modalActions } from "../../redux/modules/modal";
import { actionCreators as talkActions } from "../../redux/modules/talk";
import profileImgList from "../../images/profiles";
import { Text } from "../../elements";
import { history } from "../../redux/configureStore";

const Modal = () => {
  const dispatch = useDispatch();
  const { userName, userImg } = useSelector((state) => state.user.info);
  const { isActiveModal, modalKind, data } = useSelector(
    (state) => state.modal
  );
  const handlers = {
    logout: () => {
      dispatch(userActions.logOut());
      history.push("/");
    },
    welcome: () => dispatch(userActions.shownWelcomeModal()),
    needLogin: () => history.push("/login"),
    noAuth: () => history.replace("/"),
    failLoadRedirect: () => history.goBack(),
    deletePost: () => dispatch(talkActions.deletePostServer(data)),
  };
  const kinds = {
    logout: (
      <ConfirmModal Icon={FrownOutlined} handleConfirm={handlers[modalKind]}>
        로그아웃 하시겠습니까?
      </ConfirmModal>
    ),
    welcome: (
      <AlertModal
        img={profileImgList[userImg]}
        handleConfirm={handlers[modalKind]}
      >
        <Text fontWeight="bold">{userName} 님 반가워요!</Text>
        <br />
        <Text textAlign="center" lineHeight="1.5">
          지금부터 취향에 맞는 웹툰을
          <br /> 추천받을 수 있습니다.
        </Text>
      </AlertModal>
    ),
    needLogin: (
      <ConfirmModal Icon={LockOutlined} handleConfirm={handlers[modalKind]}>
        <Text>로그인이 필요한 서비스입니다.</Text>
        <br />
        <Text>로그인 하시겠습니까?</Text>
      </ConfirmModal>
    ),
    emptyContent: (
      <AlertModal Icon={MehOutlined}>
        <Text>내용이 비어있습니다.</Text>
        <br />
        <Text>입력해주세요.</Text>
      </AlertModal>
    ),
    noAuth: (
      <AlertModal Icon={WarningOutlined} handleConfirm={handlers[modalKind]}>
        <Text>권한이 없습니다.</Text>
      </AlertModal>
    ),
    wait: (
      <AlertModal Icon={LoadingOutlined}>
        <Text>응답 대기중입니다.</Text>
        <br />
        <Text>잠시만 기다려 주세요.</Text>
      </AlertModal>
    ),
    copyUrl: (
      <AlertModal Icon={CheckOutlined}>
        <Text>주소가 복사되었습니다.</Text>
      </AlertModal>
    ),
    failLoad: (
      <AlertModal Icon={FrownOutlined}>
        <Text>정보를 불러오는데에 실패했습니다.</Text>
      </AlertModal>
    ),
    failLoadRedirect: (
      <AlertModal Icon={FrownOutlined}>
        <Text>정보를 불러오는데에 실패했습니다.</Text>
      </AlertModal>
    ),
    error: (
      <AlertModal Icon={FrownOutlined}>
        <Text>오류가 발생했습니다.</Text>
        <br />
        <Text>새로고침 후 다시 시도해주세요.</Text>
      </AlertModal>
    ),
    deletePost: (
      <ConfirmModal Icon={DeleteOutlined} handleConfirm={handlers[modalKind]}>
        <Text>게시글을 삭제하시겠습니까?</Text>
      </ConfirmModal>
    ),
  };
  return (
    <Container isActive={isActiveModal}>
      <Content>{kinds[modalKind]}</Content>
      <ModalBg
        onClick={() => {
          if (modalKind === "welcome" || modalKind === "noAuth") {
            handlers[modalKind]();
          }
          dispatch(modalActions.inactiveModal());
        }}
      />
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
