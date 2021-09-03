import React from "react";
import styled from "styled-components";
import { FillStar, EmptyStar } from "../images/icons";

// 별점 주기
// _채워진 별을 빈 별로 덮고 클릭 위치를 감지해 빈 별 가리기(아래의 채워진 별 드러내기)
// _각 별에 좌우 공간을 두어 0.5점 구현

const DetailStar = ({ onStarClick, starPoint }) => {
  const starScores = [1, 2, 3, 4, 5];
  const starWidth = 32;
  const hideEmptyStar = (starWidth + 8) * starPoint; //선택한 별 보이기(빈 별 감추기)

  return (
    <>
      <StarContainer>
        <FillStarGrid>
          {starScores.map((score, idx) => (
            <StarPartGrid key={idx}>
              <FillStar width="32px" height="32px" />

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
              <EmptyStar width="32px" height="32px" />

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
  width: 200px;
  height: 32px;
`;

const FillStarGrid = styled.div`
  display: flex;
  width: 200px;
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
      ? `rect(0px, 200px, 32px, ${props.hideEmptyStar}px)`
      : `auto`};
  width: 200px;
  justify-content: space-around;
`;

const StarPartGrid = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  margin: "0 4px";
`;

const StarPart1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 32px;
  background-color: transparent;
`;
const StarPart2 = styled.div`
  position: absolute;
  top: 0;
  left: 16px;
  width: 16px;
  height: 32px;
  background-color: transparent;
`;

export default DetailStar;
