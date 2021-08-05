import React from "react";
import styled from "styled-components";
import { Image, Text } from "../elements";

const OfferCard = (props) => {
  return (
    <React.Fragment>
      <Container>
        <Image src={props[0].toonImg} width="100%" height="100%"></Image>
        <InfoGrid>
          <Text fontSize="20px" fontWeight="bold" color="#fff">
            {props[0].toonTitle}
          </Text>
          <FlexGrid>
            <Text fontSize="12px" color="#fff">
              {props[0].toonAuthor}
            </Text>
            <Text fontSize="12px" color="#fff">
              ★{props[0].toonPointTotalNumber}
            </Text>
          </FlexGrid>
        </InfoGrid>
        <BottomBox>
          <Text fontSize="12px" color="#fff" fontWeight="bold">
            김투니님 만을 위한 추천
          </Text>
        </BottomBox>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 282px;
  position: relative;
  margin: 10px 0;
`;

const BottomBox = styled.div`
  width: 100%;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoGrid = styled.div`
  position: absolute;
  left: 20px;
  bottom: 60px;
`;

const FlexGrid = styled.div``;
export default OfferCard;
