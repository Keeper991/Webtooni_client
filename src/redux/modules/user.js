import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { userAPI } from "../../shared/API";
import { setToken, getToken, removeToken } from "../../shared/PermitAuth";
import { actionCreators as webtoonActions } from "./webtoon";
import { actionCreators as reviewActions } from "./review";
import { actionCreators as modalActions } from "./modal";
import { globalConst, userScoreConvert } from "../../shared/common";

///////////////////////////////////////////////////////////
// action type
///////////////////////////////////////////////////////////
const ADD_REVIEW_LIKE_LIST = "user/ADD_REVIEW_LIKE_LIST";
const ADD_REVIEW_LIKE = "user/ADD_REVIEW_LIKE";
const REMOVE_REVIEW_LIKE = "user/REMOVE_REVIEW_LIKE";
const SET_USER = "user/SET_USER";
const LOG_OUT = "user/LOG_OUT";
const SET_SUBSCRIBE_LIST = "user/SET_SUBSCRIBE";
const SUBSCRIBE = "user/SUBSCRIBE";
const UNSUBSCRIBE = "user/UNSUBSCRIBE";
const SHOWN_WELCOME_MODAL = "user/SHOWN_WELCOME_MODAL";
const SET_IS_CHECKING = "user/SET_IS_CHECKING";
const LOADING = "user/LOADING";
const ADD_USER_DATA = "user/ADD_USER_DATA";

///////////////////////////////////////////////////////////
// action creators
///////////////////////////////////////////////////////////
const addReviewLikeList = createAction(ADD_REVIEW_LIKE_LIST, (reviewList) => ({
  reviewList,
}));
const addReviewLike = createAction(ADD_REVIEW_LIKE, (reviewId) => ({
  reviewId,
}));
const removeReviewLike = createAction(REMOVE_REVIEW_LIKE, (reviewId) => ({
  reviewId,
}));
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

const setIsChecking = createAction(SET_IS_CHECKING, () => ({}));

const loading = createAction(LOADING, (is_loading) => ({
  is_loading,
}));

const addUserData = createAction(ADD_USER_DATA, (userData) => ({ userData }));

///////////////////////////////////////////////////////////
// thunks
///////////////////////////////////////////////////////////

//??????????????? ??????, ???????????? ????????????
const socialLoginServer =
  (platform, code) =>
  async (dispatch, getState, { history }) => {
    dispatch(loading(true));
    try {
      let res = {};
      if (platform === "kakao") {
        res = await userAPI.kakaoLoginCallback(code);
      } else if (platform === "naver") {
        res = await userAPI.naverLoginCallback(code);
      }
      res.data && setToken(res.data);
      const infoRes = await userAPI.getInfo();
      infoRes.data.isShownWelcomeModal = Boolean(infoRes.data.userName);
      dispatch(setUser(infoRes.data));
      dispatch(loading(false));
      const curRoute = localStorage.getItem(globalConst.curRoute);
      localStorage.removeItem(globalConst.curRoute);
      infoRes.data.userName
        ? history.replace(curRoute || "/")
        : history.replace("/taste");
    } catch (e) {
      console.log(e);
      dispatch(modalActions.activeModal("error"));
      dispatch(loading(false));
    }
  };

//??????????????? ?????? ??????
const loginCheck =
  () =>
  async (dispatch, getState, { history }) => {
    const token = getToken();
    if (token) {
      try {
        const res = await userAPI.getInfo();
        res.data.isShownWelcomeModal = Boolean(res.data.userName);
        dispatch(setUser(res.data));
        !res.data.userName && history.replace("/taste");
      } catch (e) {
        console.log(e);
        if (e.message === "Request failed with status code 401") {
          dispatch(logOut());
          alert("???????????? ???????????????");
          return;
        }
      }
    } else {
      dispatch(logOut());
    }
    dispatch(setIsChecking());
  };

//?????? ??????
const subscribeServer = (webtoonId, bool) => async (dispatch, getState) => {
  try {
    dispatch(loading(true));
    await userAPI.subscribe({ toonId: webtoonId, myListOrNot: bool });
    dispatch(bool ? subscribe(webtoonId) : unsubscribe(webtoonId));
    dispatch(loading(false));
  } catch (e) {
    console.log(e);
    if (e.message === "Request failed with status code 401") {
      dispatch(logOut());
      alert("???????????? ???????????????");
      return;
    }
    dispatch(loading(false));
  }
};

//???????????? ?????? ??????
const setUserServer =
  (info, callback, isEdit) =>
  async (dispatch, getState, { history }) => {
    try {
      isEdit
        ? await userAPI.putInfo({
            userName: info.userName,
            userImg: info.userImg,
          })
        : await userAPI.putOnBoarding(info);

      dispatch(setUser(info));
      callback();
      if (isEdit) {
        dispatch(reviewActions.changeAuthorInfo(getState().user.info, info));
        history.push(`/userinfo/${info.userName}`);
      } else {
        history.replace("/");
      }
    } catch (e) {
      if (
        e.response?.status === 400 &&
        e.response?.data.message === "????????? ???????????? ?????? ????????? ???????????????"
      ) {
        dispatch(modalActions.activeModal("duplicateName"));
      } else if (e.response?.status === 400) {
        dispatch(modalActions.activeModal("invalidName"));
      } else {
        dispatch(modalActions.activeModal("error"));
      }
    }
  };

