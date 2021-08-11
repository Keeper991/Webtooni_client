import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { offerAPI, reviewAPI, reviewerAPI } from "../../shared/API";

const SET_MAIN_REVIEW = "SET_MAIN_REVIEW";
const SET_MAIN_BEST_REVIEWER = "SET_BEST_REVIEWER";
const SET_MD_OFFER = "SET_MD_OFFER";

const setMainReview = createAction(SET_MAIN_REVIEW, (main_review) => ({
  main_review,
}));
const setMainBestReviewer = createAction(
  SET_MAIN_BEST_REVIEWER,
  (main_best_reviewer) => ({
    main_best_reviewer,
  })
);
const setMdOffer = createAction(SET_MD_OFFER, (md_offer) => ({
  md_offer,
}));

const initialState = {
  main_review: [],
  main_best_reviewer: [],
  md_offer: {},
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

const getMainBestReviewer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await reviewerAPI.getBest();
      console.log(response);
      dispatch(setMainBestReviewer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

const getMdOffer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await offerAPI.getMd();
      console.log(response.data);
      dispatch(setMdOffer(response.data));
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
    [SET_MAIN_BEST_REVIEWER]: (state, action) =>
      produce(state, (draft) => {
        draft.main_best_reviewer = action.payload.main_best_reviewer;
      }),
    [SET_MD_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.md_offer = action.payload.md_offer;
      }),
  },
  initialState
);

const actionCreators = {
  getMainReview,
  getMainBestReviewer,
  getMdOffer,
};

export { actionCreators };
