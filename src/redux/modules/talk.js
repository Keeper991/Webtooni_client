import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { talkAPI } from "../../shared/API";
import { actionCreators as talkCommentActions } from "./talkComment";

const SET_PAGE = "SET_PAGE";
const ADD_POST_ONE = "ADD_POST_ONE";
const EDIT_POST_ONE = "EDIT_POST_ONE";
const DELETE_POST_ONE = "DELETE_POST_ONE";
const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
const SET_POST_COUNT = "SET_POST_COUNT";

const setPage = createAction(SET_PAGE, (post_list, page_number) => ({
  post_list,
  page_number,
}));
const addPostOne = createAction(ADD_POST_ONE, (post_one, is_detail) => ({
  post_one,
  is_detail,
}));
const editPostOne = createAction(EDIT_POST_ONE, (post_one) => ({ post_one }));
const deletePostOne = createAction(DELETE_POST_ONE, (post_id) => ({ post_id }));
const setPageNumber = createAction(SET_PAGE_NUMBER, (page_number) => ({
  page_number,
}));
const sePostCount = createAction(SET_POST_COUNT, (post_count) => ({
  post_count,
}));

const initialState = {
  post_list: [
    {
      postId: "1",
      postTitle: "게시글 제목",
      userName: "닉네임",
      postContent: "게시글 내용...",
      commentCount: 3, //댓글 수 변수명은 임시로 지정
      createDate: "1970-01-02T00:00:00",
    },
    {
      postId: "2",
      postTitle: "게시글 제목",
      userName: "닉네임",
      postContent: "게시글 내용...",
      commentCount: 4,
      createDate: "1970-01-01T00:00:00",
    },
  ],
  page_number_list: [], //조회한 페이지 번호
  cur_page: 1,
  post_count: 6, //전체 포스트 수
};

//페이지 별 리스트 불러오기
const getPageServer = (page_number) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.getPage(page_number);
      console.log(response, "getTalkAllOK");
      const _list = response.data.posts;

      // const { userLikeId } = getState().user.user; //유저가 좋아요 한 톡 포스트. 변수명 나중에 수정
      // // 로그인 유저의 좋아요 여부 추가
      // const list = _list.map((item) => {
      //   if (userLikeId.includes(item.postId)) {
      //     item.isLike = true;
      //   } else {
      //     item.isLike = false;
      //   }
      //   return item;
      // });

      dispatch(setPage(_list, page_number));
      dispatch(setPageNumber(page_number));
      dispatch(sePostCount(response.data.postCount)); //전체 게시글 수
    } catch (err) {
      console.log(err, "getTalkAllError");
    }
  };
};

//포스트 작성. 서버에 요청 후 포스트아이디도 받아와서 같이 저장해야 함...
const addPostServer = (postTitle, postContent) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.addPost({ postTitle, postContent });
      console.log(response, "addTalkOK");
      const { userImg, userName, userGrade } = getState().user.user;
      const is_detail = false; //상세정보 여부(작성OR상세)
      dispatch(
        addPostOne(
          { ...response.data, userImg, userName, userGrade },
          is_detail
        )
      );
      dispatch(talkCommentActions.resetComment()); //코멘트 리셋
    } catch (err) {
      console.log(err, "addTalkError");
    }
  };
};
//포스트 수정
const editPostServer = (postId, postTitle, postContent) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.editPost({
        postId,
        postTitle,
        postContent,
      });
      console.log(response, "editTalkOK");
      dispatch(editPostOne({ postId, postTitle, postContent }));
    } catch (err) {
      console.log(err, "editTalkError");
    }
  };
};

//포스트 삭제
const deletePostServer = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await talkAPI.deletePost(postId);
      console.log(response, "deletePostOK");
      dispatch(deletePostOne(postId));
      history.replace("/talk");

      dispatch(talkCommentActions.resetComment()); //코멘트 리셋
    } catch (err) {
      console.log(err, "deletePostError");
      alert("포스트 정보가 없어요");
      history.replace("/talk");
    }
  };
};

//포스트 상세정보 받아오기
const getPostOneServer = (post_id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await talkAPI.getOne(post_id);
      const post = response.data;

      const { userLikeId } = getState().user.user; //유저가 좋아요 한 톡 포스트. 변수명 나중에 수정
      // 로그인 유저의 좋아요 여부 추가
      if (userLikeId.includes(post.postId)) {
        post.isLike = true;
      } else {
        post.isLike = false;
      }
      const is_detail = true; //상세정보 여부(작성OR상세)
      dispatch(addPostOne(post, is_detail));
    } catch (err) {
      console.log(err, "getTalkOneError");
      alert("게시글 정보가 없어요");
      history.replace("/talk");
    }
  };
};

//포스트 좋아요 토글 : 로그인 유저의 기존 좋아요 여부를 상세 api로 받아야 함 + 리듀서 액션 추가
const likePostServer = (post_id) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.likePost(post_id);
      console.log(response, "likePostwOK");
      const post_list = getState().talk.post_list;
      const post = post_list.filter((p) => p.postId === post_id)[0];

      //좋아요 여부, 좋아요 수 변경
      if (post.isLike) {
        post.isLike = false;
        post.likeCount -= 1; //변수명 나중에 수정
      } else {
        post.isLike = true;
        post.likeCount += 1;
      }

      dispatch(editPostOne(post));
    } catch (err) {
      console.log(err, "likePostwError");
    }
  };
};

export default handleActions(
  {
    [SET_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.push(...action.payload.post_list);
        //최신 순 정렬
        draft.post_list.sort(function (a, b) {
          return a.createDate > b.createDate
            ? -1
            : a.createDate < b.createDate
            ? 1
            : 0;
        });
        // 조회한 페이지 목록
        const list = draft.page_number_list;
        list.push(action.payload.page_number);
        //페이지번호 목록 오름차순 정렬
        if (list.length > 1) {
          list.sort(function (a, b) {
            return a - b;
          });
        }
      }),
    [ADD_POST_ONE]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.push(action.payload.post_one);
        if (action.payload.is_detail === false) {
          //게시글 작성 후 데이터 초기화
          draft.post_list = [];
          draft.page_number_list = [];
          draft.cur_page = 1;
        }
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
        //게시글 삭제 후 데이터 초기화
        draft.post_list = [];
        draft.page_number_list = [];
        draft.cur_page = 1;
      }),
    [SET_PAGE_NUMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.cur_page = action.payload.page_number; //새로 페이지를 가져온 경우 현재 페이지 번호
      }),
    [SET_POST_COUNT]: (state, action) =>
      produce(state, (draft) => {
        draft.post_count = action.payload.post_count;
      }),
  },
  initialState
);

const actionCreators = {
  getPageServer,
  addPostServer,
  editPostServer,
  getPostOneServer,
  deletePostServer,
  likePostServer,
  editPostOne,
  setPageNumber,
};

export { actionCreators };
