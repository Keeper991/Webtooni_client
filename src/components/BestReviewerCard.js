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
          src={profileImgList[props.userImg]}
          shape="circle"
          size="64px"
        ></Image>
        <Text type="caption" fontWeight="bold">
          {props.userName}
        </Text>
        <Text type="small">{props.userGrade}</Text>
        <BottomGrid>
          <FlexGrid>
            <Text type="small">리뷰 수</Text>
            <Text type="num" fontSize="14px" fontWeight="bold">
              {props.totalReviews}
            </Text>
          </FlexGrid>
          <FlexGrid>
            <Text type="small">좋아요 수</Text>
            <Text type="num" fontSize="14px" fontWeight="bold">
              {props.totalLikes}
            </Text>
          </FlexGrid>
        </BottomGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 130px;
  height: 157px;
  background: ${Color.gray100};
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 0 10px;
  border-radius: 5px;
`;

const BottomGrid = styled.div`
  width: 80%;
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
