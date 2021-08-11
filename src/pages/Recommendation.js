import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { actionCreators as adminActions } from "../redux/modules/admin";
import { OfferCard } from "../components";
import { Text, Image, Button } from "../elements";
import { Slick, WebToonCard, SkeletonCard } from "../components";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";

const Recommendation = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(webtoonActions.getUserOffer());
    dispatch(webtoonActions.getBestReviewerOffer());
    dispatch(webtoonActions.getSimilarUserOffer());
    dispatch(webtoonActions.getEndToonOffer());
    dispatch(adminActions.getMdOffer());
  }, []);

  const md_offer_list = useSelector((state) => state.admin.md_offer);
  const end_toon_list = useSelector((state) => state.webtoon.end_toon);
  const is_loading = useSelector((state) => state.webtoon.is_loading);

  const webToonList = [
    {
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/703846/thumbnail/thumbnail_IMAG06_aa715a18-fe51-4adf-b21b-5fc253ed3f32.jpg",
      toonUrl:
        "https://comic.naver.com/webtoon/list?titleId=703846&weekday=tue",
      toonTitle: "여신강림",
      toonAuthor: "야옹이",
      toonPointTotalNumber: 4.8,
      toonPlatform: "카카오 웹툰",
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
      toonPlatform: "카카오 웹툰",
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
        <Text type="small" margin="0 0 5px 15px">
          좋아하실만한 웹툰을 추천해 드릴게요.
        </Text>
        <Text margin="0 0 0 15px" fontWeight="bold">
          재밌게 본 웹툰의 리뷰를 등록해보세요! 🖍
        </Text>
      </BannerBox>

      <TitleGrid>
        <Text type="h2" fontWeight="bold">
          이번 주 웹툰 평론가의 추천
        </Text>
        <Button
          border="none"
          bgColor={Color.white}
          fontSize="12px"
          width="50px"
          _onClick={() => {
            history.push("/toonlist/list2");
          }}
        >
          더보기
        </Button>
      </TitleGrid>
      <SliderBox>
        <Slick is_infinite>
          {webToonList.map((_, idx) => {
            return <WebToonCard key={idx} {..._}></WebToonCard>;
          })}
        </Slick>
      </SliderBox>

      <MdBox>
        <BookMark></BookMark>
        <MdInfoBox>
          <Text type="small" color={Color.primary}>
            #MD추천
          </Text>
          <Text type="h1" color={Color.white} fontWeight="bold">
            네웹 대표 <br /> 글로벌 인기작!
          </Text>
          <Text type="caption" color={Color.gray300}>
            두근두근 청춘 로맨스물을 찾고 있다면?
          </Text>
        </MdInfoBox>
        <PlatformImg>
          <Image
            shape="square"
            size="33px"
            src="https://lh3.googleusercontent.com/pw/AM-JKLUzns3dJ9QMMvbc1SAKf7CNsU2e3HAN-XkY-qHk_1o5X_CskFJiSAwZ9F8lRBhNaRwxMMqOI32OBdJW3bPgupH1FAx-z9WI51FwqIiIC5ggfzfGxiIM47ux759UeRX5p1-7dv2Uf3GKP-NZ9hPi0cqR=s33-no?authuser=0"
          ></Image>
        </PlatformImg>
      </MdBox>

      <FlexToonGrid>
        <Image
          margin="0 7px"
          src={md_offer_list.toonImg}
          shape="circle"
          size="64px"
        ></Image>
        <InfoGrid>
          <Text fontWeight="medium">{md_offer_list.toonTitle}</Text>
          <FlexGrid>
            <Text type="caption" color={Color.gray400}>
              {md_offer_list.toonAuthor}
            </Text>
            <Image
              shape="square"
              margin="0 5px 0 7px"
              size="12px"
              src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
            ></Image>
            <Text
              type="num"
              fontSize="12px"
              fontWeight="bold"
              margin="0 10px 0 0"
            >
              {md_offer_list.toonAvgPoint}
            </Text>
            <Text type="caption" color={Color.gray400}>
              {md_offer_list.toonWeekday}
            </Text>
          </FlexGrid>
          <Text type="caption" color={Color.gray800}>
            여기 들어갈거 생각
          </Text>
          <Text></Text>
        </InfoGrid>
      </FlexToonGrid>
      <MdCommentBox>
        <FlexGrid>
          <Image size="32px" shape="circle"></Image>
          <Text type="caption" margin="0 7px">
            김모씨
          </Text>
          <Text type="caption" color={Color.gray400}>
            08.02
          </Text>
        </FlexGrid>

        <Text tag="p" margin="10px 0 0 0" color={Color.gray800}>
          기본적으로 재밌습니다. <br /> 이야기 전개도 빠르고 흡입력 있습니다.
        </Text>
      </MdCommentBox>
      <FlexToonGrid>
        <Image
          margin="0 7px"
          src={md_offer_list.toonImg}
          shape="circle"
          size="64px"
        ></Image>
        <InfoGrid>
          <Text fontWeight="medium">{md_offer_list.toonTitle}</Text>
          <FlexGrid>
            <Text type="caption" color={Color.gray400}>
              {md_offer_list.toonAuthor}
            </Text>
            <Image
              shape="square"
              margin="0 5px 0 7px"
              size="12px"
              src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
            ></Image>
            <Text
              type="num"
              fontSize="12px"
              fontWeight="bold"
              margin="0 10px 0 0"
            >
              {md_offer_list.toonAvgPoint}
            </Text>
            <Text type="caption" color={Color.gray400}>
              {md_offer_list.toonWeekday}
            </Text>
          </FlexGrid>
          <Text type="caption" color={Color.gray800}>
            여기 들어갈거 생각
          </Text>
          <Text></Text>
        </InfoGrid>
      </FlexToonGrid>
      <MdCommentBox>
        <FlexGrid>
          <Image size="32px" shape="circle"></Image>
          <Text type="caption" margin="0 7px">
            김모씨
          </Text>
          <Text type="caption" color={Color.gray400}>
            08.02
          </Text>
        </FlexGrid>

        <Text tag="p" margin="10px 0 0 0" color={Color.gray800}>
          기본적으로 재밌습니다. <br /> 이야기 전개도 빠르고 흡입력 있습니다.
        </Text>
      </MdCommentBox>

      <TitleGrid>
        <Text type="h2" fontWeight="bold">
          완결 작품 추천
        </Text>
        <Button
          border="none"
          bgColor={Color.white}
          fontSize="12px"
          width="50px"
          _onClick={() => {
            history.push("/toonlist/end_toon");
          }}
        >
          더보기
        </Button>
      </TitleGrid>
      <SliderBox>
        {is_loading || end_toon_list.length === 0 ? (
          <Slick is_infinite>
            {Array.from({ length: 10 }).map(() => {
              return <SkeletonCard></SkeletonCard>;
            })}
          </Slick>
        ) : (
          <Slick is_infinite>
            {end_toon_list?.map((_, idx) => {
              return <WebToonCard key={idx} {..._}></WebToonCard>;
            })}
          </Slick>
        )}
      </SliderBox>

      <TitleGrid>
        <Text type="h2" fontWeight="bold">
          비슷한 취향의 사용자가 본 웹툰
        </Text>
        <Button
          border="none"
          bgColor={Color.white}
          fontSize="12px"
          width="50px"
        >
          더보기
        </Button>
      </TitleGrid>
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
  background-color: ${Color.gray200};
  margin: 30px auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SliderBox = styled.div`
  white-space: nowrap;
  overflow: hidden;
  margin: 20px 0 50px 5px;
`;

const MdBox = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${Color.gray800};
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-image: url("https://lh3.googleusercontent.com/pw/AM-JKLWSzGXMxqDz78istsHPT-R9gjN-iDKqA48koTRwLHHaiUOwWjpjurhUQF3jb8q4XukxQpAMrabtNceGVSKh2_idGz2h9HoZU4dV4dtTdA2mn2ICENPjgpGHz8EEgPR4vw1Oub4gh-swnzDko6sYIzfX=w360-h200-no?authuser=0");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
`;

const PlatformImg = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20px;
`;

const BookMark = styled.div`
  width: 32px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 20px;
  background-image: url("https://lh3.googleusercontent.com/pw/AM-JKLX9TMSv2HEBZvBU_2HfbBWkcbzob3Q2xbO5n37lvHAZRT4odoycyeUVUkFGCwH_xAO5_5LEDVZILVVnysQykUskGSHW6ujh4TN5xEDOPEifCnVAQB2A-cgnomeNlOhShd6zrjuHq28mg8y7_Mrh1lSL=w32-h30-no?authuser=0");
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const TitleGrid = styled.div`
  display: flex;
  width: 100%;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
`;

const FlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 0 23px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 64px;
  justify-content: space-around;
  padding: 3px;
`;

const MdCommentBox = styled.div`
  width: 320px;
  padding: 13px 15px 70px;
  background-color: ${Color.gray200};
  margin: 20px auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MdInfoBox = styled.div`
  height: 90px;
  display: flex;
  position: absolute;
  bottom: 15px;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0 20px;
`;
export default Recommendation;
