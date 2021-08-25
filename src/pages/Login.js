import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Text, Image } from "../elements";
import { getKakaoAddr, getNaverAddr } from "../shared/API";
import { kakao_symbol, naver_symbol } from "../images/symbols";
import { Color } from "../shared/common";
import { title } from "../images/icons";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const Login = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  useEffect(() => {
    if (is_login) {
      history.replace();
    }
  }, [is_login]);

  return (
    <React.Fragment>
      <Container>
        <ImageWrap>
          <Image src={title} width="200px" height="27px" />
        </ImageWrap>
        <BtnGrid>
          <a href={getKakaoAddr()}>
            <Button bgColor={Color.kakaoYellow} border="none">
              <Image src={kakao_symbol} shape="square" size="24px" />
              <Text fontWeight="medium">카카오 계정으로 로그인</Text>
            </Button>
          </a>
          <a href={getNaverAddr()}>
            <Button bgColor={Color.naverGreen} border="none">
              <Image src={naver_symbol} shape="square" size="24px" />
              <Text fontWeight="medium" color={Color.white}>
                네이버 계정으로 로그인
              </Text>
            </Button>
          </a>
        </BtnGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 69px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & a:link,
  a:visited {
    text-decoration: none;
  }
`;

const ImageWrap = styled.div`
  & > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const BtnGrid = styled.div`
  padding-top: 165px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  & button {
    width: 300px;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    & > div {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
    }
  }
`;

export default Login;
