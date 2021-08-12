import React from "react";
import { Input, Text } from "../elements";
import _ from "lodash";
import { userAPI } from "../shared/API";
import { ToonListCard } from "../components";
import styled from "styled-components";

const Search = () => {
  const [search_value, setSearchValue] = React.useState("");
  const [search_result, setSearchResult] = React.useState([]);

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
      <Container>
        <Input
          type="text"
          _onChange={handleSearch}
          value={search_value}
          placeholder="검색어를 입력해주세요."
        ></Input>

        <Text tag="p" margin="20px 0 0 0">
          검색 결과
        </Text>
        {search_result?.map((_, idx) => {
          return <ToonListCard key={idx} {..._}></ToonListCard>;
        })}
        {search_result.length === 0 ? (
          <TitleGrid>
            <Text>검색 결과가 없습니다</Text>
          </TitleGrid>
        ) : null}
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  padding: 16px;
`;

const TitleGrid = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
export default Search;
