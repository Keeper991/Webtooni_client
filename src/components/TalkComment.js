import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input, Text, Image } from "../elements";
import { actionCreators as talkCommentActions } from "../redux/modules/talkComment";
import { Color } from "../shared/common";

const TalkComment = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((store) => store.user.is_login);
  const userName = useSelector((store) => store.user.user?.userName);

  const { comment_info, post_id } = props;
  //댓글 수정 여부
  const [edit, isEdit] = React.useState(false);
  //댓글 수정 작성
  const [comment, setComment] = React.useState(comment_info.commentContent);
  const writeComment = (e) => {
    setComment(e.target.value);
  };

  //댓글 수정하기
  const editComment = () => {
    dispatch(
      talkCommentActions.editCommentServer(
        post_id,
        comment_info.commentId,
        comment_info.commentContent
      )
    );
  };
  //댓글 삭제하기
  const deleteComment = () => {
    if (window.confirm("정말 삭제하시려고요?")) {
      dispatch(
        talkCommentActions.deleteCommentServer(post_id, comment_info.commentId)
      );
    } else return;
  };

  return (
    <Grid
      display="flex"
      justify="space-between"
      flexDir="column"
      bgColor={Color.white}
      width="90%"
    >
      {edit ? (
        <>
          {/* 댓글 수정 */}
          <Input
            placeholder="댓글을 작성해 주세요"
            _onChange={writeComment}
            value={comment}
          ></Input>
          <Button _onClick={editComment}>등록</Button>
        </>
      ) : (
        <>
          {/* 기존 댓글 */}
          <Grid display="flex">
            <Image size="35px" shape="circle"></Image>
            <Grid padding="0 0 0 5px">
              <Text type="p">{comment_info.userName}</Text>
              <Text type="p">등급{props.userGrade}</Text>
            </Grid>
          </Grid>
          <Text padding="0 0 0 20px">{comment_info.commentContent}</Text>
          {userName === comment_info.userName && (
            <Grid display="flex">
              <Button _onClick={() => isEdit(true)}>수정</Button>
              <Button _onClick={deleteComment}>삭제</Button>
            </Grid>
          )}
        </>
      )}
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
  background-color: ${(props) => props.bgColor || ""};
`;
export default TalkComment;
