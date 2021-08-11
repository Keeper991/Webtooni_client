import React from "react";
import styled from "styled-components";
import { Text, Image, Button } from "../elements";
import { Color } from "../shared/common";
import profileImgList from "../images/profiles";

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
        <MainContainer>
          <FlexGrid>
            <MainUserGrid>
              <Image
                src={profileImgList[props.userImg]}
                shape="circle"
                size="40px"
              ></Image>
              <MainColumnGrid>
                <Text fontSize="12px">{props.userName}</Text>
                <Text fontSize="10px">{props.userGrade}</Text>
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

          <hr />

          <MainFlexToonGrid>
            <Image
              margin="0 7px"
              src={props.toonImg}
              width="40px"
              height="52px"
            ></Image>
            <MainInfoGrid>
              <Text fontSize="14px">{props.toonTitle}</Text>
              <FlexGrid>
                <Text fontSize="12px">{props.toonAuthor}</Text>
                <Text fontSize="12px">★{props.toonPointTotalNumber}</Text>
              </FlexGrid>
              <FlexGrid>
                <Text fontSize="10px">{props.platform}</Text>
                <Text fontSize="10px">{props.toonDay}</Text>
              </FlexGrid>
            </MainInfoGrid>
          </MainFlexToonGrid>
        </MainContainer>
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
              <Text fontSize="12px" color={Color.orange}>
                {props.genre ? props.genre.genreType : "뭐넣지"}
              </Text>
              <Text type="p" margin="0 10px" fontSize="12px" color={Color.gray}>
                {props.finished ? "완결" : props.toonWeekday}
              </Text>
            </FlexGrid>
            <Text fontSize="14px">{props.toonTitle}</Text>
            <FlexGrid>
              <FlexGrid>
                <Text fontSize="12px">{props.toonAuthor}</Text>
                <Image
                  shape="square"
                  margin="0 5px 0"
                  size="12px"
                  src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
                ></Image>
                <Text fontSize="12px">{props.userPointNumber}</Text>
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
              <Text fontSize="12px">{props.userName}</Text>
              <Text fontSize="10px">{props.userGrade}</Text>
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

const MainContainer = styled.div`
  width: 265px;
  height: auto;
  background: #f4f4f4;
  display: inline-block;
  padding: 10px;
  margin: 0 10px;
`;

const MainFlexToonGrid = styled.div`
  display: flex;
  align-items: center;
`;

const MainInfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainUserGrid = styled.div`
  display: flex;
  align-items: center;
`;

const MainReviewGrid = styled.div`
  width: 245px;
  min-height: 100px;
  height: auto;
  padding: 10px 0;
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
