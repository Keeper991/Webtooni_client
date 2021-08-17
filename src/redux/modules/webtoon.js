import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { webtoonAPI, offerAPI } from "../../shared/API";
import { actionCreators as userActions } from "./user";
import { actionCreators as reviewActions } from "./review";
import { actionCreators as reviewerActions } from "./reviewer";

const ADD_TOON_LIST = "webtoon/ADD_TOON_LIST";
const ADD_TOON_ONE = "webtoon/ADD_TOON_ONE";
const ADD_TOON_ONE_INFO = "webtoon/ADD_TOON_ONE_INFO";
const SET_TOON_AVG_POINT = "webtoon/SET_TOON_AVG_POINT";
const START_LOADING = "webtoon/START_LOADING";
const END_LOADING = "webtoon/END_LOADING";

///////////////////////////////////////////////////////////
// action Creators
///////////////////////////////////////////////////////////

const addToonList = createAction(ADD_TOON_LIST, (toons, category) => ({
  toons,
  category,
}));
const addToonOne = createAction(ADD_TOON_ONE, (toonOne, category) => ({
  toonOne,
  category,
}));
const addToonOneInfo = createAction(
  ADD_TOON_ONE_INFO,
  (toonOne, toonIdx, category) => ({
    toonOne,
    toonIdx,
    category,
  })
);
const setToonAvgPoint = createAction(
  SET_TOON_AVG_POINT,
  (toonAvgPoint, toonId) => ({ toonAvgPoint, toonId })
);
const startLoading = createAction(START_LOADING, () => ({}));
const endLoading = createAction(END_LOADING, () => ({}));

///////////////////////////////////////////////////////////
// thunks
///////////////////////////////////////////////////////////

// Top 10 3종 불러오기
const getRankWebtoonList = () => async (dispatch, getState) => {
  try {
    const { data: webtooniToons } = await webtoonAPI.getWebtooniRank();
    dispatch(addToonList(webtooniToons, "webtooni"));
    const { data: naverToons } = await webtoonAPI.getNaverRank();
    dispatch(addToonList(naverToons, "naver"));
    const { data: kakaoToons } = await webtoonAPI.getKakaoRank();
    dispatch(addToonList(kakaoToons, "kakao"));
  } catch (e) {
    console.log(e);
    alert("웹툰 리스트를 불러오는데에 실패했습니다.");
  }
};

// ~님을 위한 추천 불러오기
const getForUserWebtoonList = () => async (dispatch, getState) => {
  try {
    const { data: forUserToons } = await offerAPI.getForUser();
    dispatch(addToonList(forUserToons, "forUser"));
  } catch (e) {
    console.log(e);
    alert("웹툰 리스트를 불러오는데에 실패했습니다.");
  }
};

// 베스트 리뷰어(웹툰 평론가)의 추천 웹툰 받아오기
const getBestReviewerOfferWebtoonList = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const {
        data: {
          userInfoOnlyResponseDto: bestReviewerOfferUserInfo,
          webtoonAndGenreResponseDtos: bestReviewerOfferToons,
        },
      } = await offerAPI.getBestReviewersChoice();
      dispatch(addToonList(bestReviewerOfferToons, "bestReviewerOffer"));
      dispatch(
        reviewerActions.setBestReviewerOfferUserInfo(bestReviewerOfferUserInfo)
      );
    } catch (err) {
      console.log(err);
      alert("웹툰 리스트를 불러오는데에 실패했습니다.");
    }
  };
};

// 로그인 유저를 위한 추천 웹툰 리스트 받아오기 (비슷한 취향의 유저, MD, 완결작)
const getOfferWebtoonListForLogin = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data: similarUserOfferToons } =
        await offerAPI.getSimilarUsersChoice();
      dispatch(addToonList(similarUserOfferToons, "similarUserOffer"));
      const { data: endOfferToons } = await offerAPI.getEnd();
      dispatch(addToonList(endOfferToons, "endOffer"));
      const { data: mdOfferToons } = await offerAPI.getMd();
      dispatch(addToonList([mdOfferToons], "mdOffer"));
    } catch (err) {
      console.log(err);
      alert("웹툰 리스트를 불러오는데에 실패했습니다.");
    }
  };
};

