import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const MODAL_TOGGLE = "MODAL_TOGGLE";

const modalToggle = createAction(MODAL_TOGGLE, ( is_modal ) => ({ is_modal }));

const initialState = {
  is_modal: false,
}

export default handleActions(
  {
    [MODAL_TOGGLE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_modal = action.payload.is_modal;
      }),
  },
    initialState
);

const actionCreators = {
  modalToggle,
}

export { actionCreators };