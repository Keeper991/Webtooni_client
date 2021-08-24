import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Text, Image, Button } from "../elements";
import { WebToonCard, DetailReview, DetailStar } from "../components";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as modalActions } from "../redux/modules/modal";
import { Color } from "../shared/common";
import {
  FillStar,
  ShootingStar,
  Pencil,
  Check,
  Plus,
  DownArrow,
  LeftArrow,
  GoTop,
} from "../images/icons";
import { kakao_webtoon_symbol, naver_webtoon_symbol } from "../images/symbols";
// import shootingStar from "../images/shootingStar.png";
import { history } from "../redux/configureStore";

const Detail = (props) => {
  const dispatch = useDispatch();
  const webtoon_id = parseInt(props.match.params.id);
  const initialState = React.useRef({
    reviewId: -1,
    userPointNumber: 0,
    reviewContent: "",
  });
  // 로그인 유무와 로그인한 유저정보 가져오기
  const is_login = useSelector((store) => store.user.is_login);
  const is_loading = useSelector((store) => store.user.is_loading);
  const userName = useSelector((store) => store.user.info.userName);
  const subscribeList = useSelector((store) => store.user.subscribeList);
  const toon_list = useSelector((store) => store.webtoon.toon_list);
  const review_list = useSelector((store) => store.review.review_list);
  const toonOne = toon_list.find((toon) => toon.toonId === webtoon_id);
  const similarToons = toon_list.filter((toon) =>
    toon.filterConditions?.includes(webtoon_id)
  );

  let toonReviews = review_list.filter(
    (review) => review.toonId === webtoon_id
  );
  const reviewOne = toonReviews.find((review) => review.userName === userName);
  toonReviews = toonReviews.filter((review) => review.userName !== userName);

  const [myReview, setMyReview] = React.useState(initialState.current);

  //보여줄 리뷰 개수 설정
  const [shownReview, addShownReview] = React.useState(2);
  const startReviewNo = reviewOne?.reviewContent ? 1 : 2;
  useEffect(() => {
    addShownReview(startReviewNo);
  }, [startReviewNo]);

  const [sortByNew, isSortByNew] = React.useState(true);
  const loading = useSelector((store) => store.review.is_loading_review);
  const loading_user = useSelector((store) => store.user.is_loading);

  const [goTop, isGoTop] = React.useState(false);

  // effects
  useEffect(() => {
    if (!toonOne || !toonOne.filterConditions?.includes("detail")) {
      dispatch(webtoonActions.getToonOneServer(webtoon_id));
    }
  }, [toonOne, webtoon_id]);

  useEffect(() => {
    if (is_login) {
      if (reviewOne) {
        setMyReview(reviewOne);
      } else {
        setMyReview(initialState.current);
      }
    } else {
      setMyReview(initialState.current);
    }
  }, [is_login, webtoon_id, reviewOne]);

  //최신 순 리스트
  const newReviews = toonReviews
    .sort(function (a, b) {
      return a.createDate < b.createDate ? 1 : -1;
    })
    .filter((_) => _.reviewContent);

  //좋아요 순 리스트
  const likeReviews = toonReviews
    .sort(function (a, b) {
      return a.likeCount > b.likeCount ? -1 : 1;
    })
    .filter((_) => _.reviewContent);

  const countReview = reviewOne?.reviewContent
    ? likeReviews.length + 1
    : likeReviews.length; //리뷰 수

  //내 리스트에 추가하기(구독하기)
  const handleSubscribe = (webtoon_id, bool) => {
    if (!is_login) {
      dispatch(modalActions.activeModal("needLogin"));
    } else if (loading_user) {
      return;
    } else {
      if (!is_loading) {
        dispatch(userActions.subscribeServer(webtoon_id, bool));
      }
    }
  };

  // 별 클릭 시, 내가 작성한 리뷰에 세팅.
  const handleStarClick = (userPointNumber) => {
    if (!is_login) {
      dispatch(modalActions.activeModal("needLogin"));
    } else if (loading) {
      return;
    } else {
      setMyReview({ ...myReview, userPointNumber });
      dispatch(reviewActions.putStarServer(webtoon_id, userPointNumber));
    }
  };

  return (
    <React.Fragment>
      {toonOne && (
        <>
          <Grid
            position="absolute"
            overflow="hidden"
            top="0"
            left="0"
            width="100%"
            height="337px"
            zIndex="0"
          >
            <ToonBackground src={toonOne.toonImg} />
          </Grid>
          <Grid
            position="absolute"
            top="0"
            left="0"
            width="100%"
            bgColor="rgba(0,0,0,0.3)"
            height="337px"
            zIndex="1"
          ></Grid>
          <Grid
            position="absolute"
            top="0"
            left="0"
            width="100%"
            bg="linear-gradient(transparent, rgba(0,0,0,0.5))"
            height="337px"
            zIndex="2"
          ></Grid>
          <Grid padding="0 20px 20px 20px" margin="-50px 0 0 0" zIndex="2">
            {/* 웹툰 정보 */}
            <Grid
              // borderBottom={`1px solid ${Color.gray100}`}
              display="flex"
              flexDir="column"
              justify="center"
              align="center"
              margin="0 0 28px 0"
              position="relative"
              zIndex="4"
            >
              <Image src={toonOne.toonImg} width="150px" height="150px"></Image>

              <Text
                color={Color.white}
                margin="13px 0 8px 0"
                type="h1"
                fontWeight="bold"
              >
                {toonOne.toonTitle}
              </Text>
              <Text margin="0 0 13px 0" type="caption" color={Color.gray300}>
                {toonOne.toonAuthor}
              </Text>
              <Grid
                display="flex"
                justify="center"
                align="center"
                padding="0 0 13px 0"
              >
                <FillStar width="16px" height="16px" />
                <Text
                  margin="0 0 0 4px"
                  fontSize="16px"
                  type="num"
                  fontWeight="bold"
                  color={Color.primary}
                >
                  &nbsp;{toonOne.toonAvgPoint.toFixed(1)}
                </Text>
                <Text margin="0" color={Color.white}>
                  &nbsp;{toonOne.genres?.map((item) => "·" + item + " ")}
                </Text>

                {toonOne.finished ? (
                  <Text color={Color.gray300}>&nbsp;완결</Text>
                ) : (
                  <Text color={Color.gray300}>
                    &nbsp;
                    {toonOne.toonWeekday?.length > 1
                      ? "·" +
                        toonOne.toonWeekday
                          .split(",")
                          .map((item) => item + "요")
                          .join(" ·") +
                        "웹툰"
                      : "·" + toonOne.toonWeekday + "요 웹툰"}
                  </Text>
                )}

                <Grid position="absolute" right="3px" bottom="15px">
                  {toonOne.toonPlatform === "카카오" ? (
                    <KakaoLogo kakao={kakao_webtoon_symbol}></KakaoLogo>
                  ) : (
                    <NaverLogo naver={naver_webtoon_symbol}></NaverLogo>
                  )}
                </Grid>
              </Grid>
            </Grid>
            {/* 별점 주기 */}
            <Grid display="flex" justify="center" margin="38px 0 0 0">
              <DetailStar
                starPoint={myReview.userPointNumber}
                onStarClick={handleStarClick}
              />
            </Grid>
            <Grid display="flex" justify="center" margin="28px 0 40px 0">
              {subscribeList.includes(webtoon_id) ? (
                <Grid
                  margin="0 12px 0 0"
                  onClick={() => handleSubscribe(webtoon_id, false)}
                  cursor="true"
                  height="40px"
                  display="flex"
                  justify="center"
                  align="center"
                  borderRadius="36px"
                  padding="13px 16px"
                  bgColor={Color.primary}
                  border={`1px solid ${Color.primary}`}
                >
                  <Check />
                  <Text
                    margin="0 0 0 8px"
                    fontWeight="medium"
                    color={Color.white}
                  >
                    구독중
                  </Text>
                </Grid>
              ) : (
                <Grid
                  margin="0 12px 0 0"
                  onClick={() => handleSubscribe(webtoon_id, true)}
                  cursor="true"
                  height="40px"
                  display="flex"
                  justify="center"
                  align="center"
                  bgColor={Color.white}
                  border={`1px solid ${Color.gray200}`}
                  borderRadius="36px"
                  padding="13px 16px"
                >
                  <Plus />
                  <Text
                    margin="0 0 0 8px"
                    fontWeight="medium"
                    color={Color.gray800}
                  >
                    구독하기
                  </Text>
                </Grid>
              )}

              <Grid
                onClick={() => {
                  if (!is_login) {
                    dispatch(modalActions.activeModal("needLogin"));
                  } else {
                    history.push({
                      pathname: `/review/write/${webtoon_id}`,
                      state: {
                        toonTitle: toonOne.toonTitle,
                        from_detail: true,
                      },
                    });
                  }
                }}
                cursor="true"
                height="40px"
                display="flex"
                justify="center"
                align="center"
                bgColor={Color.white}
                border={`1px solid ${Color.gray200}`}
                borderRadius="36px"
                padding="13px 16px"
              >
                <Pencil />
                <Text
                  margin="0 0 0 8px"
                  fontWeight="medium"
                  color={Color.gray800}
                >
                  {reviewOne?.reviewContent ? "리뷰수정" : "리뷰등록"}
                </Text>
              </Grid>
            </Grid>

            <Text fontWeight="medium" color={Color.gray500}>
              웹툰설명
            </Text>
            <Text
              color={Color.gray800}
              tag="p"
              margin="16px 0"
              whiteSpace="normal"
              lineHeight="22px"
            >
              {toonOne.toonContent}
            </Text>
            <a
              href={`${toonOne.realUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Grid
                cursor="true"
                width="100%"
                height="40px"
                display="flex"
                justify="center"
                align="center"
                bgColor={Color.white}
                border={`1px solid ${Color.gray200}`}
                borderRadius="36px"
                padding="12px 10px 12px 16px"
                margin="0 0 36px 0"
              >
                <ShootingStar
                  style={{ width: "16px", height: "16px", marginRight: "8px" }}
                />
                <Text
                  tag="p"
                  textAlign="left"
                  fontWeight="medium"
                  color={Color.primary}
                >
                  웹툰 바로 보러가기
                </Text>
                <Grid width="100%" display="flex" justify="flex-end">
                  <LeftArrow />
                </Grid>
              </Grid>
            </a>

            {countReview !== 0 && (
              <>
                <Grid
                  display="flex"
                  justify="space-between"
                  align="center"
                  margin="0 0 14px 0"
                >
                  <Text tag="p" fontWeight="medium" color={Color.gray500}>
                    리뷰&nbsp;{countReview}개
                  </Text>
                  {/* 리뷰 정렬하기 */}
                  <SortGrid>
                    <SortNew
                      sort={sortByNew}
                      onClick={() => {
                        isSortByNew(true);
                        addShownReview(startReviewNo);
                      }}
                    >
                      최신 순
                    </SortNew>
                    <SortLike
                      sort={!sortByNew}
                      onClick={() => {
                        isSortByNew(false);
                        addShownReview(startReviewNo);
                      }}
                    >
                      좋아요 순
                    </SortLike>
                  </SortGrid>
                </Grid>
                {/* 리뷰 목록 */}
                {reviewOne?.reviewContent && (
                  <DetailReview isMe={true} review={reviewOne} />
                )}
                {sortByNew
                  ? newReviews.map((item, idx) => {
                      if (idx < shownReview) {
                        return <DetailReview key={idx} review={item} />;
                      }
                    })
                  : likeReviews.map((item, idx) => {
                      if (idx < shownReview) {
                        return <DetailReview key={idx} review={item} />;
                      }
                    })}

                <Grid
                  position="fixed"
                  bottom="40px"
                  right="36px"
                  zIndex="2"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <GoTop />
                </Grid>

                {(likeReviews.length > shownReview ||
                  likeReviews.length - 1 === shownReview) && (
                  <Grid
                    padding="14px"
                    margin="-4px 0 20px 0"
                    bgColor={Color.white}
                    border={`1px solid ${Color.gray200}`}
                    borderRadius="8px"
                    display="flex"
                    align="center"
                    justify="center"
                    onClick={() => {
                      addShownReview(shownReview + 8);
                      isGoTop(true);
                    }}
                  >
                    <Text
                      margin="0 9px 0 0"
                      fontWeight="medium"
                      color={Color.gray800}
                    >
                      더보기
                    </Text>
                    <DownArrow />
                  </Grid>
                )}
              </>
            )}
          </Grid>

          <Grid padding="22px 0 0 2px" borderTop={`8px solid ${Color.gray100}`}>
            <Grid display="flex" justify="space-between" align="center">
              <Text
                padding="0 0 0 15px"
                tag="p"
                type="h2"
                fontWeight="bold"
                color={Color.gray800}
              >
                비슷한 장르의 웹툰 추천
              </Text>
              <Button
                padding="0 17px 0 0"
                border="none"
                bgColor={Color.white}
                color={Color.gray700}
                fontSize="13px"
                _onClick={() => {
                  history.push({
                    pathname: "/toonlist/similar_genre",
                    state: { toon_id: webtoon_id },
                  });
                }}
              >
                더보기
              </Button>
            </Grid>

            <SliderBox>
              <CardSliderBox>
                {similarToons.map((item, idx) => (
                  <WebToonCard key={idx} {...item} id={item.toonId} detail />
                ))}
              </CardSliderBox>
            </SliderBox>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
};

const Grid = styled.div`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  display: ${(props) => (props.display ? props.display : "")};
  justify-content: ${(props) => (props.justify ? props.justify : "")};
  align-items: ${(props) => (props.align ? props.align : "")};
  flex-direction: ${(props) => (props.flexDir ? props.flexDir : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  padding: ${(props) => (props.padding ? props.padding : "")};
  position: ${(props) => props.position || ""};
  bottom: ${(props) => props.bottom || ""};
  top: ${(props) => props.top || ""};
  left: ${(props) => props.left || ""};
  right: ${(props) => props.right || ""};
  z-index: ${(props) => props.zIndex || ""};
  background-color: ${(props) => props.bgColor || ""};
  background: ${(props) => props.bg || ""};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
  border-bottom: ${(props) => props.borderBottom || ""};
  border-top: ${(props) => props.borderTop || ""};
  border: ${(props) => props.border || ""};
  border-radius: ${(props) => props.borderRadius || ""};
  overflow: ${(props) => props.overflow || ""};
  ${(props) => props.gap && `gap: ${props.gap};`}
`;
const ToonBackground = styled.div`
  width: 102%;
  height: 342px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  margin-left: -5px;
  margin-top: -5px;
`;

const KakaoLogo = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("${(props) => props.kakao}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const NaverLogo = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("${(props) => props.naver}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
const SortGrid = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  margin: -5px 3px 0 0;
`;
const SortNew = styled.p`
  cursor: pointer;
  color: ${(props) => (props.sort ? Color.primary : Color.gray800)};
  font-size: 13px;
`;
const SortLike = styled.p`
  cursor: pointer;
  color: ${(props) => (props.sort ? Color.primary : Color.gray800)};
  font-size: 13px;
`;
const SliderBox = styled.div`
  white-space: nowrap;
  overflow: hidden;
  margin: 20px 0 50px 0;
  padding-left: 16px;
`;

const CardSliderBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: scroll;
  padding-right: 150px;
  -ms-overflow-style: none;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

export default Detail;
