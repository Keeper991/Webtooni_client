import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { reviewAPI, reviewerAPI } from "../../shared/API";

const SET_BEST_REVIEWER = "reviewer/SET_BEST_REVIEWER";
const SET_BEST_REVIEWER_OFFER_USER_INFO =
  "reviewer/SET_BEST_REVIEWER_OFFER_USER_INFO";
const SET_MAIN_REVIEW = "SET_MAIN_REVIEW";

const setBestReviewer = createAction(SET_BEST_REVIEWER, (best_reviewer) => ({
  best_reviewer,
}));
const setBestReviewerOfferUserInfo = createAction(
  SET_BEST_REVIEWER_OFFER_USER_INFO,
  (user_info) => ({
    user_info,
  })
);
//

const setMainReview = createAction(SET_MAIN_REVIEW, (main_review) => ({
  main_review,
}));

///////////////////////////////////////////////////////////
// thunks
///////////////////////////////////////////////////////////

// 베스트 리뷰어 리스트 불러오기
const getBestReviewer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await reviewerAPI.getBestReviewer();
      dispatch(setBestReviewer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//

const getMainReview = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await reviewAPI.getMain();
      console.log(response);
      dispatch(setMainReview(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  best_reviewer: [],
  best_reviewer_offer_user_info: { userName: "", userImg: -1, userGrade: "" },
  //
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
