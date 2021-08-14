import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Text, Image, Button, Input } from "../elements";
import { WebToonCard, DetailReview, Slick, DetailStar } from "../components";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { actionCreators as userActions } from "../redux/modules/user";
import { Color } from "../shared/common";
import { ReactComponent as FillStar } from "../images/FillStar.svg";
import { history } from "../redux/configureStore";

const Detail = (props) => {
  // 로그인 유무와 로그인한 유저정보 가져오기
  const is_login = useSelector((store) => store.user.is_login);
  const userName = useSelector((store) => store.user.info.userName);
  const subscribeList = useSelector((store) => store.user.subscribeList);

  // 웹툰 상세정보, 비슷한 웹툰 정보 가져오기
  const webtoon_id = parseInt(props.match.params.id);
  const dispatch = useDispatch();

  const detailList = useSelector((store) => store.webtoon.detail_list);
  const toonOne = detailList.find((d) => d.toonId === webtoon_id);

  const [sortBy, setSortBy] = React.useState("createDate");
  const [myReview, setMyReview] = React.useState({
    reviewId: -1,
    userPointNumber: 0,
    reviewContent: "",
  });

  useEffect(() => {
    if (!toonOne) {
      dispatch(webtoonActions.getToonOneServer(webtoon_id));
      dispatch(webtoonActions.similarToonServer(webtoon_id));
      return;
    }
  }, []);

  useEffect(() => {
    // 기존 리뷰 가져오기
    const reviewIdx = toonOne?.reviews.findIndex(
      (item) => item.userName === userName //로그인한 유저의 리뷰 찾기
    );
    console.log(reviewIdx);
    if (myReview.reviewId === -1 && reviewIdx && reviewIdx !== -1)
      setMyReview(toonOne?.reviews[reviewIdx]);
  }, [toonOne, myReview]);

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
    setMyReview({ ...myReview, userPointNumber });
    dispatch(webtoonActions.putStarServer(webtoon_id, userPointNumber));
  };

  //리뷰 정렬(최신순,좋아요순)
  const sortNew = () => {
    toonOne.reviews.sort(function (a, b) {
      return a.createDate > b.createDate
        ? -1
        : a.createDate < b.createDate
        ? 1
        : 0;
    });
  };
  const sortLike = () => {
    toonOne.reviews.sort(function (a, b) {
      return a.likeCount - b.likeCount;
    });
  };

  return (
    <React.Fragment>
      {toonOne && (
        <>
          <Grid padding="20px">
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
                  {toonOne.toonGenre.map((item) => "#" + item + " ")}
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
                _onClick={() => history.push("/review/write/")}
                shape="pill"
              >
                리뷰등록
              </Button>
            </Grid>
            <Text fontWeight="medium" color={Color.gray500}>
              웹툰설명
            </Text>
            <Text tag="p" margin="16px 0">
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
                <Text
                  tag="p"
                  width="100%"
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
                리뷰({toonOne.reviewCount})
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
            {toonOne.reviews.map((item, idx) => (
              <DetailReview key={idx} review={item} />
            ))}
            <Text tag="p" fontWeight="medium" color={Color.gray500}>
              비슷한 장르의 웹툰({toonOne.reviewCount})
            </Text>

            <Slick>
              {toonOne.similarList.map((item) => (
                <SimContainer>
                  <WebToonCard {...item} />
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
