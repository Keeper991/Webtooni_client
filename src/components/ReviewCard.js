import React from "react";
import styled from "styled-components";
import { Text, Image, Button } from "../elements";
import { Color } from "../shared/common";
import profileImgList from "../images/profiles";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilled } from "@ant-design/icons";
import { history } from "../redux/configureStore";
import { actionCreators as reviewActions } from "../redux/modules/review";
import time from "../shared/time";

const ReviewCard = (props) => {
  const dispatch = useDispatch();
  const is_main = props.main;
  const [showMore, setShowMore] = React.useState(false);

  const is_login = useSelector((state) => state.user.is_login);
  const toon_list = useSelector((state) => state.webtoon.toon_list);
  const toonInfo = toon_list.find((toon) => toon.toonId === props.toonId);

  React.useEffect(() => {
    setShowMore(false);
  }, []);

  const handleTextToggle = () => {
    if (showMore) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  };

  const handleLike = () => {
    if (is_main) {
      return;
    }
    if (is_login) {
      dispatch(
        reviewActions.likeReviewServer(
          props.reviewId,
          !props.like_list.includes(props.reviewId)
        )
      );
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  // 별점만 있는 리뷰면 보이지 않음.
  if (!props.reviewContent) {
    return <></>;
  }

  return (
    <React.Fragment>
      <Container main={props.main}>
        <PaddingBox>
          <FlexGrid>
            <UserGrid>
              <Image
                src={profileImgList[props.userImg]}
                shape="circle"
                size="40px"
              ></Image>
              <ColumnGrid>
                <Text type="caption">{props.userName}</Text>
                <FlexGrid>
                  <Image
                    shape="square"
                    margin="0 5px 0 0"
                    size="12px"
                    src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
                  ></Image>
                  <Text
                    tag="p"
                    margin="0 10px 0 0"
                    type="num"
                    fontWeight="bold"
                    color={Color.primary}
                  >
                    {props.userPointNumber}
                  </Text>
                  <Text type="caption" color={Color.gray500}>
                    {time(props.createDate)}
                  </Text>
                </FlexGrid>
              </ColumnGrid>
            </UserGrid>
          </FlexGrid>

          <ReviewGrid>
            {showMore ? (
              <ReivewTextMore>{props.reviewContent}</ReivewTextMore>
            ) : (
              <ReivewText>{props.reviewContent}</ReivewText>
            )}
            {props.reviewContent.length >= 73 ? (
              <Button
                bgColor="transparent"
                color={Color.gray400}
                padding="0"
                margin="5px 0 0 0"
                fontSize="12px"
                border="none"
                _onClick={handleTextToggle}
              >
                {showMore ? "줄이기" : "더보기"}
              </Button>
            ) : null}
          </ReviewGrid>

          {props.like_list?.indexOf(props.reviewId) === -1 ? (
            <FlexGrid flexStart>
              <HeartFilled
                onClick={handleLike}
                style={{
                  fontSize: "18px",
                  color: ` ${Color.gray200}`,
                  marginRight: "5px",
                }}
              ></HeartFilled>
              <Text type="num" fontSize="12px" color={Color.gray800}>
                {props.likeCount}
              </Text>
            </FlexGrid>
          ) : (
            <FlexGrid flexStart>
              <HeartFilled
                onClick={handleLike}
                style={{
                  fontSize: "18px",
                  color: ` ${Color.primary}`,
                  marginRight: "5px",
                }}
              ></HeartFilled>
              <Text type="num" fontSize="12px" color={Color.primary}>
                {props.likeCount}
              </Text>
            </FlexGrid>
          )}
        </PaddingBox>
        <FlexToonGrid
          onClick={() => {
            history.push({
              pathname: `/detail/${props.toonId}`,
              state: { id: props.toonId },
            });
          }}
        >
          <Image
            src={toonInfo.toonImg}
            width="64px"
            height="64px"
            radius="5px"
          ></Image>
          <InfoGrid>
            <FlexGrid flexStart>
              <Text type="caption" color={Color.primary}>
                {toonInfo.genres[1] ? toonInfo.genres[1] : toonInfo.genres[0]}
                {toonInfo.genres.length === 0 && "미분류"}
              </Text>
              <Text margin="0 10px" type="caption" color={Color.gray500}>
                {toonInfo.finished ? "완결" : toonInfo.toonWeekday}
              </Text>
            </FlexGrid>
            <Text fontWeight="medium" color={Color.gray800}>
              {toonInfo.toonTitle}
            </Text>
            <FlexGrid>
              <FlexGrid>
                <Text type="caption" color={Color.gray400}>
                  {toonInfo.toonAuthor}
                </Text>
                <Image
                  shape="square"
                  margin="0 5px 0"
                  size="12px"
                  src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
                ></Image>
                <Text type="num" fontWeight="bold" color={Color.primary}>
                  {toonInfo.toonAvgPoint}
                </Text>
              </FlexGrid>
              {toonInfo.toonPlatform === "네이버" ? (
                <Image
                  shape="square"
                  size="12px"
                  margin="0 3px"
                  src="https://lh3.googleusercontent.com/pw/AM-JKLWCsjme2ZNKF3nOEAXrSzYgStfkJAcVZvk17v_KeIKxWNOMJIieajxO7a69mwuRMqSyzqmzCvs6Ltnu3UGFDH5WVOtg1LbHz1w5Pwnuh4utNPgkPm7inmkUX-5eDSRRwFa8HFQSfTb3Fngc2oY2cfyc=s12-no?authuser=0"
                ></Image>
              ) : (
                <Image
                  shape="square"
                  size="12px"
                  margin="0 3px"
                  src="https://lh3.googleusercontent.com/pw/AM-JKLW7PImSbXv8cZ3MOmgkjwKdGNaPHtZ0VG72ZeEv9LZMl89iivlbAcUBLL6fZ836fZHed6gJQNUhMr-12eZgqqFOd-XGWU06ZftPdRGgQnVtbhNGidtMMByNP7a184KzHyKcXLpjUyHS4CFGd6NSctFf=s12-no?authuser=0"
                ></Image>
              )}
            </FlexGrid>
          </InfoGrid>
        </FlexToonGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 328px;
  height: auto;
  background: ${Color.gray100};
  display: inline-block;
  border-radius: 15px;
  border: 1px solid #ccc;
  ${(props) =>
    props.main ? `margin: 10px 20px 20px 0` : `margin: 0 0 20px 0`};
`;

const PaddingBox = styled.div`
  padding: 16px;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) => props.flexStart && `justify-content: start;`};
`;

const FlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
  padding: 16px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 220px;
  height: 64px;
  margin-left: 10px;
`;

const UserGrid = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewGrid = styled.div`
  width: 100%;
  min-height: 80px;
  height: auto;
  padding: 20px 0;
`;

const ReivewText = styled.div`
  width: 100%;
  font-size: 12px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  line-height: 1.6em;
  max-height: 4.8em;
`;

const ReivewTextMore = styled.div`
  width: 100%;
  font-size: 12px;
  white-space: normal;
  word-break: break-word;
  line-height: 1.6em;
`;

const ColumnGrid = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-around;
  flex-direction: column;
  margin: 0 10px;
`;

export default ReviewCard;
