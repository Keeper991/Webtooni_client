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
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  };
};

const loginDB = ( userId, password ) => {
  return function (dispatch, getState, { history }) {
    console.log(userId, password);

    meAPI.login({ userId, password })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
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
  loginDB,
};

export { actionCreators };