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
        <Text type="caption" fontWeight="bold">
          {props.user.userName ? props.user.userName : "null"}
        </Text>
        <Text type="small">
          {props.user.userGrade ? props.user.userGrade : "null"}
        </Text>
        <BottomGrid>
          <FlexGrid>
            <Text type="small">리뷰 수</Text>
            <Text type="num" fontSize="14px" fontWeight="bold">
              {props.reviewCount}
            </Text>
          </FlexGrid>
          <FlexGrid>
            <Text type="small">좋아요 수</Text>
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
`;

export default BestReveiwerCard;