//웹툰 상세정보 받아오기
const getToonOneServer = (webtoonId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const {
        data: { userLikeReviewList, myListOrNot, ...toonInfo },
      } = await webtoonAPI.getOne(webtoonId);
      let { data: similarGenreToons } = await offerAPI.getSimilarGenre(
        webtoonId
      );
      // 로그인한 유저가 좋아요한 리뷰 리스트 추가.
      userLikeReviewList &&
        dispatch(userActions.addReviewLikeList(userLikeReviewList));

      // 구독한 경우 구독 리스트 추가
      myListOrNot && dispatch(userActions.subscribe(webtoonId));

      // 비슷한 장르 웹툰 리스트 추가
      // 중복제거
      similarGenreToons = similarGenreToons.filter(
        (toon, idx) =>
          similarGenreToons.findIndex(
            (_toon) => _toon.toonId === toon.toonId
          ) === idx
      );
      dispatch(addToonList(similarGenreToons, webtoonId));

      // 리뷰 리스트를 리뷰 모듈의 리뷰 리스트에 추가
      let reviews = toonInfo.reviews;
      reviews = reviews.map((review) => {
        review.toonId = webtoonId;
        return review;
      });
      dispatch(reviewActions.addReviewList(reviews, "detail"));

      // 웹툰 상세 정보 추가
      const idx = getState().webtoon.toon_list.findIndex(
        (toon) => toon.toonId === webtoonId
      );
      if (idx !== -1) {
        dispatch(addToonOneInfo(toonInfo, idx, "detail"));
      } else {
        toonInfo.toonId = webtoonId;
        dispatch(addToonOne(toonInfo, "detail"));
      }
    } catch (err) {
      console.log(err, "getToonOneError");
      // alert("게시글 정보가 없어요");
      // history.replace("/");
    }
  };
};

const initialState = {
  toon_list: [],
  is_loading: false,
};

export default handleActions(
  {
    [ADD_TOON_LIST]: (state, action) =>
      produce(state, (draft) => {
        action.payload.toons.map((toon) => {
          const toonIdx = draft.toon_list.findIndex(
            (totalToon) => totalToon.toonId === toon.toonId
          );
          if (toonIdx === -1) {
            if (action.payload.category) {
              toon.filterConditions = [action.payload.category];
            }
            draft.toon_list.push(toon);
          } else {
            if (action.payload.category) {
              draft.toon_list[toonIdx].filterConditions.push(
                action.payload.category
              );
            }
            draft.toon_list[toonIdx] = { ...draft.toon_list[toonIdx], ...toon };
          }
        });
      }),
    [ADD_TOON_ONE_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.toon_list[action.payload.toonIdx].filterConditions.push(
          action.payload.category
        );

        draft.toon_list[action.payload.toonIdx] = {
          ...draft.toon_list[action.payload.toonIdx],
          ...action.payload.toonOne,
        };
      }),
    [ADD_TOON_ONE]: (state, action) =>
      produce(state, (draft) => {
        action.payload.toonOne.filterConditions = ["detail"];
        draft.toon_list.push(action.payload.toonOne);
      }),
    [SET_TOON_AVG_POINT]: (state, action) =>
      produce(state, (draft) => {
        const toonIdx = draft.toon_list.findIndex(
          (toon) => toon.toonId === action.payload.toonId
        );
        draft.toon_list[toonIdx].toonAvgPoint = action.payload.toonAvgPoint;
      }),

    [START_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = true;
      }),
    [END_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = false;
      }),
  },
  initialState
);

const actionCreators = {
  getRankWebtoonList,
  getForUserWebtoonList,
  getBestReviewerOfferWebtoonList,
  getOfferWebtoonListForLogin,
  getToonOneServer,
  addToonList,
  setToonAvgPoint,
  // 미사용중..
  startLoading,
  endLoading,
};

export { actionCreators };
