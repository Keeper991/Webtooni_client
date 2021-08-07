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
          <TitleText>{props.toonTitle}</TitleText>
          <AuthorText>{props.toonAuthor}</AuthorText>
          <FlexGrid>
            <FlexGrid>
              <Image
                shape="square"
                margin="0 5px 0 0"
                size="12px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
              ></Image>
              <Text fontSize="12px">{props.toonAvgPoint}</Text>
            </FlexGrid>
            <Text fontSize="10px">{props.toonWeekday}</Text>
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
    background-color: #666666;
    font-size: 9px;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-left: 5px;
`;

const TitleText = styled.p`
  font-size: 14px;
  width: 90px;
  color: ${Color.black};
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AuthorText = styled.p`
  font-size: 12px;
  width: 90px;
  color: ${Color.darkGray};
  margin: 7px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export default WebToonMonth;
