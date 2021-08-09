import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { actionCreators as adminActions } from "../redux/modules/admin";
import {
  WebToonCard,
  ReviewCard,
  BestReveiwerCard,
  WebToonMonth,
  Slick,
  SkeletonCard,
} from "../components";
import { Button, Text } from "../elements";
import { Color } from "../shared/common";

const Main = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(webtoonActions.getWebtooniRank());
    dispatch(webtoonActions.getNaverRank());
    dispatch(webtoonActions.getKakaoRank());
    dispatch(webtoonActions.getUserOffer());
    dispatch(adminActions.getMainReview());
    dispatch(adminActions.getMainBestReviewer());
  }, []);

  const is_loading = useSelector((state) => state.webtoon.is_loading);
  const webtooniList = useSelector((state) => state.webtoon.webtooni_rank);
  const naveriList = useSelector((state) => state.webtoon.naver_rank);
  const kakaoList = useSelector((state) => state.webtoon.kakao_rank);

  const [is_best, setIsBest] = React.useState(true);

  const webToonList = [
    {
      toonId: 1,
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703846/thumbnail/thumbnail_IMAG06_aa715a18-fe51-4adf-b21b-5fc253ed3f32.jpg",
      toonUrl:
        "https://comic.naver.com/webtoon/list?titleId=703846&weekday=tue",
      toonTitle: "여신강림",
      toonAuthor: "야옹이",
      toonPointTotalNumber: 4.8,
      toonPlatform: "네이버 웹툰",
      toonDay: "화",
    },
    {
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/773459/thumbnail/thumbnail_IMAG06_74d73b73-0bed-42f7-9f81-19b9732087cf.jpg",
      toonUrl:
        "https://comic.naver.com/webtoon/list?titleId=773459&weekday=tue",
      toonTitle: "용사가 돌아왔다",
      toonAuthor: "나락 / 풍백",
      toonPointTotalNumber: 3,
      toonPlatform: "네이버 웹툰",
      toonDay: "목",
    },
    {
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703852/thumbnail/thumbnail_IMAG06_0aacf362-325b-4d8d-ad60-4b7d888b2fdd.jpg",
      toonUrl: "https://comic.naver.com/webtoon/list?titleId=703852",
      toonTitle: "바른연애 길잡이",
      toonAuthor: "남수",
      toonPointTotalNumber: 5,
      toonPlatform: "네이버 웹툰",
      toonDay: "수",
    },
    {
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703846/thumbnail/thumbnail_IMAG06_aa715a18-fe51-4adf-b21b-5fc253ed3f32.jpg",
      toonTitle: "여신강림",
      toonAuthor: "야옹이",
      toonPointTotalNumber: 4.8,
      toonPlatform: "네이버 웹툰",
      toonDay: "화",
    },
    {
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/773459/thumbnail/thumbnail_IMAG06_74d73b73-0bed-42f7-9f81-19b9732087cf.jpg",
      toonTitle: "용사가 돌아왔다",
      toonAuthor: "나락 / 풍백",
      toonPointTotalNumber: 3,
      toonPlatform: "네이버 웹툰",
      toonDay: "목",
    },
    {
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703852/thumbnail/thumbnail_IMAG06_0aacf362-325b-4d8d-ad60-4b7d888b2fdd.jpg",
      toonTitle: "바른연애 길잡이",
      toonAuthor: "남수",
      toonPointTotalNumber: 5,
      toonPlatform: "네이버 웹툰",
      toonDay: "수",
    },
    {
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703846/thumbnail/thumbnail_IMAG06_aa715a18-fe51-4adf-b21b-5fc253ed3f32.jpg",
      toonTitle: "여신강림",
      toonAuthor: "야옹이",
      toonPointTotalNumber: 4.8,
      toonPlatform: "네이버 웹툰",
      toonDay: "화",
    },
    {
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/773459/thumbnail/thumbnail_IMAG06_74d73b73-0bed-42f7-9f81-19b9732087cf.jpg",
      toonTitle: "용사가 돌아왔다",
      toonAuthor: "나락 / 풍백",
      toonPointTotalNumber: 3,
      toonPlatform: "네이버 웹툰",
      toonDay: "목",
    },
    {
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703852/thumbnail/thumbnail_IMAG06_0aacf362-325b-4d8d-ad60-4b7d888b2fdd.jpg",
      toonTitle: "바른연애 길잡이",
      toonAuthor: "남수",
      toonPointTotalNumber: 5,
      toonPlatform: "네이버 웹툰",
      toonDay: "수",
    },
    {
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703846/thumbnail/thumbnail_IMAG06_aa715a18-fe51-4adf-b21b-5fc253ed3f32.jpg",
      toonTitle: "여신강림",
      toonAuthor: "야옹이",
      toonPointTotalNumber: 4.8,
      toonPlatform: "네이버 웹툰",
      toonDay: "화",
    },
  ];

  const ReviewList = [
    {
      userImg: 3,
      userName: "박모씨",
      userGrade: "네이버웹툰덕후",
      reviewContent:
        "리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1리뷰입니다아앙1",
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/773459/thumbnail/thumbnail_IMAG06_74d73b73-0bed-42f7-9f81-19b9732087cf.jpg",
      toonTitle: "용사가 돌아왔다",
      toonAuthor: "나락 / 풍백",
      toonPointTotalNumber: 3,
      platform: "네이버 웹툰",
      toonDay: "목",
    },
    {
      userImg: 3,
      userName: "김모씨",
      userGrade: "네이버웹툰덕후",
      reviewContent: "리뷰입니다아앙2",
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703852/thumbnail/thumbnail_IMAG06_0aacf362-325b-4d8d-ad60-4b7d888b2fdd.jpg",
      toonTitle: "바른연애 길잡이",
      toonAuthor: "남수",
      toonPointTotalNumber: 5,
      platform: "네이버 웹툰",
      toonDay: "수",
    },
    {
      userImg: 3,
      userName: "이모씨",
      userGrade: "네이버웹툰덕후",
      reviewContent: "리뷰입니다아앙3",
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703846/thumbnail/thumbnail_IMAG06_aa715a18-fe51-4adf-b21b-5fc253ed3f32.jpg",
      toonTitle: "여신강림",
      toonAuthor: "야옹이",
      toonPointTotalNumber: 4.8,
      platform: "네이버 웹툰",
      toonDay: "화",
    },
    {
      userImg: 3,
      userName: "박모씨",
      userGrade: "네이버웹툰덕후",
      reviewContent: "리뷰입니다아앙1",
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/773459/thumbnail/thumbnail_IMAG06_74d73b73-0bed-42f7-9f81-19b9732087cf.jpg",
      toonTitle: "용사가 돌아왔다",
      toonAuthor: "나락 / 풍백",
      toonPointTotalNumber: 3,
      platform: "네이버 웹툰",
      toonDay: "목",
    },
    {
      userImg: 3,
      userName: "김모씨",
      userGrade: "네이버웹툰덕후",
      reviewContent: "리뷰입니다아앙2",
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703852/thumbnail/thumbnail_IMAG06_0aacf362-325b-4d8d-ad60-4b7d888b2fdd.jpg",
      toonTitle: "바른연애 길잡이",
      toonAuthor: "남수",
      toonPointTotalNumber: 5,
      platform: "네이버 웹툰",
      toonDay: "수",
    },
    {
      userImg: 3,
      userName: "이모씨",
      userGrade: "네이버웹툰덕후",
      reviewContent: "리뷰입니다아앙3",
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703846/thumbnail/thumbnail_IMAG06_aa715a18-fe51-4adf-b21b-5fc253ed3f32.jpg",
      toonTitle: "여신강림",
      toonAuthor: "야옹이",
      toonPointTotalNumber: 4.8,
      platform: "네이버 웹툰",
      toonDay: "화",
    },
    {
      userImg: 3,
      userName: "박모씨",
      userGrade: "네이버웹툰덕후",
      reviewContent: "리뷰입니다아앙1",
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/773459/thumbnail/thumbnail_IMAG06_74d73b73-0bed-42f7-9f81-19b9732087cf.jpg",
      toonTitle: "용사가 돌아왔다",
      toonAuthor: "나락 / 풍백",
      toonPointTotalNumber: 3,
      platform: "네이버 웹툰",
      toonDay: "목",
    },
    {
      userImg: 3,
      userName: "김모씨",
      userGrade: "네이버웹툰덕후",
      reviewContent: "리뷰입니다아앙2",
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703852/thumbnail/thumbnail_IMAG06_0aacf362-325b-4d8d-ad60-4b7d888b2fdd.jpg",
      toonTitle: "바른연애 길잡이",
      toonAuthor: "남수",
      toonPointTotalNumber: 5,
      platform: "네이버 웹툰",
      toonDay: "수",
    },
    {
      userImg: 3,
      userName: "이모씨",
      userGrade: "네이버웹툰덕후",
      reviewContent: "리뷰입니다아앙3",
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703846/thumbnail/thumbnail_IMAG06_aa715a18-fe51-4adf-b21b-5fc253ed3f32.jpg",
      toonTitle: "여신강림",
      toonAuthor: "야옹이",
      toonPointTotalNumber: 4.8,
      platform: "네이버 웹툰",
      toonDay: "화",
    },
  ];

  const BestReveiwerList = [
    {
      userImg:
        "https://openads-real.s3.amazonaws.com/openadsAdmin/ckeditor/images/14_%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98.png",
      userName: "김모씨",
      userGrade: "네이버웹툰덕후",
      totalReviews: "325",
      totalLikes: "300",
    },

    {
      userImg:
        "https://openads-real.s3.amazonaws.com/openadsAdmin/ckeditor/images/14_%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98.png",
      userName: "이모씨",
      userGrade: "네이버웹툰덕후",
      totalReviews: "101",
      totalLikes: "200",
    },

    {
      userImg:
        "https://openads-real.s3.amazonaws.com/openadsAdmin/ckeditor/images/14_%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98.png",
      userName: "박모씨",
      userGrade: "네이버웹툰덕후",
      totalReviews: "215",
      totalLikes: "244",
    },

    {
      userImg:
        "https://openads-real.s3.amazonaws.com/openadsAdmin/ckeditor/images/14_%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98.png",
      userName: "박모씨",
      userGrade: "네이버웹툰덕후",
      totalReviews: "215",
      totalLikes: "244",
    },

    {
      userImg:
        "https://openads-real.s3.amazonaws.com/openadsAdmin/ckeditor/images/14_%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98.png",
      userName: "박모씨",
      userGrade: "네이버웹툰덕후",
      totalReviews: "215",
      totalLikes: "244",
    },

    {
      userImg:
        "https://openads-real.s3.amazonaws.com/openadsAdmin/ckeditor/images/14_%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98.png",
      userName: "박모씨",
      userGrade: "네이버웹툰덕후",
      totalReviews: "215",
      totalLikes: "244",
    },
  ];

  const is_login = useSelector((state) => state.user.is_login);

  return (
    <React.Fragment>
      <TitleGrid>
        <Text fontSize="16px" fontWeight="bold">
          이달의 웹투니버스 순위
        </Text>
        <Button
          border="none"
          bgColor={Color.white}
          fontSize="12px"
          width="50px"
          _onClick={() => {
            history.push("/toonlist/webtooniverse_rank");
          }}
        >
          더보기
        </Button>
      </TitleGrid>

      <SliderBox>
        {is_loading ? (
          <Slick is_infinite>
            {Array.from({ length: 10 }).map(() => {
              return <SkeletonCard></SkeletonCard>;
            })}
          </Slick>
        ) : (
          <Slick is_infinite>
            {webtooniList?.map((_, idx) => {
              return <WebToonCard key={idx} {..._}></WebToonCard>;
            })}
          </Slick>
        )}
      </SliderBox>
      <Slick is_arrow is_variableWidth={false} is_infinite>
        <MonthBox>
          <TextGrid>
            <Text fontWeight="bold">이번 달 네이버 웹툰 TOP 10</Text>
          </TextGrid>
          {is_loading ? (
            <RankGrid>
              {Array.from({ length: 10 }).map(() => {
                return <SkeletonCard rank></SkeletonCard>;
              })}
            </RankGrid>
          ) : (
            <RankGrid>
              {naveriList?.map((_, idx) => {
                return <WebToonMonth key={idx} {..._} idx={idx}></WebToonMonth>;
              })}
            </RankGrid>
          )}
        </MonthBox>

        <MonthBox>
          <TextGrid>
            <Text fontWeight="bold">이번 달 카카오 웹툰 TOP 10</Text>
          </TextGrid>
          <RankGrid>
            {kakaoList?.map((_, idx) => {
              return <WebToonMonth key={idx} {..._} idx={idx}></WebToonMonth>;
            })}
          </RankGrid>
        </MonthBox>
      </Slick>

      {is_login ? (
        <SliderBox>
          <Slick is_infinite>
            {webToonList.map((_, idx) => {
              return <WebToonCard key={idx} {..._}></WebToonCard>;
            })}
          </Slick>
        </SliderBox>
      ) : (
        <HiddenBlurBox>
          <BlurText>지금 로그인하고 맞춤 웹툰 추천 받기!</BlurText>
          <BlurBox>
            {webToonList.map((_, idx) => {
              return <WebToonCard key={idx} {..._}></WebToonCard>;
            })}
          </BlurBox>
        </HiddenBlurBox>
      )}

      <ReviewTabGrid>
        <Button
          _onClick={() => {
            setIsBest(true);
          }}
          bgColor={Color.white}
          width="90px"
          height="30px"
          border="none"
          fontWeight="bold"
          color={is_best ? Color.black : Color.gray}
        >
          베스트 리뷰
        </Button>
        <Button
          _onClick={() => {
            setIsBest(false);
          }}
          bgColor={Color.white}
          width="90px"
          height="30px"
          border="none"
          fontWeight="bold"
          color={!is_best ? Color.black : Color.gray}
        >
          최신 리뷰
        </Button>
      </ReviewTabGrid>
      {is_best ? (
        <SliderBox>
          <Slick is_infinite>
            {ReviewList.map((_, idx) => {
              return <ReviewCard key={idx} {..._}></ReviewCard>;
            })}
          </Slick>
        </SliderBox>
      ) : (
        <SliderBox>
          <Slick is_infinite>
            {ReviewList.map((_, idx) => {
              return <ReviewCard key={idx} {..._}></ReviewCard>;
            })}
          </Slick>
        </SliderBox>
      )}

      <TitleGrid>
        <Text fontWeight="bold">베스트 리뷰어</Text>
      </TitleGrid>
      <SliderBox>
        <Slick is_infinite>
          {BestReveiwerList.map((_, idx) => {
            return <BestReveiwerCard key={idx} {..._}></BestReveiwerCard>;
          })}
        </Slick>
      </SliderBox>
    </React.Fragment>
  );
};

const TitleGrid = styled.div`
  display: flex;
  width: 95%;
  margin: 10px auto;
  align-items: center;
  justify-content: space-between;
`;

const SliderBox = styled.div`
  white-space: nowrap;
  overflow: hidden;
  margin: 10px 0 50px 0;
`;

const HiddenBlurBox = styled.div`
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  margin: 10px 0 50px 0;

  &:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const BlurBox = styled.div`
  filter: blur(1.5px);
`;

const BlurText = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  z-index: 5;
`;

const MonthBox = styled.div`
  width: 100vw !important;
  height: 390px !important;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 50px 0;
`;

const TextGrid = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const RankGrid = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ReviewTabGrid = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
`;
export default Main;
