import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { webtoonAPI, meAPI, offerAPI, reviewAPI } from "../../shared/API";

const SET_TOON_ONE = "SET_TOON_ONE";
const SET_REVIEW_ID = "SET_REVIEW_ID";
const SET_WEBTOONI_RANK = "SET_WEBTOONI_RANK";
const SET_NAVER_RANK = "SET_NAVER_RANK";
const SET_KAKAO_RANK = "SET_KAKAO_RANK";
const LOADING = "IS_LOADING";

const setToonOne = createAction(SET_TOON_ONE, (toon) => ({ toon }));
const setReviewId = createAction(SET_REVIEW_ID, (review_id) => ({ review_id }));
const setWebtooniRank = createAction(SET_WEBTOONI_RANK, (webtooni_rank) => ({
  webtooni_rank,
}));
const setNaverRank = createAction(SET_NAVER_RANK, (naver_rank) => ({
  naver_rank,
}));
const setKakaoRank = createAction(SET_KAKAO_RANK, (kakao_rank) => ({
  kakao_rank,
}));
const Loading = createAction(LOADING, (is_loading) => ({ is_loading }));

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
  webtooni_rank: [],
  naver_rank: [],
  kakao_rank: [],
  review_id: "", //별점 준 후 받아온 리뷰 아이디
  is_loading: false,
};

//이번 달 웹투니버스 순위 받아오기
const getWebtooniRank = () => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(Loading(true));
      const response = await webtoonAPI.getRank();
      dispatch(setWebtooniRank(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//네이버 웹툰 순위 받아오기
const getNaverRank = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await webtoonAPI.getNaverRank();
      dispatch(setNaverRank(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//카카오 웹툰 순위 받아오기
const getKakaoRank = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await webtoonAPI.getKakaoRank();
      dispatch(setKakaoRank(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//웹툰 상세정보 받아오기
const getToonOneServer = (id = null) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await webtoonAPI.getOne(id);
      console.log(response, "getToonOneOK");
      dispatch(setToonOne(response.data));
    } catch (err) {
      console.log(err, "getToonOneError");
      alert("게시글 정보가 없어요");
      history.replace("/");
    }
  };
};

//웹툰 리스트에 추가
const addToonServer = (id = null) => {
  return async function (dispatch) {
    try {
      const response = await meAPI.addWebtoon(id);
      console.log(response, "addToonOK");
    } catch (err) {
      console.log(err, "addToonError");
    }
  };
};

//비슷한 웹툰 추천
const similarToonServer = (id = null) => {
  return async function (dispatch) {
    try {
      const response = await offerAPI.getSimilarGenre(id);
      console.log(response, "similarToonOK");
    } catch (err) {
      console.log(err, "similarToonError");
    }
  };
};

//리뷰 작성
const uploadReviewServer = (rewviewId = null, reviewContent = null) => {
  return async function (dispatch) {
    try {
      const response = await reviewAPI.putReview({ rewviewId, reviewContent });
      console.log(response, "uploadReviewOK");
    } catch (err) {
      console.log(err, "uploadReviewError");
    }
  };
};

//리뷰 삭제
const deleteReviewServer = (reviewId = null) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await reviewAPI.deleteReview(reviewId);
      console.log(response, "deleteReviewOK");
      history.replace("/");
    } catch (err) {
      console.log(err, "deleteReviewError");
      alert("리뷰 정보가 없어요");
      history.replace("/");
    }
  };
};

//웹툰 별점 주기
const putStarServer = (webtoonId = null, userPointNumber = null) => {
  return async function (dispatch) {
    try {
      const response = await reviewAPI.putStar({ webtoonId, userPointNumber });
      console.log(response, "putStarOK");
      dispatch(setReviewId(response.data.reviewId)); //리뷰 아이디 생성
    } catch (err) {
      console.log(err, "putStarError");
    }
  };
};

//리뷰 좋아요 토글 : 로그인 유저의 기존 좋아요 여부를 상세 api로 받아야 함 + 리듀서 액션 추가
const likeReviewServer = (reviewId = null) => {
  return async function (dispatch) {
    try {
      const response = await reviewAPI.likeReview(reviewId);
      console.log(response, "likeReviewOK");
    } catch (err) {
      console.log(err, "likeReviewError");
    }
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
    [SET_WEBTOONI_RANK]: (state, action) =>
      produce(state, (draft) => {
        draft.webtooni_rank = action.payload.webtooni_rank;
        draft.is_loading = false;
      }),
    [SET_NAVER_RANK]: (state, action) =>
      produce(state, (draft) => {
        draft.naver_rank = action.payload.naver_rank;
      }),
    [SET_KAKAO_RANK]: (state, action) =>
      produce(state, (draft) => {
        draft.kakao_rank = action.payload.kakao_rank;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getToonOneServer,
  addToonServer,
  similarToonServer,
  uploadReviewServer,
  deleteReviewServer,
  putStarServer,
  likeReviewServer,
  getWebtooniRank,
  getNaverRank,
  getKakaoRank,
};

export { actionCreators };
