import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { reviewAPI } from "../../shared/API";

const SET_REVIEW_LIST = "SET_REVIEW_LIST";
const SET_PAGE_NUM = "SET_PAGE_NUM";
const SET_LIKE_LIST = "SET_LIKE_LIST";
const SET_TOTAL_REVIEW = "SET_TOTAL_REVIEW";
const IS_LAST = "IS_LAST";
const LOADING = "LOADING";

const setReviewList = createAction(SET_REVIEW_LIST, (review_list) => ({
  review_list,
}));
const setPage = createAction(SET_PAGE_NUM, (page_num) => ({
  page_num,
}));

const setTotalReview = createAction(SET_TOTAL_REVIEW, (total_review) => ({
  total_review,
}));

const setLikeList = createAction(SET_LIKE_LIST, (user_like_review_list) => ({
  user_like_review_list,
}));

const isLast = createAction(IS_LAST, (is_last) => ({
  is_last,
}));

const loading = createAction(LOADING, (is_loading_review) => ({
  is_loading_review,
}));

const initialState = {
  review_list: [],
  user_like_review_list: [],
  page_num: 1,
  total_review: 0,
  is_loading_review: false,
  is_last: false,
};

const getReviewList = (page_num) => {
  console.log(page_num);
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      const response = await reviewAPI.getOrderByCreatedAt(page_num);
      if (response.data.reviews.length === 0) {
        return dispatch(isLast(true));
      }
      dispatch(setPage(page_num + 1));
      dispatch(setReviewList(response.data.reviews));
      dispatch(setTotalReview(response.data.postCount));
      dispatch(setLikeList(response.data.likeReviewIdList));
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [SET_REVIEW_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.review_list.push(...action.payload.review_list);
        draft.is_loading_review = false;
      }),
    [SET_PAGE_NUM]: (state, action) =>
      produce(state, (draft) => {
        draft.page_num = action.payload.page_num;
      }),
    [SET_TOTAL_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.total_review = action.payload.total_review;
      }),
    [SET_LIKE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.user_like_review_list = action.payload.user_like_review_list;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading_review = action.payload.is_loading_review;
      }),
    [IS_LAST]: (state, action) =>
      produce(state, (draft) => {
        draft.is_last = action.payload.is_last;
      }),
  },
  initialState
);

const actionCreators = {
  getReviewList,
};

export { actionCreators };
