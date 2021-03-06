import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { reviewAPI } from "../../shared/API";
import { actionCreators as webtoonActions } from "./webtoon";
import { actionCreators as userActions } from "./user";
import { actionCreators as modalActions } from "./modal";

///////////////////////////////////////////////////////////
// action type
///////////////////////////////////////////////////////////
const ADD_REVIEW_LIST = "review/ADD_REVIEW_LIST";
const SET_PAGE_NUM = "review/SET_PAGE_NUM";
const SET_PAGE_NUM_BEST = "review/SET_PAGE_NUM_BEST";
const SET_TOTAL_REVIEW_COUNT = "review/SET_TOTAL_REVIEW_COUNT";
const IS_LAST = "review/IS_LAST";
const LOADING = "review/LOADING";
const ADD_REVIEW_LIKE = "review/ADD_REVIEW_LIKE";
const REMOVE_REVIEW_LIKE = "review/REMOVE_REVIEW_LIKE";
const ADD_STAR = "review/ADD_STAR";
const UPDATE_STAR = "review/UPDATE_STAR";
const UPDATE_REVIEW = "review/UPDATE_REVIEW";
const REMOVE_REVIEW_CONTENT = "review/REMOVE_REVIEW_CONTENT";
const CHANGE_AUTHOR_INFO = "review/CHANGE_AUTHOR_INFO";

///////////////////////////////////////////////////////////
// action creators
///////////////////////////////////////////////////////////
const addReviewList = createAction(
  ADD_REVIEW_LIST,
  (review_list, category) => ({
    review_list,
    category,
  })
);
const addReviewLike = createAction(ADD_REVIEW_LIKE, (reviewId) => ({
  reviewId,
}));
const removeReviewLike = createAction(REMOVE_REVIEW_LIKE, (reviewId) => ({
  reviewId,
}));

const setPage = createAction(SET_PAGE_NUM, (new_page_num) => ({
  new_page_num,
}));

const setPageBest = createAction(SET_PAGE_NUM_BEST, (best_page_num) => ({
  best_page_num,
}));

const setTotalReviewCount = createAction(
  SET_TOTAL_REVIEW_COUNT,
  (total_review_count) => ({
    total_review_count,
  })
);
const isLast = createAction(IS_LAST, (is_last) => ({
  is_last,
}));
const loading = createAction(LOADING, (is_loading_review) => ({
  is_loading_review,
}));

const addStar = createAction(ADD_STAR, (newReview) => ({
  newReview,
}));
const updateStar = createAction(UPDATE_STAR, (userPointNumber, reviewIdx) => ({
  userPointNumber,
  reviewIdx,
}));
const updateReview = createAction(
  UPDATE_REVIEW,
  (reviewId, reviewContent, createDate) => ({
    reviewId,
    reviewContent,
    createDate,
  })
);
const removeReviewContent = createAction(REMOVE_REVIEW_CONTENT, (reviewId) => ({
  reviewId,
}));
const changeAuthorInfo = createAction(
  CHANGE_AUTHOR_INFO,
  (curInfo, newInfo) => ({ curInfo, newInfo })
);

///////////////////////////////////////////////////////////
// thunks
///////////////////////////////////////////////////////////

