import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { reviewAPI } from "../../shared/API";
import { actionCreators as webtoonActions } from "./webtoon";
import { actionCreators as userActions } from "./user";

const ADD_REVIEW_LIST = "review/ADD_REVIEW_LIST";
const SET_PAGE_NUM = "review/SET_PAGE_NUM";
const SET_TOTAL_REVIEW_COUNT = "review/SET_TOTAL_REVIEW_COUNT";
const IS_LAST = "review/IS_LAST";
const LOADING = "review/LOADING";
const ADD_REVIEW_LIKE = "review/ADD_REVIEW_LIKE";
const REMOVE_REVIEW_LIKE = "review/REMOVE_REVIEW_LIKE";
const ADD_STAR = "review/ADD_STAR";
const UPDATE_STAR = "review/UPDATE_STAR";
const UPDATE_REVIEW = "review/UPDATE_REVIEW";
const REMOVE_REVIEW_CONTENT = "review/REMOVE_REVIEW_CONTENT";

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

const setPage = createAction(SET_PAGE_NUM, (page_num) => ({
  page_num,
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
// 리뷰 페이지의 리뷰 불러오기(Pagination, Infinity Scroll)
const getReviewList = (page_num) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      let {
        data: { reviews, likeReviewIdList, postCount },
      } = await reviewAPI.getOrderByCreatedAt(page_num);
      if (reviews.length === 0) {
        return dispatch(isLast(true));
      }

      dispatch(setPage(page_num + 1));
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
      reviews = reviews.map((review) => {
        review.createDate = review.creatDate || review.createDate;
        return review;
      });
      dispatch(addReviewList(reviews, "reviewPage"));
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
      await reviewAPI.likeReview(reviewId);
      if (bool) {
        dispatch(userActions.addReviewLike(reviewId));
        dispatch(addReviewLike(reviewId));
      } else {
        dispatch(userActions.removeReviewLike(reviewId));
        dispatch(removeReviewLike(reviewId));
      }
    } catch (err) {
      console.log(err, "likeReviewError");
    }
  };
};

// 웹툰 별점 주기 및 수정
const putStarServer = (webtoonId, userPointNumber) => {
  return async function (dispatch, getState) {
    try {
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
    } catch (err) {
      console.log(err, "putStarError");
    }
  };
};

//리뷰 작성
const updateReviewServer = (reviewId, reviewContent, from_detail) => {
  return async function (dispatch, getState, { history }) {
    try {
      const {
        data: { createDate },
      } = await reviewAPI.putReview({ reviewId, reviewContent });
      const { toonId } = getState().review.review_list.find(
        (review) => review.reviewId === reviewId
      );
      dispatch(updateReview(reviewId, reviewContent, createDate));
      if (from_detail) {
        history.push({
          pathname: `/detail/${toonId}`,
          state: { from_detail: true },
        });
      } else {
        history.replace(`/detail/${toonId}`);
      }
    } catch (err) {
      console.log(err, "uploadReviewError");
    }
  };
};

//리뷰 삭제
const removeReviewContentServer = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    try {
      await reviewAPI.deleteReview(reviewId);
      dispatch(removeReviewContent(reviewId));
    } catch (err) {
      console.log(err, "removeReviewError");
      alert("리뷰 정보가 없어요");
      history.replace("/");
    }
  };
};

///////////////////////////////////////////////////////////
// initialState & reducer
///////////////////////////////////////////////////////////
const initialState = {
  review_list: [],
  page_num: 1,
  total_review_count: 0,
  is_last: false,
  is_loading_review: false,
};

export default handleActions(
  {
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
        draft.page_num = action.payload.page_num;
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
  },
  initialState
);

const actionCreators = {
  getMainReviewList,
  addReviewList,
  getReviewList,
  likeReviewServer,
  putStarServer,
  updateReviewServer,
  removeReviewContentServer,
};

export { actionCreators };
