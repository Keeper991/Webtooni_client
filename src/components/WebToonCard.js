import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements"

const WebToonCard = (props) => {
  return (
    <React.Fragment>
      <Container>
        <Image src={props.toonImg} width="100%" height="148px"></Image>
        <Text>{props.toonTitle}</Text>

        <Text>{props.toonAuthor}</Text>

      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 135px;
  height: 220px;
  background: #bcbcbc;
`;

const FlexGrid = styled.div`
  display: flex;
  justify-content: space-between;
`;

WebToonCard.defaultProps = {
  toonImg: "https://img-cf.kurly.com/shop/data/goods/1618379552204l0.jpg",
  toonTitle: "여신강림",
  toonAuthor: "야옹이",
  toonPointTotalNumber: 4.8,
  pointTotalPerson: 300
}
export default WebToonCard;