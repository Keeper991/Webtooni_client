import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { webtoonAPI, userAPI, offerAPI, reviewAPI } from "../../shared/API";
import { actionCreators as userActions } from "./user";

const SET_TOON_ONE = "webtoon/SET_TOON_ONE";
const SET_WEBTOONI_RANK = "webtoon/SET_WEBTOONI_RANK";
const SET_NAVER_RANK = "webtoon/SET_NAVER_RANK";
const SET_KAKAO_RANK = "webtoon/SET_KAKAO_RANK";
const SET_USER_OFFER = "webtoon/SET_USER_OFFER";
const SET_BEST_REVIEWER_OFFER = "webtoon/SET_BEST_REVIEWER_OFFER";
const SET_SIMILAR_USER_OFFER = "webtoon/SET_SIMILAR_USER_OFFER";
const SET_END_TOON_OFFER = "webtoon/SET_END_TOON_OFFER";
const SET_UNWRITTEN_OFFER = "webtoon/SET_UNWRITTEN_OFFER";
const ADD_STAR = "webtoon/ADD_STAR";
const UPDATE_STAR = "webtoon/UPDATE_STAR";
const SET_MY_REVIEW = "webtoon/SET_MY_REVIEW";
const START_LOADING = "webtoon/START_LOADING";
const END_LOADING = "webtoon/END_LOADING";

const setToonOne = createAction(SET_TOON_ONE, (toon, toon_id) => ({
  toon,
  toon_id,
}));
const setWebtooniRank = createAction(SET_WEBTOONI_RANK, (webtooni_rank) => ({
  webtooni_rank,
}));
const setNaverRank = createAction(SET_NAVER_RANK, (naver_rank) => ({
  naver_rank,
}));
const setKakaoRank = createAction(SET_KAKAO_RANK, (kakao_rank) => ({
  kakao_rank,
}));
const setUserOffer = createAction(SET_USER_OFFER, (user_offer) => ({
  user_offer,
}));
const setBestReviewerOffer = createAction(
  SET_BEST_REVIEWER_OFFER,
  (best_reviewer_offer) => ({
    best_reviewer_offer,
  })
);
const setSimilarUserOffer = createAction(
  SET_SIMILAR_USER_OFFER,
  (similar_user_offer) => ({
    similar_user_offer,
  })
);
const setEndToonOffer = createAction(SET_END_TOON_OFFER, (end_toon) => ({
  end_toon,
}));
const setUnwrittenOffer = createAction(
  SET_UNWRITTEN_OFFER,
  (unwritten_offer) => ({
    unwritten_offer,
  })
);

const addStar = createAction(
  ADD_STAR,
  (toonIdx, userPointNumber, reviewId, webtoonId) => ({
    toonIdx,
    userPointNumber,
    reviewId,
    webtoonId,
  })
);
const updateStar = createAction(
  UPDATE_STAR,
  (userPointNumber, reviewIdx, targetToonIdx) => ({
    userPointNumber,
    reviewIdx,
    targetToonIdx,
  })
);
const setMyReview = createAction(SET_MY_REVIEW, (reviewId, reviewInfo) => ({
  reviewId,
  reviewInfo,
}));
const startLoading = createAction(START_LOADING, () => ({}));
const endLoading = createAction(END_LOADING, () => ({}));

