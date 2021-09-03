import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { webtoonAPI, offerAPI } from "../../shared/API";
import { actionCreators as userActions } from "./user";
import { actionCreators as reviewActions } from "./review";
import { actionCreators as reviewerActions } from "./reviewer";
import { actionCreators as modalActions } from "./modal";
import { userScoreConvert } from "../../shared/common";

///////////////////////////////////////////////////////////
// action type
///////////////////////////////////////////////////////////
const ADD_TOON_LIST = "webtoon/ADD_TOON_LIST";
const ADD_TOON_ONE = "webtoon/ADD_TOON_ONE";
const ADD_TOON_ONE_INFO = "webtoon/ADD_TOON_ONE_INFO";
const SET_TOON_AVG_POINT = "webtoon/SET_TOON_AVG_POINT";
const START_LOADING = "webtoon/START_LOADING";
const END_LOADING = "webtoon/END_LOADING";
const REMOVE_FOR_USER_FILTER_CONDITION =
  "webtoon/REMOVE_FOR_USER_FILTER_CONDITION";
const SET_CALLED_FOR_USER = "webtoon/SET_CALLED_FOR_USER";

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
const removeForUserFilterCondition = createAction(
  REMOVE_FOR_USER_FILTER_CONDITION,
  () => ({})
);
const setCalledForUser = createAction(SET_CALLED_FOR_USER, () => ({}));

///////////////////////////////////////////////////////////
// thunks
///////////////////////////////////////////////////////////

// Top 10 3종 불러오기
const getRankWebtoonList = () => async (dispatch, getState) => {
  try {
    let { data: webtooniToons } = await webtoonAPI.getWebtooniRank();
    webtooniToons = webtooniToons.map((toon) => {
      toon.genres = toon.genres || []; //장르 속성 항상 추가(for 장르 정보가 없는 경우의 에러 방지)
      toon.fixedAvgPoint = toon.toonAvgPoint; //fixedAvgPoint 속성 추가(for 웹툰 평점 변경 후에도 기존의 고정된 평점 필요(메인페이지 랭킹 용))
      return toon;
    });
    dispatch(addToonList(webtooniToons, "webtooni"));
    let { data: naverToons } = await webtoonAPI.getNaverRank();
    naverToons = naverToons.map((toon) => {
      toon.genres = toon.genres || [];
      toon.fixedAvgPoint = toon.toonAvgPoint;
      return toon;
    });
    dispatch(addToonList(naverToons, "naver"));
    let { data: kakaoToons } = await webtoonAPI.getKakaoRank();
    kakaoToons = kakaoToons.map((toon) => {
      toon.genres = toon.genres || [];
      toon.fixedAvgPoint = toon.toonAvgPoint;
      return toon;
    });
    dispatch(addToonList(kakaoToons, "kakao"));
  } catch (e) {
    console.log(e);
    dispatch(modalActions.activeModal("failLoad"));
  }
};

//  ~님을 위한 & 비슷한 취향의 유저가 본 추천 불러오기
const getWebtoonListForLogin = () => async (dispatch, getState) => {
  try {
    const isCalledForUser = getState().webtoon.is_called_for_user;
    let { data: forUserToons } = await offerAPI.getForUser();
    forUserToons = forUserToons.map((toon) => {
      toon.genres = toon.genres || [];
      return toon;
    });
    // 사용자 맞춤 추천 리스트가 이미 존재하는 경우_ 기존 리스트의 카테고리 제거
    if (isCalledForUser) {
      dispatch(removeForUserFilterCondition());
    }

    // 사용자 맞춤 추천 리스트 저장(매 요청 시 업데이트)
    dispatch(addToonList(forUserToons, "forUser"));

    // 추천 리스트가 존재하지 않는 경우_ 비슷한 취향의 유저 추천 리스트 요청
    if (!isCalledForUser) {
      const { data: similarUserOfferToons } =
        await offerAPI.getSimilarUsersChoice();
      dispatch(addToonList(similarUserOfferToons, "similarUserOffer"));
      dispatch(setCalledForUser());
    }
  } catch (e) {
    console.log(e);
    if (e.message === "Request failed with status code 401") {
      dispatch(userActions.logOut());
      alert("로그아웃 되었습니다");
      return;
    }
    dispatch(modalActions.activeModal("failLoad"));
  }
};

