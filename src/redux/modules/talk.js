import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { talkAPI } from "../../shared/API";

const SET_POST_ALL = "SET_POST_ALL";
const ADD_POST_ONE = "ADD_POST_ONE";
const EDIT_POST_ONE = "EDIT_POST_ONE";
const DELETE_POST_ONE = "DELETE_POST_ONE";

const setPostAll = createAction(SET_POST_ALL, (post_list) => ({ post_list }));
const addPostOne = createAction(ADD_POST_ONE, (post_one) => ({ post_one }));
const editPostOne = createAction(EDIT_POST_ONE, (post_one) => ({ post_one }));
const deletePostOne = createAction(DELETE_POST_ONE, (post_id) => ({ post_id }));

const initialState = {
  post_list: [
    {
      postId: "1",
      postTitle: "게시글 제목",
      userName: "닉네임",
      postContent: "게시글 내용...",
    },
    {
      postId: "2",
      postTitle: "게시글 제목",
      userName: "닉네임",
      postContent: "게시글 내용...",
    },
  ],
};

//톡 리스트 불러오기
const getPostAllServer = () => {
  return async function (dispatch) {
    try {
      const response = await talkAPI.getAll();
      console.log(response, "getTalkAllOK");
      dispatch(setPostAll(response.data));
    } catch (err) {
      console.log(err, "getTalkAllError");
    }
  };
};

//포스트 작성. 서버에 요청 후 포스트아이디도 받아와서 같이 저장해야 함...
const addPostServer = (postTitle = null, postContent = null) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.addPost({ postTitle, postContent });
      console.log(response, "addTalkOK");
      const userName = getState().user.user.userName;
      dispatch(addPostOne({ postTitle, postContent, userName })); //리스폰스 데이터로 포스트 아이디를 받아와서 같이 저장해야...
    } catch (err) {
      console.log(err, "addTalkError");
    }
  };
};
//포스트 수정
const editPostServer = (
  postId = null,
  postTitle = null,
  postContent = null
) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.editPost({
        postId,
        postTitle,
        postContent,
      });
      console.log(response, "editTalkOK");
      dispatch(editPostOne({ postId, postTitle, postContent })); //리스폰스 데이터로 포스트 아이디를 받아와서 같이 저장해야...
    } catch (err) {
      console.log(err, "editTalkError");
    }
  };
};

//포스트 삭제
const deletePostServer = (postId = null) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await talkAPI.deletePost(postId);
      console.log(response, "deletePostOK");
      dispatch(deletePostOne(postId));
      history.replace("/talk");
    } catch (err) {
      console.log(err, "deletePostError");
      alert("포스트 정보가 없어요");
      history.replace("/talk");
    }
  };
};

//포스트 상세정보 받아오기
const getPostOneServer = (post_id = null) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await talkAPI.getOne(post_id);
      console.log(response, "getTalkOneOK");
      //스토어에 포스트 저장하는 방법 분기
      const talk = getState().talk.post_list.filter(
        (p) => p.postId === post_id
      )[0];
      if (!talk) {
        //스토어에 포스트가 아예 없으면
        dispatch(addPostOne(response.data));
      } else {
        //포스트에서 컨텐트 정보만 없으면
        dispatch(editPostOne(response.data));
      }
    } catch (err) {
      console.log(err, "getTalkOneError");
      alert("게시글 정보가 없어요");
      history.replace("/talk");
    }
  };
};

//포스트 좋아요 토글 : 로그인 유저의 기존 좋아요 여부를 상세 api로 받아야 함 + 리듀서 액션 추가
const likePostServer = (post_id = null) => {
  return async function (dispatch) {
    try {
      const response = await talkAPI.likePost(post_id);
      console.log(response, "likePostwOK");
    } catch (err) {
      console.log(err, "likePostwError");
    }
  };
};

export default handleActions(
  {
    [SET_POST_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.post_list;
      }),
    [ADD_POST_ONE]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.push(action.payload.post_one);
      }),
    [EDIT_POST_ONE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post_list.findIndex(
          (p) => p.postId === action.payload.post_one.postId
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post_one };
      }),
    [DELETE_POST_ONE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post_list.findIndex(
          (p) => p.postId === action.payload.post_id
        );
        draft.post_list.splice(idx, 1);
      }),
  },
  initialState
);

const actionCreators = {
  getPostAllServer,
  addPostServer,
  editPostServer,
  getPostOneServer,
  deletePostServer,
  likePostServer,
};

export { actionCreators };
