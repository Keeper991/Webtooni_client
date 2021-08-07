import React from "react";
import styled from "styled-components";
import { Color } from "../shared/common";

const SkeletonCard = (props) => {
  return (
    <React.Fragment>
      <Container>
        <ImageGrid></ImageGrid>
        <ContentsGrid></ContentsGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 150px;
  height: 220px;
  background: ${Color.lightGray3};
  display: inline-block;
  margin: 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;

const ContentsGrid = styled.div`
  padding: 5px;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ImageGrid = styled.div`
  width: 150px;
  height: 140px;
  background: ${Color.lightGray};
`;

export default SkeletonCard;
