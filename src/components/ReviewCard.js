import React from "react";
import styled from "styled-components";
import { Text, Image, Button } from "../elements";
import { Color } from "../shared/common";
const ReviewCard = (props) => {
  const [showMore, setShowMore] = React.useState(false);

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

  if (props.main) {
    return (
      <React.Fragment>
        <Container>
          <FlexGrid>
            <UserGrid>
              <Image src={props.toonImg} shape="circle" size="40px"></Image>
              <ColumnGrid>
                <Text type="caption">{props.userName}</Text>
                <Text type="caption">{props.userGrade}</Text>
              </ColumnGrid>
            </UserGrid>
            <Button
              bgColor="none"
              fontSize="12px"
              border="none"
              _onClick={handleTextToggle}
            >
              {showMore ? "줄이기" : "자세히보기"}
            </Button>
          </FlexGrid>

          <ReviewGrid>
            {showMore ? (
              <ReivewTextMore>{props.reviewContent}</ReivewTextMore>
            ) : (
              <ReivewText>{props.reviewContent}</ReivewText>
            )}
          </ReviewGrid>

          <hr />

          <FlexToonGrid>
            <Image
              margin="0 7px"
              src={props.toonImg}
              width="40px"
              height="52px"
            ></Image>
            <InfoGrid>
              <Text>{props.toonTitle}</Text>
              <FlexGrid>
                <Text type="caption">{props.toonAuthor}</Text>
                <Text tyep="caption">★{props.toonPointTotalNumber}</Text>
              </FlexGrid>
              <FlexGrid>
                <Text type="small">{props.platform}</Text>
                <Text type="small">{props.toonDay}</Text>
              </FlexGrid>
            </InfoGrid>
          </FlexToonGrid>
        </Container>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Container>
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
                {props.genre ? props.genre.genreType : "뭐넣지"}
              </Text>
              <Text margin="0 10px" type="caption" color={Color.gray500}>
                {props.finished ? "완결" : props.toonWeekday}
              </Text>
            </FlexGrid>
            <Text>{props.toonTitle}</Text>
            <FlexGrid>
              <FlexGrid>
                <Text type="caption">{props.toonAuthor}</Text>
                <Image
                  shape="square"
                  margin="0 5px 0"
                  size="12px"
                  src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
                ></Image>
                <Text type="caption">{props.userPointNumber}</Text>
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
            <Image src={props.toonImg} shape="circle" size="40px"></Image>
            <ColumnGrid>
              <Text type="caption">{props.userName}</Text>
              <Text type="small">{props.userGrade}</Text>
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
            padding="0"
            margin="5px 0 0 0"
            fontSize="12px"
            border="none"
            _onClick={handleTextToggle}
          >
            {showMore ? "줄이기" : "더보기"}
          </Button>
        </ReviewGrid>
        <Text>❤</Text>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background: #f4f4f4;
  display: inline-block;
  padding: 16px;
  margin: 0 0 15px 0;
  border-radius: 15px;
  border: 1px solid #ccc;
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
