import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Text, Image, Button, Input } from "../elements";
import { WebToonCard, DetailReview, Slick, DetailStar } from "../components";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { Color } from "../shared/common";
import { ReactComponent as FillStar } from "../images/FillStar.svg";
import { history } from "../redux/configureStore";
// import shootingStar from "../images/shootingStar.png";
import { ReactComponent as ShootingStar } from "../images/ShootingStar.svg";

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
  const userName = useSelector((store) => store.user.info.userName);
  const subscribeList = useSelector((store) => store.user.subscribeList);
  const toon_list = useSelector((store) => store.webtoon.toon_list);
  const review_list = useSelector((store) => store.review.review_list);
  const toonOne = toon_list.find((toon) => toon.toonId === webtoon_id);
  const similarToons = toon_list.filter((toon) =>
    toon.filterConditions?.includes(webtoon_id)
  );
  const toonReviews = review_list.filter(
    (review) => review.toonId === webtoon_id
  );
  const reviewOne = toonReviews.find((review) => review.userName === userName);

  const [myReview, setMyReview] = React.useState(initialState.current);
  const [sortBy, setSortBy] = React.useState("createDate");

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

  //내 리스트에 추가하기(구독하기)
  const handleSubscribe = (webtoon_id, bool) => {
    if (is_login) {
      dispatch(userActions.subscribeServer(webtoon_id, bool));
    } else {
      alert("로그인하세요~");
    }
  };

  // 별 클릭 시, 내가 작성한 리뷰에 세팅.
  const handleStarClick = (userPointNumber) => {
    if (!is_login) {
      alert("로그인이 필요한 서비스입니다. 로그인해주세요.");
    } else {
      setMyReview({ ...myReview, userPointNumber });
      dispatch(reviewActions.putStarServer(webtoon_id, userPointNumber));
    }
  };

  return (
    <React.Fragment>
      {toonOne && (
        <>
          <Grid padding="20px" margin="-70px 0 0 0">
            {/* 웹툰 정보 */}
            <Grid
              borderBottom={`1px solid ${Color.gray100}`}
              display="flex"
              flexDir="column"
              justify="center"
              align="center"
              margin="0 0 28px 0"
            >
              <Image
                src={toonOne.toonImg}
                width="150px"
                height="150px"
                padding="35px 0 18px 0"
              ></Image>

              <Text margin="18px 0 10px 0" type="h1" fontWeight="bold">
                {toonOne.toonTitle}
              </Text>
              <Text margin="0 0 7px 0" type="caption" color={Color.gray400}>
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
                  margin="0 0 0 8px"
                  fontSize="16px"
                  type="num"
                  fontWeight="bold"
                  color={Color.gray700}
                >
                  &nbsp;{toonOne.toonAvgPoint}
                </Text>
                <Text margin="0 10px" color={Color.primaryLight}>
                  {toonOne.genres?.map((item) => "#" + item + " ")}
                </Text>

                {toonOne.finished ? (
                  <Text color={Color.gray400}>완결</Text>
                ) : (
                  <Text color={Color.gray400}>
                    {toonOne.toonWeekday}요 웹툰
                  </Text>
                )}
              </Grid>
            </Grid>

            {/* 별점 주기 */}
            <Grid display="flex" justify="center">
              <DetailStar
                starPoint={myReview.userPointNumber}
                onStarClick={handleStarClick}
              />
            </Grid>
            <Grid display="flex" justify="center" margin="28px 0 40px 0">
              {subscribeList.includes(webtoon_id) ? (
                <Button
                  shape="pill"
                  bgColor={Color.primary}
                  border={`1px solid ${Color.primary}`}
                  color={Color.white}
                  margin="0 12px 0 0"
                  _onClick={() => handleSubscribe(webtoon_id, false)}
                >
                  구독중
                </Button>
              ) : (
                <Button
                  shape="pill"
                  margin="0 12px 0 0"
                  _onClick={() => handleSubscribe(webtoon_id, true)}
                >
                  구독하기
                </Button>
              )}
              <Button
                _onClick={() =>
                  history.push({
                    pathname: `/review/write/${webtoon_id}`,
                    state: { toonTitle: toonOne.toonTitle, from_detail: true },
                  })
                }
                shape="pill"
              >
                리뷰등록
              </Button>
            </Grid>
            <Text fontWeight="medium" color={Color.gray500}>
              웹툰설명
            </Text>
            <Text tag="p" margin="16px 0" whiteSpace="normal" lineHeight="22px">
              {toonOne.toonContent}
            </Text>
            <a
              href={`${toonOne.realUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                width="100%"
                shape="pill"
                bgColor={Color.white}
                padding="12px 16px"
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
                <Text
                  tag="p"
                  width="100%"
                  textAlign="right"
                  fontWeight="medium"
                  color={Color.primary}
                >
                  {">"}
                </Text>
              </Button>
            </a>
            <Grid display="flex" justify="space-between" align="center">
              <Text
                margin="28px 0 16px 0"
                tag="p"
                fontWeight="medium"
                color={Color.gray500}
              >
                리뷰
              </Text>
              {/* 리뷰 정렬하기 */}
              {/* <Grid display="flex" justify="flex-end" gap="8px">
                <Text _onClick={sortLike} cursor="pointer">
                  최신 순
                </Text>
                <Text _onClick={sortNew} cursor="pointer">
                  좋아요 순
                </Text>
              </Grid> */}
            </Grid>
            {/* 리뷰 목록 */}
            {toonReviews.map((item, idx) => (
              <DetailReview key={idx} review={item} />
            ))}
            <Text tag="p" fontWeight="medium" color={Color.gray500}>
              비슷한 장르의 웹툰
            </Text>

            <Slick>
              {similarToons.map((item, idx) => (
                <SimContainer key={idx}>
                  <WebToonCard {...item} id={item.toonId} />
                </SimContainer>
              ))}
            </Slick>
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
  background-color: ${(props) => props.bgColor || ""};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
  border-bottom: ${(props) => props.borderBottom || ""};
  ${(props) => props.gap && `gap: ${props.gap};`}
`;

const SimContainer = styled.div`
  width: 30vw;
  height: auto;
  padding: 10px;
  margin: 5px;
`;

export default Detail;
