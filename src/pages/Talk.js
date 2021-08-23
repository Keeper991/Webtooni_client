import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Text, Button } from "../elements";
import { WriteButton, Comment, TalkAlarm } from "../images/icons";
import { actionCreators as talkActions } from "../redux/modules/talk";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
import { Permit } from "../shared/PermitAuth";

const Talk = () => {
  const all_post_list = useSelector((store) => store.talk.post_list); //조회한 페이지의 전체 포스트 목록
  const all_page_number = useSelector((store) => store.talk.page_number_list); //클릭한 페이지 목록
  let cur_page = useSelector((store) => store.talk.cur_page); //현재 페이지 번호
  const post_count = useSelector((store) => store.talk.post_count); //전체 포스트 수
  const post_per_page = 10; //페이지 별 포스트 수
  let last_page = 1; //마지막 페이지 번호

  const dispatch = useDispatch();

  useEffect(() => {
    if (all_page_number.length === 0) dispatch(talkActions.getPageServer(1)); //처음 페이지 진입 시 1번 페이지 포스트 요청
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

  let page_order = all_page_number.indexOf(cur_page) + 1; //클릭한 페이지 중 현재 페이지 순서

  //현재 페이지의 포스트 리스트
  let post_list = all_post_list.filter(
    (_, idx) =>
      (page_order - 1) * post_per_page <= idx &&
      idx < page_order * post_per_page
  );

  //클릭한 페이지의 포스트 목록 가져오기
  const getPagePosts = (page_number) => {
    if (!all_page_number.includes(page_number)) {
      dispatch(talkActions.getPageServer(page_number)); //새로운 페이지번호를 클릭한 경우
    } else {
      dispatch(talkActions.setPageNumber(page_number)); //기 조회한 페이지 번호를 클릭한 경우
    }
  };

  //오늘 날짜
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = year + "-" + month + "-" + day;
  return (
    <>
      {/* 포스트 작성 버튼 */}
      <Permit>
        <Grid
          position="fixed"
          bottom="10px"
          right="10px"
          cursor
          zIndex="2"
          onClick={() => history.push("/talk/write")}
        >
          <WriteButton />
        </Grid>
      </Permit>
      <Grid
        position="relative"
        height="66px"
        padding="24px 0 24px 20px"
        margin="20px"
        display="flex"
        align="center"
        borderRadius="8px"
        bgColor={Color.gray100}
      >
        <Text fontWeight="medium" color={Color.gray800}>
          웹툰 추천과 감상을 공유해보세요
        </Text>
        <Grid position="absolute" top="5" right="0">
          <TalkAlarm />
        </Grid>
      </Grid>

      {/* 포스트 리스트 */}
      <Grid
        bgColor={Color.white}
        margin="42px 0 0 0"
        padding="0 20px 20px 20px"
        borderTop={`2px solid ${Color.gray100}`}
      >
        {post_list.map((post, idx) => (
          <Grid
            borderBottom={`1px solid ${Color.gray100}`}
            padding="20px 0 10px"
            cursor
            onClick={() => history.push(`/talk/detail/${post.postId}`)}
          >
            <Text color={Color.gray800}>{post?.postTitle}</Text>
            <Grid
              display="flex"
              margin="7px 0 0 0"
              justify="space-between"
              align="center"
            >
              <Grid display="flex">
                <Text
                  color={Color.gray400}
                  type="num"
                  fontSize="12px"
                  whiteSpace="nowrap"
                  padding="0 12px 0 0"
                >
                  {post.userName}
                </Text>
                <Text
                  color={Color.gray400}
                  type="num"
                  fontSize="12px"
                  whiteSpace="nowrap"
                  padding="0 12px 0 0"
                >
                  {/* 작성일 오늘인지에 따라 날짜만/시간만 표기 */}
                  {today === post.createDate.substr(0, 10)
                    ? post.createDate.substr(11, 5)
                    : post.createDate.substr(5, 5)}
                </Text>
                <Text
                  color={Color.gray400}
                  whiteSpace="nowrap"
                  padding="0 12px 0 0"
                  type="num"
                  fontSize="12px"
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
                {String(post.talkCommentCount).length === 1 ? (
                  <Grid position="absolute" top="-1px" left="52%">
                    <Text
                      type="num"
                      fontSize="9px"
                      fontWeight="bold"
                      whiteSpace="nowrap"
                      color={Color.primary}
                    >
                      {post.talkCommentCount}
                    </Text>
                  </Grid>
                ) : (
                  <Grid position="absolute" top="-1px" left="42%">
                    <Text
                      type="num"
                      fontSize="9px"
                      fontWeight="bold"
                      whiteSpace="nowrap"
                      color={Color.primary}
                    >
                      9+
                    </Text>
                  </Grid>
                )}
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
              <Text type="caption" color={Color.gray700}>
                이전
              </Text>
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
                    border={`1px solid ${Color.gray300}`}
                    fontSize="12px"
                    color={Color.gray400}
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
              <Text type="caption" color={Color.gray700}>
                다음
              </Text>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
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
  z-index: ${(props) => props.zIndex || ""};
  background-color: ${(props) => props.bgColor || ""};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
  border-top: ${(props) => props.borderTop || ""};
  border-bottom: ${(props) => props.borderBottom || ""};
  border: ${(props) => props.border || ""};
  border-radius: ${(props) => props.borderRadius || ""};
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
