import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { reviewAPI } from "../../shared/API";

const SET_REVIEW_LIST = "SET_REVIEW_LIST";

const setReviewList = createAction(SET_REVIEW_LIST, (review_list) => ({
  review_list,
}));

const initialState = {
  review_list: [],
};

const getReviewList = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await reviewAPI.getOrderByCreatedAt();
      console.log(response);
      dispatch(setReviewList(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [SET_REVIEW_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.review_list = action.payload.review_list;
      }),
  },
  initialState
);

const actionCreators = {
  getReviewList,
};

export { actionCreators };
