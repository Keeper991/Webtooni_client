import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Text, Image, Button, Input } from "../elements";
import { ReactComponent as WriteButton } from "../images/WriteButton.svg";
import { actionCreators as talkActions } from "../redux/modules/talk";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
import { ReactComponent as Comment } from "../images/Comment.svg";

const Talk = (props) => {
  // const is_login = useSelector((store) => store.user.is_login);   //로그인 여부 알기
  const is_login = true; //나중에 지우기

  const all_post_list = useSelector((store) => store.talk.post_list); //조회한 페이지의 전체 포스트 목록
  const all_page_number = useSelector((store) => store.talk.page_number_list); //클릭한 페이지 목록
  let cur_page = useSelector((store) => store.talk.cur_page); //현재 페이지 번호
  const post_count = useSelector((store) => store.talk.post_count); //전체 포스트 수
  const post_per_page = 10; //페이지 별 포스트 수
  let last_page = 1; //마지막 페이지 번호

  const dispatch = useDispatch();
  //처음 페이지 진입 시
  useEffect(() => {
    if (all_page_number.length === 0) dispatch(talkActions.getPageServer(1)); //1번 페이지 포스트 요청
  }, []);

  //마지막 페이지 번호 구하기
  if (post_count === 0) {
  } else if (post_count % post_per_page === 0) {
    last_page = parseInt(post_count / post_per_page);
  } else {
    last_page = parseInt(post_count / post_per_page) + 1;
  }

  const [startPage, setStartPage] = React.useState(1); //페이지 번호 설정

  const [select, isSelect] = React.useState(0); //선택한 페이지 표시

  let post_list = []; //클릭한 페이지의 포스트 리스트

  let page_order = all_page_number.indexOf(cur_page) + 1; //클릭한 페이지 중 현재 페이지 순서

  //현재 페이지의 포스트 리스트
  post_list = all_post_list.filter(
    (_, idx) =>
      (page_order - 1) * post_per_page <= idx &&
      idx < page_order * post_per_page
  );

  //클릭한 페이지의 포스트 목록 가져오기
  const getPagePosts = (page_number) => {
    //새로운 페이지번호를 클릭한 경우 서버에서 포스트 받아오기
    if (!all_page_number.includes(page_number)) {
      dispatch(talkActions.getPageServer(page_number));
    } else {
      dispatch(talkActions.setPageNumber(page_number)); //기 조회한 페이지 번호를 클릭한 경우
    }
  };

  return (
    <Grid bgColor={Color.gray200}>
      {/* 포스트 작성 버튼 */}
      {is_login && (
        <Grid
          position="fixed"
          bottom="50px"
          right="20px"
          cursor
          onClick={() => history.push("/talk/write")}
        >
          <WriteButton />
        </Grid>
      )}
      <Grid
        padding="16px"
        bgColor={Color.white}
        borderBottom={`1px solid ${Color.lightGray4}`}
        display="flex"
        justify="flex-end"
      >
        <Button
          width="128px"
          height="36px"
          shape="pill"
          bgColor={Color.white}
          border={`1px solid ${Color.lightGray4}`}
          padding="9px 16px"
        >
          <Text
            type="p"
            color={Color.darkGray}
            textAlign="justify"
            width="auto"
          >
            최신순
          </Text>
        </Button>
      </Grid>
      {/* 포스트 리스트 */}
      <Grid bgColor={Color.white} padding="20px">
        {post_list.map((post, idx) => (
          <Grid
            borderBottom={`1px solid ${Color.gray200}`}
            padding="20px 0 10px"
            cursor
            onClick={() => history.push(`/talk/detail/${post.postId}`)}
          >
            <Text>{post.postTitle}</Text>
            <Grid
              display="flex"
              margin="7px 0 0 0"
              justify="space-between"
              align="center"
            >
              <Grid display="flex">
                <Text
                  color={Color.gray400}
                  type="p"
                  whiteSpace="nowrap"
                  padding="0 12px 0 0"
                >
                  {post.userName}
                </Text>
                <Text
                  color={Color.gray400}
                  type="caption"
                  whiteSpace="nowrap"
                  padding="0 12px 0 0"
                >
                  {post.createDate.substr(5, 5)}
                </Text>
                <Text
                  color={Color.gray400}
                  type="caption"
                  whiteSpace="nowrap"
                  padding="0 12px 0 0"
                >
                  좋아요&nbsp;{post.likeNum}
                </Text>
              </Grid>

              <Grid
                position="relative"
                bgColor={Color.white}
                padding="0 0 0 6px"
              >
                <Comment width="24px" height="24px" />
                <Grid position="absolute" top="0" left="45%">
                  <Text
                    type="num"
                    fontSize="9px"
                    fontWeight="bold"
                    whiteSpace="nowrap"
                  >
                    {post.talkCommentCount}
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid
          display="flex"
          padding="32px 16px"
          justify="center"
          align="center"
        >
          {/* 이전 페이지 목록 보여주기 */}
          {startPage !== 1 && (
            <Grid
              onClick={() => {
                setStartPage(startPage - 5);
                getPagePosts(startPage);
              }}
              padding="0 15px 0 0"
            >
              이전
            </Grid>
          )}
          {/* 선택 가능한 페이지 번호 */}
          <PageBtnGrid select={select}>
            {Array.from({ length: 5 }).map((_, idx) => {
              const page_btn_no = startPage + idx;
              if (page_btn_no <= last_page) {
                return (
                  <Button
                    shape="circle"
                    size="32px"
                    margin="5px"
                    bgColor={Color.white}
                    color={Color.black}
                    border={`1px solid ${Color.darkGray}`}
                    _onClick={() => {
                      getPagePosts(page_btn_no);
                      isSelect(idx % 5);
                    }}
                  >
                    {page_btn_no}
                  </Button>
                );
              }
            })}
          </PageBtnGrid>
          {/* 다음 페이지 목록 보여주기 */}
          {startPage + 5 <= last_page && (
            <Grid
              onClick={() => {
                setStartPage(startPage + 5);
                getPagePosts(startPage);
              }}
              padding="0 0 0 15px"
            >
              다음
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
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
  bottom: ${(props) => props.bottom || ""};
  top: ${(props) => props.top || ""};
  left: ${(props) => props.left || ""};
  right: ${(props) => props.right || ""};
  background-color: ${(props) => props.bgColor || ""};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
  border-bottom: ${(props) => props.borderBottom || ""};
`;

const PageBtnGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > button:nth-child(${(props) => props.select + 1}) {
    border: 1px solid ${Color.primary};
    color: ${Color.primary};
  }
`;
export default Talk;
