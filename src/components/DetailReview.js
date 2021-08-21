import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Image, Text, Button } from "../elements";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { FillStar, EmptyHeart, FillHeart } from "../images/icons";
import { Permit, PermitStrict } from "../shared/PermitAuth";
import time from "../shared/time";
import profileImgList from "../images/profiles";

const DetailReview = (props) => {
  const {
    reviewId,
    userGrade,
    userImg,
    userName,
    createDate,
    reviewContent,
    userPointNumber,
    likeCount,
  } = props.review;
  const dispatch = useDispatch();
  const is_login = useSelector((store) => store.user.is_login);
  const reviewLikeList = useSelector((store) => store.user.reviewLikeList);
  const loading = useSelector((store) => store.review.is_loading_review);

  const myColor = props.isMe ? Color.primaryLight : Color.gray200;

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
      alert("로그인하세요~");
    }
  };

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
    >
      <Grid display="flex">
        <Image size="40px" shape="circle" src={profileImgList[userImg]}></Image>
        <Grid padding="0 0 0 7px" width="100%">
          <Text type="num" tag="p" fontSize="12px">
            {userName}
          </Text>
          <Grid display="flex" align="center" padding="6px 0 8px 0">
            <FillStar width="12px" height="12px" />
            <Text
              type="num"
              fontSize="12px"
              margin="0 0 0 4px"
              color={Color.gray700}
            >
              {userPointNumber.toFixed(1)}
            </Text>
            <Text type="small" margin="0 0 0 8px" color={Color.gray500}>
              {time(createDate)}
            </Text>
          </Grid>
        </Grid>
      </Grid>
      <Text
        tag="p"
        whiteSpace="pre-wrap"
        wordBreak="break-all"
        lineHeight="22px"
        color={Color.gray800}
        margin="16px 0 28px 0"
      >
        {reviewContent}
      </Text>

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
              dispatch(reviewActions.removeReviewContentServer(reviewId))
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
  display: ${(props) => (props.display ? props.display : "")};
  justify-content: ${(props) => (props.justify ? props.justify : "")};
  align-items: ${(props) => (props.align ? props.align : "")};
  flex-direction: ${(props) => (props.flexDir ? props.flexDir : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  padding: ${(props) => (props.padding ? props.padding : "")};
  position: ${(props) => props.position || ""};
  z-index: ${(props) => props.zIndex || ""};
  top: ${(props) => props.top || ""};
  left: ${(props) => props.left || ""};
  background-color: ${(props) => props.bgColor || ""};
  border-bottom: ${(props) => props.borderBottom || ""};
  border-top: ${(props) => props.borderTop || ""};
  border: ${(props) => props.border || ""};
  border-radius: ${(props) => props.borderRadius || ""};

  ${(props) => (props.cursor ? "cursor: pointer" : "")};
`;

export default DetailReview;
