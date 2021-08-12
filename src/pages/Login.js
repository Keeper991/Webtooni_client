import React from "react";
import styled from "styled-components";
import { Button, Text, Image } from "../elements";
import { getKakaoAddr, getNaverAddr } from "../shared/API";
import { kakao_symbol, naver_symbol } from "../images/symbols";
import { Color } from "../shared/common";
import title from "../images/title.png";
import { ReactComponent as BackButton } from "../images/BackButton.svg";
import { history } from "../redux/configureStore";

const Login = () => {
  return (
    <React.Fragment>
      <Container>
        <BackButtonWrap>
          <Button
            bgColor="transparent"
            border="none"
            padding={0}
            _onClick={() => history.goBack()}
          >
            <BackButton />
          </Button>
        </BackButtonWrap>
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
  height: 400px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & a:link,
  a:visited {
    text-decoration: none;
  }
`;

const BackButtonWrap = styled.div`
  position: absolute;
  top: 85px;
  left: 20px;
`;

const ImageWrap = styled.div`
  & > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const BtnGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  & button {
    width: 300px;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    & > div {
      position: absolute;
      top: 10px;
      left: 16px;
    }
  }
`;

export default Login;
