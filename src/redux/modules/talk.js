import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { talkAPI } from "../../shared/API";

const SET_TALK_ALL = "SET_TALK_ALL";
const ADD_TALK_ONE = "ADD_TALK_ONE";
const EDIT_TALK_ONE = "EDIT_TALK_ONE";

const setTalkAll = createAction(SET_TALK_ALL, (talk_list) => ({ talk_list }));
const addTalkOne = createAction(ADD_TALK_ONE, (talk_one) => ({ talk_one }));
const editTalkOne = createAction(EDIT_TALK_ONE, (talk_one) => ({ talk_one }));

const initialState = {
  talk_list: [
    {
      postId: "1",
      postTitle: "게시글 제목",
      userName: "닉네임",
    },
    {
      postId: "게시글 Id",
      postTitle: "게시글 제목",
      userName: "닉네임",
    },
  ],
};

//톡 리스트 불러오기
const getTalkAllServer = () => {
  return async function (dispatch) {
    try {
      const response = await talkAPI.getAll();
      console.log(response, "getTalkAllOK");
      dispatch(setTalkAll(response.data));
    } catch (err) {
      console.log(err, "getTalkAllError");
    }
  };
};

//포스트 작성. 서버에 요청 후 포스트아이디도 받아와서 같이 저장해야 함...
const addTalkServer = (postTitle = null, postContent = null) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.addPost({ postTitle, postContent });
      console.log(response, "addTalkOK");
      const userName = getState().user.user.userName;
      dispatch(addTalkOne({ postTitle, postContent, userName })); //리스폰스 데이터로 포스트 아이디를 받아와서 같이 저장해야...
    } catch (err) {
      console.log(err, "addTalkError");
    }
  };
};
//포스트 수정
const editTalkServer = (
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
      dispatch(editTalkOne({ postId, postTitle, postContent })); //리스폰스 데이터로 포스트 아이디를 받아와서 같이 저장해야...
    } catch (err) {
      console.log(err, "editTalkError");
    }
  };
};

//포스트 상세정보 받아오기
const getTalkOneServer = (post_id = null) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await talkAPI.getOne(post_id);
      console.log(response, "getTalkOneOK");
      //리덕스 스토어에 상세 정보 유무에 따라 스토어에 넣는 방법 달라짐
      const talk = getState().talk.talk_list.filter(
        (p) => p.postId === post_id
      )[0];
      if (!talk) {
        //포스트가 아예 없으면
        dispatch(addTalkOne(response.data));
      } else {
        // 컨텐트 정보만 없으면
        dispatch(editTalkOne(response.data));
      }
    } catch (err) {
      console.log(err, "getTalkOneError");
      alert("게시글 정보가 없어요");
      history.push("/talk");
    }
  };
};

export default handleActions(
  {
    [SET_TALK_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.talk_list = action.payload.talk_list;
      }),
    [ADD_TALK_ONE]: (state, action) =>
      produce(state, (draft) => {
        draft.talk_list.push(action.payload.talk_one);
      }),
    [EDIT_TALK_ONE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.talk_list.findIndex(
          (p) => p.postId === action.payload.talk_one.postId
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.talk_one };
      }),
  },
  initialState
);

const actionCreators = {
  getTalkAllServer,
  addTalkServer,
  editTalkServer,
  getTalkOneServer,
};

export { actionCreators };