// 메인 페이지의 베스트 리뷰 & 최신 리뷰 불러오기
const getMainReviewList = () => {
  return async function (dispatch, getState, { history }) {
    try {
      let {
        data: { bestReview, newReview },
      } = await reviewAPI.getMain();
      // createDate 올바르게 추가
      bestReview = bestReview.map((review) => {
        review.createDate = Date.parse(review.creatDate || review.createDate);
        return review;
      });
      // 리뷰에서 웹툰 데이터 추출 후, 웹툰 리스트에 추가.
      let bestReviewToons = bestReview.map((review) => {
        return {
          toonId: review.toonId,
          toonTitle: review.toonTitle,
          toonAuthor: review.toonAuthor,
          toonAvgPoint: review.toonAvgPoint,
          toonImg: review.toonImg,
          toonPlatform: review.toonPlatform,
          toonWeekday: review.toonWeekday,
          genres: review.genres || [],
        };
      });
      dispatch(webtoonActions.addToonList(bestReviewToons, "bestReview"));
      // 베스트 리뷰 추가
      dispatch(addReviewList(bestReview, "bestReview"));

      // createDate 올바르게 추가
      newReview = newReview.map((review) => {
        review.createDate = Date.parse(review.creatDate || review.createDate);
        return review;
      });

      // 리뷰에서 웹툰 데이터 추출 후 웹툰 리스트에 추가
      let newReviewToons = newReview.map((review) => {
        return {
          toonId: review.toonId,
          toonTitle: review.toonTitle,
          toonAuthor: review.toonAuthor,
          toonAvgPoint: review.toonAvgPoint,
          toonImg: review.toonImg,
          toonPlatform: review.toonPlatform,
          toonWeekday: review.toonWeekday,
          genres: review.genres || [],
        };
      });
      dispatch(webtoonActions.addToonList(newReviewToons, "newReview"));
      // 최근 리뷰 추가
      dispatch(addReviewList(newReview, "newReview"));
    } catch (err) {
      console.log(err);
    }
  };
};

// 리뷰 페이지의 최신순 리뷰 불러오기(Pagination, Infinity Scroll)
const getReviewList = (page_num) => {
  return async function (dispatch) {
    try {
      dispatch(loading(true));
      let {
        data: { reviews, likeReviewIdList, postCount },
      } = await reviewAPI.getOrderByCreatedAt(page_num);
      if (reviews.length === 0) {
        dispatch(isLast(true));
        dispatch(loading(false));
        return;
      }

      dispatch(setPage(page_num + 1)); //다음 페이지번호 설정(for무한스크롤)

      //리뷰에서 웹툰 리스트 분리/저장
      let reviewsToons = reviews.map((review) => {
        return {
          toonId: review.toonId,
          toonTitle: review.toonTitle,
          toonAuthor: review.toonAuthor,
          toonAvgPoint: review.toonAvgPoint,
          toonImg: review.toonImg,
          toonPlatform: review.toonPlatform,
          toonWeekday: review.toonWeekday,
          genres: review.genres,
        };
      });
      reviewsToons = reviewsToons.filter(
        (reviewsToon, idx) =>
          reviewsToons.findIndex(
            (toon) => toon.toonId === reviewsToon.toonId
          ) === idx
      );
      dispatch(webtoonActions.addToonList(reviewsToons, "reviewPage"));

      //리뷰 작성시간 parse
      reviews = reviews.map((review) => {
        review.createDate = Date.parse(review.creatDate || review.createDate);
        return review;
      });

      //리뷰 정보 저장 & 사용자가 좋아요 누른 리뷰 리스트 분리/저장
      dispatch(addReviewList(reviews, "reviewPage"));
      dispatch(setTotalReviewCount(postCount));
      likeReviewIdList &&
        dispatch(userActions.addReviewLikeList(likeReviewIdList));
    } catch (err) {
      console.log(err);
    }
  };
};

//좋아요 순 리뷰 불러오기
const getReviewListOrderByLike = (page_num) => {
  return async function (dispatch) {
    try {
      dispatch(loading(true));
      let {
        data: { reviews, likeReviewIdList, postCount },
      } = await reviewAPI.getOrderByLike(page_num);
      if (reviews.length === 0) {
        dispatch(isLast(true));
        dispatch(loading(false));
        return;
      }

      dispatch(setPageBest(page_num + 1));
      //리뷰에서 웹툰 리스트 분리/저장
      let reviewsToons = reviews.map((review) => {
        return {
          toonId: review.toonId,
          toonTitle: review.toonTitle,
          toonAuthor: review.toonAuthor,
          toonAvgPoint: review.toonAvgPoint,
          toonImg: review.toonImg,
          toonPlatform: review.toonPlatform,
          toonWeekday: review.toonWeekday,
          genres: review.genres,
        };
      });
      reviewsToons = reviewsToons.filter(
        (reviewsToon, idx) =>
          reviewsToons.findIndex(
            (toon) => toon.toonId === reviewsToon.toonId
          ) === idx
      );
      dispatch(webtoonActions.addToonList(reviewsToons, "reviewPageBest"));
      reviews = reviews.map((review) => {
        review.createDate = Date.parse(review.creatDate || review.createDate);
        return review;
      });

      //리뷰 정보 저장 & 사용자가 좋아요 누른 리뷰 리스트 분리/저장
      dispatch(addReviewList(reviews, "reviewPageBest"));
      dispatch(setTotalReviewCount(postCount));
      likeReviewIdList &&
        dispatch(userActions.addReviewLikeList(likeReviewIdList));
    } catch (err) {
      console.log(err);
    }
  };
};

