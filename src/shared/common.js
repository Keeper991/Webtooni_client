export const emailCheck = (email) => {
  let _reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

  return _reg.test(email);
};

export const Color = {
  black: "#333333",
  lightGray: "#D2D2D2",
  lightGray2: "#C6C6C6",
  darkGray: "#666666",
  gray: "#BABABA",
  kakaoYellow: "#FEE500",
  naverGreen: "#02C759",
  blueberry: "#707EFF",
  white: "#FEFEFE",
  red: "#B3130B",
};
