import React, { useEffect } from "react";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const KakaoLogin = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const code = props.location.search.split("code=")[1];
    dispatch(userActions.kakaoLoginServer(code));
  }, []);

  return <></>;
};

export default KakaoLogin;