// 리뷰 좋아요 토글
const likeReviewServer = (reviewId, bool) => {
  return async function (dispatch) {
    try {
      dispatch(loading(true));
      await reviewAPI.likeReview(reviewId);

      // 리뷰의 좋아요 수 조정 & 사용자가 좋아요 누른 리뷰 리스트 조정
      if (bool) {
        dispatch(userActions.addReviewLike(reviewId));
        dispatch(addReviewLike(reviewId));
      } else {
        dispatch(userActions.removeReviewLike(reviewId));
        dispatch(removeReviewLike(reviewId));
      }
      dispatch(loading(false));
    } catch (err) {
      console.log(err, "likeReviewError");
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
      }
      dispatch(loading(false));
    }
  };
};

// 웹툰 별점 생성 및 수정
const putStarServer = (webtoonId, userPointNumber) => {
  return async function (dispatch, getState) {
    try {
      dispatch(loading(true));
      const {
        data: { reviewId, toonAvgPoint },
      } = await reviewAPI.putStar({ toonId: webtoonId, userPointNumber });

      // 별점(리뷰) 작성한 유저 정보 불러오기
      const { userName, userImg, userGrade } = getState().user.info;

      // 내가 쓴 리뷰가 있는지 확인.
      // 있으면, 웹툰 평균평점 수정 및 내 리뷰의 별점 수정
      // 없으면, 웹툰 평균평점 수정 및 새로운 리뷰 데이터 추가
      const myReviewIdx = getState().review.review_list.findIndex(
        (review) => review.reviewId === reviewId && review.userName === userName
      );
      if (myReviewIdx !== -1) {
        dispatch(webtoonActions.setToonAvgPoint(toonAvgPoint, webtoonId));
        dispatch(updateStar(userPointNumber, myReviewIdx));
      } else {
        const newReview = {
          reviewId,
          toonId: webtoonId,
          userName,
          userImg,
          userGrade,
          userPointNumber,
          likeCount: 0,
          filterConditions: [],
        };
        dispatch(webtoonActions.setToonAvgPoint(toonAvgPoint, webtoonId));
        dispatch(addStar(newReview));
      }
      dispatch(loading(false));
    } catch (err) {
      console.log(err, "putStarError");
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
      }
      dispatch(loading(false));
    }
  };
};

//리뷰 작성
const updateReviewServer = (reviewId, reviewContent, from_detail) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));

      //서버에서 받아온 리뷰 작성일 포함해 리뷰 저장
      const {
        data: { createDate },
      } = await reviewAPI.putReview({ reviewId, reviewContent });
      const { toonId } = getState().review.review_list.find(
        (review) => review.reviewId === reviewId
      );
      let createDateParse = Date.parse(createDate);
      dispatch(updateReview(reviewId, reviewContent, createDateParse));

      //작성 후 페이지 이동
      if (from_detail) {
        history.push({
          pathname: `/detail/${toonId}`,
          state: { from_detail: true },
        });
      } else {
        history.replace(`/detail/${toonId}`);
      }
      dispatch(loading(false));
    } catch (err) {
      console.log(err, "uploadReviewError");
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
      }
      dispatch(loading(false));
    }
  };
};

