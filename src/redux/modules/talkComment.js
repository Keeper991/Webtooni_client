import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { talkAPI } from "../../shared/API";
import { actionCreators as talkActions } from "./talk";

const SET_COMMENT_ALL = "SET_COMMENT_ALL";
const ADD_COMMENT_ONE = "ADD_COMMENT_ONE";
const EDIT_COMMENT_ONE = "EDIT_COMMENT_ONE";
const DELETE_COMMENT_ONE = "DELETE_COMMENT_ONE";

const setCommentAll = createAction(SET_COMMENT_ALL, (postId, commentList) => ({
  postId,
  commentList,
}));
const addCommentOne = createAction(ADD_COMMENT_ONE, (postId, comment) => ({
  postId,
  comment,
}));
const editCommentOne = createAction(
  EDIT_COMMENT_ONE,
  (postId, commentId, commentContent) => ({
    postId,
    commentId,
    commentContent,
  })
);
const deleteCommentOne = createAction(
  DELETE_COMMENT_ONE,
  (postId, commentId) => ({
    postId,
    commentId,
  })
);

const initialState = {
  list: [
    {
      postId: "1",
      commentList: [
        {
          commentId: "댓글 postId",
          userName: "닉네임",
          commentContent: "댓글 내용",
        },
        {
          commentId: "댓글 postId",
          userName: "닉네임",
          commentContent: "댓글 내용",
        },
      ],
    },
    {
      postId: "2",
      commentList: [
        {
          commentId: "댓글 postId",
          userName: "닉네임",
          commentContent: "댓글 내용",
        },
        {
          commentId: "댓글 postId",
          userName: "닉네임",
          commentContent: "댓글 내용",
        },
      ],
    },
  ],
};

//포스트 별 댓글 리스트 불러오기
const getCommentAllServer = (postId) => {
  return async function (dispatch) {
    try {
      const response = await talkAPI.getComments(postId);
      console.log(response, "getCommetAllOK");
      dispatch(setCommentAll(postId, response.data));
    } catch (err) {
      console.log(err, "getCommetAllError");
    }
  };
};

//댓글 작성
const addCommentServer = (
  postId = null,
  commentContent = null,
  commentCount = null
) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.addComment({ postId, commentContent });
      console.log(response, "addCommentOK");

      const { commentId, userName } = response.data;
      dispatch(addCommentOne(postId, { commentId, commentContent, userName }));
      //톡 리듀서에서 포스트 댓글 수 수정
      const post_list = getState().talk.post_list;
      const post = post_list.filter((p) => p.postId === postId)[0];
      dispatch(
        talkActions.editPostOne({ ...post, commentCount: commentCount + 1 })
      );
    } catch (err) {
      console.log(postId, commentContent, commentCount, "addComment변수");
      console.log(err, "addCommentError");
    }
  };
};

//댓글 수정
const editCommentServer = (
  postId = null,
  commentId = null,
  commentContent = null
) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.editCommentOne({
        postId,
        commentId,
        commentContent,
      });
      console.log(response, "editCommentOK");
      dispatch(editCommentOne(postId, commentId, commentContent));
    } catch (err) {
      console.log(err, "editCommentError");
    }
  };
};

//댓글 삭제
const deleteCommentServer = (
  postId = null,
  commentId = null,
  commentCount = null
) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await talkAPI.deleteComment({ postId, commentId });
      console.log(response, "deleteCommentOK");
      dispatch(deleteCommentOne(postId, commentId));
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
        draft.list.push({
          postId: action.payload.postId,
          commentList: action.payload.commentList,
        });
      }),
    [ADD_COMMENT_ONE]: (state, action) =>
      produce(state, (draft) => {
        let postIdx = draft.list.findIndex(
          (p) => p.postId === action.payload.postId
        );
        draft.list[postIdx].commentList.push(action.payload.comment);
      }),

    [EDIT_COMMENT_ONE]: (state, action) =>
      produce(state, (draft) => {
        let post_postIdx = draft.list.findIndex(
          (p) => p.postId === action.payload.postId
        );
        const _list = draft.list[post_postIdx].commentList;
        let comment_postIdx = _list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        _list[comment_postIdx].commentContent = action.payload.commentContent;
      }),
    [DELETE_COMMENT_ONE]: (state, action) =>
      produce(state, (draft) => {
        let post_postIdx = draft.list.findIndex(
          (p) => p.postId === action.payload.postId
        );
        const _list = draft.list[post_postIdx].commentList;
        let comment_postIdx = _list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        _list.splice(comment_postIdx, 1);
      }),
  },
  initialState
);

const actionCreators = {
  getCommentAllServer,
  addCommentServer,
  editCommentServer,
  deleteCommentServer,
};

export { actionCreators };
