import React from "react";
import styled from "styled-components";
import { Text, Image, Button } from "../elements"

const BestReveiwerCard = (props) => {

  return (
    <React.Fragment>
      <Container>
        <ContentsBox>
            <ImageCircle></ImageCircle>
            <Text fontSize="12px">{props.userName}</Text>
            <Text fontSize="10px">{props.userGrade}</Text>
          <BottomGrid>
            <FlexGrid>
              <Text fontSize="12px">리뷰 수</Text>
              <Text fontSize="14px" fontWeight="bold">{props.totalReviews}</Text>
            </FlexGrid>
            <FlexGrid>
              <Text fontSize="12px">좋아요 수</Text>
              <Text fontSize="14px" fontWeight="bold">{props.totalLikes}</Text>
            </FlexGrid>
          </BottomGrid>
          
        </ContentsBox>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 130px;
  height: 157px;
  background: #f1f1f1;
  display: inline-block;
  padding: 5px;
  margin: 0 10px;
`;

const ContentsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const BottomGrid = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const ImageCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 64px;
  background-image: url("https://openads-real.s3.amazonaws.com/openadsAdmin/ckeditor/images/14_%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98.png");
  background-size: cover;
  background-position: center;
`;

export default BestReveiwerCard;