//리뷰 삭제
const removeReviewContentServer = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      await reviewAPI.deleteReview(reviewId);
      dispatch(removeReviewContent(reviewId));
      dispatch(loading(false));
    } catch (err) {
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
      } else {
        console.log(err, "removeReviewError");
        dispatch(modalActions.activeModal("error"));
      }
      dispatch(loading(false));
    }
  };
};

///////////////////////////////////////////////////////////
// initialState & reducer
///////////////////////////////////////////////////////////
const initialState = {
  review_list: [],
  new_page_num: 1,
  best_page_num: 1,
  total_review_count: 0,
  is_last: false,
  is_loading_review: false,
};

export default handleActions(
  {
    // 리뷰 리스트 추가(중복 여부에 따라 카테고리 생성)
    [ADD_REVIEW_LIST]: (state, action) =>
      produce(state, (draft) => {
        action.payload.review_list.map((review) => {
          const reviewIdx = draft.review_list.findIndex(
            (totalReview) => totalReview.reviewId === review.reviewId
          );
          if (reviewIdx === -1) {
            if (action.payload.category) {
              review.filterConditions = [action.payload.category];
            }
            draft.review_list.push(review);
          } else {
            if (action.payload.category) {
              draft.review_list[reviewIdx].filterConditions.push(
                action.payload.category
              );
            }
            draft.review_list[reviewIdx] = {
              ...draft.review_list[reviewIdx],
              ...review,
            };
          }
        });
        draft.is_loading_review = false;
      }),
    [ADD_REVIEW_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.review_list.findIndex(
          (review) => review.reviewId === action.payload.reviewId
        );
        ++draft.review_list[idx].likeCount;
      }),
    [REMOVE_REVIEW_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.review_list.findIndex(
          (review) => review.reviewId === action.payload.reviewId
        );
        --draft.review_list[idx].likeCount;
      }),
    [SET_PAGE_NUM]: (state, action) =>
      produce(state, (draft) => {
        draft.new_page_num = action.payload.new_page_num;
      }),
    [SET_PAGE_NUM_BEST]: (state, action) =>
      produce(state, (draft) => {
        draft.best_page_num = action.payload.best_page_num;
      }),
    [SET_TOTAL_REVIEW_COUNT]: (state, action) =>
      produce(state, (draft) => {
        draft.total_review_count = action.payload.total_review_count;
      }),
    [IS_LAST]: (state, action) =>
      produce(state, (draft) => {
        draft.is_last = action.payload.is_last;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading_review = action.payload.is_loading_review;
      }),
    [ADD_STAR]: (state, action) =>
      produce(state, (draft) => {
        draft.review_list.unshift(action.payload.newReview);
      }),
    [UPDATE_STAR]: (state, action) =>
      produce(state, (draft) => {
        draft.review_list[action.payload.reviewIdx].userPointNumber =
          action.payload.userPointNumber;
      }),
    [UPDATE_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.review_list.findIndex(
          (review) => review.reviewId === action.payload.reviewId
        );
        if (idx !== -1) {
          draft.review_list[idx].createDate = action.payload.createDate;
          draft.review_list[idx].reviewContent = action.payload.reviewContent;
        }
      }),
    [REMOVE_REVIEW_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.review_list.findIndex(
          (review) => review.reviewId === action.payload.reviewId
        );
        draft.review_list[idx].createDate = "";
        draft.review_list[idx].reviewContent = "";
      }),
    [CHANGE_AUTHOR_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.review_list.map((review) => {
          if (review.userName === action.payload.curInfo.userName) {
            review.userName = action.payload.newInfo.userName;
            review.userImg = action.payload.newInfo.userImg;
          }
        });
      }),
  },
  initialState
);

const actionCreators = {
  getMainReviewList,
  addReviewList,
  getReviewList,
  getReviewListOrderByLike,
  likeReviewServer,
  putStarServer,
  updateReviewServer,
  removeReviewContentServer,
  isLast,
  changeAuthorInfo,
};

export { actionCreators };
