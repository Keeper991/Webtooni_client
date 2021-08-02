import React from "react";
import styled from "styled-components";
import { Text, Image, Button } from "../elements";

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

  return (
    <React.Fragment>
      <Container>
        <FlexGrid>
          <UserGrid>
            <ImageCircle></ImageCircle>
            <ColumnGrid>
              <Text fontSize="12px">{props.userName}</Text>
              <Text fontSize="10px">{props.userGrade}</Text>
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
            <Text fontSize="14px">{props.toonTitle}</Text>
            <FlexGrid>
              <Text fontSize="12px">{props.toonAuthor}</Text>
              <Text fontSize="12px">★{props.toonPointTotalNumber}</Text>
            </FlexGrid>
            <FlexGrid>
              <Text fontSize="10px">{props.platform}</Text>
              <Text fontSize="10px">{props.toonDay}</Text>
            </FlexGrid>
          </InfoGrid>
        </FlexToonGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 265px;
  height: auto;
  background: #f1f1f1;
  display: inline-block;
  padding: 10px;
  margin: 0 10px;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlexToonGrid = styled.div`
  display: flex;
  align-items: center;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserGrid = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewGrid = styled.div`
  width: 245px;
  min-height: 100px;
  height: auto;
  padding: 10px 0;
`;

const ReivewText = styled.div`
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

const ReivewTextMore = styled.div`
  width: 245px;
  font-size: 12px;
  white-space: normal;
  word-break: break-word;
  line-height: 1.4em;
`;

const ColumnGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

const ImageCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-image: url("https://openads-real.s3.amazonaws.com/openadsAdmin/ckeditor/images/14_%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98.png");
  background-size: cover;
  background-position: center;
`;

export default ReviewCard;
