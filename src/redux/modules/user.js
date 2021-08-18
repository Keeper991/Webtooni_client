import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { userAPI } from "../../shared/API";
import { setToken, getToken, removeToken } from "../../shared/PermitAuth";

const ADD_REVIEW_LIKE_LIST = "user/ADD_REVIEW_LIKE_LIST";
const ADD_REVIEW_LIKE = "user/ADD_REVIEW_LIKE";
const REMOVE_REVIEW_LIKE = "user/REMOVE_REVIEW_LIKE";
//
const SET_USER = "user/SET_USER";
const LOG_OUT = "user/LOG_OUT";
const SET_SUBSCRIBE_LIST = "user/SET_SUBSCRIBE";
const SUBSCRIBE = "user/SUBSCRIBE";
const UNSUBSCRIBE = "user/UNSUBSCRIBE";
const SHOWN_WELCOME_MODAL = "user/SHOWN_WELCOME_MODAL";
const ADD_STAR_POINT = "user/ADD_STAR_POINT";
const EDIT_STAR_POINT = "user/EDIT_STAR_POINT";
const EDIT_REVIEW = "user/EDIT_REVIEW";

const addReviewLikeList = createAction(ADD_REVIEW_LIKE_LIST, (reviewList) => ({
  reviewList,
}));
const addReviewLike = createAction(ADD_REVIEW_LIKE, (reviewId) => ({
  reviewId,
}));
const removeReviewLike = createAction(REMOVE_REVIEW_LIKE, (reviewId) => ({
  reviewId,
}));
//
const setUser = createAction(SET_USER, (info) => ({ info }));
const logOut = createAction(LOG_OUT, () => ({}));
const setSubscribeList = createAction(SET_SUBSCRIBE_LIST, (webtoonIdList) => ({
  webtoonIdList,
}));
const subscribe = createAction(SUBSCRIBE, (webtoonId) => ({
  webtoonId,
}));
const unsubscribe = createAction(UNSUBSCRIBE, (webtoonId) => ({
  webtoonId,
}));
const shownWelcomeModal = createAction(SHOWN_WELCOME_MODAL, () => ({}));

const addStarPoint = createAction(
  ADD_STAR_POINT,
  (reviewId, webtoonId, userName, userPointNumber) => ({
    reviewId,
    webtoonId,
    userName,
    userPointNumber,
  })
);
const editStarPoint = createAction(
  EDIT_STAR_POINT,
  (reviewId, userPointNumber) => ({ reviewId, userPointNumber })
);
const editReview = createAction(EDIT_REVIEW, (reviewId, reviewContent) => ({
  reviewId,
  reviewContent,
}));

///////////////////////////////////////////////////////////
// thunks
///////////////////////////////////////////////////////////

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
        !res.data.userName && history.push("/taste");
      } catch (e) {
        console.log(e);
        if (e.message === "Request failed with status code 401") {
          dispatch(logOut());
          alert("로그아웃 되었습니다");
          return;
        }
      }
    } else {
      dispatch(logOut());
    }
  };

const subscribeServer = (webtoonId, bool) => async (dispatch, getState) => {
  try {
    await userAPI.subscribe({ toonId: webtoonId, myListOrNot: bool });
    dispatch(bool ? subscribe(webtoonId) : unsubscribe(webtoonId));
  } catch (e) {
    console.log(e);
    if (e.message === "Request failed with status code 401") {
      dispatch(logOut());
      alert("로그아웃 되었습니다");
      return;
    }
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
    [ADD_REVIEW_LIKE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewLikeList.push(...action.payload.reviewList);
        draft.reviewLikeList = draft.reviewLikeList.filter(
          (review, idx) => draft.reviewLikeList.indexOf(review) === idx
        );
      }),
    [ADD_REVIEW_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewLikeList.push(action.payload.reviewId);
      }),
    [REMOVE_REVIEW_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewLikeList = draft.reviewLikeList.filter(
          (reviewId) => reviewId !== action.payload.reviewId
        );
      }),

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
    [SUBSCRIBE]: (state, action) =>
      produce(state, (draft) => {
        draft.subscribeList.push(action.payload.webtoonId);
      }),
    [UNSUBSCRIBE]: (state, action) =>
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
    [ADD_STAR_POINT]: (state, action) =>
      produce(state, (draft) => {
        const { reviewId, webtoonId, userName, userPointNumber } =
          action.payload;
        draft.reviewList.push();
      }),
  },
  initialState
);

const actionCreators = {
  addReviewLikeList,
  addReviewLike,
  removeReviewLike,
  logOut,
  loginCheck,
  kakaoLoginServer,
  setSubscribeList,
  subscribeServer,
  setUserServer,
  subscribe,
  // 아래는 테스트용.
  setUser,
  shownWelcomeModal,
};

export { actionCreators };
