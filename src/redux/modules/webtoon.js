import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { webtoonAPI, meAPI, offerAPI, reviewAPI } from "../../shared/API";

const SET_TOON_ONE = "SET_TOON_ONE";
const SET_REVIEW_ID = "SET_REVIEW_ID";

const setToonOne = createAction(SET_TOON_ONE, (toon) => ({ toon }));
const setReviewId = createAction(SET_REVIEW_ID, (review_id) => ({ review_id }));

const initialState = {
  toon_one: {
    toonImg:
      "https://cdn.pixabay.com/photo/2018/01/10/23/53/rabbit-3075088_640.png",
    toonTitle: "여신강림",
    toonAuthor: "야옹이",
    webtoonGenre: ["스토리", "로맨스"],
    toonAge: "12세 이용가",
    realUrl:
      "https://comic.naver.com/webtoon/detail?titleId=703846&no=171&weekday=true",
    toonAvgPoint: 4.8,
    toonPointCount: 30,
    toonContent:
      "네웹 대표 글로벌 인기작! 주경, 수호, 서준. 세 청춘의 두근두근 눈호강 로맨스~♡",
    toonWeekday: "월",
    toonFlatform: "네이버",
    reviewCount: 14,
    finished: 0,
    reviews: [
      { id: 1, reviewContent: "리뷰내용", userPointNumber: 2, likeCount: 20 },
      { id: 1, reviewContent: "리뷰내용", userPointNumber: 2, likeCount: 20 },
    ],
  },
  my_list: [],
  similar_list: [
    {
      toonImg:
        "https://cdn.pixabay.com/photo/2018/01/10/23/53/rabbit-3075088_640.png",
      toonTitle: "1여신강림",
      toonAuthor: "야옹이",
      toonFlatform: "네이버",
      toonWeekday: ["월", "목"],
      toonAvgPoint: 4.8,
      totalPointCount: 20,
    },
    {
      toonImg:
        "https://cdn.pixabay.com/photo/2018/01/10/23/53/rabbit-3075088_640.png",
      toonTitle: "2여신강림",
      toonAuthor: "야옹이",
      toonFlatform: "네이버",
      toonWeekday: ["월", "목"],
      toonAvgPoint: 4.8,
      totalPointCount: 20,
    },
    {
      toonImg:
        "https://cdn.pixabay.com/photo/2018/01/10/23/53/rabbit-3075088_640.png",
      toonTitle: "3여신강림",
      toonAuthor: "야옹이",
      toonFlatform: "네이버",
      toonWeekday: ["월", "목"],
      toonAvgPoint: 4.8,
      totalPointCount: 20,
    },
    {
      toonImg:
        "https://cdn.pixabay.com/photo/2018/01/10/23/53/rabbit-3075088_640.png",
      toonTitle: "4여신강림",
      toonAuthor: "야옹이",
      toonFlatform: "네이버",
      toonWeekday: ["월", "목"],
      toonAvgPoint: 4.8,
      totalPointCount: 20,
    },
  ],
  review_id: "", //별점 준 후 받아온 리뷰 아이디
};

//웹툰 상세정보 받아오기
const getToonOneServer = (id = null) => {
  return function (dispatch, getState, { history }) {
    webtoonAPI
      .getOne(id)
      .then(function (response) {
        console.log(response, "getToonOneOK");
        dispatch(setToonOne(response.data));
      })
      .catch(function (err) {
        console.log(err, "getToonOneError");
      });
  };
};

//웹툰 리스트에 추가
const addToonServer = (id = null) => {
  return function (dispatch) {
    meAPI
      .addWebtoon(id)
      .then(function (response) {
        console.log(response, "addToonOK");
      })
      .catch(function (err) {
        console.log(err, "addToonError");
      });
  };
};

//비슷한 웹툰 추천
const similarToonServer = (id = null) => {
  return function (dispatch) {
    offerAPI
      .getSimilarGenre(id)
      .then(function (response) {
        console.log(response, "similarToonOK");
      })
      .catch(function (err) {
        console.log(err, "similarToonError");
      });
  };
};

//리뷰 작성
const uploadReviewServer = (rewviewId = null, reviewContent = null) => {
  return function (dispatch) {
    reviewAPI
      .putReview({ rewviewId, reviewContent })
      .then(function (response) {
        console.log(response, "uploadReviewOK");
      })
      .catch(function (err) {
        console.log(err, "uploadReviewError");
      });
  };
};

//리뷰 삭제
const deleteReviewServer = (reviewId = null) => {
  return function (dispatch) {
    reviewAPI
      .deleteReview(reviewId)
      .then(function (response) {
        console.log(response, "deleteReviewOK");
      })
      .catch(function (err) {
        console.log(err, "deleteReviewError");
      });
  };
};

//웹툰 별점 주기
const putStarServer = (webtoonId = null, userPointNumber = null) => {
  return function (dispatch) {
    reviewAPI
      .putStar({ webtoonId, userPointNumber })
      .then(function (response) {
        console.log(response, "putStarOK");
        dispatch(setReviewId(response.data.reviewId)); //리뷰 아이디 생성
      })
      .catch(function (err) {
        console.log(err, "putStarError");
      });
  };
};

//웹툰 별점 주기
const likeReviewServer = (reviewId = null) => {
  return function (dispatch) {
    reviewAPI
      .likeReview(reviewId)
      .then(function (response) {
        console.log(response, "likeReviewOK");
      })
      .catch(function (err) {
        console.log(err, "likeReviewError");
      });
  };
};

export default handleActions(
  {
    [SET_TOON_ONE]: (state, action) =>
      produce(state, (draft) => {
        draft.toon_one = action.payload.toon;
      }),
    [SET_REVIEW_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.review_id = action.payload.review_id;
      }),
  },
  initialState
);

export {
  getToonOneServer,
  addToonServer,
  similarToonServer,
  uploadReviewServer,
  deleteReviewServer,
  putStarServer,
  likeReviewServer,
};