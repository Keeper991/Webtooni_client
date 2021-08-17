import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input, Text } from "../elements";
import { actionCreators as talkActions } from "../redux/modules/talk";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
import { ReactComponent as BackButton } from "../images/BackButton.svg";

const TalkWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((store) => store.user.is_login);

  //톡 포스트 수정 시 기존 포스트 가져오기
  const post_id = props.match.params.id;
  const post_list = useSelector((store) => store.talk.post_list);
  const prevPost = post_list.filter((p) => String(p.postId) === post_id)[0];

  //로그인 유저 정보
  const userName = useSelector((store) => store.user.info?.userName);

  //톡 포스트 작성하기
  const [post, setPost] = React.useState({
    postTitle: prevPost?.postTitle,
    postContent: prevPost?.postContent,
  });

  const [contentAlert, isContentAlert] = React.useState(false);

  //상황 별 분기
  useEffect(() => {
    //로그인 안 했으면 메인으로 이동
    if (!is_login) {
      alert("로그인 후 이용하세요~");
      history.replace("/talk");
      return;
    }
    //유저가 포스트 작성자가 아닐 때 메인으로 이동
    if (post_id && userName !== prevPost.userName) {
      alert("다른 사람의 글이에요");
      history.replace("/talk");
      return;
    }
    //기존 포스트 상세 정보가 없으면 서버에 요청
    if (post_id && !prevPost) {
      dispatch(talkActions.getPostOneServer(post_id));
      return;
    }
  }, []);

  //포스트 등록
  const addPost = () => {
    if (!post.postTitle || !post.postContent) {
      isContentAlert(true);
      setTimeout(function () {
        isContentAlert(false);
      }, 2000);
      return;
    }
    if (is_login) {
      dispatch(talkActions.addPostServer(post.postTitle, post.postContent));
    } else {
      alert("로그인하세요~");
    }
  };
  //포스트 수정
  const editPost = () => {
    if (!post.postTitle || !post.postContent) {
      isContentAlert(true);
      setTimeout(function () {
        isContentAlert(false);
      }, 2000);
      return;
    }

    dispatch(
      talkActions.editPostServer(
        parseInt(prevPost.postId),
        post.postTitle,
        post.postContent
      )
    );
  };

  return (
    <>
      <Grid
        display="flex"
        justify="space-between"
        align="flex-start"
        borderBottom={`1px solid ${Color.gray200}`}
        padding="20px"
      >
        {/* 뒤로가기 */}
        <Grid
          cursor
          onClick={() => {
            history.go(-1);
          }}
        >
          <BackButton></BackButton>
        </Grid>

        {/* 게시글 등록 */}
        {!prevPost ? (
          <Button
            border="none"
            bgColor={Color.gray900}
            width="66px"
            height="32px"
            _onClick={addPost}
          >
            <Text color={Color.white} fontWeight="medium">
              작성
            </Text>
          </Button>
        ) : (
          <Button
            border="none"
            bgColor={Color.gray900}
            width="66px"
            height="32px"
            _onClick={editPost}
          >
            <Text color={Color.white} fontWeight="medium">
              수정
            </Text>
          </Button>
        )}
      </Grid>

      <Grid borderBottom={`1px solid ${Color.gray200}`} padding="15px 20px">
        <Input
          placeholder="제목을 입력하세요"
          color={Color.gray800}
          fontSize="16px"
          fontWeight={400}
          _onChange={(e) => setPost({ ...post, postTitle: e.target.value })}
          border="none"
          value={post.postTitle}
          padding="0"
        ></Input>
      </Grid>
      <Grid
        position="relative"
        display="flex"
        flexDir="column"
        justify="center"
        align="center"
      >
        <Input
          width="100%"
          padding="15px 20px"
          multiLine
          placeholder="내용을 입력하세요"
          color={Color.gray800}
          fontSize="16px"
          fontWeight={400}
          _onChange={(e) => setPost({ ...post, postContent: e.target.value })}
          border="none"
          height="400px"
          value={post.postContent}
        ></Input>

        <CntAlertStyle fadeOut={!contentAlert}>내용을 입력하세요</CntAlertStyle>
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
  background-color: ${(props) => props.bgColor || ""};
  border-bottom: ${(props) => props.borderBottom || ""};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
`;

const CntAlertStyle = styled.div`
  width: 296px;
  height: 32px;
  border-radius: 99px;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: ${Color.white};
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  transition: all 0.5s;
  ${(props) =>
    props.fadeOut &&
    ` opacity: 0;
    `}
`;

export default TalkWrite;
