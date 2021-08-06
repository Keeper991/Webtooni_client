import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { reviewAPI, reviewerAPI } from "../../shared/API";

const SET_MAIN_REVIEW = "SET_MAIN_REVIEW";
const SET_BEST_REVIEWER = "SET_BEST_REVIEWER";

const setMainReview = createAction(SET_MAIN_REVIEW, (main_review) => ({
  main_review,
}));
const setBestReviewer = createAction(SET_BEST_REVIEWER, (best_reviewer) => ({
  best_reviewer,
}));

const initialState = {
  main_review: [],
  best_reviewer: [],
};

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

const getBestReviewer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await reviewerAPI.getBest();
      console.log(response);
      dispatch(setBestReviewer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [SET_MAIN_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.main_review = action.payload.main_review;
      }),
    [SET_BEST_REVIEWER]: (state, action) =>
      produce(state, (draft) => {
        draft.best_reviewer = action.payload.best_reviewer;
      }),
  },
  initialState
);

const actionCreators = {
  getMainReview,
  getBestReviewer,
};

export { actionCreators };
