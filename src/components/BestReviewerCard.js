import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { Color } from "../shared/common";
import profileImgList from "../images/profiles";

const BestReveiwerCard = (props) => {
  return (
    <React.Fragment>
      <Container>
        <Image
          src={profileImgList[props.user.userImg]}
          shape="circle"
          size="64px"
        ></Image>
        <Text
          tag="p"
          padding="0 0 5px 0"
          type="medium"
          fontWeight="bold"
          color={Color.gray800}
        >
          {props.user.userName ? props.user.userName : "null"}
        </Text>
        <Text tag="p" padding="0 0 5px 0" type="caption" color={Color.gray600}>
          {props.user.userGrade ? props.user.userGrade : "null"}
        </Text>
        <BottomGrid>
          <FlexGrid>
            <Text
              tag="p"
              padding="3px 0"
              type="small"
              fontWeight="bold"
              color={Color.gray400}
            >
              리뷰 수
            </Text>
            <Text type="num" fontSize="14px" fontWeight="bold">
              {props.reviewCount}
            </Text>
          </FlexGrid>
          <FlexGrid>
            <Text
              tag="p"
              padding="3px 0"
              type="small"
              fontWeight="bold"
              color={Color.gray400}
            >
              좋아요 수
            </Text>
            <Text type="num" fontSize="14px" fontWeight="bold">
              {props.likeCount}
            </Text>
          </FlexGrid>
        </BottomGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100px;
  height: 160px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px 30px 0;
  border-radius: 5px;
`;

const BottomGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 5px 10px;
`;

export default BestReveiwerCard;
