import React from "react";
import styled from "styled-components";
import { Image, Text } from "../elements";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";
import { FillStar } from "../images/icons";

// 추천페이지용 웹툰 카드
const OfferCard = (props) => {
  return (
    <React.Fragment>
      <Container
        onClick={() => {
          history.push(`/detail/${props.toonId}`);
        }}
      >
        <ToonImgBorderBox>
          <ToonImgGrid>
            <Image src={props.toonImg} width="100%" height="282px"></Image>
          </ToonImgGrid>
        </ToonImgBorderBox>

        <InfoGrid>
          <Image src={props.toonImg} width="112px" height="112px"></Image>
          <ToonBox>
            <Text
              type="h1"
              fontWeight="bold"
              color={Color.white}
              margin="17px 0 8px 0"
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
                  style={{ margin: "0 4px 0 7px" }}
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
          </ToonBox>
        </InfoGrid>
        {props.dummy ? null : (
          <Count>
            <Text color={Color.white} type="num" fontSize="10px">
              {props.index} / {props.total_index}
            </Text>
          </Count>
        )}
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  cursor: pointer;
`;

const ToonImgGrid = styled.div`
  width: 102%;
  height: 282px;
  background-image: url("${(props) => props.src}");
  filter: blur(6px);
  background-size: cover;
  background-position: center;
  margin: 0 auto;
`;

const ToonImgBorderBox = styled.div`
  width: 100%;
  height: 282px;
  overflow: hidden;
  margin: 0 auto;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${Color.black};
    opacity: 0.6;
    z-index: 1;
  }
`;

const InfoGrid = styled.div`
  position: absolute;
  left: 20px;
  bottom: 60px;
  z-index: 2;
  text-shadow: 2px 1px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const FlexGrid = styled.div`
  display: flex;
  justify-content: space-between;
  ${(props) => props.flexStart && `justify-content: start;`};
`;

const Count = styled.div`
  width: 36px;
  height: 18px;
  border-radius: 36px;
  background-color: ${Color.gray900};
  position: absolute;
  bottom: 60px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const ToonBox = styled.div`
  width: 200px;
  height: auto;
`;

export default OfferCard;
