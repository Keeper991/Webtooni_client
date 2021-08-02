import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { webtoonAPI, meAPI } from "../../shared/API";

const SET_TOON_ONE = "SET_TOON_ONE";

const setToonOne = createAction(SET_TOON_ONE, (toon) => ({ toon }));

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
const addToon = (id = null) => {
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

export default handleActions(
  {
    [SET_TOON_ONE]: (state, action) =>
      produce(state, (draft) => {
        draft.toon_one = action.payload.toon;
      }),
  },
  initialState
);

export { getToonOneServer, addToon };
