import React from "react";
import { Input, Text } from "../elements";
import _ from "lodash";
import { userAPI } from "../shared/API";
import { ToonListCard } from "../components";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const ReviewSearch = () => {
  const dispatch = useDispatch();

  const [search_value, setSearchValue] = React.useState("");
  const [search_result, setSearchResult] = React.useState([]);

  // const unwritten_list = useSelector((state) => state.webtoon.unwritten_offer);
  const user_name = useSelector((state) => state.user.info.userName);

  const test_list = [
    {
      finished: false,
      id: 1,
      realUrl:
        "https://comic.naver.com/webtoon/list?titleId=771718&weekday=wed",
      reviewCount: 0,
      toonAge: "15세 이용가",
      toonAuthor: "이경민 / 송준혁",
      toonAvgPoint: 0,
      toonContent:
        "평소 웹툰을 즐겨보는 고등학생 나강림.\n어느날 그의 눈앞에 웹툰 속에서 봤던 여주인공이 나타나는 기이한 일이 펼쳐진다.\n심지어 웹툰에서와 똑같은 사건이 그녀를 위기로 몰아넣는데,\n문제는 그 사건으로부터 그녀를 구해줄 주인공이 현실에는 없다는 것!\n결국 나강림은 주인공 역할을 대신하여 그녀들을 구하기 위해 시간을 반복하며 구른다.",
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/771718/thumbnail/thumbnail_IMAG06_0b93ce68-4a8e-4d95-bad7-09ad47865856.jpg",
      toonPlatform: "네이버",
      toonTitle: "수요웹툰의 나강림",
      toonWeekday: "수",
      genres: ["", "로맨스"],
    },
  ];

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
          return <ToonListCard key={idx} {..._} review></ToonListCard>;
        })}
        {search_result.length === 0 ? (
          <TitleGrid>
            <Text>검색 결과가 없습니다</Text>
          </TitleGrid>
        ) : null}

        <Text tag="p" margin="50px 0 0 0">
          {user_name}님의 리뷰를 기다리는 웹툰
        </Text>
      </Container>
      {test_list.map((_, idx) => {
        return <ToonListCard key={idx} {..._}></ToonListCard>;
      })}
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
export default ReviewSearch;
