import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Text, Image, Button, Input } from "../elements";
import { WebToonCard, DetailReview, Slick, DetailStar } from "../components";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";

const Detail = (props) => {
  const {
    getToonOneServer,
    addToonServer,
    similarToonServer,
    uploadReviewServer,
    deleteReviewServer,
  } = webtoonActions;

  console.log(props, "props");
  // 웹툰 상세정보, 비슷한 웹툰 정보 가져오기
  const webtoon_id = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToonOneServer(webtoon_id));
    dispatch(similarToonServer(webtoon_id));
  }, []);
  const toon = useSelector((store) => store.webtoon.toon_one);
  const similar_list = useSelector((store) => store.webtoon.similar_list);

  const is_login = useSelector((store) => store.user.is_login);
  const user = useSelector((store) => store.user.user);
  const userName = user?.userName;

  //내 리스트에 추가하기
  const addList = () => {
    if (is_login) {
      dispatch(addToonServer(webtoon_id));
    } else {
      alert("로그인하세요~");
    }
  };

  // 기존 리뷰 가져오기
  const prev_review = toon.reviews.filter(
    (item) => item.userName === userName //로그인한 유저의 리뷰 찾기
  )[0];

  // const review_id = useSelector((store) => store.webtoon.review_id);  //별점 주고 받아온 리뷰 아이디. 얘는 필요없을 듯~ 리렌더링 해서 상세페이지 정보를 새로 받아오면 추가된 리뷰 아이디 가져오기..
  const review_id = prev_review.id; //리뷰 아이디

  //리뷰 작성하기
  const [review, setReview] = React.useState("");
  const writeReview = (e) => {
    setReview(e.target.value);
  };
  const uploadReview = () => {
    uploadReviewServer(review_id, review);
  };

  //리뷰 삭제하기
  const deleteReview = () => {
    deleteReviewServer(review_id);
  };

  //리뷰 정렬(최신순,좋아요순)
  const sortNew = () => {
    toon.reviews.sort(function (a, b) {
      return a.createDate > b.createDate
        ? -1
        : a.createDate < b.createDate
        ? 1
        : 0;
    });
  };
  const sortLike = () => {
    toon.reviews.sort(function (a, b) {
      return a.likeCount - b.likeCount;
    });
  };

  return (
    <React.Fragment>
      {toon && (
        <>
          <Grid padding="10px">
            {/* 웹툰 정보 */}
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
              <Button _onClick={addList}>내 리스트에 추가</Button>
              <a
                href={`${toon.realUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>보러가기</Button>
              </a>
            </AddContainer>
            <ItemContainer>
              {/* 별점 주기 */}
              <DetailStar
                webtoon_id={webtoon_id}
                is_login={is_login}
                prev_review={prev_review}
              />

              {/* 리뷰 작성 또는 기존 리뷰 삭제 */}
              {prev_review &&
                (!prev_review.reviewContent ? (
                  <Grid
                    display="flex"
                    justify="center"
                    flexDir="column"
                    align="center"
                    width="90%"
                  >
                    <Input
                      multiLine
                      placeholder="리뷰를 작성해 주세요"
                      _onChange={writeReview}
                      value={review}
                    ></Input>
                    <Button _onClick={uploadReview}>리뷰등록</Button>
                  </Grid>
                ) : (
                  <Grid
                    display="flex"
                    justify="center"
                    flexDir="column"
                    align="center"
                    width="90%"
                  >
                    <Text
                      type="p"
                      padding="20px"
                      margin="10px"
                      bgColor="white"
                      width="300px"
                    >
                      {prev_review.reviewContent}
                    </Text>
                    <Button _onClick={deleteReview} width="20px">
                      삭제
                    </Button>
                  </Grid>
                ))}
            </ItemContainer>
            <Line>리뷰({toon.reviewCount})</Line>
            {/* 리뷰 정렬하기 */}
            <Grid display="flex" justify="flex-end">
              <Button _onClick={sortLike}>좋아요</Button>
              <Button _onClick={sortNew}>최신순</Button>
            </Grid>
            {/* 리뷰 목록 */}
            {toon.reviews.map((item, idx) => (
              <DetailReview key={idx} review={item} />
            ))}
            <Line>비슷한 장르의 웹툰</Line>
            {/* 아래 웹툰카드에서 필요한 것 1. 변수명 통일해야 함(웹툰 메인 랭킹과
            상세, 기타 등등...) 2. onClick -> 상세페이지 연결하기 */}
            <Slick>
              {similar_list.map((item) => (
                <SimContainer>
                  <WebToonCard {...item} />
                </SimContainer>
              ))}
            </Slick>
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
  align-items: center;
`;

const SimContainer = styled.div`
  width: 30vw;
  height: auto;
  /* background: #f1f1f1; */
  padding: 10px;
  margin: 5px;
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
