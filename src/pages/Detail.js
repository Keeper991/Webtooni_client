import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Text, Image, Button, Input } from "../elements";
import { WebToonCard, DetailReview } from "../components";
import { getToonOneServer } from "../redux/modules/webtoon";

const Detail = (props) => {
  //웹툰 상세정보 가져오기 (서버 연결 시 주석 해제)
  // const id = props.match.params.id;
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getToonOneServer(id));
  // }, []);
  const toon = useSelector((store) => store.webtoon.toon_one);

  const [star, setStar] = React.useState(0);

  return (
    <React.Fragment>
      {toon && (
        <>
          <Grid padding="10px">
            <ToonContainer>
              <Image src={toon.toonImg} width="100%" height="148px"></Image>
              <Grid
                padding="0 0 0 20px"
                display="flex"
                flexDir="column"
                justify="space-between"
              >
                <Grid>
                  <Text type="title">{toon.toonTitle}</Text>
                  <Text>{toon.toonAuthor}</Text>
                </Grid>
                <Grid display="flex" flexDir="column">
                  <Text>
                    {toon.webtoonGenre.map((item) => "#" + item + " ")}
                  </Text>
                  <Text>{toon.toonAge}</Text>

                  <Grid display="flex" align="center">
                    <Image
                      width="20px"
                      height="20px"
                      src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
                    ></Image>
                    <Text>&nbsp;{toon.toonAvgPoint}</Text>
                    <Text>({toon.toonPointCount})</Text>
                  </Grid>

                  {toon.finished ? (
                    <Text>완결</Text>
                  ) : (
                    <Text>연재 중/{toon.toonWeekday}</Text>
                  )}
                </Grid>
              </Grid>
            </ToonContainer>

            <AddContainer>
              <Button>내 리스트에 추가</Button>
              <a href={`${toon.realUrl}`} target="_blank">
                <Button>보러가기</Button>
              </a>
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

            <Line>리뷰({toon.reviewCount})</Line>

            {toon.reviews.map((item) => (
              <DetailReview key={item.id} review={item} />
            ))}

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
        </>
      )}
    </React.Fragment>
  );
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
