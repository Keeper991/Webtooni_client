import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { talkAPI } from "../../shared/API";
import { actionCreators as talkCommentActions } from "./talkComment";
import { actionCreators as userActions } from "./user";
import { actionCreators as modalActions } from "./modal";

///////////////////////////////////////////////////////////
// action type
///////////////////////////////////////////////////////////
const SET_PAGE = "talk/SET_PAGE";
const ADD_POST_ONE = "talk/ADD_POST_ONE";
const EDIT_POST_ONE = "talk/EDIT_POST_ONE";
const DELETE_POST_ONE = "talk/DELETE_POST_ONE";
const SET_PAGE_NUMBER = "talk/SET_PAGE_NUMBER";
const SET_POST_COUNT = "talk/SET_POST_COUNT";
const TOGGLE_LIKE = "talk/TOGGLE_LIKE";
const LOADING = "talk/LOADING";

///////////////////////////////////////////////////////////
// action creators
///////////////////////////////////////////////////////////
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
const toggleLike = createAction(TOGGLE_LIKE, (post_id) => ({
  post_id,
}));
const loading = createAction(LOADING, (is_loading) => ({
  is_loading,
}));

///////////////////////////////////////////////////////////
// thunks
///////////////////////////////////////////////////////////

//페이지 별 리스트 불러오기
const getPageServer = (page_number) => {
  return async function (dispatch, getState) {
    try {
      const response = await talkAPI.getPage(page_number);

      dispatch(setPage(response.data.posts, page_number));
      dispatch(setPageNumber(page_number));
      dispatch(sePostCount(response.data.postCount)); //전체 게시글 수
    } catch (err) {
      console.log(err, "getTalkAllError");
    }
  };
};

//포스트 작성
const addPostServer = (postTitle, postContent) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));

      const response = await talkAPI.addPost({ postTitle, postContent });
      const { userImg, userName, userGrade } = getState().user.info;
      const is_detail = false; //상세정보 여부 구분(포스트작성OR상세페이지)
      dispatch(
        addPostOne(
          { ...response.data, userImg, userName, userGrade },
          is_detail
        )
      );
      dispatch(talkCommentActions.resetComment()); //코멘트 리셋
      history.push("/talk");
      dispatch(loading(false));
    } catch (err) {
      console.log(err, "addTalkError");
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
        return;
      }
      dispatch(loading(false));
    }
  };
};
//포스트 수정
const editPostServer = (postId, postTitle, postContent) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      await talkAPI.editPost({
        postId,
        postTitle,
        postContent,
      });
      const post_one = { postId, postTitle, postContent };
      dispatch(editPostOne(post_one));
      history.replace(`/talk/detail/${postId}`);
      dispatch(loading(false));
    } catch (err) {
      console.log(err, "editTalkError");
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
        return;
      }
      dispatch(loading(false));
    }
  };
};

//포스트 삭제
const deletePostServer = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      await talkAPI.deletePost(postId);
      dispatch(deletePostOne(postId));
      history.replace("/talk");

      dispatch(talkCommentActions.resetComment()); //코멘트 리셋
      dispatch(loading(false));
    } catch (err) {
      console.log(err, "deletePostError");
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

//포스트 상세정보 받아오기
const getPostOneServer = (post_id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await talkAPI.getOne(post_id);
      const post = response.data;
      const is_detail = true; //상세정보 여부(포스트작성OR상세페이지)
      dispatch(addPostOne(post, is_detail));
    } catch (err) {
      console.log(err, "getTalkOneError");
      dispatch(modalActions.activeModal("failLoad"));
    }
  };
};

//포스트 좋아요 토글
const likePostServer = (post_id) => {
  return async function (dispatch, getState) {
    try {
      dispatch(loading(true));
      await talkAPI.likePost(post_id);
      dispatch(toggleLike(post_id));
      dispatch(loading(false));
    } catch (err) {
      console.log(err, "likePostwError");
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
        return;
      }
      dispatch(loading(false));
    }
  };
};

///////////////////////////////////////////////////////////
// initialState & reducer
///////////////////////////////////////////////////////////

const initialState = {
  post_list: [],
  page_number_list: [], //조회한 페이지 번호
  cur_page: 1,
  post_count: 1, //전체 포스트 수
  is_loading: false,
};

export default handleActions(
  {
    [SET_PAGE]: (state, action) =>
      produce(state, (draft) => {
        const __list = action.payload.post_list;

        //기존 리스트와 중복되는 데이터 삭제 후 리스트 추가 (상세정보 url 접속 후 메인으로 이동 시)
        const idx = __list.findIndex(
          (_) =>
            draft.post_list.find((__) => {
              return _.postId === __.postId;
            })?.postId === _.postId
        );
        if (idx !== -1) {
          __list.splice(idx, 1);
        }

        draft.post_list.push(...__list);

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

    //포스트 추가(상세정보 or 작성 포스트)
    [ADD_POST_ONE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post_list.findIndex(
          (p) => p.postId === parseInt(action.payload.post_one.postId)
        );
        // 상세페이지 url로 접속 or 포스트 작성 시 포스트 추가
        if (idx === -1) {
          draft.post_list.push(action.payload.post_one);
        } else {
          // 메인 -> 상세 이동 시 기존 포스트에 덮어쓰기
          draft.post_list[idx] = {
            ...action.payload.post_one,
          };
        }

        //게시글 작성 후 데이터 초기화
        if (action.payload.is_detail === false) {
          draft.post_list = [];
          draft.page_number_list = [];
          draft.cur_page = 1;
        }
      }),
    [TOGGLE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        let post = draft.post_list.filter(
          (p) => p.postId === parseInt(action.payload.post_id)
        )[0];
        //좋아요 여부, 좋아요 수 변경
        if (post.ilike === true) {
          post.ilike = false;
          post.likeNum -= 1;
        } else if (post.ilike === false) {
          post.ilike = true;
          post.likeNum += 1;
        }

        let idx = draft.post_list.findIndex(
          (p) => p.postId === parseInt(action.payload.post_id)
        );

        draft.post_list[idx] = {
          ...post,
        };
      }),

    [EDIT_POST_ONE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post_list.findIndex(
          (p) => p.postId === parseInt(action.payload.post_one.postId)
        );

        const postId = parseInt(action.payload.post_one.postId);
        draft.post_list[idx] = {
          ...draft.post_list[idx],
          ...action.payload.post_one,
          postId,
        };
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
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
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
