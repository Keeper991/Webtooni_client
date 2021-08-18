import React from "react";
import styled from "styled-components";
import { Image, Text } from "../elements";
import { Color } from "../shared/common";

const OfferCard = (props) => {
  return (
    <React.Fragment>
      <Container>
        <Image src={props.toonImg} width="100%" height="100%"></Image>
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
        <BottomBox>
          <Text type="caption" color={Color.white} fontWeight="bold">
            😍김투니님 만을 위한 추천
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
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    z-index: 2;
  }
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${Color.black};
    opacity: 0.5;
    z-index: 1;
  }
`;

const InfoGrid = styled.div`
  position: absolute;
  left: 20px;
  bottom: 60px;
`;

const FlexGrid = styled.div`
  display: flex;
  justify-content: space-between;
  ${(props) => props.flexStart && `justify-content: start;`};
`;
export default OfferCard;
