import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";

const WebToonMonth = (props) => {
  return (
    <React.Fragment>
      <FlexToonGrid
        onClick={() => {
          history.push(`/detail/${props.id}`);
        }}
      >
        <ImageGrid index={props.idx + 1}>
          <Image src={props.toonImg} width="100%" height="100%"></Image>
        </ImageGrid>

        <InfoGrid>
          <TitleWrap>
            <Text tag="p" fontWeight="medium">
              {props.toonTitle}
            </Text>
          </TitleWrap>
          <AuthorWrap>
            <Text tag="p" type="caption" color={Color.gray500}>
              {props.toonAuthor}
            </Text>
          </AuthorWrap>
          <FlexGrid>
            <FlexGrid>
              <Image
                shape="square"
                margin="0 5px 0 0"
                size="12px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
              ></Image>
              <Text type="num" fontSize="12px">
                {props.toonAvgPoint}
              </Text>
            </FlexGrid>
            <Text type="small">
              {props.toonWeekday ? props.toonWeekday : "완결"}
            </Text>
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
`;

const FlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  margin: 5px 0;
`;

const ImageGrid = styled.div`
  width: 55px;
  height: 55px;

  &:before {
    content: "${(props) => props.index}";
    display: flex;
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: ${Color.gray600};
    font-size: 9px;
    justify-content: center;
    align-items: center;
    color: ${Color.white};
  }
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 55px;
  margin-left: 5px;
  justify-content: space-between;
`;

const TitleWrap = styled.div`
  width: 90px;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AuthorWrap = styled.div`
  width: 90px;
  padding-bottom: 3px;
  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
export default WebToonMonth;
