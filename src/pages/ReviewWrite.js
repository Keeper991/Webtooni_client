import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input, Text } from "../elements";
import { DetailStar } from "../components";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { actionCreators as modalActions } from "../redux/modules/modal";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
import { LeftOutlined } from "@ant-design/icons";

const ReviewWrite = (props) => {
  const dispatch = useDispatch();

  //selectors
  const is_login = useSelector((store) => store.user.is_login);
  const userName = useSelector((store) => store.user.info.userName);
  const loading = useSelector((store) => store.review.is_loading_review);

  const toon_list = useSelector((store) => store.webtoon.toon_list);
  const webtoon_id = parseInt(props.match.params.webtoon_id);
  const toonOne = toon_list.find((toon) => toon.toonId === webtoon_id); //웹툰 정보
  const toonTitle = props.location.state.toonTitle; //웹툰 제목
  const review_list = useSelector((store) => store.review.review_list); //리뷰 리스트
  const prev_review = review_list.find(
    // 기존 리뷰 찾기
    (review) => review.userName === userName && review.toonId === webtoon_id
  );

  //리뷰 작성하기
  const [review, setReview] = React.useState("");
  const [starPoint, setStarPoint] = React.useState(0);
  //내용 미입력시 메세지 띄우기
  const [contentAlert, isContentAlert] = React.useState(false);

  useEffect(() => {
    //기존 리뷰 불러오기
    if (prev_review) {
      if (prev_review.reviewContent) {
        setReview(prev_review.reviewContent);
      }
      setStarPoint(prev_review.userPointNumber);
    }
    //웹툰 정보 요청(웹툰&리뷰 정보 없을 때)
    if (!toonOne || !toonOne.filterConditions.includes("detail")) {
      dispatch(webtoonActions.getToonOneServer(webtoon_id));
    }
  }, [prev_review]);

  //리뷰 등록
  const uploadReview = () => {
    // 내용 미입력 시 알림
    if (!review || starPoint === 0) {
      isContentAlert(true);
      setTimeout(function () {
        isContentAlert(false);
      }, 2000);
      return;
    }
    if (loading) {
      return;
    }

    if (is_login) {
      dispatch(
        reviewActions.updateReviewServer(
          prev_review.reviewId,
          review,
          props.location.state.from_detail
        )
      );
    } else {
      dispatch(modalActions.activeModal("needLogin"));
    }
  };

  return (
    <>
      <Grid
        display="flex"
        width="100%"
        height="70px"
        justify="space-between"
        align="center"
        borderBottom={`1px solid ${Color.gray200}`}
        padding="0 16px"
        margin="-130px 0 0 0"
      >
        {/* 뒤로가기 */}
        <Grid cursor="true">
          <LeftOutlined
            style={{ fontSize: "18px", margin: "25px 0" }}
            onClick={() => {
              history.goBack();
            }}
          ></LeftOutlined>
        </Grid>

        {/* 게시글 등록 */}
        <Button
          border="none"
          bgColor={Color.gray900}
          width="66px"
          height="36px"
          _onClick={uploadReview}
        >
          <Text color={Color.white} fontWeight="medium">
            작성
          </Text>
        </Button>
      </Grid>
      {/* 웹툰 제목 */}
      <Grid
        padding="32px 20px 0"
        bgColor={Color.white}
        display="flex"
        justify="flex-start"
      >
        <Grid
          width="auto"
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
            margin="2px 0 0 0"
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
      {/* 별점 주기 */}
      <Grid padding="20px 20px 15px">
        <DetailStar
          starPoint={starPoint}
          onStarClick={(starPoint) => {
            if (!loading && is_login) {
              setStarPoint(starPoint);
              dispatch(reviewActions.putStarServer(webtoon_id, starPoint));
            } else if (loading && is_login) {
              dispatch(modalActions.activeModal("wait"));
            } else {
              dispatch(modalActions.activeModal("needLogin"));
            }
          }}
        />
      </Grid>
      {/* 내용 입력 */}
      <Grid
        position="relative"
        display="flex"
        flexDir="column"
        justify="center"
        align="center"
        height="100%"
      >
        <Input
          padding="30px 23px 0"
          multiLine
          placeholder="내용을 입력하세요"
          _onChange={(e) => setReview(e.target.value)}
          border="none"
          width="100%"
          height="65vh"
          fontSize="16px"
          color={Color.gray800}
          value={review}
        ></Input>

        <CntAlertStyle fadeOut={!contentAlert}>내용을 입력하세요</CntAlertStyle>
      </Grid>
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
  width: 80vw;
  height: 32px;
  border-radius: 99px;
  background-color: ${Color.gray900};
  position: absolute;
  bottom: 20px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: ${Color.white};
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
