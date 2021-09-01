import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { talkAPI } from "../../shared/API";
import { actionCreators as talkActions } from "./talk";
import { actionCreators as userActions } from "./user";
import { actionCreators as modalActions } from "./modal";

///////////////////////////////////////////////////////////
// action type
///////////////////////////////////////////////////////////
const SET_COMMENT_ALL = "SET_COMMENT_ALL";
const ADD_COMMENT_ONE = "ADD_COMMENT_ONE";
const EDIT_COMMENT_ONE = "EDIT_COMMENT_ONE";
const DELETE_COMMENT_ONE = "DELETE_COMMENT_ONE";
const RESET_COMMENT = "RESET_COMMENT";
const LOADING = "talkComment/LOADING";

///////////////////////////////////////////////////////////
// action creators
///////////////////////////////////////////////////////////
const setCommentAll = createAction(SET_COMMENT_ALL, (commentList) => ({
  commentList,
}));
const addCommentOne = createAction(ADD_COMMENT_ONE, (comment) => ({
  comment,
}));
const editCommentOne = createAction(
  EDIT_COMMENT_ONE,
  (commentId, commentContent) => ({
    commentId,
    commentContent,
  })
);
const deleteCommentOne = createAction(DELETE_COMMENT_ONE, (commentId) => ({
  commentId,
}));
const resetComment = createAction(RESET_COMMENT, () => ({}));
const loading = createAction(LOADING, (is_loading) => ({
  is_loading,
}));

///////////////////////////////////////////////////////////
// thunks
///////////////////////////////////////////////////////////

//포스트 별 댓글 리스트 불러오기
const getCommentAllServer = (postId) => {
  return async function (dispatch) {
    try {
      const response = await talkAPI.getComments(postId);
      dispatch(setCommentAll(response.data));
    } catch (err) {
      console.log(err, "getCommetAllError");
    }
  };
};

//댓글 작성
const addCommentServer = (postId, commentContent, commentCount) => {
  return async function (dispatch, getState) {
    try {
      dispatch(loading(true));

      const response = await talkAPI.addComment({ postId, commentContent });

      const { userImg, userName, userGrade } = getState().user.info; //유저 정보 가져오기
      dispatch(
        addCommentOne({ ...response.data, userImg, userName, userGrade })
      );
      //톡 리듀서에서 포스트 댓글 수 수정
      const post_list = getState().talk.post_list;
      const post = post_list.filter((p) => p.postId === postId)[0];
      dispatch(
        talkActions.editPostOne({ ...post, talkCommentCount: commentCount + 1 })
      );
      dispatch(loading(false));
    } catch (err) {
      console.log(err, "addCommentError");
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
        return;
      }
      dispatch(loading(false));
    }
  };
};

//댓글 수정
const editCommentServer = (commentId, commentContent) => {
  return async function (dispatch, getState) {
    try {
      dispatch(loading(true));

      await talkAPI.editComment({
        commentId,
        commentContent,
      });
      dispatch(editCommentOne(commentId, commentContent));
      dispatch(loading(false));
    } catch (err) {
      console.log(err, "editCommentError");
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
        return;
      }
      dispatch(loading(false));
    }
  };
};

//댓글 삭제
const deleteCommentServer = (postId, commentId, commentCount) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));

      await talkAPI.deleteComment({ commentId });
      dispatch(deleteCommentOne(commentId));
      //톡 리듀서에서 포스트 댓글 수 수정
      const post_list = getState().talk.post_list;
      const post = post_list.filter((p) => p.postId === postId)[0];
      dispatch(
        talkActions.editPostOne({ ...post, talkCommentCount: commentCount - 1 })
      );
      dispatch(loading(false));
    } catch (err) {
      console.log(err, "deleteCommentError");
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
        return;
      }
      dispatch(modalActions.activeModal("error"));
      dispatch(loading(false));
    }
  };
};

///////////////////////////////////////////////////////////
// initialState & reducer
///////////////////////////////////////////////////////////

const initialState = {
  list: [],
  is_loading: false,
};

export default handleActions(
  {
    [SET_COMMENT_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.commentList);
      }),
    [ADD_COMMENT_ONE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.comment);
      }),

    [EDIT_COMMENT_ONE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        draft.list[idx].commentContent = action.payload.commentContent;
      }),
    [DELETE_COMMENT_ONE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        draft.list.splice(idx, 1);
      }),
    [RESET_COMMENT]: (state) =>
      produce(state, (draft) => {
        draft.list = [];
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentAllServer,
  addCommentServer,
  editCommentServer,
  deleteCommentServer,
  resetComment,
};

export { actionCreators };
