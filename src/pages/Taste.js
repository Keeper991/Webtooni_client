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
    "일상",
    "개그",
    "판타지",
    "액션",
    "드라마",
    "로맨스",
    "감성",
    "스릴러",
    "시대극",
    "스포츠",
    "로맨스 판타지",
    "액션 무협",
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
      <ContentWrap>
        <ProgressArea>
          <ProgressStepBtns
            currentPageNum={1}
            clickHandlers={progressStepClickHandlers}
          />
        </ProgressArea>
        <TitleArea>
          <Text type="title" fontSize="1.5rem" fontWeight={600}>
            취향을 알려주세요
          </Text>
          <Text type="p" fontSize="0.875rem">
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
      </ContentWrap>
      {tastes.length < 1 ? (
        <Button width="100%" margin="0 auto" disabled>
          선택완료
        </Button>
      ) : (
        <Button
          width="100%"
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
  height: 502px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrap = styled.div`
  & > section:first-child {
    margin-bottom: 32px;
  }
  & > section:nth-child(2) {
    & > *:first-child {
      margin-bottom: 22px;
    }
    margin-bottom: 22px;
  }
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
