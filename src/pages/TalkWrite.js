import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Text, Image, Button, Input } from "../elements";
import { actionCreators as talkActions } from "../redux/modules/talk";

const TalkWrite = (props) => {
  const dispatch = useDispatch();

  //로그인 안 했으면 메인으로 이동
  const is_login = useSelector((store) => store.user.is_login);
  if (!is_login) {
    alert("로그인 후 이용하세요~");
    props.history.replace("/talk");
  }

  //톡 포스트 수정 시 기존 포스트 가져오기
  const post_id = props.match.params.id;
  console.log(post_id, "postid");
  const post_list = useSelector((store) => store.talk.talk_list);
  const prevPost = post_list.filter((p) => p.postId === post_id)[0];
  console.log(prevPost, "prevPost");
  //유저가 포스트 작성자가 아닐 때 메인으로 이동
  const userName = useSelector((store) => store.user.user?.userName); //로그인 유저 정보
  console.log(userName, "userName");
  if (userName && userName !== prevPost.userName) {
    alert("다른 사람의 글이에요");
    props.history.replace("/talk");
  }
  //기존 포스트 상세 정보가 없으면 서버에 요청
  if (!prevPost?.postContent) {
    dispatch(talkActions.getTalkOneServer(post_id));
  }

  //톡 포스트 작성하기
  const [post, setPost] = React.useState({
    postTitle: prevPost?.postTitle,
    postContent: prevPost?.postContent,
  });
  //포스트 등록
  const addPost = () => {
    if (!post.postTitle || !post.postContent) {
      alert("빠진 항목이 있어요");
      return;
    }
    // if (is_login) {
    dispatch(talkActions.addTalkServer(post.postTitle, post.postContent));
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
      talkActions.editTalkServer(
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
        justify="center"
        flexDir="column"
        align="center"
        width="90%"
      >
        <Input
          placeholder="제목을 입력하세요"
          _onChange={(e) => setPost({ ...post, postTitle: e.target.value })}
          value={post.postTitle}
        >
          제목
        </Input>
        <Input
          multiLine
          placeholder="내용을 입력하세요"
          _onChange={(e) => setPost({ ...post, postContent: e.target.value })}
          value={post.postContent}
        >
          내용
        </Input>
        {!prevPost ? (
          <Button _onClick={addPost}>등록</Button>
        ) : (
          <Button _onClick={editPost}>수정</Button>
        )}
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
`;

export default TalkWrite;