//??????????????? ?????? ??????
const getUserPageInfoServer = (userName) => async (dispatch, getState) => {
  try {
    let {
      data: {
        myWebtoons,
        myReviews,
        userInfoResponseDto: { userImg, userGrade, userScore, genres },
      },
    } = await userAPI.getUserPageInfo(userName);
    // ????????? ?????? ????????? ??????
    dispatch(webtoonActions.addToonList(myWebtoons, "userPageSubscribe"));

    // ?????? ??? ????????? ?????????
    const toonListFilterByReview = myReviews.map((review) => review.webtoon);
    dispatch(
      webtoonActions.addToonList(toonListFilterByReview, "userPageReview")
    );

    // ?????? ??? ?????? ??????
    myReviews = myReviews.map((review) => {
      review.toonId = review.webtoon.toonId;
      review.userName = userName;
      review.userImg = userImg;
      review.createDate = Date.parse(review.createDate);
      return review;
    });
    dispatch(reviewActions.addReviewList(myReviews, "userPageReview"));

    // ????????? ????????? ????????? ?????????
    const subscribeIdList = myWebtoons.map((toon) => toon.toonId);

    const userData = {
      userName,
      userImg,
      userGrade,
      userScore: userScoreConvert(userScore),
      genre: genres,
      subscribeList: subscribeIdList,
    };

    dispatch(addUserData(userData));

    // ?????? ???????????? ????????? ??????, ?????? ????????? ??????.
    if (userName === getState().user.info.userName) {
      dispatch(setSubscribeList(subscribeIdList));
    }
  } catch (e) {
    console.log(e);
    dispatch(modalActions.activeModal("failLoadRedirect"));
  }
};

///////////////////////////////////////////////////////////
// initialState & reducer
///////////////////////////////////////////////////////////

const initialState = {
  info: {
    userName: "",
    userImg: -1,
    userGrade: "",
    isShownWelcomeModal: false,
  },
  subscribeList: [],
  reviewLikeList: [],
  postLikeList: [],
  userList: [],
  is_login: false,
  isChecking: true,
  is_loading: false,
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
      // ????????? ???????????? ???????????? ??????
      produce(state, (draft) => {
        draft.info = action.payload.info;
        draft.is_login = true;
        const idx = draft.userList.findIndex(
          (user) => user.userName === draft.info.userName
        );
        if (idx !== -1) {
          draft.userList[idx].userName = action.payload.info.userName;
          draft.userList[idx].userImg = action.payload.info.userImg;
        }
      }),
    [LOG_OUT]: (state, action) =>
      // ???????????? ??? ?????? ?????? ??????
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
        draft.subscribeList = [...new Set(draft.subscribeList)];
      }),
    [SUBSCRIBE]: (state, action) =>
      // ?????????????????? ??????????????? ????????? ?????? ??????
      produce(state, (draft) => {
        if (!draft.subscribeList.includes(action.payload.webtoonId)) {
          draft.subscribeList.push(action.payload.webtoonId);
        }
        const userInList = draft.userList.find(
          (user) => user.userName === draft.info.userName
        );
        if (
          userInList &&
          !userInList.subscribeList.includes(action.payload.webtoonId)
        ) {
          userInList.subscribeList.push(action.payload.webtoonId);
        }
      }),
    [UNSUBSCRIBE]: (state, action) =>
      // ?????????????????? ??????????????? ???????????? ?????? ??????
      produce(state, (draft) => {
        const {
          payload: { webtoonId },
        } = action;
        const { subscribeList } = draft;
        subscribeList.includes(webtoonId) &&
          subscribeList.splice(subscribeList.indexOf(webtoonId), 1);
        const subscribeListInUserList = draft.userList.find(
          (user) => user.userName === draft.info.userName
        )?.subscribeList;
        if (subscribeListInUserList) {
          subscribeListInUserList.includes(webtoonId) &&
            subscribeListInUserList.splice(
              subscribeListInUserList.indexOf(webtoonId),
              1
            );
        }
      }),
    [SHOWN_WELCOME_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.info.isShownWelcomeModal = true;
      }),
    [SET_IS_CHECKING]: (state, action) =>
      produce(state, (draft) => {
        draft.isChecking = false;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [ADD_USER_DATA]: (state, action) =>
      produce(state, (draft) => {
        draft.userList.push(action.payload.userData);
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
  socialLoginServer,
  setSubscribeList,
  subscribeServer,
  setUserServer,
  subscribe,
  shownWelcomeModal,
  setUser,
  getUserPageInfoServer,
};

export { actionCreators };
