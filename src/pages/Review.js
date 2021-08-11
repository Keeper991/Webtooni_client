import React from "react";
import { ReviewCard, Slick } from "../components";
import { Text, Button } from "../elements";
import styled from "styled-components";

const Review = () => {
  const review_list = [
    {
      userId: 1,
      userImg: "유저 이미지 번호",
      userName: "홍길동",
      userPointNumber: 4.5,
      reviewContent: "리뷰입니다아아아아아아앙",
      toonTitle: "여신강림",
      userGrade: "유저등급",
      toonImg: "https://img-cf.kurly.com/shop/data/goods/1618379552204l0.jpg",
      toonAuthor: "야옹이",
      toonPlatform: "네이버",
      toonWeekday: "월",
      finished: false,
    },
    {
      userId: 1,
      userImg: "유저 이미지 번호",
      userName: "홍길동",
      userPointNumber: 4.5,
      reviewContent: "리뷰입니다아아아아아아앙",
      toonTitle: "여신강림",
      userGrade: "유저등급",
      toonImg: "https://img-cf.kurly.com/shop/data/goods/1618379552204l0.jpg",
      toonAuthor: "야옹이",
      toonPlatform: "카카오",
      toonWeekday: "월",
      finished: true,
    },
    {
      userId: 1,
      userImg: "유저 이미지 번호",
      userName: "홍길동",
      userPointNumber: 4.5,
      reviewContent:
        "리뷰입니다아아아아아아앙리뷰입니다아아아아아아앙리뷰입니다아아아아아아앙리뷰입니다아아아아아아앙리뷰입니다아아아아아아앙리뷰입니다아아아아아아앙리뷰입니다아아아아아아앙리뷰입니다아아아아아아앙리뷰입니다아아아아아아앙리뷰입니다아아아아아아앙",
      toonTitle: "여신강림",
      userGrade: "유저등급",
      toonImg: "https://img-cf.kurly.com/shop/data/goods/1618379552204l0.jpg",
      toonAuthor: "야옹이",
      toonPlatform: "네이버",
      toonWeekday: "월",
      finished: false,
    },
  ];

  return (
    <React.Fragment>
      <FlexGrid>
        <Text>리뷰 목록</Text>
      </FlexGrid>
      <Container>
        {review_list.map((_, idx) => {
          return <ReviewCard key={idx} {..._}></ReviewCard>;
        })}
      </Container>
    </React.Fragment>
  );
};

const FlexGrid = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;
export default Review;
