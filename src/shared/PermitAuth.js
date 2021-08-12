import React from "react";
import { useSelector } from "react-redux";

const TOKEN_LS = "USER_TOKEN";

const getToken = () => {
  return localStorage.getItem(TOKEN_LS);
};

const setToken = (token) => {
  localStorage.setItem(TOKEN_LS, token);
};

const Permit = ({ children }) => {
  const is_login = useSelector((state) => state.user.is_login);

  return <>{is_login && children}</>;
};

const PermitStrict = ({ authorName, children }) => {
  const loginedUserName = useSelector((state) => state.user.info.userName);
  return <>{loginedUserName === authorName && children}</>;
};

export { getToken, setToken, Permit, PermitStrict };
