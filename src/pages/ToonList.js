import React from "react";
import styled from "styled-components";
import { Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { SkeletonCard, ToonListCard } from "../components";
import { LeftOutlined } from "@ant-design/icons";
import { history } from "../redux/configureStore";

const ToonList = (props) => {
  const toon_list_name = props.match.params.id;
  const toon_id = props.location.state?.toon_id;

  const dispatch = useDispatch();

  const is_loading = useSelector((state) => state.webtoon.is_loading);
  const user_info = useSelector((state) => state.user.info);
  const toon_list = useSelector((state) => state.webtoon.toon_list);
  const webtooni_list = toon_list.filter((toon) =>
    toon.filterConditions.includes("webtooni")
  );
  const end_toon_list = toon_list.filter((toon) =>
    toon.filterConditions.includes("endOffer")
  );
  const for_user_list = toon_list.filter((toon) =>
    toon.filterConditions.includes("forUser")
  );
  const similar_user_list = toon_list.filter((toon) =>
    toon.filterConditions.includes("similarUserOffer")
  );
  const best_reviewer_list = toon_list.filter((toon) =>
    toon.filterConditions.includes("bestReviewerOffer")
  );

  const similar_genre_list = toon_list.filter((toon) =>
    toon.filterConditions.includes(toon_id)
  );

  React.useEffect(() => {
    if (toon_list_name === "webtooniverse_rank" && webtooni_list.length === 0) {
      dispatch(webtoonActions.getWebtooniRank());
    }

    if (toon_list_name === "end_toon" && end_toon_list.length === 0) {
      dispatch(webtoonActions.getEndToonOffer());
    }

    if (toon_list_name === "best_reviewer" && best_reviewer_list.length === 0) {
      dispatch(webtoonActions.getBestReviewerOffer());
    }

    if (toon_list_name === "user_offer" && for_user_list.length === 0) {
      dispatch(webtoonActions.getUserOffer());
    }

    if (toon_list_name === "similar_toon" && similar_user_list.length === 0) {
      dispatch(webtoonActions.getSimilarUserOffer());
    }
    if (toon_list_name === "similar_genre" && similar_genre_list.length === 0) {
      dispatch(webtoonActions.getSimilarGenre());
    }
  }, []);

  if (toon_list_name === "webtooniverse_rank") {
    return (
      <React.Fragment>
        {is_loading || webtooni_list.length === 0 ? (
          <Container>
            <FlexGrid>
              <LeftOutlined
                style={{ margin: "0 5px" }}
                onClick={() => {
                  history.goBack();
                }}
              ></LeftOutlined>
              <Text type="h2" fontWeight="bold">
                금주의 웹투니버스 순위
              </Text>
            </FlexGrid>
            <SliderBox>
              {Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCard key={idx} more></SkeletonCard>;
              })}
            </SliderBox>
          </Container>
        ) : (
          <Container>
            <FlexGrid>
              <LeftOutlined
                style={{ margin: "0 5px" }}
                onClick={() => {
                  history.goBack();
                }}
              ></LeftOutlined>
              <Text type="h2" fontWeight="bold">
                금주의 웹투니버스 순위
              </Text>
            </FlexGrid>
            <SliderBox>
              {webtooni_list?.map((_, idx) => {
                return <ToonListCard key={idx} {..._}></ToonListCard>;
              })}
            </SliderBox>
          </Container>
        )}
      </React.Fragment>
    );
  }

  if (toon_list_name === "end_toon") {
    return (
      <React.Fragment>
        {is_loading || end_toon_list.length === 0 ? (
          <Container>
            <FlexGrid>
              <LeftOutlined
                style={{ margin: "0 5px" }}
                onClick={() => {
                  history.goBack();
                }}
              ></LeftOutlined>
              <Text type="h2" fontWeight="bold">
                완결 작품 추천
              </Text>
            </FlexGrid>
            <SliderBox>
              {Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCard key={idx} more></SkeletonCard>;
              })}
            </SliderBox>
          </Container>
        ) : (
          <Container>
            <FlexGrid>
              <LeftOutlined
                style={{ margin: "0 5px" }}
                onClick={() => {
                  history.goBack();
                }}
              ></LeftOutlined>
              <Text type="h2" fontWeight="bold">
                완결 작품 추천
              </Text>
            </FlexGrid>
            <SliderBox>
              {end_toon_list?.map((_, idx) => {
                return <ToonListCard key={idx} {..._}></ToonListCard>;
              })}
            </SliderBox>
          </Container>
        )}
      </React.Fragment>
    );
  }

  if (toon_list_name === "best_reviewer") {
    return (
      <React.Fragment>
        {is_loading || best_reviewer_list.length === 0 ? (
          <Container>
            <FlexGrid>
              <LeftOutlined
                style={{ margin: "0 5px" }}
                onClick={() => {
                  history.goBack();
                }}
              ></LeftOutlined>
              <Text type="h2" fontWeight="bold">
                이번 주 웹툰 평론가의 추천
              </Text>
            </FlexGrid>
            <SliderBox>
              {Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCard key={idx} more></SkeletonCard>;
              })}
            </SliderBox>
          </Container>
        ) : (
          <Container>
            <FlexGrid>
              <LeftOutlined
                style={{ margin: "0 5px" }}
                onClick={() => {
                  history.goBack();
                }}
              ></LeftOutlined>
              <Text type="h2" fontWeight="bold">
                이번 주 웹툰 평론가의 추천
              </Text>
            </FlexGrid>
            <SliderBox>
              {best_reviewer_list?.map((_, idx) => {
                return <ToonListCard key={idx} {..._}></ToonListCard>;
              })}
            </SliderBox>
          </Container>
        )}
      </React.Fragment>
    );
  }

  if (toon_list_name === "similar_toon") {
    return (
      <React.Fragment>
        {is_loading || similar_user_list.length === 0 ? (
          <Container>
            <FlexGrid>
              <LeftOutlined
                style={{ margin: "0 5px" }}
                onClick={() => {
                  history.goBack();
                }}
              ></LeftOutlined>
              <Text type="h2" fontWeight="bold">
                {user_info.userName}님과 비슷한 취향의 사용자가 본
              </Text>
            </FlexGrid>
            <SliderBox>
              {Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCard key={idx} more></SkeletonCard>;
              })}
            </SliderBox>
          </Container>
        ) : (
          <Container>
            <FlexGrid>
              <LeftOutlined
                style={{ margin: "0 5px" }}
                onClick={() => {
                  history.goBack();
                }}
              ></LeftOutlined>
              <Text type="h2" fontWeight="bold">
                {user_info.userName}님과 비슷한 취향의 사용자가 본
              </Text>
            </FlexGrid>
            <SliderBox>
              {similar_user_list?.map((_, idx) => {
                return <ToonListCard key={idx} {..._}></ToonListCard>;
              })}
            </SliderBox>
          </Container>
        )}
      </React.Fragment>
    );
  }

  if (toon_list_name === "similar_genre") {
    return (
      <React.Fragment>
        {is_loading || similar_genre_list.length === 0 ? (
          <Container
            onClick={() => {
              history.push(`/detail/${toon_id}`);
            }}
          >
            <FlexGrid>
              <LeftOutlined
                style={{ margin: "0 5px" }}
                onClick={() => {
                  history.goBack();
                }}
              ></LeftOutlined>
              <Text type="h2" fontWeight="bold">
                비슷한 장르의 웹툰 추천
              </Text>
            </FlexGrid>
            <SliderBox>
              {Array.from({ length: 10 }).map(() => {
                return <SkeletonCard more></SkeletonCard>;
              })}
            </SliderBox>
          </Container>
        ) : (
          <Container>
            <FlexGrid>
              <LeftOutlined
                style={{ margin: "0 5px" }}
                onClick={() => {
                  history.goBack();
                }}
              ></LeftOutlined>
              <Text type="h2" fontWeight="bold">
                비슷한 장르의 웹툰 추천
              </Text>
            </FlexGrid>
            <SliderBox>
              {similar_genre_list?.map((_, idx) => {
                return <ToonListCard key={idx} {..._} detail></ToonListCard>;
              })}
            </SliderBox>
          </Container>
        )}
      </React.Fragment>
    );
  }
  return null;
};

const Container = styled.div`
  width: 100%;
`;

const FlexGrid = styled.div`
  width: 95%;
  height: 40px;
  margin: 10px auto;
  display: flex;
  align-items: center;
`;

const SliderBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
export default ToonList;
