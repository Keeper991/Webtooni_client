import React from "react";
import styled from "styled-components";
import { Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { SkeletonCard, ToonListCard } from "../components";
import { LeftOutlined } from "@ant-design/icons";
import { history } from "../redux/configureStore";

const ToonList = (props) => {
  const toon_list = props.match.params.id;

  const dispatch = useDispatch();

  const is_loading = useSelector((state) => state.webtoon.is_loading);
  const user_info = useSelector((state) => state.user.info);
  const webtooni_list = useSelector((state) => state.webtoon.webtooni_rank);
  const end_toon_list = useSelector((state) => state.webtoon.end_toon);
  const user_offer_list = useSelector((state) => state.webtoon.user_offer);
  const similar_offer_list = useSelector(
    (state) => state.webtoon.similar_user_offer
  );
  const best_reviewer_list = useSelector(
    (state) => state.webtoon.best_reviewer_offer.webtoonAndGenreResponseDtos
  );

  React.useEffect(() => {
    if (toon_list === "webtooniverse_rank" && webtooni_list.length === 0) {
      dispatch(webtoonActions.getWebtooniRank());
    }

    if (toon_list === "end_toon" && end_toon_list.length === 0) {
      dispatch(webtoonActions.getEndToonOffer());
    }

    if (toon_list === "best_reviewer" && best_reviewer_list.length === 0) {
      dispatch(webtoonActions.getBestReviewerOffer());
    }

    if (toon_list === "user_offer" && user_offer_list.length === 0) {
      dispatch(webtoonActions.getUserOffer());
    }

    if (toon_list === "similar_toon" && similar_offer_list.length === 0) {
      dispatch(webtoonActions.getSimilarUserOffer());
    }
  }, []);

  if (toon_list === "webtooniverse_rank") {
    return (
      <React.Fragment>
        {is_loading || webtooni_list.length === 0 ? (
          <Container
            onClick={() => {
              history.push(`/detail/${props.id}`);
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
                이달의 웹투니버스 순위
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
                이달의 웹투니버스 순위
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

  if (toon_list === "end_toon") {
    return (
      <React.Fragment>
        {is_loading || end_toon_list.length === 0 ? (
          <Container
            onClick={() => {
              history.push(`/detail/${props.id}`);
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
                완결 작품 추천
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

  if (toon_list === "best_reviewer") {
    return (
      <React.Fragment>
        {is_loading || end_toon_list.length === 0 ? (
          <Container
            onClick={() => {
              history.push(`/detail/${props.id}`);
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
                이번 주 웹툰 평론가의 추천
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

  if (toon_list === "user_offer") {
    return (
      <React.Fragment>
        {is_loading || user_offer_list.length === 0 ? (
          <Container
            onClick={() => {
              history.push(`/detail/${props.id}`);
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
                {user_info.userName}님만을 위한 추천 웹툰
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
                {user_info.userName}님만을 위한 추천 웹툰
              </Text>
            </FlexGrid>
            <SliderBox>
              {user_offer_list?.map((_, idx) => {
                return <ToonListCard key={idx} {..._} is_user></ToonListCard>;
              })}
            </SliderBox>
          </Container>
        )}
      </React.Fragment>
    );
  }

  if (toon_list === "similar_toon") {
    return (
      <React.Fragment>
        {is_loading || similar_offer_list.length === 0 ? (
          <Container
            onClick={() => {
              history.push(`/detail/${props.id}`);
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
                {user_info.userName}님과 비슷한 취향의 유저가 본
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
                {user_info.userName}님과 비슷한 취향의 유저가 본
              </Text>
            </FlexGrid>
            <SliderBox>
              {similar_offer_list?.map((_, idx) => {
                return <ToonListCard key={idx} {..._}></ToonListCard>;
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
