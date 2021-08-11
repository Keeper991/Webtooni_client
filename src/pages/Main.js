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
    if (
      webtooni_list.length === 0 ||
      naver_list.length === 0 ||
      kakao_list.length === 0 ||
      best_review_list.length === 0 ||
      recent_review_list.length === 0 ||
      reviewer_list.length === 0
    ) {
      dispatch(webtoonActions.getWebtooniRank());
      dispatch(webtoonActions.getNaverRank());
      dispatch(webtoonActions.getKakaoRank());
      dispatch(webtoonActions.getUserOffer());
      dispatch(adminActions.getMainReview());
      dispatch(adminActions.getMainBestReviewer());
    }
  }, []);

  const is_loading = useSelector((state) => state.webtoon.is_loading);
  const webtooni_list = useSelector((state) => state.webtoon.webtooni_rank);
  const naver_list = useSelector((state) => state.webtoon.naver_rank);
  const kakao_list = useSelector((state) => state.webtoon.kakao_rank);
  const best_review_list = useSelector(
    (state) => state.admin.main_review.bestReview
  );
  const recent_review_list = useSelector(
    (state) => state.admin.main_review.newReview
  );

  const reviewer_list = useSelector((state) => state.admin.main_best_reviewer);

  const [is_best, setIsBest] = React.useState(true);

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
          color={Color.gray700}
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
        {is_loading || webtooni_list.length === 0 ? (
          <Slick is_infinite>
            {Array.from({ length: 10 }).map(() => {
              return <SkeletonCard></SkeletonCard>;
            })}
          </Slick>
        ) : (
          <Slick is_infinite>
            {webtooni_list?.map((_, idx) => {
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
          {is_loading || naver_list.length === 0 ? (
            <RankGrid>
              {Array.from({ length: 10 }).map(() => {
                return <SkeletonCard rank></SkeletonCard>;
              })}
            </RankGrid>
          ) : (
            <RankGrid>
              {naver_list?.map((_, idx) => {
                return <WebToonMonth key={idx} {..._} idx={idx}></WebToonMonth>;
              })}
            </RankGrid>
          )}
        </MonthBox>

        <MonthBox>
          <TextGrid>
            <Text fontWeight="bold">이번 달 카카오 웹툰 TOP 10</Text>
          </TextGrid>
          {is_loading || kakao_list.length === 0 ? (
            <RankGrid>
              {Array.from({ length: 10 }).map(() => {
                return <SkeletonCard rank></SkeletonCard>;
              })}
            </RankGrid>
          ) : (
            <RankGrid>
              {kakao_list?.map((_, idx) => {
                return <WebToonMonth key={idx} {..._} idx={idx}></WebToonMonth>;
              })}
            </RankGrid>
          )}
        </MonthBox>
      </Slick>

      {is_login ? (
        <SliderBox>
          {is_loading || webtooni_list.length === 0 ? (
            <Slick is_infinite>
              {Array.from({ length: 10 }).map(() => {
                return <SkeletonCard></SkeletonCard>;
              })}
            </Slick>
          ) : (
            <Slick is_infinite>
              {webtooni_list?.map((_, idx) => {
                return <WebToonCard key={idx} {..._}></WebToonCard>;
              })}
            </Slick>
          )}
        </SliderBox>
      ) : (
        <HiddenBlurBox>
          <BlurText>지금 로그인하고 맞춤 웹툰 추천 받기!</BlurText>
          <BlurBox>
            {is_loading || webtooni_list.length === 0 ? (
              <Slick is_infinite>
                {Array.from({ length: 10 }).map(() => {
                  return <SkeletonCard></SkeletonCard>;
                })}
              </Slick>
            ) : (
              <Slick is_infinite>
                {webtooni_list?.map((_, idx) => {
                  return <WebToonCard key={idx} {..._}></WebToonCard>;
                })}
              </Slick>
            )}
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
      {is_best ? (
        <SliderBox>
          <Slick is_infinite>
            {best_review_list?.map((_, idx) => {
              return <ReviewCard key={idx} {..._} main></ReviewCard>;
            })}
          </Slick>
        </SliderBox>
      ) : (
        <SliderBox>
          <Slick is_infinite>
            {recent_review_list?.map((_, idx) => {
              return <ReviewCard key={idx} {..._} main></ReviewCard>;
            })}
          </Slick>
        </SliderBox>
      )}

      <TitleGrid>
        <Text fontWeight="bold">베스트 리뷰어</Text>
      </TitleGrid>
      <SliderBox>
        <Slick>
          {reviewer_list.map((_, idx) => {
            return <BestReveiwerCard key={idx} {..._}></BestReveiwerCard>;
          })}
        </Slick>
      </SliderBox>
    </React.Fragment>
  );
};

const TitleGrid = styled.div`
  display: flex;
  width: 100%;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
`;

const SliderBox = styled.div`
  white-space: nowrap;
  overflow: hidden;
  margin: 10px 0 50px 5px;
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
    background-color: ${Color.black};
    opacity: 0.5;
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
  width: 100%;
  padding: 0 16px;
  display: flex;
`;
export default Main;
