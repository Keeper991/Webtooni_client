import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { userAPI } from "../../shared/API";
import { setToken, getToken, removeToken } from "../../shared/PermitAuth";

const SET_USER = "user/SET_USER";
const LOG_OUT = "user/LOG_OUT";
const SET_SUBSCRIBE_LIST = "user/SET_SUBSCRIBE";
const SUBSCRIBE_ONE = "user/SUBSCRIBE_ONE";
const UNSUBSCRIBE_ONE = "user/UNSUBSCRIBE_ONE";
const SHOWN_WELCOME_MODAL = "user/SHOWN_WELCOME_MODAL";

const setUser = createAction(SET_USER, (info) => ({ info }));
const logOut = createAction(LOG_OUT, () => ({}));
const setSubscribeList = createAction(SET_SUBSCRIBE_LIST, (webtoonIdList) => ({
  webtoonIdList,
}));
const subscribeOne = createAction(SUBSCRIBE_ONE, (webtoonId) => ({
  webtoonId,
}));
const unsubscribeOne = createAction(UNSUBSCRIBE_ONE, (webtoonId) => ({
  webtoonId,
}));
const shownWelcomeModal = createAction(SHOWN_WELCOME_MODAL, () => ({}));

const kakaoLoginServer =
  (code) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await userAPI.kakaoLoginCallback(code);
      setToken(res.data);
      const infoRes = await userAPI.getInfo();
      infoRes.data.isShownWelcomeModal = Boolean(infoRes.data.userName);
      dispatch(setUser(infoRes.data));
      infoRes.data.userName ? history.push("/") : history.push("/taste");
    } catch (e) {
      console.log(e);
      alert("로그인에 실패했습니다.");
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
        res.data.isShownWelcomeModal = Boolean(res.data.userName);
        dispatch(setUser(res.data));
        res.data.userName ? history.push("/") : history.push("/taste");
      } catch (e) {
        console.log(e);
      }
    } else {
      dispatch(logOut());
    }
  };

const subscribeServer = (webtoonId, bool) => async (dispatch, getState) => {
  try {
    await userAPI.subscribe({ webtoonId, myListOrNot: bool });
    dispatch(bool ? subscribeOne(webtoonId) : unsubscribeOne(webtoonId));
  } catch (e) {
    console.log(e);
  }
};

const setUserServer =
  (info) =>
  async (dispatch, getState, { history }) => {
    try {
      await userAPI.putUserInfo(info);
      dispatch(setUser(info));
      history.replace("/");
    } catch (e) {
      console.log(e);
      alert("가입에 실패했습니다.");
    }
  };

const initialState = {
  info: {
    userName: "",
    userImg: -1,
    userGrade: "",
    isShownWelcomeModal: false,
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
    [SET_SUBSCRIBE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.subscribeList.push(...action.payload.webtoonIdList);
        draft.subscribeList = Array.from(new Set(draft.subscribeList));
      }),
    [SUBSCRIBE_ONE]: (state, action) =>
      produce(state, (draft) => {
        draft.subscribeList.push(action.payload.webtoonId);
      }),
    [UNSUBSCRIBE_ONE]: (state, action) =>
      produce(state, (draft) => {
        const {
          payload: { webtoonId },
        } = action;
        const { subscribeList } = draft;
        subscribeList.includes(webtoonId) &&
          subscribeList.splice(subscribeList.indexOf(webtoonId), 1);
      }),
    [SHOWN_WELCOME_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.info.isShownWelcomeModal = true;
      }),
  },
  initialState
);

const actionCreators = {
  logOut,
  loginCheck,
  kakaoLoginServer,
  setSubscribeList,
  subscribeServer,
  setUserServer,
  // 아래는 테스트용.
  setUser,
  shownWelcomeModal,
};

export { actionCreators };
