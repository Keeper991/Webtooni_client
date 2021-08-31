import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Button, Text } from "../elements";
import { Color } from "../shared/common";

import { history } from "../redux/configureStore";
import { ProgressStepBtns } from "../components";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as modalActions } from "../redux/modules/modal";

const SELECT_COUNT = 3;
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
  const dispatch = useDispatch();
  const [tastes, setTastes] = useState([]);

  const is_login = useSelector((state) => state.user.is_login);
  const isChecking = useSelector((state) => state.user.isChecking);
  const is_shown_modal = useSelector(
    (state) => state.user.info.isShownWelcomeModal
  );

  useEffect(() => {
    const tasteDataLS = localStorage.getItem(TASTE_LS);
    tasteDataLS && setTastes(tasteDataLS.split(","));
  }, []);

  useEffect(() => {
    if (!isChecking && !(is_login === true && is_shown_modal === false)) {
      dispatch(modalActions.activeModal("noAuth"));
    }
  }, [is_login, isChecking]);

  const progressStepClickHandlers = [
    () => history.push("/taste"),
    () => {
      localStorage.setItem(TASTE_LS, tastes);
      tastes.length === SELECT_COUNT && history.push("/profile");
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
          <Text type="h1" fontWeight="bold">
            취향을 알려주세요
          </Text>
          <Text>
            장르 {SELECT_COUNT}개를 골라주세요.
            <br />
            분석하여 취향에 딱 맞는 웹툰을 추천해드릴게요.
          </Text>
        </TitleArea>
        <TasteArea>
          {genreList.map((genre, i) => (
            <TasteBtnWrap key={i} active={tastes.includes(genre)}>
              <Button
                shape="pill"
                border={`1px solid ${Color.gray300}`}
                _onClick={() => {
                  if (tastes.includes(genre)) {
                    setTastes(tastes.filter((t) => t !== genre));
                  } else if (tastes.length < SELECT_COUNT) {
                    setTastes([...tastes, genre]);
                  } else {
                    dispatch(modalActions.activeModal("overChoice"));
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

      {tastes.length < SELECT_COUNT ? (
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
      props.active ? Color.primary : "transparent"};
    color: ${(props) => props.active && Color.white};
    border: ${(props) => props.active && `1px solid ${Color.primary}`};
  }
`;

export default Taste;
