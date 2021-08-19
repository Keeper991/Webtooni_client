import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input, Text, Image } from "../elements";
import { actionCreators as talkCommentActions } from "../redux/modules/talkComment";
import { Color } from "../shared/common";
import { Permit, PermitStrict } from "../shared/PermitAuth";
import profileImgList from "../images/profiles";

const TalkComment = (props) => {
  const dispatch = useDispatch();
  const loading_talkComment = useSelector(
    (store) => store.talkComment.is_loading
  );
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
    if (loading_talkComment) {
      return;
    }
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
    if (loading_talkComment) {
      return;
    }
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

  //오늘 날짜
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = year + "-" + month + "-" + day;

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
              src={profileImgList[comment_info.userImg]}
            ></Image>
            <Input
              width="95%"
              margin="0 0 0 9px"
              padding="0"
              placeholder="내용을 입력해 주세요"
              border="none"
              color={Color.gray800}
              fontSize="14px"
              fontWeight={400}
              _onChange={writeComment}
              value={comment}
            ></Input>
            <Text
              width="26px"
              type="p"
              fontWeight="bold"
              _onClick={editComment}
            >
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
              src={profileImgList[comment_info.userImg]}
            ></Image>
            <Grid padding="0 0 0 7px" width="100%">
              <Grid display="flex" justify="space-between" padding="0 0 8px 0">
                <Text color={Color.gray800} type="num" fontSize="12px">
                  {comment_info.userName}
                </Text>
                <Text type="num" fontSize="12px" color={Color.gray400}>
                  {/* 작성일 오늘인지에 따라 날짜만/시간만 표기 */}
                  {today === comment_info.createDate.substr(0, 10)
                    ? comment_info.createDate.substr(11, 5)
                    : comment_info.createDate.substr(5, 5)}
                </Text>
              </Grid>
              <Text color={Color.gray800}>{comment_info.commentContent}</Text>
            </Grid>
          </Grid>
          <PermitStrict authorName={comment_info.userName}>
            <Grid display="flex" justify="flex-end">
              <Text
                color={Color.gray600}
                margin="0 24px 0 0"
                _onClick={() => {
                  isEdit(true);
                }}
                cursor
              >
                수정
              </Text>
              <Text color={Color.gray600} _onClick={deleteComment} cursor>
                삭제
              </Text>
            </Grid>
          </PermitStrict>
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
