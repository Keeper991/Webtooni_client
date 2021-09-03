import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { reviewAPI, reviewerAPI } from "../../shared/API";
import { userScoreConvert } from "../../shared/common";

///////////////////////////////////////////////////////////
// action type
///////////////////////////////////////////////////////////
const SET_BEST_REVIEWER = "reviewer/SET_BEST_REVIEWER";
const SET_BEST_REVIEWER_OFFER_USER_INFO =
  "reviewer/SET_BEST_REVIEWER_OFFER_USER_INFO";
const SET_MAIN_REVIEW = "SET_MAIN_REVIEW";

///////////////////////////////////////////////////////////
// action creators
///////////////////////////////////////////////////////////
const setBestReviewer = createAction(SET_BEST_REVIEWER, (best_reviewer) => ({
  best_reviewer,
}));
const setBestReviewerOfferUserInfo = createAction(
  SET_BEST_REVIEWER_OFFER_USER_INFO,
  (user_info) => ({
    user_info,
  })
);

const setMainReview = createAction(SET_MAIN_REVIEW, (main_review) => ({
  main_review,
}));

///////////////////////////////////////////////////////////
// thunks
///////////////////////////////////////////////////////////

// 베스트 리뷰어 리스트 불러오기(+유저스코어 변환 후 저장)
const getBestReviewer = () => {
  return async function (dispatch) {
    try {
      const response = await reviewerAPI.getBestReviewer();
      let best_user = response.data;
      best_user = best_user.map((user_info) => {
        user_info.user.userScore = userScoreConvert(user_info.user.userScore);
        return user_info;
      });

      dispatch(setBestReviewer(best_user));
    } catch (err) {
      console.log(err);
    }
  };
};

// 메인페이지 리뷰 불러오기
const getMainReview = () => {
  return async function (dispatch) {
    try {
      const response = await reviewAPI.getMain();
      console.log(response);
      dispatch(setMainReview(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

///////////////////////////////////////////////////////////
// initialState & reducer
///////////////////////////////////////////////////////////
const initialState = {
  best_reviewer: [],
  best_reviewer_offer_user_info: {
    userName: "",
    userImg: -1,
    userGrade: "",
    userScore: "",
  },
  main_review: [],
  md_offer: {},
};

export default handleActions(
  {
    [SET_BEST_REVIEWER]: (state, action) =>
      produce(state, (draft) => {
        draft.best_reviewer = action.payload.best_reviewer;
      }),
    [SET_BEST_REVIEWER_OFFER_USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.best_reviewer_offer_user_info = action.payload.user_info;
      }),

    [SET_MAIN_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.main_review = action.payload.main_review;
      }),
  },
  initialState
);

const actionCreators = {
  getBestReviewer,
  setBestReviewerOfferUserInfo,
  getMainReview,
};

export { actionCreators };
