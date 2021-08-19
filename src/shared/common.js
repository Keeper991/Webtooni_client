export const emailCheck = (email) => {
  let _reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

  return _reg.test(email);
};

export const Color = {
  black: "#000000",
  gray900: "#212121",
  gray800: "#333333",
  gray700: "#525252",
  gray600: "#6f6f6f",
  gray500: "#8d8d8d",
  gray400: "#a8a8a8",
  gray300: "#c6c6c6",
  gray200: "#e0e0e0",
  gray100: "#f4f4f4",
  white: "#ffffff",
  primary: "#fc5c2b",
  primaryLight: "#ff8159",
  kakaoYellow: "#FEE500",
  naverGreen: "#02C759",
};
