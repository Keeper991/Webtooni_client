import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { userAPI } from "../../shared/API";
import { setToken, getToken, removeToken } from "../../shared/PermitAuth";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (info) => ({ info }));
const logOut = createAction(LOG_OUT, () => ({}));

const kakaoLoginServer =
  (code) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await userAPI.kakaoLoginCallback(code);
      setToken(res.data);
      const infoRes = await userAPI.getInfo();
      dispatch(setUser(infoRes.data));
      // 선호하는 장르나 프로필 이미지와 닉네임이 없을 경우,
      // taste 혹은 profile 페이지로 넘어가게 할 건지..
    } catch (e) {
      console.log(e);
    } finally {
      history.replace("/");
    }
  };

const loginCheck =
  () =>
  async (dispatch, getState, { history }) => {
    const token = getToken();
    if (token) {
      try {
        const res = await userAPI.getInfo();
        dispatch(setUser(res.data));
        // 선호하는 장르나 프로필 이미지와 닉네임이 없을 경우,
        // taste 혹은 profile 페이지로 넘어가게 할 건지..
      } catch (e) {
        console.log(e);
      }
    } else {
      dispatch(logOut());
    }
  };

const initialState = {
  info: {
    userName: "",
    userImg: -1,
    userGrade: "",
  },
  subscribeList: [],
  reviewList: [],
  reviewLikeList: [],
  postList: [],
  postLikeList: [],
  commentList: [],
  is_login: false,
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.info = action.payload.info;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        removeToken();
        draft.info = initialState.info;
        draft.is_login = false;
        draft.subscribeList = [];
        draft.reviewList = [];
        draft.reviewLikeList = [];
        draft.postList = [];
        draft.postLikeList = [];
        draft.commentList = [];
      }),
  },
  initialState
);

const actionCreators = {
  logOut,
  loginCheck,
  kakaoLoginServer,
};

export { actionCreators };
