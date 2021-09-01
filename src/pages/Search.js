import React from "react";
import { Input, Text } from "../elements";
import _ from "lodash";
import { userAPI } from "../shared/API";
import { ToonListCard } from "../components";
import { Color } from "../shared/common";
import styled from "styled-components";

const Search = () => {
  //states
  const [search_value, setSearchValue] = React.useState("");
  const [search_result, setSearchResult] = React.useState([]);

  //검색 웹툰 요청
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
      <Container border>
        <Input
          type="text"
          _onChange={handleSearch}
          value={search_value}
          placeholder="웹툰명을 검색해주세요"
        ></Input>
      </Container>
      <BorderLine>
        <Text tag="p" fontWeight="bold">
          검색 결과
        </Text>
      </BorderLine>
      <ListBox>
        {search_result?.map((_, idx) => {
          return <ToonListCard key={idx} {..._}></ToonListCard>;
        })}
      </ListBox>
      <Container>
        {search_result.length === 0 ? (
          <TitleGrid>
            <Text color={Color.gray400}>검색 결과가 없습니다</Text>
          </TitleGrid>
        ) : null}
      </Container>
    </React.Fragment>
  );
};

const ListBox = styled.section``;

const BorderLine = styled.div`
  margin-top: 10px;
  border-top: 1px solid ${Color.gray100};
  padding: 16px;
`;
const Container = styled.div`
  padding: 16px;
  ${(props) =>
    props.border && `border-top: 8px solid ${Color.gray100}; margin-top: -4px;`}
`;

const TitleGrid = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
export default Search;
