import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input, Text } from "../elements";
import { DetailStar } from "../components";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
import { ReactComponent as BackButton } from "../images/BackButton.svg";

const ReviewWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((store) => store.user.is_login); //로그인 여부 판별

  //로그인 유저 네임
  const userName = useSelector((store) => store.user.info.userName);

  //별점 이력이 있으면 기존 별점 가져오기
  const webtoon_id = parseInt(props.match.params.webtoon_id);
  const toon_list = useSelector((store) => store.webtoon.toon_list);
  const toonOne = toon_list.find((toon) => toon.toonId === webtoon_id);
  const toonTitle = props.location.state.toonTitle;
  const review_list = useSelector((store) => store.review.review_list);
  const prev_review = review_list.find(
    (review) => review.userName === userName && review.toonId === webtoon_id
  );

  //리뷰 작성하기
  const [review, setReview] = React.useState("");
  const [starPoint, setStarPoint] = React.useState(0);
  //내용 미입력시 메세지 띄우기
  const [contentAlert, isContentAlert] = React.useState(false);

  //상황 별 분기
  useEffect(() => {
    if (prev_review) {
      if(prev_review.reviewContent) {
        setReview(prev_review.reviewContent);
      }
      setStarPoint(prev_review.userPointNumber);
    }
    if (!toonOne || !toonOne.filterConditions.includes("detail")) {
      dispatch(webtoonActions.getToonOneServer(webtoon_id));
    }
  }, [prev_review]);

  useEffect(() => {
    //로그인 안 했으면 메인으로 이동
    if (!is_login) {
      alert("로그인 후 이용하세요~");
      history.go(-1);
      return;
    }
  }, [is_login]);

  //리뷰 등록
  const uploadReview = () => {
    if (!review) {
      isContentAlert(true);
      setTimeout(function () {
        isContentAlert(false);
      }, 2000);
      return;
    }
    if (is_login) {
      dispatch(reviewActions.updateReviewServer(prev_review.reviewId, review));
    } else {
      alert("로그인하세요~");
    }
  };

  return (
    <>
      <Grid
        display="flex"
        justify="space-between"
        align="flex-start"
        borderBottom={`1px solid ${Color.gray200}`}
        padding="20px"
      >
        {/* 뒤로가기 */}
        <Grid
          cursor="true"
          onClick={() => {
            history.go(-1);
          }}
        >
          <BackButton></BackButton>
        </Grid>

        {/* 게시글 등록 */}
        <Button
          border="none"
          bgColor={Color.gray900}
          width="66px"
          height="32px"
          _onClick={uploadReview}
        >
          <Text color={Color.white} fontWeight="medium">
            작성
          </Text>
        </Button>
      </Grid>
      <Grid
        padding="32px 20px 0"
        bgColor={Color.white}
        display="flex"
        justify="flex-start"
      >
        <Grid
          width="128px"
          height="36px"
          display="flex"
          justify="center"
          align="center"
          bgColor={Color.white}
          border={`1px solid ${Color.gray200}`}
          borderRadius="27px"
          padding="9px 12px"
        >
          <Text
            type="p"
            fontWeight="medium"
            color={Color.gray700}
            textAlign="justify"
            width="auto"
          >
            {toonTitle}
          </Text>
        </Grid>
      </Grid>

      <Grid padding="20px 20px 15px">
        <DetailStar
          onStarClick={(starPoint) => {
            setStarPoint(starPoint);
            dispatch(reviewActions.putStarServer(webtoon_id, starPoint));
          }}
          starPoint={starPoint}
        />
      </Grid>
      <Input
        padding="30px 20px 0"
        multiLine
        placeholder="내용을 입력하세요"
        _onChange={(e) => setReview(e.target.value)}
        border="none"
        height="400px"
        value={review}
      ></Input>

      <CntAlertStyle fadeOut={!contentAlert}>내용을 입력하세요</CntAlertStyle>
    </>
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
  background-color: ${(props) => props.bgColor || ""};
  border: ${(props) => props.border || ""};
  border-radius: ${(props) => props.borderRadius || ""};
  border-bottom: ${(props) => props.borderBottom || ""};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
`;

const CntAlertStyle = styled.div`
  width: 296px;
  height: 32px;
  border-radius: 99px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: ${Color.gray900};
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  transition: all 0.5s;
  ${(props) =>
    props.fadeOut &&
    ` opacity: 0;
    `}
`;
export default ReviewWrite;
