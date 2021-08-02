import React from "react";
import styled from "styled-components";
import { Image, Text, Button } from "../elements";

const DetailReview = (props) => {
  const { reviewContent, userPointNumber, likeCount } = props.review;
  console.log(props, "detailReview");
  return (
    <>
      <ItemContainer>
        <Grid display="flex" justify="space-between">
          <Grid display="flex">
            <Image size="35px" shape="circle"></Image>
            <Grid padding="0 0 0 5px">
              <Text type="p">유저네임{props.userName}</Text>
              <Text type="p">등급{props.userGrade}</Text>
            </Grid>
          </Grid>
          <Grid position="relative">
            <Image
              width="20px"
              height="20px"
              src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
            ></Image>
            <LikeText>{likeCount}</LikeText>
          </Grid>
        </Grid>

        <Grid display="flex" align="center">
          <Grid display="flex" align="center">
            <Image
              width="20px"
              height="20px"
              src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
            ></Image>
            <Text>&nbsp;{userPointNumber}</Text>
          </Grid>
          <Text padding="0 0 0 20px">{reviewContent}</Text>
        </Grid>
      </ItemContainer>
    </>
  );
};

DetailReview.defaultProps = {
  review: {
    reviewContent: null,
    userPointNumber: null,
    likeCount: null,
    id: null,
  },
};
const Grid = styled.div`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  display: ${(props) => (props.display ? props.display : "")};
  justify-content: ${(props) => (props.justify ? props.justify : "")};
  align-items: ${(props) => (props.align ? props.align : "")};
  flex-direction: ${(props) => (props.flexDir ? props.flexDir : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  padding: ${(props) => (props.padding ? props.padding : "")};
  position: ${(props) => props.position || ""};
`;

const ItemContainer = styled.div`
  background: #f1f1f1;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LikeText = styled.p`
  position: absolute;
  z-index: 1;
  font-size: 12px;
  top: 10%;
  left: 10%;
`;
export default DetailReview;
