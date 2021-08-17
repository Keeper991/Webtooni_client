import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { actionCreators as adminActions } from "../redux/modules/admin";
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
  const user_info = useSelector((state) => state.user.info);
  const webtooni_list = useSelector((state) => state.webtoon.webtooni_rank);
  const naver_list = useSelector((state) => state.webtoon.naver_rank);
  const kakao_list = useSelector((state) => state.webtoon.kakao_rank);
  const for_user_list = useSelector((state) => state.webtoon.user_offer);

  const best_review_list = useSelector(
    (state) => state.admin.main_review.bestReview
  );
  const recent_review_list = useSelector(
    (state) => state.admin.main_review.newReview
  );

  const reviewer_list = useSelector((state) => state.admin.main_best_reviewer);

  const [is_best, setIsBest] = React.useState(true);

  const is_login = useSelector((state) => state.user.is_login);
  const isShownWelcomeModal = useSelector(
    (state) => state.user.isShownWelcomeModal
  );

  const naver_list_1 = naver_list.slice(0, 5);
  const naver_list_2 = naver_list.slice(5, 10);

  const kakao_list_1 = kakao_list.slice(0, 5);
  const kakao_list_2 = kakao_list.slice(5, 10);

  React.useEffect(() => {
    if (is_login && !isShownWelcomeModal)
      dispatch(modalActions.activeModal("welcome"));
  }, []);

  return (
    <React.Fragment>
      <TitleGrid>
        <Text type="h2" fontWeight="bold">
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

      <Slick custom_arrows is_variableWidth={false} is_infinite>
        <MonthBox>
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
          {/* {is_loading || naver_list.length === 0 ? (
            <RankGrid>
              {Array.from({ length: 10 }).map(() => {
                return <SkeletonCard rank></SkeletonCard>;
              })}
            </RankGrid>
          ) : ( */}
          <RankGrid>
            {naver_list_1?.map((_, idx) => {
              return <WebToonMonth key={idx} {..._} idx={idx}></WebToonMonth>;
            })}
          </RankGrid>
          {/* )} */}
        </MonthBox>
        <MonthBox>
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
          {/* {is_loading || naver_list.length === 0 ? (
            <RankGrid>
              {Array.from({ length: 10 }).map(() => {
                return <SkeletonCard rank></SkeletonCard>;
              })}
            </RankGrid>
          ) : ( */}
          <RankGrid>
            {naver_list_2?.map((_, idx) => {
              return (
                <WebToonMonth key={idx} {..._} idx={idx + 5}></WebToonMonth>
              );
            })}
          </RankGrid>
          {/* )} */}
        </MonthBox>

        <MonthBox>
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
          {/* {is_loading || kakao_list.length === 0 ? (
            <RankGrid>
              {Array.from({ length: 10 }).map(() => {
                return <SkeletonCard rank></SkeletonCard>;
              })}
            </RankGrid>
          ) : ( */}
          <RankGrid>
            {kakao_list_1?.map((_, idx) => {
              return <WebToonMonth key={idx} {..._} idx={idx}></WebToonMonth>;
            })}
          </RankGrid>
          {/* )} */}
        </MonthBox>
        <MonthBox>
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
          {/* {is_loading || kakao_list.length === 0 ? (
            <RankGrid>
              {Array.from({ length: 10 }).map(() => {
                return <SkeletonCard rank></SkeletonCard>;
              })}
            </RankGrid>
          ) : ( */}
          <RankGrid>
            {kakao_list_2?.map((_, idx) => {
              return (
                <WebToonMonth key={idx} {..._} idx={idx + 5}></WebToonMonth>
              );
            })}
          </RankGrid>
          {/* )} */}
        </MonthBox>
      </Slick>

      <TitleGrid>
        <Text type="h2" fontWeight="bold">
          {user_info?.userName
            ? `${user_info.userName}님만을 위한 웹툰 추천`
            : "유저 맞춤 웹툰 추천"}
        </Text>
        {is_login ? (
          <Button
            border="none"
            bgColor={Color.white}
            color={Color.gray700}
            fontSize="12px"
            width="50px"
            _onClick={() => {
              history.push("/toonlist/user_offer");
            }}
          >
            더보기
          </Button>
        ) : null}
      </TitleGrid>

      {is_login ? (
        <SliderBox>
          {is_loading || for_user_list.length === 0 ? (
            <Slick is_infinite>
              {Array.from({ length: 10 }).map(() => {
                return <SkeletonCard></SkeletonCard>;
              })}
            </Slick>
          ) : (
            <Slick is_infinite>
              {for_user_list?.map((_, idx) => {
                return <WebToonCard key={idx} {..._}></WebToonCard>;
              })}
            </Slick>
          )}
        </SliderBox>
      ) : (
        <HiddenBlurBox>
          <BlurText>지금 로그인하고 맞춤 웹툰 추천 받기!</BlurText>
          <BlurBox>
            {is_loading || for_user_list.length === 0 ? (
              <Slick is_infinite>
                {Array.from({ length: 10 }).map(() => {
                  return <SkeletonCard></SkeletonCard>;
                })}
              </Slick>
            ) : (
              <Slick is_infinite>
                {for_user_list?.map((_, idx) => {
                  return <WebToonCard key={idx} {..._}></WebToonCard>;
                })}
              </Slick>
            )}
          </BlurBox>
        </HiddenBlurBox>
      )}

      <BannerBox>
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
        <Text type="h2" fontWeight="bold">
          베스트 리뷰어
        </Text>
      </TitleGrid>
      <CenterSliderBox>
        <Slick is_center>
          {reviewer_list.map((_, idx) => {
            return <BestReveiwerCard key={idx} {..._}></BestReveiwerCard>;
          })}
        </Slick>
      </CenterSliderBox>
    </React.Fragment>
  );
};

const TitleGrid = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
  margin-top: 30px;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
`;

const SliderBox = styled.div`
  width: 100%;
  height: auto;
  white-space: nowrap;
  overflow: hidden;
  margin: 10px 0 10px 0;
  padding-left: 16px;
`;

const CenterSliderBox = styled.div`
  width: 100%;
  height: 300px;
  padding-top: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url("https://lh3.googleusercontent.com/pw/AM-JKLURqrwtXPaJylOjAgW0GC_NFW7bwZg6PTmw7c_MTAfrn6mxU3rOLythCMjgdGSFi1WJ4KmcUqViPL_wmxJq_YiMTzp3ZlVwAUlrprH7G6xnZjvmFbUms5av9Xwak5qcWGKQsD7emBC4S0dZeCZUX1lS=w375-h300-no?authuser=0");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
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
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0 10px 0;
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
  margin: 15px 0;
`;

const ReviewTabGrid = styled.div`
  width: 100%;
  margin-top: 40px;
  padding: 0 16px;
  display: flex;
`;

const BannerBox = styled.div`
  width: 320px;
  height: 66px;
  background-color: ${Color.gray100};
  padding: 0 16px;
  margin: 30px auto;
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
export default Main;
