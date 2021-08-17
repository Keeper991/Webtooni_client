import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Image, Text, Button } from "../elements";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { ReactComponent as FillStar } from "../images/FillStar.svg";
import { ReactComponent as EmptyHeart } from "../images/EmptyHeart.svg";
import { ReactComponent as FillHeart } from "../images/FillHeart.svg";
import { Permit, PermitStrict } from "../shared/PermitAuth";
import time from "../shared/time";

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

  //좋아요 토글
  const toggleLike = () => {
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
      margin="10px 0"
      bgColor={Color.gray100}
      border={`1px solid ${Color.gray200}`}
      borderRadius="12px"
    >
      <Grid display="flex">
        <Image size="40px" shape="circle" src={userImg}></Image>
        <Grid padding="0 0 0 7px" width="100%">
          <Text type="num" fontSize="12px">
            {userName}
          </Text>
          <Grid display="flex" padding="0 0 8px 0">
            <FillStar width="12px" height="12px" />
            <Text
              margin="0 8px"
              type="num"
              fontSize="12px"
              color={Color.gray700}
            >
              &nbsp;{userPointNumber}
            </Text>
            <Text type="small" color={Color.gray500}>
              {time(createDate)}
            </Text>
          </Grid>
        </Grid>
      </Grid>
      <Text tag="p" margin="16px 0 28px 0">
        {reviewContent}
      </Text>
      {/* 클릭 시 좋아요 토글. 로그인한 유저의 좋아요 여부 알아야함 -> 그 때 토글을 위한 이미지도 구분해 넣기 */}

      <Grid display="flex" justify="space-between">
        <Grid display="flex" align="center" onClick={toggleLike} cursor="true">
          {reviewLikeList.includes(reviewId) ? <FillHeart /> : <EmptyHeart />}
          <Text whiteSpace="nowrap" padding="0 0 0 6px">
            {likeCount}
          </Text>
        </Grid>
        <PermitStrict authorName={userName}>
          <Text
            _onClick={() =>
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

const ItemContainer = styled.div`
  background: #f1f1f1;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LikeText = styled.p`
  position: absolute;
  z-index: 1;
  font-size: 12px;
  top: 10%;
  left: 10%;
`;
export default DetailReview;
