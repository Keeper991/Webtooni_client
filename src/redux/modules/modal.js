import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const ACTIVE_MODAL = "modal/ACTIVE_MODAL";
const INACTIVE_MODAL = "modal/INACTIVE_MODAL";

const activeModal = createAction(ACTIVE_MODAL, (modalKind, data) => ({
  modalKind,
  data,
}));
const inactiveModal = createAction(INACTIVE_MODAL, () => ({}));

const initialState = {
  isActiveModal: false,
  modalKind: "",
  data: "",
};

export default handleActions(
  {
    [ACTIVE_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.modalKind = action.payload.modalKind;
        draft.data = action.payload.data;
        draft.isActiveModal = true;
      }),
    [INACTIVE_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.modalKind = "";
        draft.data = "";
        draft.isActiveModal = false;
      }),
  },
  initialState
);

export const actionCreators = { activeModal, inactiveModal };
