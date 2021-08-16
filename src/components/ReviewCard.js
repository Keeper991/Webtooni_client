import React from "react";
import styled from "styled-components";
import { Text, Image, Button } from "../elements";
import { Color } from "../shared/common";
import profileImgList from "../images/profiles";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilled } from "@ant-design/icons";
import { history } from "../redux/configureStore";
import { actionCreators as reviewActions } from "../redux/modules/review";

const ReviewCard = (props) => {
  const dispatch = useDispatch();
  const is_main = props.main;
  const [showMore, setShowMore] = React.useState(false);

  const like_list = useSelector((state) => state.review.user_like_review_list);

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
    dispatch(webtoonActions.likeReviewServer(props.reviewId));
    dispatch(reviewActions.setLikeList());
  };

  if (props.main) {
    return (
      <React.Fragment>
        <MainContainer>
          <FlexGrid>
            <MainUserGrid>
              <Image
                src={profileImgList[props.userImg]}
                shape="circle"
                size="40px"
              ></Image>
              <MainColumnGrid>
                <Text type="caption">{props.userName}</Text>
                <Text type="caption">{props.userGrade}</Text>
              </MainColumnGrid>
            </MainUserGrid>
            <Button
              bgColor="transparent"
              fontSize="12px"
              border="none"
              color={Color.black}
              _onClick={handleTextToggle}
            >
              {showMore ? "줄이기" : "자세히보기"}
            </Button>
          </FlexGrid>

          <MainReviewGrid>
            {showMore ? (
              <MainReivewTextMore>{props.reviewContent}</MainReivewTextMore>
            ) : (
              <MainReivewText>{props.reviewContent}</MainReivewText>
            )}
          </MainReviewGrid>

          <MainFlexToonGrid
            onClick={() => {
              history.push({
                pathname: `/detail/${props.toonId}`,
                state: { id: props.toonId },
              });
            }}
          >
            <Image src={props.toonImg} width="40px" height="52px"></Image>
            <MainInfoGrid>
              <Text>{props.toonTitle}</Text>
              <FlexGrid flexStart>
                <Text type="caption">{props.toonAuthor}</Text>
                <FlexGrid>
                  <Image
                    shape="square"
                    margin="0 5px 0"
                    size="12px"
                    src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
                  ></Image>
                  <Text tyep="caption">{props.toonAvgPoint}</Text>
                </FlexGrid>
              </FlexGrid>
              <FlexGrid>
                {props.toonPlatform === "네이버" ? (
                  <FlexGrid>
                    <Image
                      shape="square"
                      size="12px"
                      margin="0 3px"
                      src="https://lh3.googleusercontent.com/pw/AM-JKLWCsjme2ZNKF3nOEAXrSzYgStfkJAcVZvk17v_KeIKxWNOMJIieajxO7a69mwuRMqSyzqmzCvs6Ltnu3UGFDH5WVOtg1LbHz1w5Pwnuh4utNPgkPm7inmkUX-5eDSRRwFa8HFQSfTb3Fngc2oY2cfyc=s12-no?authuser=0"
                    ></Image>
                    <Text type="small">{props.toonPlatform}웹툰</Text>
                  </FlexGrid>
                ) : (
                  <FlexGrid>
                    <Image
                      shape="square"
                      size="12px"
                      margin="0 3px"
                      src="https://lh3.googleusercontent.com/pw/AM-JKLW7PImSbXv8cZ3MOmgkjwKdGNaPHtZ0VG72ZeEv9LZMl89iivlbAcUBLL6fZ836fZHed6gJQNUhMr-12eZgqqFOd-XGWU06ZftPdRGgQnVtbhNGidtMMByNP7a184KzHyKcXLpjUyHS4CFGd6NSctFf=s12-no?authuser=0"
                    ></Image>
                    <Text type="small">{props.toonPlatform}웹툰</Text>
                  </FlexGrid>
                )}

                <Text type="small">{props.toonWeekday}</Text>
              </FlexGrid>
            </MainInfoGrid>
          </MainFlexToonGrid>
        </MainContainer>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Container main={props.main}>
        <FlexToonGrid
          onClick={() => {
            history.push({
              pathname: `/detail/${props.toonId}`,
              state: { id: props.toonId },
            });
          }}
        >
          <Image
            src={props.toonImg}
            width="64px"
            height="64px"
            radius="5px"
          ></Image>
          <InfoGrid>
            <FlexGrid flexStart>
              <Text type="caption" color={Color.primary}>
                {props.genres[1] ? props.genres[1] : props.genres[0]}
                {props.genres.length === 0 && "미분류"}
              </Text>
              <Text margin="0 10px" type="caption" color={Color.gray500}>
                {props.finished ? "완결" : props.toonWeekday}
              </Text>
            </FlexGrid>
            <Text fontWeight="medium" color={Color.gray800}>
              {props.toonTitle}
            </Text>
            <FlexGrid>
              <FlexGrid>
                <Text type="caption" color={Color.gray400}>
                  {props.toonAuthor}
                </Text>
                <Image
                  shape="square"
                  margin="0 5px 0"
                  size="12px"
                  src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
                ></Image>
                <Text type="num" fontWeight="bold" color={Color.primary}>
                  {props.toonAvgPoint}
                </Text>
              </FlexGrid>
              {props.toonPlatform === "네이버" ? (
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
                <Text tag="p" margin="0 10px 0 0">
                  {props.userPointNumber}
                </Text>
                <Text>{props.creatDate}</Text>
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
        </ReviewGrid>

        {like_list?.indexOf(props.reviewId) === -1 ? (
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
      </Container>
    </React.Fragment>
  );
};

const MainContainer = styled.div`
  width: 245px;
  height: auto;
  background: ${Color.gray100};
  display: inline-block;
  margin-right: 10px;
`;

const MainFlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-top: 1px solid ${Color.gray200};
`;

const MainInfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;
  height: 52px;
  margin-left: 10px;
`;

const MainUserGrid = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const MainReviewGrid = styled.div`
  width: 245px;
  min-height: 80px;
  height: auto;
  padding: 16px;
`;

const MainReivewText = styled.div`
  width: 245px;
  font-size: 12px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  line-height: 1.4em;
  max-height: 7em;
`;

const MainReivewTextMore = styled.div`
  width: 245px;
  font-size: 12px;
  white-space: normal;
  word-break: break-word;
  line-height: 1.4em;
`;

const MainColumnGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

const Container = styled.div`
  width: 328px;
  height: auto;
  background: ${Color.gray100};
  display: inline-block;
  padding: 16px;
  border-radius: 15px;
  border: 1px solid #ccc;
  ${(props) =>
    props.main ? `margin: 10px 20px 40px 0` : `margin: 0 0 20px 0`};
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
  border-bottom: 1px solid #ccc;
  padding-bottom: 16px;
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
  margin-top: 16px;
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
  line-height: 1.4em;
  max-height: 4.2em;
`;

const ReivewTextMore = styled.div`
  width: 100%;
  font-size: 12px;
  white-space: normal;
  word-break: break-word;
  line-height: 1.4em;
`;

const ColumnGrid = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-around;
  flex-direction: column;
  margin: 0 10px;
`;

export default ReviewCard;
