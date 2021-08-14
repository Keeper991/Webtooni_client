import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { talkAPI } from "../../shared/API";
import { actionCreators as talkActions } from "./talk";

const SET_COMMENT_ALL = "SET_COMMENT_ALL";
const ADD_COMMENT_ONE = "ADD_COMMENT_ONE";
const EDIT_COMMENT_ONE = "EDIT_COMMENT_ONE";
const DELETE_COMMENT_ONE = "DELETE_COMMENT_ONE";
const RESET_COMMENT = "RESET_COMMENT";

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

const initialState = {
  list: [
    // {
    //   postId: "1",
    //   commentId: "댓글 postId",
    //   userName: "닉네임",
    //   commentContent: "댓글 내용",
    //   createDate: "1970-01-02T00:00:00",
    // },
    // {
    //   postId: "2",
    //   commentId: "댓글 postId",
    //   userName: "닉네임",
    //   commentContent: "댓글 내용",
    //   createDate: "1970-01-02T00:00:00",
    // },
  ],
};

//포스트 별 댓글 리스트 불러오기
const getCommentAllServer = (postId) => {
  return async function (dispatch) {
    try {
      const response = await talkAPI.getComments(postId);
      console.log(response, "getCommetAllOK");
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
      const response = await talkAPI.addComment({ postId, commentContent });
      console.log(response, "addCommentOK");

      const { userImg, userName, userGrade } = getState().user.info; //유저 정보 가져오기
      dispatch(
        addCommentOne({ ...response.data, userImg, userName, userGrade })
      );
      //톡 리듀서에서 포스트 댓글 수 수정
      const post_list = getState().talk.post_list;
      const post = post_list.filter((p) => p.postId === postId)[0];
      dispatch(
        talkActions.editPostOne({ ...post, commentCount: commentCount + 1 }) //댓글수 변수명 나중에 수정
      );
      console.log(post, "post,addComment");
    } catch (err) {
      console.log(postId, commentContent, commentCount, "addComment변수");
      console.log(err, "addCommentError");
    }
  };
};

//댓글 수정
const editCommentServer = (commentId, commentContent) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.editComment({
        commentId,
        commentContent,
      });
      console.log(response, "editCommentOK");
      dispatch(editCommentOne(commentId, commentContent));
    } catch (err) {
      console.log(err, "editCommentError");
    }
  };
};

//댓글 삭제
const deleteCommentServer = (postId, commentId, commentCount) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await talkAPI.deleteComment({ commentId });
      console.log(response, "deleteCommentOK");
      dispatch(deleteCommentOne(commentId));
      //톡 리듀서에서 포스트 댓글 수 수정
      const post_list = getState().talk.post_list;
      const post = post_list.filter((p) => p.postId === postId)[0];
      dispatch(
        talkActions.editPostOne({ ...post, commentCount: commentCount - 1 })
      );
    } catch (err) {
      console.log(err, "deleteCommentError");
      alert("댓글 정보가 없어요");
    }
  };
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
