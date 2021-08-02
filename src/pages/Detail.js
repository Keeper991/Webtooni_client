import React from "react";
import styled from "styled-components";
import { Text, Image, Button, Input } from "../elements";
import { WebToonCard } from "../components";

const Detail = (props) => {
  const [star, setStar] = React.useState(0);

  return (
    <React.Fragment>
      <Grid padding="10px">
        <ToonContainer>
          <Image src={props.toonImg} width="100%" height="148px"></Image>
          <Grid padding="0 0 0 20px">
            <Text type="title">{props.toonTitle}제목</Text>
            <Text>{props.toonAuthor}작가</Text>
            <br />
            <Text>#장르</Text>
            <Text>★{props.toonPointTotalNumber}</Text>
            <Text>완결여부/요일{props.toonDay}</Text>
          </Grid>
        </ToonContainer>
        <AddContainer>
          <Button>내 리스트에 추가</Button>
          <Button>보러가기</Button>
        </AddContainer>
        <ItemContainer>
          <Star>
            <FillStar>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </FillStar>
            <EmptyStar>
              <StarItem value={1} star={star} onClick={() => setStar(1)}>
                ◆
              </StarItem>
              <StarItem value={2} star={star} onClick={() => setStar(2)}>
                ◆
              </StarItem>
              <StarItem value={3} star={star} onClick={() => setStar(3)}>
                ◆
              </StarItem>
              <StarItem value={4} star={star} onClick={() => setStar(4)}>
                ◆
              </StarItem>
              <StarItem value={5} star={star} onClick={() => setStar(5)}>
                ◆
              </StarItem>
            </EmptyStar>
          </Star>
          <Input multiLine placeholder="리뷰를 작성해 주세요"></Input>
          <Button>리뷰등록</Button>
        </ItemContainer>

        <Line>리뷰</Line>

        <ItemContainer>
          <Grid display="flex" justify="space-between">
            <Grid display="flex">
              <Image size="35px" shape="circle"></Image>
              <Grid padding="0 0 0 5px">
                <Text type="p">유저네임{props.userName}</Text>
                <Text type="p">등급{props.userGrade}</Text>
              </Grid>
            </Grid>
            <Image
              width="20px"
              height="20px"
              src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
            >
              14
            </Image>
          </Grid>

          <Grid display="flex" align="center">
            <Grid display="flex" align="center">
              <Image
                width="20px"
                height="20px"
                src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
              ></Image>
              <Text>&nbsp;4.1</Text>
            </Grid>
            <Text padding="0 0 0 20px">꼭 보세요{props.reviewContent}</Text>
          </Grid>
        </ItemContainer>

        <Line>비슷한 장르의 웹툰</Line>

        <SimContainer>
          <ToonContainer>
            <WebToonCard />
          </ToonContainer>
          <ToonContainer>
            <WebToonCard />
          </ToonContainer>
          <ToonContainer>
            <WebToonCard />
          </ToonContainer>
        </SimContainer>
      </Grid>
    </React.Fragment>
  );
};

const Grid = styled.div`
  display: ${(props) => (props.display ? props.display : "")};
  justify-content: ${(props) => (props.justify ? props.justify : "")};
  align-items: ${(props) => (props.align ? props.align : "")};
  flex-direction: ${(props) => (props.flexDir ? props.flexDir : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  padding: ${(props) => (props.padding ? props.padding : "")};
`;

const ToonContainer = styled.div`
  width: 100%;
  height: auto;
  background: #f1f1f1;
  display: inline-flex;
  padding: 20px;
`;

const AddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const ItemContainer = styled.div`
  background: #f1f1f1;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Star = styled.div`
  position: relative;
`;

const FillStar = styled.div``;

const EmptyStar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const StarItem = styled.span`
  ${(props) => (props.value <= props.star ? "opacity:0" : "")};
`;
const SimContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const Line = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  margin: 8px 0px;
  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

export default Detail;
