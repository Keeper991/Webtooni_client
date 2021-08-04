import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Text, Image, Button, Input } from "../elements";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";

const DetailStar = (props) => {
  const { putStarServer } = webtoonActions;

  const { webtoon_id, is_login, prev_review } = props;

  //별점 주기
  const starScores = [1, 2, 3, 4, 5];

  const starWidth = 40;
  const [starLocation, setStarLocation] = React.useState(0);
  useEffect(() => {
    !prev_review && setStarLocation(prev_review.userPointNumber); //기존 별점 가져오기
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
        <FillStar>
          {Array.from({ length: 5 }).map((_) => (
            <Image
              width="40px"
              height="40px"
              src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
            />
          ))}
        </FillStar>

        <EmptyStar hideEmptyStar={hideEmptyStar}>
          {starScores.map((score) => (
            <Image
              display="flex"
              width="40px"
              height="40px"
              src="https://cdn.pixabay.com/photo/2017/02/01/00/29/lone-star-2028578_640.png"
            >
              <StarPart
                star={starLocation}
                onClick={() => {
                  if (is_login) {
                    setStarLocation(score - 0.5);
                    putStar();
                  } else {
                    alert("로그인하세요~");
                  }
                }}
              ></StarPart>
              <StarPart
                star={starLocation}
                onClick={() => {
                  if (is_login) {
                    setStarLocation(score);
                    putStar();
                  } else {
                    alert("로그인하세요~");
                  }
                }}
              ></StarPart>
            </Image>
          ))}
        </EmptyStar>
      </StarContainer>
    </>
  );
};

const StarContainer = styled.div`
  position: relative;
  width: 200px;
  height: 40px;
`;

const FillStar = styled.div`
  display: flex;
`;

const EmptyStar = styled.div`
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

const StarPart = styled.div`
  width: 50%;
  height: 100%;
  background-color: transparent;
`;

export default DetailStar;
