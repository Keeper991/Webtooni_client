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

  const { comment_info, commentCount } = props;
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
        comment_info.postId,
        comment_info.commentId,
        comment_info.commentContent
      )
    );
  };
  //댓글 삭제하기
  const deleteComment = () => {
    if (window.confirm("정말 삭제하시려고요?")) {
      dispatch(
        talkCommentActions.deleteCommentServer(
          comment_info.postId,
          comment_info.commentId,
          commentCount
        )
      );
    } else return;
  };

  return (
    <Grid
      margin="15px"
      bgColor={Color.white}
      borderBottom={`1px solid ${Color.lightGray4}`}
      padding="20px 0"
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
            <Image
              size="35px"
              shape="circle"
              src={comment_info.userImg}
            ></Image>
            <Grid padding="0 0 0 5px" width="100%">
              <Grid display="flex" justify="space-between">
                <Text type="p">{comment_info.userName}</Text>
                <Text type="p" color={Color.lightGray5}>
                  작성시간{comment_info.createDate}
                </Text>
              </Grid>
              <Text type="p">등급{comment_info.userGrade}</Text>
              <Text type="p">{comment_info.commentContent}</Text>
            </Grid>
          </Grid>
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
  border-bottom: ${(props) => props.borderBottom || ""};
`;
export default TalkComment;
