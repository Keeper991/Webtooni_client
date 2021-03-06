import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Input, Text, Image } from "../elements";
import { actionCreators as talkActions } from "../redux/modules/talk";
import { actionCreators as talkCommentActions } from "../redux/modules/talkComment";
import { actionCreators as modalActions } from "../redux/modules/modal";
import { TalkComment } from "../components";
import { Color } from "../shared/common";
import { EmptyHeart, FillHeart, Comment, Delete } from "../images/icons";
import { PermitStrict } from "../shared/PermitAuth";
import profileImgList from "../images/profiles";

const TalkDetail = (props) => {
  //selectors
  const is_login = useSelector((store) => store.user.is_login);
  const userImg = useSelector((store) => store.user.info.userImg);
  const loading_talk = useSelector((store) => store.talk.is_loading);
  const loading_talkComment = useSelector(
    (store) => store.talkComment.is_loading
  );

  //포스트 조회
  const post_list = useSelector((store) => store.talk.post_list);
  const post_id = props.match.params.id;
  const post = post_list.filter((p) => {
    return String(p.postId) === post_id;
  })[0];

  //댓글 조회
  const comment_all = useSelector((store) => store.talkComment.list);
  const comment_list = comment_all.filter(
    (item) => item.postId === parseInt(post_id)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    //서버에 포스트 요청
    if (!post || post?.is_main === true) {
      dispatch(talkActions.getPostOneServer(post_id));
    }
    //서버에 댓글 요청
    if (post?.talkCommentCount !== 0 && comment_list.length === 0) {
      dispatch(talkCommentActions.getCommentAllServer(parseInt(post_id)));
    }
  }, []);

  //포스트 삭제
  const [dltMsg, isDltMsg] = React.useState(false);
  const deletePost = () => {
    if (!is_login) {
      dispatch(modalActions.activeModal("needLogin"));
    } else if (loading_talk) {
      return;
    } else {
      dispatch(talkActions.deletePostServer(parseInt(post_id)));
      return;
    }
  };

  //좋아요 토글
  const toggleLike = () => {
    if (!is_login) {
      dispatch(modalActions.activeModal("needLogin"));
    } else if (loading_talk) {
      return;
    } else {
      dispatch(talkActions.likePostServer(post_id));
    }
  };

  //댓글 자동높이조절
  const [comment, setComment] = React.useState("");
  const commentRef = React.useRef();
  const writeComment = React.useCallback((e) => {
    setComment(e.target.value);
    commentRef.current.style.height = "24px";
    commentRef.current.style.height = commentRef.current.scrollHeight + "px";
  }, []);

  //댓글 등록
  const uploadCmt = () => {
    if (!is_login) {
      dispatch(modalActions.activeModal("needLogin"));
      return;
    }
    if (!comment) {
      dispatch(modalActions.activeModal("emptyContent"));
      return;
    }
    if (loading_talkComment) {
      return;
    }
    if (is_login) {
      dispatch(
        talkCommentActions.addCommentServer(
          parseInt(post_id),
          comment,
          post.talkCommentCount
        )
      );
      setComment("");
      commentRef.current.style.height = "24px";
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
      {post && (
        <>
          <Grid
            margin="-60px 0 0 0"
            bgColor={Color.gray100}
            position="relative"
            borderTop={`8px solid ${Color.gray100}`}
          >
            {/* 게시글 내용 */}
            <Grid
              bgColor={Color.white}
              width="100%"
              height="auto"
              borderBottom={`8px solid ${Color.gray100}`}
            >
              <Grid borderBottom={`1px solid ${Color.gray200}`} padding="20px">
                <Text
                  whiteSpace="pre-wrap"
                  wordBreak="break-all"
                  lineHeight="24px"
                  type="h2"
                  color={Color.gray800}
                >
                  {post.postTitle}
                </Text>
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
                      {/* 작성일/시간 표기 */}
                      {today === post.createDate.substr(0, 10)
                        ? post.createDate.substr(11, 5)
                        : post.createDate.substr(5, 5)}
                    </Text>
                    <Text
                      color={Color.gray400}
                      type="num"
                      fontSize="12px"
                      whiteSpace="nowrap"
                      padding="0 12px 0 0"
                    >
                      좋아요&nbsp;{post.likeNum}
                    </Text>
                  </Grid>

                  {/* 클릭 시 좋아요 토글 */}
                  <Grid
                    display="flex"
                    align="center"
                    bgColor={Color.white}
                    onClick={toggleLike}
                    cursor="true"
                  >
                    {post.ilike && is_login ? <FillHeart /> : <EmptyHeart />}{" "}
                    <Text
                      type="num"
                      fontSize="12px"
                      color={Color.gray800}
                      whiteSpace="nowrap"
                      padding="0 0 0 6px"
                    >
                      {post.likeNum}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
              <Grid bgColor={Color.white} padding="28px 20px 24px" width="100%">
                <Text
                  whiteSpace="pre-wrap"
                  wordBreak="break-all"
                  lineHeight="24px"
                  color={Color.gray800}
                  type="h2"
                  padding="0 32px 55px 0"
                >
                  {post.postContent}
                </Text>
                <Grid
                  padding="20px 0 0 0"
                  display="flex"
                  justify="space-between"
                >
                  <Grid display="flex">
                    <Comment width="16px" height="16px" />
                    <Text
                      fontSize="12px"
                      color={Color.gray700}
                      whiteSpace="nowrap"
                      margin="0 0 0 4px"
                    >
                      댓글&nbsp;{post.talkCommentCount}개
                    </Text>
                  </Grid>

                  <PermitStrict authorName={post.userName}>
                    <Grid>
                      <Grid display="flex">
                        <Text
                          color={Color.gray600}
                          margin="0 20px 0 0"
                          _onClick={() => {
                            props.history.push(`/talk/write/${post_id}`);
                          }}
                          cursor="true"
                          type="caption"
                        >
                          수정
                        </Text>
                        <Text
                          color={Color.gray600}
                          type="caption"
                          _onClick={() =>
                            dispatch(
                              modalActions.activeModal(
                                "deletePost",
                                parseInt(post_id)
                              )
                            )
                          }
                          cursor="true"
                        >
                          삭제
                        </Text>
                      </Grid>
                    </Grid>
                  </PermitStrict>
                </Grid>
              </Grid>
            </Grid>

            {/* 댓글 */}
            <Grid
              bgColor={Color.white}
              width="100%"
              padding="0 0 56px 0"
              position="relative"
            >
              {/* 댓글 목록 */}
              {comment_list
                .sort(function (a, b) {
                  return a.createDate > b.createDate ? 1 : -1;
                })
                .map((_, idx) => (
                  <TalkComment
                    key={idx}
                    comment_info={_}
                    commentCount={post.talkCommentCount}
                  ></TalkComment>
                ))}

              {/* 댓글 작성 */}
              <Grid
                cmtInpt
                display="flex"
                justify="flex-start"
                align="flex-start"
                width="100vw"
                padding="13px 16px"
                borderTop={`1px solid ${Color.gray200}`}
                borderBottom={`1px solid ${Color.gray200}`}
                position="fixed"
                bottom="0px"
                left="0px"
                zIndex="2"
                bgColor={Color.white}
              >
                <Grid flex="0 0 28px" display="flex">
                  <Image
                    size="28px"
                    shape="circle"
                    src={is_login ? profileImgList[userImg] : profileImgList[0]}
                  ></Image>
                </Grid>
                <Input
                  multiLine
                  taRef={commentRef}
                  width="96%"
                  margin="-6px 0 0 9px"
                  padding="0 8px 0 0"
                  height="24px"
                  placeholder="내용을 입력해 주세요"
                  border="none"
                  color={Color.gray800}
                  fontSize="14px"
                  fontWeight={400}
                  _onChange={writeComment}
                  value={comment}
                ></Input>
                <Text
                  margin="7px 0 0 0"
                  fontWeight="medium"
                  _onClick={uploadCmt}
                >
                  작성
                </Text>
              </Grid>
            </Grid>
          </Grid>
          {/* 삭제메세지 띄우기 */}
          {dltMsg && (
            <Grid
              position="fixed"
              top="0"
              left="0"
              width="100vw"
              height="100vh"
              bgColor="rgba(0, 0, 0, 0.5);"
              zIndex="101"
            >
              <Grid
                position="relative"
                top="35%"
                width="260px"
                height="161px"
                borderRadius="8px"
                bgColor={Color.white}
                margin="0 auto"
              >
                <Grid zIndex="2" position="absolute" top="-28px" left="104px">
                  <Delete />
                </Grid>
                <Text
                  type="h2"
                  width="100%"
                  height="117px"
                  textAlign="center"
                  lineHeight="117px"
                >
                  정말 삭제하시겠습니까?
                </Text>
                <Grid
                  width="100%"
                  display="flex"
                  align="center"
                  justify="center"
                  borderTop={`1px solid ${Color.lightGray4}`}
                >
                  <Text
                    textAlign="center"
                    width="50%"
                    padding="0 50px"
                    lineHeight="44px"
                    _onClick={() => isDltMsg(false)}
                  >
                    취소
                  </Text>
                  <Text
                    textAlign="center"
                    width="50%"
                    padding="0 50px"
                    lineHeight="44px"
                    _onClick={deletePost}
                    color={Color.primary}
                  >
                    삭제
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

const Grid = styled.div`
  max-width: 700px;
  ${(props) =>
    props.cmtInpt
      ? `
  margin:  0 auto;
    left:  0;
    right: 0;
    border-left: 1px solid ${Color.gray100};
    border-right: 1px solid ${Color.gray100};
    `
      : ""};

  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  display: ${(props) => (props.display ? props.display : "")};
  justify-content: ${(props) => (props.justify ? props.justify : "")};
  align-items: ${(props) => (props.align ? props.align : "")};
  flex-direction: ${(props) => (props.flexDir ? props.flexDir : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  padding: ${(props) => (props.padding ? props.padding : "")};
  position: ${(props) => props.position || ""};
  z-index: ${(props) => props.zIndex || ""};
  top: ${(props) => props.top || ""};
  bottom: ${(props) => props.bottom || ""};
  left: ${(props) => props.left || ""};
  background-color: ${(props) => props.bgColor || ""};
  border-bottom: ${(props) => props.borderBottom || ""};
  border-top: ${(props) => props.borderTop || ""};
  border-radius: ${(props) => props.borderRadius || ""};

  & > label > textarea {
    height: 24px;
    max-height: 58px;
  }
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
`;

export default TalkDetail;
