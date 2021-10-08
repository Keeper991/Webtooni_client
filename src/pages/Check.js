import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { Color } from "../shared/common";
import { title } from "../images/icons";

const Check = (props) => {
  return (
    <React.Fragment>
      <Container>
        <ImageWrap>
          <Image src={title} width="200px" height="27px" />
        </ImageWrap>
        <Text tag="p" textAlign="center" fontWeight="medium">
          서비스 이용에 불편을 드려 죄송합니다. <br />
          현재 서비스 점검중입니다. <br />
          빠른 시일 내에 정상운영할 수 있도록 하겠습니다. <br /> 감사합니다.
        </Text>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 69px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & a:link,
  a:visited {
    text-decoration: none;
  }
  & > p {
    margin-top: 100px;
    line-height: 1.8;
  }
`;

const ImageWrap = styled.div`
  & > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export default Check;
