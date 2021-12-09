import React from "react";
import styled, { css } from "styled-components";
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
  SkeletonCard,
  ToolTip,
  Slider,
} from "../components";
import { Button, Text, Image } from "../elements";
import { Color, debounce } from "../shared/common";
import BannerImg1 from "../images/banner1.jpg";
import BannerImg2 from "../images/banner2.jpg";

const bannerList = [
  { img: BannerImg1, url: "/recommendation" },
  { img: BannerImg2, url: "/recommendation", bgColor: Color.green },
];

const Main = () => {
  const dispatch = useDispatch();

  // window size
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const handleWindowResize = React.useCallback(
    debounce(() => {
      setWindowSize(window.innerWidth);
    }, 500),
    []
  );

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  // states
  const [isBest, setIsBest] = React.useState(true);
  const [updatePeriod, setUpdatePeriod] = React.useState("");

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
  const like_list = useSelector((state) => state.user.reviewLikeList);

  // review lists
  const new_review_list = React.useMemo(
    () => [...review_list].sort((a, b) => b.createDate - a.createDate),
    [review_list]
  );
  const best_review_list = React.useMemo(
    () => [...review_list].sort((a, b) => b.likeCount - a.likeCount),
    [review_list]
  );

  // webtoon lists
  const webtooni_list = React.useMemo(
    () =>
      toon_list
        .filter((toon) => toon.filterConditions.includes("webtooni"))
        .sort((a, b) => a.wRank - b.wRank),
    [toon_list]
  );
  const naver_list = React.useMemo(
    () =>
      toon_list
        .filter((toon) => toon.filterConditions.includes("naver"))
        .sort((a, b) => a.nRank - b.nRank),
    [toon_list]
  );
  const kakao_list = React.useMemo(
    () =>
      toon_list
        .filter((toon) => toon.filterConditions.includes("kakao"))
        .sort((a, b) => a.kRank - b.kRank),
    [toon_list]
  );

  // effects
  // 리뷰어 및 리뷰 정보 요청
  React.useEffect(() => {
    dispatch(reviewerActions.getBestReviewer());
    setUpdatePeriod(
      `${new Date(
        parseInt(new Date().getTime() - 604800000)
      ).toLocaleDateString()} ~ ${new Date().toLocaleDateString()}`
    );
  }, []);

  // 웹툰, 리뷰어, 리뷰 리스트 정보 요청
  React.useEffect(() => {
    if (!webtooni_list.length || !naver_list.length || !kakao_list.length) {
      dispatch(webtoonActions.getRankWebtoonList());
    }
    if (!reviewer_list.length) dispatch(reviewerActions.getBestReviewer());

    if (!best_review_list.length || !new_review_list.length) {
      dispatch(reviewActions.getMainReviewList());
    }
  }, []);

  //로그인 직후 웰컴 모달
  React.useEffect(() => {
    if (is_login && !isShownWelcomeModal && userName) {
      dispatch(modalActions.activeModal("welcome"));
    }
  }, [is_login]);

  // 배너리스트, 플랫폼별 웹툰 리스트,  리뷰 및 리뷰어 리스트
  const bannerBoxList = React.useMemo(
    () =>
      bannerList.map((item, i) => (
        <TopBannerBox
          key={i}
          img={item.img}
          bgColor={item.bgColor}
          onClick={() => {
            history.push(item.url);
          }}
        />
      )),
    []
  );
  const monthlyWebtooniCardList = React.useMemo(
    () =>
      is_loading || webtooni_list.length === 0
        ? Array.from({ length: 10 }).map((_, idx) => <SkeletonCard key={idx} />)
        : webtooni_list?.map((_, idx) => (
            <WebToonCard key={idx} index={idx + 1} {..._} rank fixed />
          )),
    [is_loading, webtooni_list]
  );
  const monthlyNaverCardList = React.useMemo(
    () =>
      (is_loading || naver_list.length === 0
        ? [Array.from({ length: 5 }), Array.from({ length: 5 })]
        : [naver_list.slice(0, 5), naver_list.slice(5, 10)]
      ).map((cluster, idx) => (
        <MonthBox key={`c${idx}`}>
          <TextGrid>
            <Text fontWeight="bold">네이버 웹툰</Text>
            <Button
              width="40px"
              height="20px"
              fontSize="10px"
              fontWeight="bold"
              borderRadius="27px"
              padding="0 0 2px 0"
              color={Color.white}
              bgColor={Color.naverGreen}
              border="none"
              margin="0 5px"
            >
              Top 10
            </Button>
            <ToolTip position="bottom-center">
              - 모든 순위는 웹투니버스 사이트 기준입니다. - 해당 평점과 순위는
              매일 자정을 기준으로 업데이트됩니다.
            </ToolTip>
          </TextGrid>
          <RankGrid>
            {cluster.map((_, i) =>
              is_loading || naver_list.length === 0 ? (
                <SkeletonCard key={i} rank />
              ) : (
                <WebToonMonth key={i} {..._} idx={i + idx * 5} />
              )
            )}
          </RankGrid>
        </MonthBox>
      )),
    [is_loading, naver_list]
  );
  const monthlyKakaoCardList = React.useMemo(
    () =>
      (is_loading || kakao_list.length === 0
        ? [Array.from({ length: 5 }), Array.from({ length: 5 })]
        : [kakao_list.slice(0, 5), kakao_list.slice(5, 10)]
      ).map((cluster, idx) => (
        <MonthBox key={`c${idx}`}>
          <TextGrid>
            <Text fontWeight="bold">카카오 웹툰</Text>
            <Button
              width="40px"
              height="20px"
              fontSize="10px"
              fontWeight="bold"
              borderRadius="27px"
              padding="0 0 2px 0"
              color={Color.white}
              bgColor={Color.kakaoDarkYellow}
              border="none"
              margin="0 5px"
            >
              Top 10
            </Button>
            <ToolTip position="bottom-center">
              - 모든 순위는 웹투니버스 사이트 기준입니다. - 해당 평점과 순위는
              매일 자정을 기준으로 업데이트됩니다.
            </ToolTip>
          </TextGrid>
          <RankGrid>
            {cluster.map((_, i) =>
              is_loading || kakao_list.length === 0 ? (
                <SkeletonCard key={i} rank />
              ) : (
                <WebToonMonth key={i} {..._} idx={i + idx * 5} />
              )
            )}
          </RankGrid>
        </MonthBox>
      )),
    [is_loading, kakao_list]
  );
  const reviewList = React.useMemo(
    () =>
      (isBest ? best_review_list : new_review_list)?.map((_, idx) => (
        <ReviewCard key={idx} {..._} main like_list={like_list} />
      )),
    [isBest, best_review_list, new_review_list, like_list]
  );
  const reviewerList = React.useMemo(
    () =>
      reviewer_list?.map((_, idx) => (
        <BestReveiwerCard key={idx} {..._} index={idx} />
      )),
    [reviewer_list]
  );

  return (
    <React.Fragment>
      {/* banner */}
      <BannerSliderBox>
        <Slider isSlick isBanner>
          {bannerBoxList}
        </Slider>
      </BannerSliderBox>

      {/* monthly webtoon rank */}
      <TitleGrid no_margin>
        <TooltipGrid>
          <Text type="h2" fontWeight="bold">
            금주의 웹투니버스 순위
          </Text>
          <ToolTip position="top-center" align={true}>
            {`${updatePeriod} 기준`}
          </ToolTip>
        </TooltipGrid>
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

      <SliderWrap>
        <Slider isSlick={windowSize >= 500}>{monthlyWebtooniCardList}</Slider>
      </SliderWrap>

      {/* monthly webtoon rank (platform) */}
      <MonthContainer>
        <Slider isSlick isCustomArrows isVariableWidth={false} isInfinite>
          {monthlyNaverCardList}
          {monthlyKakaoCardList}
        </Slider>
      </MonthContainer>

      {/* review ad */}
      <ReviewAdBox
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
      </ReviewAdBox>

      {/* review list */}
      <ReviewTitleGrid>
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
            color={isBest ? Color.black : Color.gray400}
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
            color={!isBest ? Color.black : Color.gray400}
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
      </ReviewTitleGrid>
      <SliderWrap>
        <Slider isSlick={windowSize >= 500}>{reviewList}</Slider>
      </SliderWrap>

      {/* best reviewer */}
      <TitleGrid>
        <TooltipGrid>
          <Text type="h2" fontWeight="bold">
            베스트 리뷰어 🏆
          </Text>
          <ToolTip position="top-right" align={true}>
            리뷰를 가장 많이 쓴 리뷰어입니다! 모두 함께 축하해 주세요! 🎉
          </ToolTip>
        </TooltipGrid>
      </TitleGrid>
      <CenterSliderBox>
        <Slider isSlick={true} isCenter={true}>
          {reviewerList}
        </Slider>
      </CenterSliderBox>
    </React.Fragment>
  );
};

const BannerSliderBox = styled.div`
  margin-top: -6px;
`;

const TopBannerBox = styled.div`
  width: 100%;
  height: 140px;
  background-image: url("${(props) => props.img}");
  margin-top: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  ${({ bgColor }) =>
    bgColor &&
    css`
      background-color: ${bgColor};
    `};
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
  border-top: 8px solid ${Color.gray100};
  padding: 10px 16px 0;
  align-items: center;
  justify-content: space-between;
`;

const TooltipGrid = styled.div`
  display: flex;
  gap: 5px;
`;

const ReviewTitleGrid = styled.div`
  display: flex;
  width: 100%;
  height: 65px;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
`;

const SliderWrap = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 0 16px;
`;

const CenterSliderBox = styled.div`
  width: 100%;
  height: 300px;
  padding-top: 10px;
  white-space: nowrap;
  overflow: hidden;
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

const ReviewAdBox = styled.div`
  height: 66px;
  background-color: ${Color.gray100};
  padding: 0 16px;
  margin: 40px 20px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

export default Main;
