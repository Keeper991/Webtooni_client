import React from "react";
import { Input } from "../elements";
import _ from "lodash";
import { userAPI } from "../shared/API";

const Search = () => {
  const [search_value, setSearchValue] = React.useState("");
  const [search_result, setSearchResult] = React.useState("");

  const getSearchResult = async (keyword) => {
    if (keyword.length === 0) return;
    try {
      const response = await userAPI.search(keyword);
      console.log(response?.data);
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
    console.log(search_value);
    delayedQueryCall(e.target.value);
    if (search_value.trim() === "") {
      setSearchResult({
        title: [],
      });
    }
  };
  console.log(search_result);
  return (
    <React.Fragment>
      <Input type="text" _onChange={handleSearch} value={search_value}></Input>
    </React.Fragment>
  );
};

export default Search;
