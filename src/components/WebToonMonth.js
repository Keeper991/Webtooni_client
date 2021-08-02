import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";

const WebToonMonth = (props) => {
  return (
    <React.Fragment>
      <FlexToonGrid>
        <ImageGrid index={props.idx + 1}>
          <Image src={props.toonImg} width="100%" height="100%"></Image>
        </ImageGrid>

        <InfoGrid>
          <TitleText>{props.toonTitle}</TitleText>
          <Text fontSize="12px">{props.toonAuthor}</Text>
          <FlexGrid>
            <Text fontSize="12px">★{props.toonPointTotalNumber}</Text>
            <Text fontSize="10px">{props.toonDay}</Text>
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
`;

const TitleText = styled.p`
  font-size: 14px;
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export default WebToonMonth;