// 추천 웹툰 리스트 불러오기 (완결작, MD, 베스트 리뷰어의 추천)
const getOfferWebtoonList = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data: endOfferToons } = await offerAPI.getEnd();
      dispatch(addToonList(endOfferToons, "endOffer"));
      let { data: mdOfferToon } = await offerAPI.getMd();
      mdOfferToon.genres = mdOfferToon.genres || [];
      dispatch(addToonList([mdOfferToon], "mdOffer"));

      // 베스트 리뷰어의 경우 리뷰어 정보와 웹툰 정보를 분리해 각 모듈에서 관리
      let {
        data: {
          userInfoOnlyResponseDto: bestReviewerOfferUserInfo,
          webtoonAndGenreResponseDtos: bestReviewerOfferToons,
        },
      } = await offerAPI.getBestReviewersChoice();

      let best_user_info = bestReviewerOfferUserInfo;

      best_user_info.userScore = userScoreConvert(best_user_info.userScore);
      bestReviewerOfferToons = bestReviewerOfferToons.map((toon) => {
        toon.fixedAvgPoint = toon.toonAvgPoint;
        return toon;
      });
      dispatch(addToonList(bestReviewerOfferToons, "bestReviewerOffer"));
      dispatch(reviewerActions.setBestReviewerOfferUserInfo(best_user_info));
    } catch (err) {
      console.log(err);
      if (err.message === "Request failed with status code 401") {
        dispatch(userActions.logOut());
        alert("로그아웃 되었습니다");
        return;
      }
      dispatch(modalActions.activeModal("failLoad"));
    }
  };
};

//웹툰 상세정보 & 비슷한 장르 웹툰 불러오기
const getToonOneServer = (webtoonId) => {
  return async function (dispatch, getState) {
    try {
      const {
        data: { userLikeReviewList, myListOrNot, ...toonInfo },
      } = await webtoonAPI.getOne(webtoonId);
      let { data: similarGenreToons } = await offerAPI.getSimilarGenre(
        webtoonId
      );
      // 로그인한 유저가 좋아요한 리뷰 리스트 추가
      userLikeReviewList &&
        dispatch(userActions.addReviewLikeList(userLikeReviewList));

      // 구독한 경우 구독 리스트 추가
      myListOrNot && dispatch(userActions.subscribe(webtoonId));

      // 비슷한 장르 웹툰 리스트 추가(중복제거 & 대단위 장르 제외)
      similarGenreToons = similarGenreToons.filter(
        (toon, idx) =>
          similarGenreToons.findIndex(
            (_toon) => _toon.toonId === toon.toonId
          ) === idx
      );
      similarGenreToons = similarGenreToons.map((toon) => {
        toon.genres = (toon.genres || []).filter(
          (genre) =>
            genre !== "스토리" && genre !== "옴니버스" && genre !== "에피소드"
        );
        return toon;
      });
      dispatch(addToonList(similarGenreToons, webtoonId));

      // 리뷰 리스트를 리뷰 모듈에 분리/저장
      let reviews = toonInfo.reviews;
      reviews = reviews.map((review) => {
        review.toonId = webtoonId;
        review.createDate = Date.parse(review.createDate);
        return review;
      });
      dispatch(reviewActions.addReviewList(reviews, "detail"));

      // 웹툰 상세 정보 추가(기존 정보의 여부에 따라 분기)
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
      dispatch(modalActions.activeModal("failLoad"));
    }
  };
};

// 웹툰리스트의 더보기 페이지를 위한 thunk //
// (메인페이지 더보기) 웹투니 랭크 요청
const getWebtooniRank = () => async (dispatch) => {
  try {
    let { data: webtooniToons } = await webtoonAPI.getWebtooniRank();
    webtooniToons = webtooniToons.map((toon) => {
      toon.genres = toon.genres || [];
      return toon;
    });
    dispatch(addToonList(webtooniToons, "webtooni"));
  } catch (e) {
    console.log(e);
    dispatch(modalActions.activeModal("failLoad"));
  }
};
// (추천페이지 더보기) 완결 웹툰 요청
const getEndToonOffer = () => async (dispatch) => {
  try {
    const { data: endOfferToons } = await offerAPI.getEnd();
    dispatch(addToonList(endOfferToons, "endOffer"));
  } catch (e) {
    console.log(e);
    dispatch(modalActions.activeModal("failLoad"));
  }
};
//(추천페이지 더보기) 베스트 리뷰어의 웹툰 요청
const getBestReviewerOffer = () => async (dispatch) => {
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
  } catch (e) {
    console.log(e);
    dispatch(modalActions.activeModal("failLoad"));
  }
};
// (추천페이지 더보기) 비슷한 취향의 유저 웹툰 요청
const getSimilarUserOffer = () => async (dispatch) => {
  try {
    const { data: similarUserOfferToons } =
      await offerAPI.getSimilarUsersChoice();
    dispatch(addToonList(similarUserOfferToons, "similarUserOffer"));
  } catch (e) {
    console.log(e);
    dispatch(modalActions.activeModal("failLoad"));
  }
};

