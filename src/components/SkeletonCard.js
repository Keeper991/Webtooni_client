import React from "react";
import styled, { keyframes } from "styled-components";
import { Color } from "../shared/common";

const SkeletonCard = (props) => {
  if (props.rank) {
    return (
      <RankFlexToonGrid>
        <RankImageGrid></RankImageGrid>
        <RankInfoGrid>
          <RankTitleGrid></RankTitleGrid>
          <RankPointGrid></RankPointGrid>
        </RankInfoGrid>
      </RankFlexToonGrid>
    );
  }

  if (props.more) {
    return (
      <MoreFlexToonGrid>
        <MoreImageGrid></MoreImageGrid>

        <MoreInfoGrid>
          <MoreAuthorText></MoreAuthorText>
          <MoreTitleText></MoreTitleText>
          <MorePointText></MorePointText>
        </MoreInfoGrid>
      </MoreFlexToonGrid>
    );
  }

  if (props.main_review) {
    return <MainReviewContainer></MainReviewContainer>;
  }
  return (
    <Container>
      <ImageGrid></ImageGrid>
      <ContentsGrid></ContentsGrid>
    </Container>
  );
};

const Gradient = keyframes`
   0% {
        background-color: ${Color.gray200};
        opacity: 0.3;
    }

    50% {
      background-color: ${Color.gray200};
        opacity: 0.5;
    }

    100% {
      background-color: ${Color.gray200};
        opacity: 0.3;
    }
`;

const Container = styled.div`
  width: 150px;
  height: 220px;
  display: inline-block;
  margin-right: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;

const ContentsGrid = styled.div`
  padding: 5px;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: ${Color.gray200};
  animation: ${Gradient} 2s infinite ease-in-out;
`;

const ImageGrid = styled.div`
  width: 150px;
  height: 140px;
  background: ${Color.gray300};
  border-radius: 5px;
`;

const RankFlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0;
`;

const RankImageGrid = styled.div`
  width: 40px;
  height: 40px;
  background: ${Color.gray400};
  margin-left: 22px;
  border-radius: 4px;
`;

const RankInfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  height: 36px;
  margin-left: 5px;
  justify-content: space-between;
`;

const RankTitleGrid = styled.div`
  width: 130px;
  height: 12px;
  animation: ${Gradient} 2s infinite ease-in-out;
`;

const RankPointGrid = styled.div`
  width: 100px;
  height: 12px;
  animation: ${Gradient} 2s infinite ease-in-out;
`;

const MoreFlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0 16px;
  border-bottom: 1px solid ${Color.gray200};
`;

const MoreImageGrid = styled.div`
  width: 64px;
  height: 64px;
  background: ${Color.gray200};
`;

const MoreInfoGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 64px;
  margin-left: 5px;
`;

const MoreTitleText = styled.p`
  width: 150px;
  height: 20px;
  font-weight: bold;

  animation: ${Gradient} 2s infinite ease-in-out;
`;

const MoreAuthorText = styled.p`
  width: 100px;
  height: 20px;

  animation: ${Gradient} 2s infinite ease-in-out;
`;

const MorePointText = styled.p`
  width: 80px;
  height: 20px;

  animation: ${Gradient} 2s infinite ease-in-out;
`;

const MainReviewContainer = styled.div`
  width: 150px;
  height: 220px;
  background: ${Color.white};
  display: inline-block;
  margin-right: 10px;
`;
export default SkeletonCard;
