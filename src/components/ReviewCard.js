import React from "react";
import styled from "styled-components";
import { Text, Image, Button } from "../elements";
import { Color } from "../shared/common";
import profileImgList from "../images/profiles";
import { HeartFilled } from "@ant-design/icons";

const ReviewCard = (props) => {
  const [showMore, setShowMore] = React.useState(false);

  const like_list = props.like_list;

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

  return (
    <React.Fragment>
      <Container main={props.main}>
        <FlexToonGrid>
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
              style={{
                fontSize: "18px",
                color: ` ${Color.gray200}`,
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
  width: 235px;
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
