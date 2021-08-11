import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input } from "../elements";
import { actionCreators as talkActions } from "../redux/modules/talk";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
import { ReactComponent as BackButton } from "../images/BackButton.svg";

const TalkWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((store) => store.user.is_login); //로그인 여부 판별

  //톡 포스트 수정 시 기존 포스트 가져오기
  const post_id = props.match.params.id;
  console.log(post_id, "postid");
  const post_list = useSelector((store) => store.talk.post_list);
  const prevPost = post_list.filter((p) => p.postId === post_id)[0];
  console.log(prevPost, "prevPost");

  //로그인 유저 정보
  const userName = useSelector((store) => store.user.user?.userName);
  console.log(userName, "userName");

  //톡 포스트 작성하기
  const [post, setPost] = React.useState({
    postTitle: prevPost?.postTitle,
    postContent: prevPost?.postContent,
  });

  //상황 별 분기
  useEffect(() => {
    //로그인 안 했으면 메인으로 이동
    // if (!is_login) {
    //   alert("로그인 후 이용하세요~");
    //   history.replace("/talk");
    //   return;
    // }
    // //유저가 포스트 작성자가 아닐 때 메인으로 이동 . 얘가 실행 안 되어야 하는데 실행됨...
    // if (userName && userName !== prevPost.userName) {
    //   alert("다른 사람의 글이에요");
    //   history.replace("/talk");
    //   return;
    // }
    //기존 포스트 상세 정보가 없으면 서버에 요청
    if (prevPost && !prevPost.postContent) {
      dispatch(talkActions.getPostOneServer(post_id));
      return;
    }
  }, []);

  //포스트 등록
  const addPost = () => {
    if (!post.postTitle || !post.postContent) {
      alert("빠진 항목이 있어요");
      return;
    }
    // if (is_login) {
    dispatch(talkActions.addPostServer(post.postTitle, post.postContent));
    // } else {
    //   alert("로그인하세요~");
    // }
  };
  //포스트 수정
  const editPost = () => {
    if (!post.postTitle || !post.postContent) {
      alert("빠진 항목이 있어요");
      return;
    }
    dispatch(
      talkActions.editPostServer(
        prevPost.postId,
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
        align="center"
        borderBottom={`1px solid ${Color.lightGray4}`}
        padding="20px 30px 20px 5px"
      >
        {/* 뒤로가기 */}
        <Button
          bgColor="transparent"
          border="none"
          _onClick={() => {
            history.push("/talk");
          }}
        >
          <BackButton
            onClick={() => {
              history.go(-1);
            }}
          ></BackButton>
        </Button>
        {/* 게시글 등록 */}
        {!prevPost ? (
          <Button
            border="none"
            color={Color.white}
            bgColor={Color.black2}
            width="80px"
            height="45px"
            fontSize="17px"
            fontWeight="bold"
            _onClick={addPost}
          >
            작성
          </Button>
        ) : (
          <Button
            border="none"
            color={Color.white}
            bgColor={Color.black2}
            width="80px"
            height="45px"
            fontSize="17px"
            fontWeight="bold"
            _onClick={editPost}
          >
            수정
          </Button>
        )}
      </Grid>
      <Grid borderBottom={`1px solid ${Color.lightGray4}`}>
        <Input
          placeholder="제목을 입력하세요"
          _onChange={(e) => setPost({ ...post, postTitle: e.target.value })}
          border="none"
          value={post.postTitle}
        ></Input>
      </Grid>
      <Input
        multiLine
        placeholder="내용을 입력하세요"
        _onChange={(e) => setPost({ ...post, postContent: e.target.value })}
        border="none"
        value={post.postContent}
      ></Input>
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
`;

export default TalkWrite;
