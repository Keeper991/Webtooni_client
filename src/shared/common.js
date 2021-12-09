export const emailCheck = (email) => {
  let _reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

  return _reg.test(email);
};

export const globalConst = {
  curRoute: "CUR_ROUTE",
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
  kakaoDarkYellow: "#FFCD00",
  naverGreen: "#02C759",
  green: "#01d358",
  mint: "#B2F1E6",
  로맨스: "#F88384",
  일상: "#FFCD6F",
  판타지: "#B894FB",
  스포츠: "#408AFF",
  개그: "#D1DB58",
  액션: "#FF9837",
  감성: "#FFBE32",
  드라마: "#99654D",
  스릴러: "#F14D4D",
  시대극: "#CFC18E",
  로맨스판타지: "#9DDEF4",
  액션무협: "#7596B5",
};

export const userScoreConvert = (userScore) => {
  return parseInt(userScore / 10);
};

export const userGradeIcon = (userGrade) => {
  const icons = ["🥚", "🐣", "🐥", "🐓", "🍗"];
  return icons[userGrade - 1];
};

export const maxWidth = "700px";

export function debounce(fn, ms = 500) {
  let timerId;
  return (...args) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), ms);
  };
}

export function throttle(fn, ms = 500) {
  let isWaiting = false;
  return (...args) => {
    if (!isWaiting) {
      fn(...args);
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, ms);
    }
  };
}
