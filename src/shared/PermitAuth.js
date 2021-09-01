import React from "react";
import { useSelector } from "react-redux";

const TOKEN_LS = "USER_TOKEN";

const getToken = () => {
  return localStorage.getItem(TOKEN_LS);
};

const setToken = (token) => {
  localStorage.setItem(TOKEN_LS, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_LS);
};

// 로그인 여부에 따른 컴포넌트 노출/숨김
const Permit = ({ children }) => {
  const is_login = useSelector((state) => state.user.is_login);

  return <>{is_login && children}</>;
};

// 로그인 유저 본인 확인(for 수정/삭제 버튼)
const PermitStrict = ({ authorName, children }) => {
  const loginedUserName = useSelector((state) => state.user.info.userName);
  return <>{loginedUserName === authorName && children}</>;
};

export { getToken, setToken, removeToken, Permit, PermitStrict };
