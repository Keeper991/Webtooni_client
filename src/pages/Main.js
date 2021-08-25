import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as reviewerActions } from "../redux/modules/reviewer";
import { actionCreators as modalActions } from "../redux/modules/modal";
import {
  WebToonCard,
  ReviewCard,
  BestReveiwerCard,
  WebToonMonth,
  Slick,
  SkeletonCard,
} from "../components";
import { Button, Text, Image } from "../elements";
import { Color } from "../shared/common";
import BannerImg1 from "../images/banner1.jpg";
import BannerImg2 from "../images/banner2.jpg";

const Main = () => {
  const dispatch = useDispatch();

  // states
  const [is_best, setIsBest] = React.useState(true);

  // selectors
  const toon_list = useSelector((state) => state.webtoon.toon_list);
  const is_loading = useSelector((state) => state.webtoon.is_loading);
  const is_login = useSelector((state) => state.user.is_login);
  const userName = useSelector((state) => state.user.info.userName);
  const reviewer_list = useSelector((state) => state.reviewer.best_reviewer);
  const review_list = useSelector((state) => state.review.review_list);
  const isShownWelcomeModal = useSelector(
    (state) => state.user.info.isShownWelcomeModal
  );

  // review lists
  let new_review_list = [...review_list];
  new_review_list.sort((a, b) => b.createDate - a.createDate);

  let best_review_list = [...review_list];
  best_review_list.sort((a, b) => b.likeCount - a.likeCount);

  // webtoon lists
  const webtooni_list = toon_list
    .filter((toon) => toon.filterConditions.includes("webtooni"))
    .sort((a, b) => a.wRank - b.wRank);
  const naver_list = toon_list
    .filter((toon) => toon.filterConditions.includes("naver"))
    .sort((a, b) => a.nRank - b.nRank);
  const kakao_list = toon_list
    .filter((toon) => toon.filterConditions.includes("kakao"))
    .sort((a, b) => a.kRank - b.kRank);

  // slick swipe click prevent
  const [dragging, setDragging] = React.useState(false);

  const handleBeforeChange = React.useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = React.useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const handleOnItemClick = React.useCallback(
    (e) => {
      if (dragging) e.stopPropagation();
    },
    [dragging]
  );

  // effects

  React.useEffect(() => {
    dispatch(reviewerActions.getBestReviewer());
  }, []);

  React.useEffect(() => {
    if (
      !webtooni_list.length ||
      !naver_list.length ||
      !kakao_list.length ||
      !reviewer_list.length
    ) {
      dispatch(webtoonActions.getRankWebtoonList());
      dispatch(reviewerActions.getBestReviewer());
    }

    if (!best_review_list.length || !new_review_list.length) {
      dispatch(reviewActions.getMainReviewList());
    }
  }, []);

  const naver_list_1 = naver_list.slice(0, 5);
  const naver_list_2 = naver_list.slice(5, 10);

  const kakao_list_1 = kakao_list.slice(0, 5);
  const kakao_list_2 = kakao_list.slice(5, 10);

  const like_list = useSelector((state) => state.user.reviewLikeList);

  React.useEffect(() => {
    if (is_login && !isShownWelcomeModal && userName) {
      dispatch(modalActions.activeModal("welcome"));
    }
  }, [is_login]);

  return (
    <React.Fragment>
      <BannerSliderBox>
        <Slick is_banner>
          <TopBannerBox banner={BannerImg1}></TopBannerBox>
          <TopBannerBox green banner={BannerImg2}></TopBannerBox>
        </Slick>
      </BannerSliderBox>

      <TitleGrid no_margin>
        <Text type="h2" fontWeight="bold">
          금주의 웹투니버스 순위
        </Text>
        <Button
          border="none"
          bgColor={Color.white}
          color={Color.gray700}
          fontSize="13px"
          width="50px"
          _onClick={() => {
            history.push("/toonlist/webtooniverse_rank");
          }}
        >
          더보기
        </Button>
      </TitleGrid>

      <SliderBox>
        {is_loading || webtooni_list.length === 0 ? (
          <CardSliderBox>
            {Array.from({ length: 10 }).map((_, idx) => {
              return <SkeletonCard key={idx}></SkeletonCard>;
            })}
          </CardSliderBox>
        ) : (
          <CardSliderBox>
            {webtooni_list?.map((_, idx) => {
              return (
                <WebToonCard
                  key={idx}
                  index={idx + 1}
                  {..._}
                  rank
                ></WebToonCard>
              );
            })}
          </CardSliderBox>
        )}
      </SliderBox>
      <MonthContainer>
        <Slick
          custom_arrows
          is_variableWidth={false}
          is_infinite
          _afterChange={handleAfterChange}
          _beforeChange={handleBeforeChange}
        >
          <MonthBox onClickCapture={handleOnItemClick}>
            <TextGrid>
              <Text fontWeight="bold">네이버 웹툰</Text>
              <Button
                width="40px"
                height="20px"
                fontSize="10px"
                fontWeight="bold"
                borderRadius="27px"
                padding="0px"
                color={Color.white}
                bgColor={Color.naverGreen}
                border="none"
                margin="0 0 0 5px"
              >
                Top 10
              </Button>
            </TextGrid>
            {is_loading || naver_list.length === 0 ? (
              <RankGrid>
                {Array.from({ length: 5 }).map((_, idx) => {
                  return <SkeletonCard key={idx} rank></SkeletonCard>;
                })}
              </RankGrid>
            ) : (
              <RankGrid>
                {naver_list_1?.map((_, idx) => {
                  return (
                    <WebToonMonth key={idx} {..._} idx={idx}></WebToonMonth>
                  );
                })}
              </RankGrid>
            )}
          </MonthBox>
          <MonthBox onClickCapture={handleOnItemClick}>
            <TextGrid>
              <Text fontWeight="bold">네이버 웹툰</Text>
              <Button
                width="40px"
                height="20px"
                fontSize="10px"
                fontWeight="bold"
                borderRadius="27px"
                padding="0px"
                color={Color.white}
                bgColor={Color.naverGreen}
                border="none"
                margin="0 0 0 5px"
              >
                Top 10
              </Button>
            </TextGrid>
            {is_loading || naver_list.length === 0 ? (
              <RankGrid>
                {Array.from({ length: 5 }).map((_, idx) => {
                  return <SkeletonCard key={idx} rank></SkeletonCard>;
                })}
              </RankGrid>
            ) : (
              <RankGrid>
                {naver_list_2?.map((_, idx) => {
                  return (
                    <WebToonMonth key={idx} {..._} idx={idx + 5}></WebToonMonth>
                  );
                })}
              </RankGrid>
            )}
          </MonthBox>

          <MonthBox onClickCapture={handleOnItemClick}>
            <TextGrid>
              <Text fontWeight="bold">카카오 웹툰</Text>
              <Button
                width="40px"
                height="20px"
                fontSize="10px"
                fontWeight="bold"
                borderRadius="27px"
                padding="0px"
                color={Color.white}
                bgColor={Color.kakaoYellow}
                border="none"
                margin="0 0 0 5px"
              >
                Top 10
              </Button>
            </TextGrid>
            {is_loading || kakao_list.length === 0 ? (
              <RankGrid>
                {Array.from({ length: 5 }).map((_, idx) => {
                  return <SkeletonCard key={idx} rank></SkeletonCard>;
                })}
              </RankGrid>
            ) : (
              <RankGrid>
                {kakao_list_1?.map((_, idx) => {
                  return (
                    <WebToonMonth key={idx} {..._} idx={idx}></WebToonMonth>
                  );
                })}
              </RankGrid>
            )}
          </MonthBox>
          <MonthBox onClickCapture={handleOnItemClick}>
            <TextGrid>
              <Text fontWeight="bold">카카오 웹툰</Text>
              <Button
                width="40px"
                height="20px"
                fontSize="10px"
                fontWeight="bold"
                borderRadius="27px"
                padding="0px"
                color={Color.white}
                bgColor={Color.kakaoYellow}
                border="none"
                margin="0 0 0 5px"
              >
                Top 10
              </Button>
            </TextGrid>
            {is_loading || kakao_list.length === 0 ? (
              <RankGrid>
                {Array.from({ length: 5 }).map((_, idx) => {
                  return <SkeletonCard key={idx} rank></SkeletonCard>;
                })}
              </RankGrid>
            ) : (
              <RankGrid>
                {kakao_list_2?.map((_, idx) => {
                  return (
                    <WebToonMonth key={idx} {..._} idx={idx + 5}></WebToonMonth>
                  );
                })}
              </RankGrid>
            )}
          </MonthBox>
        </Slick>
      </MonthContainer>

      <BannerBox
        onClick={() => {
          history.push("/review/search");
        }}
      >
        <Text margin="5px 0 0 0" type="small" color={Color.gray700}>
          좋아하실만한 웹툰을 추천해 드릴게요.
        </Text>
        <FlexGrid>
          <Text fontWeight="bold" color={Color.gray700}>
            재밌게 본 웹툰의 리뷰를 등록해보세요!
          </Text>
          <Image
            shape="square"
            size="16px"
            margin="0 5px"
            src="https://lh3.googleusercontent.com/pw/AM-JKLWPhtnQViH6A2gkyW-RSm0DPzry9dNgxBNfUplfxinXpWyXDHotbccu1JiRG8NoxAgreYwSXnKylBkgJ2OUew1FEhCanaMevg_G-Prks9-3ooXIluMWS9n6q-j2m4PAe4IY9o6t5Vcg6F51UfY7x2ms=w16-h17-no?authuser=0"
          ></Image>
        </FlexGrid>
      </BannerBox>

      <TitleGrid>
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
            color={is_best ? Color.black : Color.gray400}
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
            color={!is_best ? Color.black : Color.gray400}
          >
            최신 리뷰
          </Button>
        </ReviewTabGrid>
        <Button
          border="none"
          bgColor={Color.white}
          color={Color.gray700}
          fontSize="13px"
          width="50px"
          _onClick={() => {
            history.push("/review");
          }}
        >
          더보기
        </Button>
      </TitleGrid>

      {is_best ? (
        <SliderBox>
          <CardSliderBox>
            {best_review_list?.map((_, idx) => {
              return (
                <ReviewCard
                  key={idx}
                  {..._}
                  main
                  like_list={like_list}
                ></ReviewCard>
              );
            })}
          </CardSliderBox>
        </SliderBox>
      ) : (
        <SliderBox>
          <CardSliderBox>
            {new_review_list?.map((_, idx) => {
              return (
                <ReviewCard
                  key={idx}
                  {..._}
                  main
                  like_list={like_list}
                ></ReviewCard>
              );
            })}
          </CardSliderBox>
        </SliderBox>
      )}

      <TitleGrid>
        <Text type="h2" fontWeight="bold">
          베스트 리뷰어 🏆
        </Text>
      </TitleGrid>
      <CenterSliderBox>
        <Slick is_center>
          {reviewer_list?.map((_, idx) => {
            return <BestReveiwerCard key={idx} {..._}></BestReveiwerCard>;
          })}
        </Slick>
      </CenterSliderBox>
    </React.Fragment>
  );
};

