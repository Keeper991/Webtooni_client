import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
const WebToonCard = (props) => {
  return (
    <React.Fragment>
      <Container
        onClick={() => {
          history.push(`/detail/${props.id}`);
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
              <Text color={Color.orange} fontSize="11px" fontWeight="bold">
                {props.genre ? props.genre.genreType : null}
              </Text>
              <Text
                color={Color.lightGray2}
                fontSize="10px"
                margin="0 0 0 10px"
              >
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
              <Text fontSize="12px" fontWeight="bold" color={Color.black}>
                {props.toonAvgPoint}
              </Text>
            </FlexGrid>
          </FlexGrid>
          <TitleText>{props.toonTitle}</TitleText>
          <FlexGrid>
            <AuthorText>{props.toonAuthor}</AuthorText>
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
  margin: 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;

const FlexGrid = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const AuthorText = styled.p`
  font-size: 12px;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${Color.darkGray};
`;

const TitleText = styled.p`
  font-size: 14px;
  font-weight: bold;
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${Color.black};
`;
export default WebToonCard;
