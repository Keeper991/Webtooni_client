import React from "react";
import { Input, Text } from "../elements";
import _ from "lodash";
import { userAPI } from "../shared/API";
import { ToonListCard } from "../components";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "../shared/common";
import { LeftOutlined } from "@ant-design/icons";
import { history } from "../redux/configureStore";

const ReviewSearch = () => {
  const dispatch = useDispatch();

  const [search_value, setSearchValue] = React.useState("");
  const [search_result, setSearchResult] = React.useState([]);

  const unwritten_list = useSelector((state) => state.webtoon.unwritten_offer);
  const is_login = useSelector((state) => state.user.is_login);
  const user_name = useSelector((state) => state.user.info.userName);

  React.useEffect(() => {
    dispatch(webtoonActions.getUnwrittenOffer());
  }, []);

  const getSearchResult = async (keyword) => {
    if (keyword.length === 0) {
      setSearchResult([]);
      return;
    }
    try {
      const response = await userAPI.search(keyword);
      setSearchResult(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const delayedQueryCall = React.useRef(
    _.debounce((keyword) => getSearchResult(keyword), 500)
  ).current;

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    delayedQueryCall(e.target.value);
    if (search_value.trim() === "") {
      setSearchResult([]);
    }
  };

  return (
    <React.Fragment>
      <HeaderGrid>
        <LeftOutlined
          style={{ fontSize: "18px", margin: "25px 0" }}
          onClick={() => {
            history.goBack();
          }}
        ></LeftOutlined>
        <Input
          type="text"
          _onChange={handleSearch}
          value={search_value}
          placeholder="웹툰명을 검색해주세요"
          height="48px"
        ></Input>
      </HeaderGrid>
      <Container>
        <Text tag="p" fontWeight="bold" margin="30px 0">
          검색 결과
        </Text>
      </Container>

      {search_result?.map((_, idx) => {
        return <ToonListCard key={idx} {..._} review></ToonListCard>;
      })}
      {search_result.length === 0 ? (
        <TitleGrid>
          <Text tag="p" margin="10px 0 30px 0" color={Color.gray400}>
            검색 결과가 없습니다
          </Text>
        </TitleGrid>
      ) : null}
      <Container>
        <Text tag="p" type="h2" fontWeight="bold" margin="50px 0 0 0">
          {is_login
            ? `${user_name}님의 리뷰를 기다리는 웹툰`
            : "리뷰 작성을 기다리는 웹툰"}
        </Text>
      </Container>
      {unwritten_list?.map((_, idx) => {
        return <ToonListCard key={idx} {..._} search></ToonListCard>;
      })}
    </React.Fragment>
  );
};

const Container = styled.div`
  padding: 16px;
`;

const HeaderGrid = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0 16px 30px;

  border-bottom: 1px solid ${Color.gray100};
`;

const TitleGrid = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
export default ReviewSearch;