//이번 달 웹투니버스 순위 받아오기
const getWebtooniRank = () => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(startLoading());
      const response = await webtoonAPI.getRank();
      dispatch(setWebtooniRank(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//네이버 웹툰 순위 받아오기
const getNaverRank = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await webtoonAPI.getNaverRank();
      dispatch(setNaverRank(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//카카오 웹툰 순위 받아오기
const getKakaoRank = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await webtoonAPI.getKakaoRank();
      dispatch(setKakaoRank(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//유저 맞춤 추천 웹툰 받아오기
const getUserOffer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await offerAPI.getForUser();
      dispatch(setUserOffer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//베스트 리뷰어의 추천 웹툰 받아오기
const getBestReviewerOffer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await offerAPI.getBestReviewersChoice();
      console.log(response);
      dispatch(setBestReviewerOffer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//유저와 비슷한 취향을 가진 사용자가 많이 본 웹툰 받아오기
const getSimilarUserOffer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await offerAPI.getSimilarUsersChoice();
      console.log(response);
      dispatch(setSimilarUserOffer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//완결 웹툰 받아오기
const getEndToonOffer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await offerAPI.getEnd();
      console.log(response);
      dispatch(setEndToonOffer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//웹툰 상세정보 받아오기
const getToonOneServer = (id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const resOne = await webtoonAPI.getOne(id);
      const resSimilarGenre = await offerAPI.getSimilarGenre(id);
      resOne.data.similarList = resSimilarGenre.data;
      resOne.data.myListOrNot && dispatch(userActions.subscribeOne(id));
      const myReviewIdx = resOne.data.reviews.findIndex(
        (review) => review.userName === getState().user.info.userName
      );
      if (getState().user.is_login && myReviewIdx !== -1) {
        resOne.data.myReview = resOne.data.reviews[myReviewIdx];
      }
      dispatch(setToonOne(resOne.data, id));
    } catch (err) {
      console.log(err, "getToonOneError");
      // alert("게시글 정보가 없어요");
      // history.replace("/");
    }
  };
};

//웹툰 리스트에 추가
const addToonServer = (id) => {
  return async function (dispatch) {
    try {
      const response = await userAPI.addWebtoon(id);
      console.log(response, "addToonOK");
    } catch (err) {
      console.log(err, "addToonError");
    }
  };
};

//비슷한 웹툰 추천
const similarToonServer = (id) => {
  return async function (dispatch) {
    try {
      const response = await offerAPI.getSimilarGenre(id);
      console.log(response, "similarToonOK");
    } catch (err) {
      console.log(err, "similarToonError");
    }
  };
};

//리뷰 작성
const uploadReviewServer = (reviewId, reviewContent) => {
  return async function (dispatch) {
    try {
      const response = await reviewAPI.putReview({ reviewId, reviewContent });
      console.log(response, "uploadReviewOK");
    } catch (err) {
      console.log(err, "uploadReviewError");
    }
  };
};

//리뷰 삭제
const deleteReviewServer = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await reviewAPI.deleteReview(reviewId);
      console.log(response, "deleteReviewOK");
      history.replace("/");
    } catch (err) {
      console.log(err, "deleteReviewError");
      alert("리뷰 정보가 없어요");
      history.replace("/");
    }
  };
};

// 웹툰 별점 주기 및 수정
const putStarServer = (webtoonId, userPointNumber, webtoonInfo) => {
  return async function (dispatch, getState) {
    try {
      const response = await reviewAPI.putStar({ webtoonId, userPointNumber });
      const targetToonIdx = getState().webtoon.detail_list.findIndex(
        (detail) => detail.toonId === webtoonId
      );
      const reviewIdx = getState().webtoon.detail_list[
        targetToonIdx
      ].reviews.findIndex(
        (review) => review.userName === getState().user.info.userName
      );

      dispatch(
        reviewIdx !== -1
          ? updateStar(userPointNumber, reviewIdx, targetToonIdx)
          : addStar(
              targetToonIdx,
              userPointNumber,
              response.data.reviewId,
              webtoonId
            )
      );
      console.log(response.data, reviewIdx);
    } catch (err) {
      console.log(err, "putStarError");
    }
  };
};

//리뷰 좋아요 토글 : 로그인 유저의 기존 좋아요 여부를 상세 api로 받아야 함 + 리듀서 액션 추가
const likeReviewServer = (reviewId) => {
  return async function (dispatch) {
    try {
      const response = await reviewAPI.likeReview(reviewId);
      console.log(response, "likeReviewOK");
    } catch (err) {
      console.log(err, "likeReviewError");
    }
  };
};

//리뷰가 미작성된 웹툰 받아오기
const getUnwrittenOffer = () => {
  return async function (dispatch) {
    try {
      const response = await reviewAPI.getUnwritten();
      dispatch(setUnwrittenOffer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  toon_list: [],
  detail_list: [],
  webtooni_rank: [],
  naver_rank: [],
  kakao_rank: [],
  user_offer: [],
  best_reviewer_offer: [],
  similar_user_offer: [],
  end_toon: [],
  is_loading: false,
};

export default handleActions(
  {
    [SET_TOON_ONE]: (state, action) =>
      produce(state, (draft) => {
        //웹툰 id 추가해 넣기
        let _toon = action.payload.toon;
        _toon.toonId = action.payload.toon_id;
        draft.detail_list.push(_toon);
      }),

    [SET_WEBTOONI_RANK]: (state, action) =>
      produce(state, (draft) => {
        draft.webtooni_rank = action.payload.webtooni_rank;
        draft.is_loading = false;
      }),
    [SET_NAVER_RANK]: (state, action) =>
      produce(state, (draft) => {
        draft.naver_rank = action.payload.naver_rank;
      }),
    [SET_KAKAO_RANK]: (state, action) =>
      produce(state, (draft) => {
        draft.kakao_rank = action.payload.kakao_rank;
      }),
    [SET_USER_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_offer = action.payload.user_offer;
      }),
    [SET_BEST_REVIEWER_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.best_reviewer_offer = action.payload.best_reviewer_offer;
      }),
    [SET_SIMILAR_USER_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.similar_user_offer = action.payload.similar_user_offer;
      }),
    [SET_END_TOON_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.end_toon = action.payload.end_toon;
      }),
    [SET_UNWRITTEN_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.unwritten_offer = action.payload.unwritten_offer;
      }),
    [ADD_STAR]: (state, action) =>
      produce(state, (draft) => {
        const {
          payload: { toonIdx, reviewId, userPointNumber, webtoonId },
        } = action;
        draft.detail_list[toonIdx].reviews.unshift({
          reviewId,
          userPointNumber,
          webtoonId,
        });
      }),
    [UPDATE_STAR]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_list[action.payload.targetToonIdx].reviews[
          action.payload.reviewIdx
        ].userPointNumber = action.payload.userPointNumber;
      }),
    [SET_MY_REVIEW]: (state, action) => produce(state, (draft) => {}),
    [START_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = true;
      }),
    [END_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = false;
      }),
  },
  initialState
);

const actionCreators = {
  getToonOneServer,
  addToonServer,
  similarToonServer,
  uploadReviewServer,
  deleteReviewServer,
  putStarServer,
  likeReviewServer,
  getWebtooniRank,
  getNaverRank,
  getKakaoRank,
  getUserOffer,
  getBestReviewerOffer,
  getSimilarUserOffer,
  getEndToonOffer,
  getUnwrittenOffer,
};

export { actionCreators };
