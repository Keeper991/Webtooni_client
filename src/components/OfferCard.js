import React from "react";
import styled from "styled-components";
import { Image, Text } from "../elements";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";
import { FillStar } from "../images/icons";

const OfferCard = (props) => {
  return (
    <React.Fragment>
      <Container
        onClick={() => {
          history.push(`/detail/${props.toonId}`);
        }}
      >
        <ToonImgGrid>
          <Image src={props.toonImg} width="100%" height="282px"></Image>
        </ToonImgGrid>

        <InfoGrid>
          <Text
            type="h1"
            fontWeight="bold"
            color={Color.white}
            margin="0 0 8px 0"
          >
            {props.toonTitle}
          </Text>
          <FlexGrid flexStart>
            <Text type="caption" color={Color.white}>
              {props.toonAuthor}
            </Text>
            <FlexGrid>
              <FillStar
                width="12px"
                height="12px"
                style={{ margin: "0 2px 0 7px" }}
              ></FillStar>
              <Text
                type="num"
                color={Color.white}
                fontWeight="bold"
                fontSize="12px"
              >
                {props.toonAvgPoint}
              </Text>
            </FlexGrid>
          </FlexGrid>
        </InfoGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 282px;
  position: relative;
  margin: 10px 0;
  overflow: hidden;
`;

const ToonImgGrid = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.src}");
  filter: blur(2px);
  background-size: cover;
  background-position: center;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${Color.black};
    opacity: 0.4;
    z-index: 1;
  }
`;

const InfoGrid = styled.div`
  position: absolute;
  left: 20px;
  bottom: 60px;
  z-index: 2;
  text-shadow: 2px 1px 10px rgba(0, 0, 0, 0.7);
`;

const FlexGrid = styled.div`
  display: flex;
  justify-content: space-between;
  ${(props) => props.flexStart && `justify-content: start;`};
`;
export default OfferCard;
