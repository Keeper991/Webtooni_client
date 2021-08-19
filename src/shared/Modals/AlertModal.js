import React from "react";
import styled from "styled-components";
import { Color } from "../common";
import { Button, Image } from "../../elements";
import { useDispatch } from "react-redux";
import { actionCreators as modalActions } from "../../redux/modules/modal";

const AlertModal = ({ icon, children, handleConfirm }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <IconArea>
        <Image src={icon} shape="circle" size="52px" />
      </IconArea>
      <MessageArea>{children}</MessageArea>
      <BtnArea>
        <Button
          bgColor="transparent"
          color={Color.primary}
          height="100%"
          width="100%"
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
  height: 200px;
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

const IconArea = styled.div`
  position: absolute;
  top: -28px;
  left: 104px;
  z-index: 2;
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${Color.gray200};
  height: 44px;
  width: 100%;
  padding: 0 10px;
`;

export default AlertModal;
