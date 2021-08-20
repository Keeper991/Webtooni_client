import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
import { ReactComponent as FillStar } from "../images/FillStar.svg";

const WebToonCard = (props) => {
  return (
    <React.Fragment>
      <Container
        onClick={() => {
          history.push(`/detail/${props.toonId}`);
        }}
      >
        <ImageGrid index={props.index}>
          <Image
            src={props.toonImg}
            width="100%"
            height="100%"
            radius="5px"
          ></Image>
        </ImageGrid>

        <ContentsGrid>
          <FlexGrid>
            <FlexGrid>
              <Text color={Color.primary} type="caption">
                {props?.genres
                  ? props.genres[props.genres.length - 1]
                  : "추천!"}
              </Text>
              <Text color={Color.gray400} type="caption" margin="0 0 0 10px">
                {props.toonWeekday ? props.toonWeekday : "완결"}
              </Text>
            </FlexGrid>
            <FlexGrid>
              <FillStar
                width="12px"
                height="12px"
                style={{ marginRight: "5px" }}
              />
              <Text
                type="num"
                fontSize="12px"
                fontWeight="bold"
                color={Color.gray700}
              >
                {props.toonAvgPoint}
              </Text>
            </FlexGrid>
          </FlexGrid>
          <TitleWrap>
            <Text tag="p" fontWeight="medium" color={Color.gray800}>
              {props.toonTitle}
            </Text>
          </TitleWrap>
          <FlexGrid>
            <AuthorWrap>
              <Text tag="p" type="small" color={Color.gray400}>
                {props.toonAuthor}
              </Text>
            </AuthorWrap>
            {props.toonPlatform === "네이버" ? (
              <Image
                shape="square"
                size="12px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLWCsjme2ZNKF3nOEAXrSzYgStfkJAcVZvk17v_KeIKxWNOMJIieajxO7a69mwuRMqSyzqmzCvs6Ltnu3UGFDH5WVOtg1LbHz1w5Pwnuh4utNPgkPm7inmkUX-5eDSRRwFa8HFQSfTb3Fngc2oY2cfyc=s12-no?authuser=0"
              ></Image>
            ) : (
              <Image
                shape="square"
                size="12px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLW7PImSbXv8cZ3MOmgkjwKdGNaPHtZ0VG72ZeEv9LZMl89iivlbAcUBLL6fZ836fZHed6gJQNUhMr-12eZgqqFOd-XGWU06ZftPdRGgQnVtbhNGidtMMByNP7a184KzHyKcXLpjUyHS4CFGd6NSctFf=s12-no?authuser=0"
              ></Image>
            )}
          </FlexGrid>
        </ContentsGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 150px;
  height: 220px;
  background: ${Color.white};
  display: inline-block;
  position: relative;
`;

const FlexGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
`;

const ContentsGrid = styled.div`
  padding: 0 5px;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ImageGrid = styled.div`
  width: 150px;
  height: 140px;

  &:before {
    content: "${(props) => props.index}";
    display: flex;
    position: absolute;
    width: 22px;
    height: 22px;
    background-color: ${Color.gray700};
    font-size: 9px;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 5px;
  }
`;

const AuthorWrap = styled.div`
  width: 120px;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const TitleWrap = styled.div`
  width: 140px;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
export default WebToonCard;
