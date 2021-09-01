import React, { useEffect } from "react";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { Color } from "../shared/common";

const SocialLogin = (props) => {
  const dispatch = useDispatch();
  //플랫폼 구분
  const platform = props.location.pathname
    .split("user/")[1]
    .split("/callback")[0];

  // 소셜로그인 요청
  useEffect(() => {
    let code = props.location.search.split("code=")[1];
    if (platform === "naver") {
      code = code.split("&state")[0];
    }
    dispatch(userActions.socialLoginServer(platform, code));
  }, []);

  return (
    <Container>
      <Loader type="Oval" color={Color.primary} height={40} width={40} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default SocialLogin;
