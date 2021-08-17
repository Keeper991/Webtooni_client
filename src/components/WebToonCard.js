import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";

const WebToonCard = (props) => {
  return (
    <React.Fragment>
      <Container
        onClick={() => {
          history.push({
            pathname: `/detail/${props.toonId}`,
            state: { id: props.toonId },
          });
        }}
      >
        <ImageGrid>
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
              <Image
                shape="square"
                margin="0 5px 0 0"
                size="12px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
              ></Image>
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
  margin-right: 10px;
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
