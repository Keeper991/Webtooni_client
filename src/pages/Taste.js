import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Button, Text } from "../elements";
import { Color } from "../shared/common";

import { history } from "../redux/configureStore";
import ProgressStepBtns from "../components/ProgressStepBtns";

const MAX_SELECT_COUNT = 5;
const TASTE_LS = "TASTE_LIST";

const Taste = () => {
  const genreList = [
    "액션",
    "로맨스",
    "SF",
    "학원물",
    "스릴러",
    "개그",
    "드라마",
    "일상",
    "스포츠",
    "감성",
    "시대극",
  ];
  const [tastes, setTastes] = useState([]);

  useEffect(() => {
    const tasteDataLS = localStorage.getItem(TASTE_LS);
    tasteDataLS && setTastes(tasteDataLS.split(","));
  }, []);

  const progressStepClickHandlers = [
    () => history.push("/taste"),
    () => {
      localStorage.setItem(TASTE_LS, tastes);
      tastes.length > 0 && history.push("/profile");
    },
  ];

  return (
    <Container>
      <ProgressArea>
        <ProgressStepBtns
          currentPageNum={1}
          clickHandlers={progressStepClickHandlers}
        />
      </ProgressArea>
      <TitleArea>
        <Text type="title" fontSize="3rem" fontWeight={600}>
          취향을 알려주세요
        </Text>
        <Text type="p">
          최대 {MAX_SELECT_COUNT}개를 골라주세요.
          <br />
          분석하여 취향에 딱 맞는 웹툰을 추천해드릴게요.
        </Text>
      </TitleArea>
      <TasteArea>
        {genreList.map((genre, i) => (
          <TasteBtnWrap includes={tastes.includes(genre)}>
            <Button
              shape="pill"
              border={`1px solid ${Color.gray}`}
              _onClick={() => {
                if (tastes.includes(genre)) {
                  setTastes(tastes.filter((t) => t !== genre));
                } else if (tastes.length < MAX_SELECT_COUNT) {
                  setTastes([...tastes, genre]);
                } else {
                  return;
                }
              }}
            >
              {genre}
            </Button>
          </TasteBtnWrap>
        ))}
      </TasteArea>
      {tastes.length < 1 ? (
        <Button width="90%" margin="0 auto" disabled>
          선택완료
        </Button>
      ) : (
        <Button
          width="90%"
          margin="0 auto"
          bgColor={Color.black}
          color={Color.white}
          _onClick={() => {
            localStorage.setItem(TASTE_LS, tastes);
            history.push("/profile");
          }}
        >
          선택완료
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 360px;
  height: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProgressArea = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleArea = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > *:last-child {
    text-align: center;
    line-height: 1.25;
    margin-top: 1em;
  }
`;

const TasteArea = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 4px;
  padding-bottom: 3em;
`;

const TasteBtnWrap = styled.div`
  & > button {
    background-color: ${(props) =>
      props.includes ? Color.blueberry : "transparent"};
    color: ${(props) => (props.includes ? Color.white : Color.darkGray)};
    border: ${(props) =>
      props.includes ? "1px solid transparent" : `1px solid ${Color.gray}`};
  }
`;

export default Taste;
