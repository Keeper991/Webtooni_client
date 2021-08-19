import React from "react";
import styled from "styled-components";
import { Image, Text } from "../elements";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";

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
              <Image
                shape="square"
                margin="0 5px 0 10px"
                size="12px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
              ></Image>
              <Text type="num" color={Color.white} fontWeight="bold">
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
`;

const ToonImgGrid = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.src}");

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
