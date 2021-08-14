import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input, Text, Image } from "../elements";
import { actionCreators as talkCommentActions } from "../redux/modules/talkComment";
import { Color } from "../shared/common";

const TalkComment = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((store) => store.user.is_login);
  const userName = useSelector((store) => store.user.info?.userName);

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
    console.log(comment_info.commentId, comment, "editcomment확인..");
    dispatch(
      talkCommentActions.editCommentServer(
        parseInt(comment_info.commentId),
        comment
      )
    );
    isEdit(false);
  };
  //댓글 삭제하기
  const deleteComment = () => {
    if (window.confirm("정말 삭제하시려고요?")) {
      dispatch(
        talkCommentActions.deleteCommentServer(
          parseInt(comment_info.postId),
          comment_info.commentId,
          commentCount
        )
      );
    } else return;
  };

  return (
    <Grid
      margin="0 20px"
      bgColor={Color.white}
      borderBottom={`1px solid ${Color.gray100}`}
      padding="20px 0"
    >
      {edit ? (
        <>
          {/* 댓글 수정 */}

          <Grid
            display="flex"
            justify="flex-start"
            align="center"
            width="100%"
            height="56px"
            padding="20px"
            borderTop={`1px solid ${Color.gray200}`}
            borderBottom={`1px solid ${Color.gray200}`}
          >
            <Image
              size="28px"
              shape="circle"
              // src={userImg}
            ></Image>
            <Input
              width="95%"
              margin="0 0 0 9px"
              padding="0"
              placeholder="내용을 입력해 주세요"
              border="none"
              // color={Color.lightGray5}
              placeHolderGray
              _onChange={writeComment}
              value={comment}
            ></Input>
            <Text width="26px" fontWeight="medium" _onClick={editComment}>
              작성
            </Text>
          </Grid>
        </>
      ) : (
        <>
          {/* 기존 댓글 */}
          <Grid display="flex">
            <Image
              size="40px"
              shape="circle"
              src={comment_info.userImg}
            ></Image>
            <Grid padding="0 0 0 7px" width="100%">
              <Grid display="flex" justify="space-between" padding="0 0 8px 0">
                <Text type="caption">{comment_info.userName}</Text>
                <Text type="caption" color={Color.gray400}>
                  {comment_info.createDate.substr(5, 5)}
                </Text>
              </Grid>
              <Text tag="p">{comment_info.commentContent}</Text>
            </Grid>
          </Grid>
          {userName === comment_info.userName && (
            <Grid display="flex" justify="flex-end">
              <Text
                type="p"
                margin="0 24px 0 0"
                _onClick={() => {
                  isEdit(true);
                }}
                cursor
              >
                수정
              </Text>
              <Text type="p" _onClick={deleteComment} cursor>
                삭제
              </Text>
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
