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
          history.push(`/detail/${props.toonId}`);
        }}
      >
        <ImageGrid>
          <Image
            src={props.toonImg}
            width="100%"
            height="100%"
            radius="4px"
          ></Image>
        </ImageGrid>

        <ContentsGrid>
          <FlexGrid>
            <FlexGrid>
              <Text color={Color.orange} fontSize="11px" fontWeight="bold">
                장르
              </Text>
              <Text
                color={Color.lightGray2}
                fontSize="10px"
                margin="0 0 0 10px"
              >
                {props.toonDay}
              </Text>
            </FlexGrid>
            <FlexGrid>
              <Image
                shape="square"
                margin="0 5px 0 0"
                size="12px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
              ></Image>
              <Text fontSize="12px" fontWeight="bold">
                {props.toonPointTotalNumber}
              </Text>
            </FlexGrid>
          </FlexGrid>
          <Text fontSize="14px" fontWeight="bold">
            {props.toonTitle}
          </Text>
          <FlexGrid>
            <Text fontSize="12px">{props.toonAuthor}</Text>
            {props.toonPlatform === "네이버 웹툰" ? (
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
  margin: 0 10px;
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

export default WebToonCard;
