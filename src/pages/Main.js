import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";
import {
  WebToonCard,
  ReviewCard,
  BestReveiwerCard,
  WebToonMonth,
} from "../components";
import { Button, Text } from "../elements";
import { Link } from "react-router-dom";

const Main = () => {
  const webToonList = [
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
      <PageBtnBox>
        <Button
          _onClick={() => {
            history.push("/recommendation");
          }}
          margin="0 10px"
          width="70px"
          height="30px"
          bgColor="#fff"
          border="none"
        >
          추천
        </Button>
        <Button
          _onClick={() => {
            history.push("/review");
          }}
          margin="0 10px"
          width="70px"
          height="30px"
          bgColor="#fff"
          border="none"
        >
          리뷰
        </Button>
        <Button
          _onClick={() => {
            history.push("/board");
          }}
          margin="0 10px"
          width="70px"
          height="30px"
          bgColor="#fff"
          border="none"
        >
          톡톡
        </Button>
      </PageBtnBox>

      <Text>이번 주 웹툰 평론가의 추천</Text>
      <HiddenBox>
        {webToonList.map((_, idx) => {
          return <WebToonCard key={idx} {..._}></WebToonCard>;
        })}
      </HiddenBox>

      <Text>이번 달 네이버 웹툰 TOP 10</Text>
      <MonthBox>
        {webToonList.map((_, idx) => {
          return <WebToonMonth key={idx} {..._} idx={idx}></WebToonMonth>;
        })}
      </MonthBox>

      {is_login ? (
        <HiddenBox>
          {webToonList.map((_, idx) => {
            return <WebToonCard key={idx} {..._}></WebToonCard>;
          })}
        </HiddenBox>
      ) : (
        <HiddenBlurBox>
          <BlurText>지금 로그인하고 맞춤 웹툰 추천 받기!</BlurText>
          {webToonList.map((_, idx) => {
            return <WebToonCard key={idx} {..._}></WebToonCard>;
          })}
        </HiddenBlurBox>
      )}

      <Text>베스트 리뷰</Text>
      <HiddenBox>
        {ReviewList.map((_, idx) => {
          return <ReviewCard key={idx} {..._}></ReviewCard>;
        })}
      </HiddenBox>

      <Text>베스트 리뷰어</Text>
      <HiddenBox>
        {BestReveiwerList.map((_, idx) => {
          return <BestReveiwerCard key={idx} {..._}></BestReveiwerCard>;
        })}
      </HiddenBox>
    </React.Fragment>
  );
};

const PageBtnBox = styled.div`
  display: flex;
  margin: 20px 0;
`;

const HiddenBox = styled.div`
  white-space: nowrap;
  overflow-x: scroll;
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

const BlurText = styled.p`
  width: 100%;
  position: absolute;
  text-align: center;
  top: 30%;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  z-index: 5;
`;

const MonthBox = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 50px 0;
`;

export default Main;
