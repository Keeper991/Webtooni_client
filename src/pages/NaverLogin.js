import React, { useEffect } from "react";
import { userAPI } from "../shared/API";
import { history } from "../redux/configureStore";

const NaverLogin = (props) => {
  useEffect(() => {
    const sendCode = async () => {
      const code = props.location.search.split("code=")[1];
      try {
        const res = await userAPI.naverLoginCallback(code);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    sendCode();
  }, []);

  return <></>;
};

export default NaverLogin;
