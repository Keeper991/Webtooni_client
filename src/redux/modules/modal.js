import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// action type
const ACTIVE_MODAL = "modal/ACTIVE_MODAL";
const INACTIVE_MODAL = "modal/INACTIVE_MODAL";

// action creators
const activeModal = createAction(ACTIVE_MODAL, (modalKind, data) => ({
  modalKind,
  data,
}));
const inactiveModal = createAction(INACTIVE_MODAL, () => ({}));

// initialState & reducer
const initialState = {
  isActiveModal: false,
  modalKind: "",
  data: "",
};

export default handleActions(
  {
    // 모달 활성화 작업
    [ACTIVE_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.modalKind = action.payload.modalKind;
        draft.data = action.payload.data;
        draft.isActiveModal = true;
      }),
    // 모달 비활성화 작업
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
