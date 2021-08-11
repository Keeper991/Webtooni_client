import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Image, Text } from "../elements";
import { Color } from "../shared/common";

const ToonListCard = (props) => {
  return (
    <React.Fragment>
      <FlexToonGrid
        onClick={() => {
          history.push(`/detail/${props.id}`);
        }}
      >
        <ImageGrid>
          <Image
            radius="5px"
            src={props.toonImg}
            width="100%"
            height="100%"
          ></Image>
        </ImageGrid>

        <InfoGrid>
          <FlexGrid flexStart>
            <Text type="caption" color={Color.primary}>
              {props.genre ? props.genre.genreType : null}
            </Text>
            <Text margin="0 15px" type="caption" color={Color.gray400}>
              {props.toonWeekday ? props.toonWeekday : "완결"}
            </Text>
          </FlexGrid>
          <Text fontWeight="bold">{props.toonTitle}</Text>

          <FlexGrid>
            <FlexGrid>
              <AuthorWrap>
                <Text type="caption" color={Color.gray400}>
                  {props.toonAuthor}
                </Text>
              </AuthorWrap>
              <Image
                shape="square"
                margin="0 5px 0 5px"
                size="12px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
              ></Image>
              <Text
                type="en"
                fontWeight="bold"
                fontSize="12px"
                color={Color.primary}
              >
                {props.toonAvgPoint}
              </Text>
            </FlexGrid>

            {props.toonPlatform === "네이버" ? (
              <FlexGrid>
                <Image
                  shape="square"
                  size="12px"
                  margin="0 3px"
                  src="https://lh3.googleusercontent.com/pw/AM-JKLWCsjme2ZNKF3nOEAXrSzYgStfkJAcVZvk17v_KeIKxWNOMJIieajxO7a69mwuRMqSyzqmzCvs6Ltnu3UGFDH5WVOtg1LbHz1w5Pwnuh4utNPgkPm7inmkUX-5eDSRRwFa8HFQSfTb3Fngc2oY2cfyc=s12-no?authuser=0"
                ></Image>
                <Text fontSize="10px">네이버 웹툰</Text>
              </FlexGrid>
            ) : (
              <FlexGrid>
                <Image
                  shape="square"
                  size="12px"
                  margin="0 3px"
                  src="https://lh3.googleusercontent.com/pw/AM-JKLW7PImSbXv8cZ3MOmgkjwKdGNaPHtZ0VG72ZeEv9LZMl89iivlbAcUBLL6fZ836fZHed6gJQNUhMr-12eZgqqFOd-XGWU06ZftPdRGgQnVtbhNGidtMMByNP7a184KzHyKcXLpjUyHS4CFGd6NSctFf=s12-no?authuser=0"
                ></Image>
                <Text fontSize="10px">카카오 웹툰</Text>
              </FlexGrid>
            )}
          </FlexGrid>
        </InfoGrid>
      </FlexToonGrid>
    </React.Fragment>
  );
};

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) => props.flexStart && `justify-content: start;`};
`;

const FlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0 16px;
  border-bottom: 1px solid ${Color.gray200};
`;

const ImageGrid = styled.div`
  width: 64px;
  height: 64px;
`;

const InfoGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 80%;
  height: 64px;
  margin-left: 5px;
`;

const AuthorWrap = styled.div`
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export default ToonListCard;
