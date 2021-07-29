import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { meAPI } from "../../shared/API";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
  user: null,
  is_login: false,
};

const loginDB = ( userEmail, password ) => {
  return async function (dispatch, getState, { history }) {
    
    try {
      const res = await meAPI.login({ userEmail, password });
      console.log(res);

      dispatch(
        setUser({
          userEmail: res.data.userEmail,
          userImg: res.data.userImg,
          userName: res.data.userName,
          userGrade: res.data.userGrade,
        })
      );

      const USER_TOKEN = res.data.token;

      let date = new Date(Date.now() + 86400e3);
      date = date.toUTCString();

      document.cookie = "USER_TOKEN" + "=" + USER_TOKEN + "; " + "expires=" + date;

    } catch (err) {
      console.log(err);
      window.alert("회원 정보가 일치하지 않습니다!");
    }

  };
};

const signUpDB = ( userEmail, userName, password, passwordChecker, userImg ) => {
  return async function (dispatch, getState, { history }) {
    console.log(userEmail, userName, password, passwordChecker, userImg);
    
    try {
      const res = meAPI.register({ userEmail, userName, password, passwordChecker, userImg });
      console.log(res);
      window.alert("회원가입 완료!");

    } catch (err) {
      console.log(err);
      window.alert("회원가입 실패! 다시 시도해주세요.");
    }
  };
};


const loginCheck = () => {
  return function (dispatch, getState, { history }) {
    const is_Token = document.cookie.match("USER_TOKEN") ? true : false;
    
    if (is_Token) {
      dispatch(setUser({
        is_login: true,
      }));
    } else {
      dispatch(logOut());
    }
  }
}

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
          draft.user = null;
          draft.is_login = false;
      }),
      
      
  },
    initialState
);

const actionCreators = {
  signUpDB,
  loginDB,
  logOut,
  loginCheck,
};

export { actionCreators };