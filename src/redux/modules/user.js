import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { meAPI } from "../../shared/API";

const SET_USER = "SET_USER";

const setUser = createAction(SET_USER, (user) => ({user}));

const initialState = {
  user: null,
  is_login: false,
};

const signUpDB = ( userId, userName, password, userImg ) => {
  return function (dispatch, getState, { history }) {
    console.log(userId, userName, password, userImg);
    
    meAPI.register({ userId, userName, password, userImg })
    .then()
    .catch()
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
  },
    initialState
);

const actionCreators = {
  signUpDB,
};

export { actionCreators };