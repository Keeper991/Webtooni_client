import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Text, Image, Button, Input } from "../elements";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { ReactComponent as EmptyStar } from "../images/EmptyStar.svg";
import { ReactComponent as FillStar } from "../images/FillStar.svg";
// EmptyStar

const DetailStar = (props) => {
  const { putStarServer } = webtoonActions;

  const { webtoon_id, is_login, prev_review } = props;

  //별점 주기
  const starScores = [1, 2, 3, 4, 5];

  const starWidth = 40;
  const [starLocation, setStarLocation] = React.useState(0);
  useEffect(() => {
    !prev_review && setStarLocation(prev_review?.userPointNumber); //기존 별점 가져오기
  }, []);
  const hideEmptyStar = starWidth * starLocation; //선택한 별 보이기(빈 별 감추기)
  const dispatch = useDispatch();
  const putStar = () => {
    dispatch(putStarServer(webtoon_id, starLocation)); //별점 등록
    alert("별점이 등록되었어요!");
  };

  return (
    <>
      <StarContainer>
        <FillStarGrid>
          {Array.from({ length: 5 }).map((_) => (
            <FillStar width="40px" height="40px" />
          ))}
        </FillStarGrid>

        <EmptyStarGrid hideEmptyStar={hideEmptyStar}>
          {starScores.map((score) => (
            <StarPartGrid>
              <EmptyStar width="40px" height="40px" />

              <StarPart1
                star={starLocation}
                onClick={() => {
                  // if (is_login) {
                  setStarLocation(score - 0.5);
                  putStar();
                  // } else {
                  // alert("로그인하세요~");
                  // }
                }}
              ></StarPart1>
              <StarPart2
                star={starLocation}
                onClick={() => {
                  // if (is_login) {
                  setStarLocation(score);
                  putStar();
                  // } else {
                  // alert("로그인하세요~");
                  // }
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
  height: 40px;
`;

const FillStarGrid = styled.div`
  display: flex;
`;

const EmptyStarGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  ${(props) =>
    props.hideEmptyStar !== 0
      ? `clip: rect(0px, 200px, 40px, ${props.hideEmptyStar}px )`
      : `clip: auto`};
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
