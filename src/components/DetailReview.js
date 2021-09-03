import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Image, Text, Button } from "../elements";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as modalActions } from "../redux/modules/modal";
import { EmptyHeart, FillHeart, Stars } from "../images/icons";
import { PermitStrict } from "../shared/PermitAuth";
import time from "../shared/time";
import profileImgList from "../images/profiles";

const DetailReview = (props) => {
  const {
    reviewId,
    userImg,
    userName,
    createDate,
    reviewContent,
    userPointNumber,
    likeCount,
  } = props.review;
  const dispatch = useDispatch();

  //selectors
  const is_login = useSelector((store) => store.user.is_login);
  const reviewLikeList = useSelector((store) => store.user.reviewLikeList);
  const loading = useSelector((store) => store.review.is_loading_review);

  //states, refs
  const [reviewHeight, setReviewHeight] = React.useState("44px");
  const [showMore, isShowMore] = React.useState(true);
  const [showBtn, isShowBtn] = React.useState(false);
  const reviewRef = React.useRef();

  //내가 작성한 리뷰 표시
  const myColor = props.isMe ? Color.primaryLight : Color.gray200;

  //리뷰 내용 더보기(리뷰 높이 44px 이상일 때 활성화
  // 주의 : (X) reviewRef.current.style.height -> 값을 넣을 수는 있지만 읽을 수는 없음 -> .scrollHeight 이용
  useEffect(() => {
    isShowBtn(reviewRef.current?.scrollHeight > 44);
  }, []);
  const showAll = () => {
    // 더보기/줄이기 클릭 시 리뷰 컨테이너 높이조절(overflow:hidden으로 고정값 이상의 리뷰 감추기)
    if (showMore) {
      setReviewHeight("auto");
      isShowMore(false);
    } else {
      setReviewHeight("44px");
      isShowMore(true);
    }
  };

  //좋아요 토글
  const toggleLike = () => {
    if (loading) {
      return;
    }
    if (is_login) {
      dispatch(
        reviewActions.likeReviewServer(
          reviewId,
          !reviewLikeList.includes(reviewId)
        )
      );
    } else {
      dispatch(modalActions.activeModal("needLogin"));
    }
  };

  // 리뷰 내용 없이 별점만 있을 경우
  if (!reviewContent) {
    return <></>;
  }
  return (
    <Grid
      padding="20px 16px"
      margin="0 0 20px 0"
      bgColor={Color.gray100}
      border={`1px solid ${myColor}`}
      borderRadius="12px"
      position="relative"
    >
      <Grid
        display="flex"
        position="relative"
        onClick={() => history.push(`/userinfo/${userName}`)}
      >
        <Image size="40px" shape="circle" src={profileImgList[userImg]}></Image>
        <Grid padding="0 0 0 7px">
          <Text type="num" tag="p" fontSize="12px">
            {userName}
          </Text>
          <Text type="small" padding="6px 0 0 0" tag="p" color={Color.gray500}>
            {time(createDate)}
          </Text>
        </Grid>
        <Grid
          position="absolute"
          right="0"
          top="0"
          display="flex"
          justify="flex-end"
          padding="6px 0 8px 0"
        >
          <StarPoint stars={Stars} points={userPointNumber}></StarPoint>
        </Grid>
      </Grid>
      <Grid
        margin="16px 0 30px 0"
        padding="0 4px"
        height={reviewHeight}
        overflow="hidden"
      >
        <Text
          tag="p"
          whiteSpace="pre-wrap"
          wordBreak="break-all"
          lineHeight="22px"
          color={Color.gray800}
          _ref={reviewRef}
        >
          {reviewContent}
        </Text>
      </Grid>
      {showBtn &&
        (showMore ? (
          <Grid position="absolute" bottom="45px" left="21px">
            <Text color={Color.gray400} _onClick={showAll}>
              &nbsp;... 더보기{" "}
            </Text>
          </Grid>
        ) : (
          <Grid position="absolute" bottom="45px" left="21px">
            <Text color={Color.gray400} _onClick={showAll}>
              &nbsp;&nbsp;줄이기
            </Text>
          </Grid>
        ))}

      {/* 클릭 시 좋아요 토글*/}
      <Grid display="flex" justify="space-between">
        <Grid display="flex" align="center" onClick={toggleLike} cursor="true">
          {reviewLikeList.includes(reviewId) && is_login ? (
            <FillHeart />
          ) : (
            <EmptyHeart />
          )}
          <Text
            type="caption"
            whiteSpace="nowrap"
            color={Color.gray800}
            padding="0 0 0 6px"
          >
            {likeCount}
          </Text>
        </Grid>
        <PermitStrict authorName={userName}>
          <Text
            color={Color.gray800}
            type="caption"
            _onClick={() =>
              !loading &&
              dispatch(modalActions.activeModal("deleteReview", reviewId))
            }
            cursor="true"
          >
            삭제
          </Text>
        </PermitStrict>
      </Grid>
    </Grid>
  );
};

DetailReview.defaultProps = {
  review: {
    reviewContent: null,
    userPointNumber: null,
    likeCount: null,
    id: null,
  },
  isMe: false,
};
const Grid = styled.div`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  overflow: ${(props) => props.overflow || ""};
  display: ${(props) => (props.display ? props.display : "")};
  justify-content: ${(props) => (props.justify ? props.justify : "")};
  align-items: ${(props) => (props.align ? props.align : "")};
  flex-direction: ${(props) => (props.flexDir ? props.flexDir : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  padding: ${(props) => (props.padding ? props.padding : "")};
  position: ${(props) => props.position || ""};
  z-index: ${(props) => props.zIndex || ""};
  top: ${(props) => props.top || ""};
  bottom: ${(props) => props.bottom || ""};
  left: ${(props) => props.left || ""};
  right: ${(props) => props.right || ""};
  background-color: ${(props) => props.bgColor || ""};
  border-bottom: ${(props) => props.borderBottom || ""};
  border-top: ${(props) => props.borderTop || ""};
  border: ${(props) => props.border || ""};
  border-radius: ${(props) => props.borderRadius || ""};

  ${(props) => (props.cursor ? "cursor: pointer" : "")};
`;

const StarPoint = styled.div`
  background-image: url("${(props) => props.stars}");
  width: 100px;
  height: 17.79px;

  background-position-y: ${(props) => (10 - props.points * 2) * 17.79 * -1}px;
  background-repeat: no-repeat;
  background-size: cover;
`;
export default DetailReview;
