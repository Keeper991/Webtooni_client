import React from "react";
import styled from "styled-components";
import { Color } from "../common";
import { Button, Text } from "../../elements";
import { ReactComponent as Delete } from "../../images/Delete.svg";

const LogoutModal = ({ setIsActive, handleLogout }) => {
  return (
    <Container>
      <DelIconArea>
        <Delete />
      </DelIconArea>
      <Text
        type="h2"
        width="100%"
        height="117px"
        textAlign="center"
        lineHeight="117px"
      >
        로그아웃 하시겠습니까?
      </Text>
      <BtnArea>
        <Button
          bgColor="transparent"
          color={Color.black}
          height="100%"
          width="45%"
          border="none"
          _onClick={() => {
            setIsActive(false);
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
            handleLogout();
            setIsActive(false);
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
`;

const DelIconArea = styled.div`
  position: absolute;
  top: -28px;
  left: 104px;
  z-index: 2;
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${Color.gray200};
  height: 44px;
  width: 100%;
  padding: 0 10px;
`;

export default LogoutModal;
