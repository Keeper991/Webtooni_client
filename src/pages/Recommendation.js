import React from "react";
import styled from "styled-components";
import { OfferCard } from "../components";
import { Text, Image } from "../elements";
import { Slick, WebToonCard } from "../components";

const Recommendation = () => {
  const webToonList = [
    {
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

  return (
    <React.Fragment>
      <OfferCard {...webToonList}></OfferCard>
      <BannerBox>
        <Text fontSize="10px" margin="0 0 5px 15px">
          좋아하실만한 웹툰을 추천해 드릴게요.
        </Text>
        <Text fontSize="14px" margin="0 0 0 15px" fontWeight="bold">
          재밌게 본 웹툰의 리뷰를 등록해보세요!
        </Text>
      </BannerBox>

      <Text>이번 주 웹툰 평론가의 추천</Text>
      <SliderBox>
        <Slick is_infinite>
          {webToonList.map((_, idx) => {
            return <WebToonCard key={idx} {..._}></WebToonCard>;
          })}
        </Slick>
      </SliderBox>

      <Text>MD 추천 + 간단 코멘트</Text>
      <MdBox>
        <MdInfoBox>
          <Text fontSize="16px" color="#fff">
            네웹 대표 <br /> 글로벌 인기작!
          </Text>
          <Text fontSize="14px" color="#fff">
            두근두근 청춘 로맨스물을 찾고 있다면?
          </Text>
        </MdInfoBox>

        <FlexToonGrid>
          <Image
            margin="0 7px"
            src={webToonList[0].toonImg}
            shape="circle"
            size="64px"
          ></Image>
          <InfoGrid>
            <Text fontSize="14px" color="#fff">
              {webToonList[0].toonTitle}
            </Text>
            <Text fontSize="12px" color="#fff">
              {webToonList[0].toonAuthor}
            </Text>
            <FlexGrid>
              <Text fontSize="12px" color="#fff">
                ★{webToonList[0].toonPointTotalNumber}
              </Text>
              <Text fontSize="10px" color="#fff">
                {webToonList[0].toonDay}
              </Text>
            </FlexGrid>
          </InfoGrid>
        </FlexToonGrid>
      </MdBox>
      <MdCommentBox>
        <Image size="32px" shape="circle"></Image>
        <Text>김모씨</Text>
        <Text fontSize="12px">08.02</Text>
        <Text fontSize="12px">150 ♥</Text>
        <Text>
          기본적으로 재밌습니다. <br /> 이야기 전개도 빠르고 흡입력 있습니다.
        </Text>
      </MdCommentBox>

      <Text>완결 작품 추천</Text>
      <SliderBox>
        <Slick is_infinite>
          {webToonList.map((_, idx) => {
            return <WebToonCard key={idx} {..._}></WebToonCard>;
          })}
        </Slick>
      </SliderBox>

      <Text>비슷한 취향을 가진 사용자가 본 웹툰</Text>
      <SliderBox>
        <Slick is_infinite>
          {webToonList.map((_, idx) => {
            return <WebToonCard key={idx} {..._}></WebToonCard>;
          })}
        </Slick>
      </SliderBox>
    </React.Fragment>
  );
};

const BannerBox = styled.div`
  width: 320px;
  height: 66px;
  background-color: #eaeaea;
  margin: 30px auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SliderBox = styled.div`
  white-space: nowrap;
  overflow: hidden;
  margin: 20px 0 50px 0;
`;

const MdBox = styled.div`
  width: 320px;
  height: 186px;
  background-color: #333333;
  margin: 20px auto;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
`;

const FlexToonGrid = styled.div`
  display: flex;
  align-items: center;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const MdCommentBox = styled.div`
  width: 320px;
  height: 75px;
  background-color: #eaeaea;
  margin: 20px auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MdInfoBox = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export default Recommendation;