const TopBannerBox = styled.div`
  width: 100%;
  height: 140px;
  background-image: url("${(props) => props.banner}");
  margin-top: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${(props) => (props.green ? `background-color: #01d358` : null)};
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
`;

const TitleGrid = styled.div`
  display: flex;
  width: 100%;
  height: 65px;
  ${(props) => (props.no_margin ? "margin-top: -1px" : "margin-top: 30px")};
  padding: 10px 16px 0;
  align-items: center;
  justify-content: space-between;
  border-top: 8px solid ${Color.gray100};
`;

const SliderBox = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 0 0 16px;
`;

const BannerSliderBox = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin-top: -6px;
`;

const CenterSliderBox = styled.div`
  width: 100%;
  height: 250px;
  padding-top: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MonthContainer = styled.div`
  padding-bottom: 40px;
  border-bottom: 8px solid ${Color.gray100};
`;

const MonthBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const TextGrid = styled.div`
  width: 100%;
  height: 36px;
  background-color: ${Color.gray100};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const RankGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  margin: 20px 0;
`;

const ReviewTabGrid = styled.div`
  display: flex;
`;

const BannerBox = styled.div`
  width: 100%auto;
  height: 66px;
  background-color: ${Color.gray100};
  padding: 0 16px;
  margin: 40px 20px 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const CardSliderBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;
  padding-right: 150px;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

export default Main;
