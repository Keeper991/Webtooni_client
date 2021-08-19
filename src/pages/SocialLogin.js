import React, { useEffect } from "react";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const SocialLogin = (props) => {
  const dispatch = useDispatch();
  const platform = props.location.pathname
    .split("user/")[1]
    .split("/callback")[0];
  useEffect(() => {
    let code = props.location.search.split("code=")[1];
    if (platform === "naver") {
      code = code.split("&state")[0];
    }
    dispatch(userActions.socialLoginServer(platform, code));
  }, []);

  return <></>;
};

export default SocialLogin;
