import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { webtoonAPI, userAPI, offerAPI, reviewAPI } from "../../shared/API";

const SET_TOON_ONE = "SET_TOON_ONE";
const SET_REVIEW_ID = "SET_REVIEW_ID";
const SET_WEBTOONI_RANK = "SET_WEBTOONI_RANK";
const SET_NAVER_RANK = "SET_NAVER_RANK";
const SET_KAKAO_RANK = "SET_KAKAO_RANK";
const SET_USER_OFFER = "SET_USER_OFFER";
const SET_BEST_REVIEWER_OFFER = "SET_BEST_REVIEWER_OFFER";
const SET_SIMILAR_USER_OFFER = "SET_SIMILAR_USER_OFFER";
const SET_END_TOON_OFFER = "SET_END_TOON_OFFER";
const SET_UNWRITTEN_OFFER = "SET_UNWRITTEN_OFFER";
const LOADING = "IS_LOADING";

const setToonOne = createAction(SET_TOON_ONE, (toon, toon_id) => ({
  toon,
  toon_id,
}));
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
const setUserOffer = createAction(SET_USER_OFFER, (user_offer) => ({
  user_offer,
}));
const setBestReviewerOffer = createAction(
  SET_BEST_REVIEWER_OFFER,
  (best_reviewer_offer) => ({
    best_reviewer_offer,
  })
);
const setSimilarUserOffer = createAction(
  SET_SIMILAR_USER_OFFER,
  (similar_user_offer) => ({
    similar_user_offer,
  })
);

const setEndToonOffer = createAction(SET_END_TOON_OFFER, (end_toon) => ({
  end_toon,
}));

const setUnwrittenOffer = createAction(
  SET_UNWRITTEN_OFFER,
  (unwritten_offer) => ({
    unwritten_offer,
  })
);

const Loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  toon_list: [],
  toon_one: {
    userLikeReviewList: [616],
    toonImg:
      "https://shared-comic.pstatic.net/thumb/webtoon/654138/thumbnail/thumbnail_IMAG06_c68850e6-bfa1-4dc8-b6bf-c04ecb8cc69e.jpg",
    toonTitle: "은주의 방 2~3부",
    toonAuthor: "노란구미",
    toonGenre: ["스토리", "드라마"],
    toonAge: "전체연령가",
    realUrl: "https://comic.naver.com/webtoon/list?titleId=654138&weekday=tue",
    toonAvgPoint: 3.5,
    totalPointCount: 1,
    toonContent: "인테리어에서 연애까지, 은주의 라이프 체인지 스토리",
    toonWeekday: "화",
    toonPlatform: "네이버",
    reviewCount: 1,
    finished: false,
    reviews: [
      {
        userName: "wonhee",
        userImg: 4,
        reviewId: 500,
        userGrade: "FIRST",
        reviewContent: "수정 테스트2",
        userPointNumber: 3.5,
        likeCount: 0,
        createDate: "2021-08-11T17:41:05",
      },
    ],
    myListOrNot: true,
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
  user_offer: [],
  best_reviewer_offer: [],
  review_id: "", //별점 준 후 받아온 리뷰 아이디
  similar_user_offer: [],
  end_toon: [],
  unwritten_offer: [],
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

//유저 맞춤 추천 웹툰 받아오기
const getUserOffer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await offerAPI.getForUser();
      dispatch(setUserOffer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//베스트 리뷰어의 추천 웹툰 받아오기
const getBestReviewerOffer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await offerAPI.getBestReviewersChoice();
      console.log(response);
      dispatch(setBestReviewerOffer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//유저와 비슷한 취향을 가진 사용자가 많이 본 웹툰 받아오기
const getSimilarUserOffer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await offerAPI.getSimilarUsersChoice();
      console.log(response);
      dispatch(setSimilarUserOffer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//완결 웹툰 받아오기
const getEndToonOffer = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await offerAPI.getEnd();
      console.log(response);
      dispatch(setEndToonOffer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//웹툰 상세정보 받아오기
const getToonOneServer = (id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await webtoonAPI.getOne(id);
      console.log(response, "getToonOneOK");
      dispatch(setToonOne(response.data, id));
    } catch (err) {
      console.log(err, "getToonOneError");
      alert("게시글 정보가 없어요");
      // history.replace("/");
    }
  };
};

//웹툰 리스트에 추가
const addToonServer = (id) => {
  return async function (dispatch) {
    try {
      const response = await userAPI.addWebtoon(id);
      console.log(response, "addToonOK");
    } catch (err) {
      console.log(err, "addToonError");
    }
  };
};

//비슷한 웹툰 추천
const similarToonServer = (id) => {
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
const uploadReviewServer = (reviewId, reviewContent) => {
  return async function (dispatch) {
    try {
      const response = await reviewAPI.putReview({ reviewId, reviewContent });
      console.log(response, "uploadReviewOK");
    } catch (err) {
      console.log(err, "uploadReviewError");
    }
  };
};

//리뷰 삭제
const deleteReviewServer = (reviewId) => {
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
const putStarServer = (webtoonId, userPointNumber) => {
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
const likeReviewServer = (reviewId) => {
  return async function (dispatch) {
    try {
      const response = await reviewAPI.likeReview(reviewId);
      console.log(response, "likeReviewOK");
    } catch (err) {
      console.log(err, "likeReviewError");
    }
  };
};

//리뷰가 미작성된 웹툰 받아오기
const getUnwrittenOffer = () => {
  return async function (dispatch) {
    try {
      const response = await reviewAPI.getUnwritten();
      dispatch(setUnwrittenOffer(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [SET_TOON_ONE]: (state, action) =>
      produce(state, (draft) => {
        //웹툰 id 추가해 넣기
        const _list = draft.toon_list;
        draft.toon_one = _list.map((_) => {
          _.toonId = action.payload.toon_id;
          return _;
        });
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
    [SET_USER_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_offer = action.payload.user_offer;
      }),
    [SET_BEST_REVIEWER_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.best_reviewer_offer = action.payload.best_reviewer_offer;
      }),
    [SET_SIMILAR_USER_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.similar_user_offer = action.payload.similar_user_offer;
      }),
    [SET_END_TOON_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.end_toon = action.payload.end_toon;
      }),
    [SET_UNWRITTEN_OFFER]: (state, action) =>
      produce(state, (draft) => {
        draft.unwritten_offer = action.payload.unwritten_offer;
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
  getUserOffer,
  getBestReviewerOffer,
  getSimilarUserOffer,
  getEndToonOffer,
  getUnwrittenOffer,
};

export { actionCreators };
