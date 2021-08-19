import React from "react";

import styled from "styled-components";
import { ReactComponent as EmptyStar } from "../images/EmptyStar.svg";
import { ReactComponent as FillStar } from "../images/FillStar.svg";
// EmptyStar

const DetailStar = ({ onStarClick, starPoint }) => {
  //별점 주기
  const starScores = [1, 2, 3, 4, 5];
  const starWidth = 40;
  const hideEmptyStar = (starWidth + 8) * starPoint; //선택한 별 보이기(빈 별 감추기)

  return (
    <>
      <StarContainer>
        <FillStarGrid>
          {starScores.map((score, idx) => (
            <StarPartGrid key={idx}>
              <FillStar width="40px" height="40px" />

              <StarPart1
                onClick={() => {
                  onStarClick(score - 0.5);
                }}
              ></StarPart1>
              <StarPart2
                onClick={() => {
                  onStarClick(score);
                }}
              ></StarPart2>
            </StarPartGrid>
          ))}
        </FillStarGrid>

        <EmptyStarGrid hideEmptyStar={hideEmptyStar}>
          {starScores.map((score, idx) => (
            <StarPartGrid key={idx}>
              <EmptyStar width="40px" height="40px" />

              <StarPart1
                onClick={() => {
                  onStarClick(score - 0.5);
                }}
              ></StarPart1>
              <StarPart2
                onClick={() => {
                  onStarClick(score);
                }}
              ></StarPart2>
            </StarPartGrid>
          ))}
        </EmptyStarGrid>
      </StarContainer>
    </>
  );
};

const StarContainer = styled.div`
  position: relative;
  width: 240px;
  height: 40px;
`;

const FillStarGrid = styled.div`
  display: flex;
  width: 240px;
  justify-content: space-around;
`;

const EmptyStarGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  clip: ${(props) =>
    props.hideEmptyStar
      ? `rect(0px, 240px, 40px, ${props.hideEmptyStar}px)`
      : `auto`};
  width: 240px;
  justify-content: space-around;
`;

const StarPartGrid = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

const StarPart1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 40px;
  background-color: transparent;
`;
const StarPart2 = styled.div`
  position: absolute;
  top: 0;
  left: 20px;
  width: 20px;
  height: 40px;
  background-color: transparent;
`;

export default DetailStar;
