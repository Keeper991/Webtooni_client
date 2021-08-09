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

  const webtooni_list = useSelector((state) => state.webtoon.webtooni_rank);

  React.useEffect(() => {
    if (webtooni_list.length === 0) {
      dispatch(webtoonActions.getWebtooniRank());
    }
  }, []);

  if (toon_list === "webtooniverse_rank") {
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
              <Text type="p" fontWeight="bold">
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
              <Text type="p" fontWeight="bold">
                이달의 웹투니버스 순위
              </Text>
            </FlexGrid>
            <SliderBox>
              {webtooni_list?.map((_, idx) => {
                return <ToonListCard toon_list key={idx} {..._}></ToonListCard>;
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
