import React from "react";
import styled from "styled-components";
import { Color } from "../common";
import { Button, Image } from "../../elements";
import { useDispatch } from "react-redux";
import { actionCreators as modalActions } from "../../redux/modules/modal";

const ConfirmModal = ({ img, Icon, children, handleConfirm }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      {img ? (
        <ImgArea>
          <Image src={img} shape="circle" size="52px" />
        </ImgArea>
      ) : Icon ? (
        <IconArea>
          <Icon />
        </IconArea>
      ) : (
        ""
      )}
      <MessageArea>{children}</MessageArea>
      <BtnArea>
        <Button
          bgColor="transparent"
          color={Color.black}
          height="100%"
          width="45%"
          border="none"
          _onClick={() => {
            dispatch(modalActions.inactiveModal());
          }}
        >
          취소
        </Button>
        <Button
          bgColor="transparent"
          color={Color.primary}
          height="100%"
          width="45%"
          border="none"
          _onClick={() => {
            handleConfirm();
            dispatch(modalActions.inactiveModal());
          }}
        >
          확인
        </Button>
      </BtnArea>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  width: 260px;
  height: 161px;
  border-radius: 8px;
  background-color: ${Color.white};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const MessageArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 100%;
`;

const ImgArea = styled.div`
  position: absolute;
  top: -28px;
  left: 104px;
  z-index: 2;
`;

const IconArea = styled.div`
  position: absolute;
  top: -28px;
  left: 104px;
  z-index: 2;
  width: 52px;
  height: 52px;
  background-color: ${Color.gray100};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  & svg {
    width: 25px;
    height: 25px;
    color: ${Color.primary};
  }
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${Color.gray200};
  min-height: 44px;
  width: 100%;
  padding: 0 10px;
`;

export default ConfirmModal;
