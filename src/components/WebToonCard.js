import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { history } from "../redux/configureStore";
const WebToonCard = (props) => {
  return (
    <React.Fragment>
      <Container
        onClick={() => {
          history.push(`/detail/${props.toonId}`);
        }}
      >
        <Image src={props.toonImg} width="100%" height="148px"></Image>
        <ContentsGrid>
          <Text fontSize="14px">{props.toonTitle}</Text>
          <FlexGrid>
            <Text fontSize="12px">{props.toonAuthor}</Text>
            <Text fontSize="12px">★{props.toonPointTotalNumber}</Text>
          </FlexGrid>
          <FlexGrid>
            <Text fontSize="10px">{props.toonPlatform}</Text>
            <Text fontSize="10px">{props.toonDay}</Text>
          </FlexGrid>
        </ContentsGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 155px;
  height: 220px;
  background: #f1f1f1;
  display: inline-block;
  margin: 0 10px;
`;

const FlexGrid = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentsGrid = styled.div`
  padding: 5px;
`;

export default WebToonCard;
