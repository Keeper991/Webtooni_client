import React, { useEffect } from "react";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { Color } from "../shared/common";

const SocialLogin = (props) => {
  const dispatch = useDispatch();
  const platform = props.location.pathname
    .split("user/")[1]
    .split("/callback")[0];
  const loading = useSelector((state) => state.user.is_loading);

  useEffect(() => {
    if (!loading) {
      let code = props.location.search.split("code=")[1];
      if (platform === "naver") {
        code = code.split("&state")[0];
      }
      dispatch(userActions.socialLoginServer(platform, code));
    }
  }, [loading]);

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