// (상세페이지 더보기) 비슷한 장르 웹툰 요청
const getSimilarGenre = (webtoonId) => async (dispatch) => {
  try {
    let { data: similarGenreToons } = await offerAPI.getSimilarGenre(webtoonId);
    similarGenreToons = similarGenreToons.filter(
      (toon, idx) =>
        similarGenreToons.findIndex((_toon) => _toon.toonId === toon.toonId) ===
        idx
    );
    similarGenreToons = similarGenreToons.map((toon) => {
      toon.genres = toon.genres || [];
      return toon;
    });
    dispatch(addToonList(similarGenreToons, webtoonId));
  } catch (e) {
    console.log(e);
    dispatch(modalActions.activeModal("failLoad"));
  }
};

///////////////////////////////////////////////////////////
// initialState & reducer
///////////////////////////////////////////////////////////

const initialState = {
  toon_list: [],
  is_loading: false,
  is_called_for_user: false,
};

export default handleActions(
  {
    [ADD_TOON_LIST]: (state, action) =>
      produce(state, (draft) => {
        action.payload.toons.map((toon, index) => {
          // 각 웹툰 별 정보 선별/수정 후 기존 리스트에 추가
          const toonIdx = draft.toon_list.findIndex(
            (totalToon) => totalToon.toonId === toon.toonId
          );

          // 기존 리스트에 받아온 웹툰이 없을 때
          if (toonIdx === -1) {
            // 웹툰에 카테고리 생성/추가
            if (action.payload.category) {
              toon.filterConditions = [action.payload.category];
            }
            // 세 가지 랭크 정보는 순위를 value로 하여 추가
            if (
              action.payload.category === "webtooni" ||
              action.payload.category === "naver" ||
              action.payload.category === "kakao"
            ) {
              toon[action.payload.category[0] + "Rank"] = index;
            }
            draft.toon_list.push(toon);
          }

          // 기존 리스트에 받아온 웹툰이 있을 때
          else {
            // 카테고리 추가(중복 제거)
            if (action.payload.category) {
              draft.toon_list[toonIdx].filterConditions.push(
                action.payload.category
              );
              draft.toon_list[toonIdx].filterConditions = draft.toon_list[
                toonIdx
              ].filterConditions.filter(
                (condition, idx) =>
                  draft.toon_list[toonIdx].filterConditions.indexOf(
                    condition
                  ) === idx
              );
              // 랭크 정보에 순위 덮어쓰기
              if (
                action.payload.category === "webtooni" ||
                action.payload.category === "naver" ||
                action.payload.category === "kakao"
              ) {
                toon[action.payload.category[0] + "Rank"] = index;
              }
            }

            // 장르 재설정 //
            // 1.기존 장르 + 받아온 장르 정보 혼합
            let genres = [...draft.toon_list[toonIdx].genres, ...toon.genres];
            // 2.중복 제거
            genres = genres.filter(
              (genre, idx) => genres.indexOf(genre) === idx
            );
            // 3.대단위 장르 제외
            genres = genres.filter(
              (genre) =>
                genre !== "스토리" &&
                genre !== "옴니버스" &&
                genre !== "에피소드"
            );
            // 4.장르 정보 재설정
            draft.toon_list[toonIdx] = {
              ...draft.toon_list[toonIdx],
              ...toon,
              genres,
            };
          }
        });
      }),
    // 상세 정보 요청 시: 기존 리스트에 웹툰 정보가 있을 경우_기존 정보에 웹툰의 카테고리 및 상세 정보 추가
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
    // 상세 정보 요청 시: 기존 리스트에 웹툰 정보가 없을 경우_웹툰 추가(+디테일 표시)
    [ADD_TOON_ONE]: (state, action) =>
      produce(state, (draft) => {
        action.payload.toonOne.filterConditions = ["detail"];
        draft.toon_list.push(action.payload.toonOne);
      }),

    // 별점 수정(toonAvgPoint 변동 값 vs fixedAvgPoint 고정 값 )
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

    // 사용자 추천 용 카테고리 제거
    [REMOVE_FOR_USER_FILTER_CONDITION]: (state, action) =>
      produce(state, (draft) => {
        const filtered = draft.toon_list.filter((toon) =>
          toon.filterConditions.includes("forUser")
        );
        filtered.map((toon) => {
          toon.filterConditions.splice(
            toon.filterConditions.indexOf("forUser"),
            1
          );
        });
      }),
    [SET_CALLED_FOR_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_called_for_user = true;
      }),
  },
  initialState
);

const actionCreators = {
  getRankWebtoonList,
  getWebtoonListForLogin,
  getOfferWebtoonList,
  getToonOneServer,
  addToonList,
  setToonAvgPoint,
  getWebtooniRank,
  getEndToonOffer,
  getBestReviewerOffer,
  getSimilarUserOffer,
  getSimilarGenre,
  // 미사용중..
  startLoading,
  endLoading,
};

export { actionCreators };
