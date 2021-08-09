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
          <RankAuthorGrid></RankAuthorGrid>
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
  return (
    <Container>
      <ImageGrid></ImageGrid>
      <ContentsGrid></ContentsGrid>
    </Container>
  );
};

const Gradient = keyframes`
   0% {
        background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
        background-color: rgba(165, 165, 165, 0.1);
    }
`;

const Container = styled.div`
  width: 150px;
  height: 220px;
  display: inline-block;
  margin: 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  animation: ${Gradient} 2s infinite ease-in-out;
`;

const ContentsGrid = styled.div`
  padding: 5px;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ImageGrid = styled.div`
  width: 150px;
  height: 140px;
  background: ${Color.lightGray};
`;

const RankFlexToonGrid = styled.div`
  width: 40%;
  margin: 5px 0;
  display: flex;
  align-items: center;
`;

const RankImageGrid = styled.div`
  width: 55px;
  height: 55px;
  background: ${Color.lightGray};
`;

const RankInfoGrid = styled.div`
  width: 60%;
  height: 100%;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const RankTitleGrid = styled.div`
  width: 60px;
  height: 12px;

  animation: ${Gradient} 2s infinite ease-in-out;
`;

const RankAuthorGrid = styled.div`
  width: 40px;
  height: 12px;

  animation: ${Gradient} 2s infinite ease-in-out;
`;

const RankPointGrid = styled.div`
  width: 80px;
  height: 12px;

  animation: ${Gradient} 2s infinite ease-in-out;
`;

const MoreFlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0 15px;
  border-bottom: 1px solid ${Color.lightGray3};
`;

const MoreImageGrid = styled.div`
  width: 64px;
  height: 64px;
  background: ${Color.gray};
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

export default SkeletonCard;
