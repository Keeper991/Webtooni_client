export const emailCheck = (email) => {
  let _reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

  return _reg.test(email);
};

export const Color = {
  black: "#333333",
  black2: "#212121",
  lightGray: "#D2D2D2",
  lightGray2: "#C6C6C6",
  lightGray3: "#EAEAEA",
  lightGray4: "#E0E0E0",
  lightGray5: "#A8A8A8",
  lightGray6: "#E5E5E5",
  darkGray: "#666666",
  gray: "#BABABA",
  kakaoYellow: "#FEE500",
  naverGreen: "#02C759",
  blueberry: "#707EFF",
  white: "#FEFEFE",
  red: "#B3130B",
  orange: "#F05729",
};
