import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Input, Text, Image } from "../elements";
import { actionCreators as talkActions } from "../redux/modules/talk";
import { actionCreators as talkCommentActions } from "../redux/modules/talkComment";
import { TalkComment } from "../components";
import { Color } from "../shared/common";
import { ReactComponent as EmptyHeart } from "../images/EmptyHeart.svg";
import { ReactComponent as FillHeart } from "../images/FillHeart.svg";
import { ReactComponent as Comment } from "../images/Comment.svg";
import { ReactComponent as Delete } from "../images/Delete.svg";

const TalkDetail = (props) => {
  //톡 포스트 가져오기
  const post_id = props.match.params.id;
  console.log(post_id, "postid");
  const post_list = useSelector((store) => store.talk.post_list);
  console.log(post_list, "postlist");
  const post = post_list.filter((p) => {
    return String(p.postId) === post_id;
  })[0];
  console.log(post, "post");

  //댓글 가져오기
  const comment_all = useSelector((store) => store.talkComment.list);
  console.log(comment_all, "commentall");
  const comment_list = comment_all.filter((item) => item.postId === post_id);
  console.log(comment_list, "comment_list");
  const dispatch = useDispatch();
  useEffect(() => {
    //서버에 포스트 요청
    if (!post) {
      dispatch(talkActions.getPostOneServer(post_id));
    }
    //서버에 댓글 요청(포스트의 댓글 수가 0이 아님에도 댓글리스트가 없을 때) //댓글 변수명 수정...
    // if (post?.talkCommentCount !== 0 && comment_list === []) {
    dispatch(talkCommentActions.getCommentAllServer(post_id));
    // }
  }, []);

  const is_login = useSelector((store) => store.user.is_login); //로그인 여부
  const userName = useSelector((store) => store.user.user?.userName); //로그인 유저 정보
  console.log(userName, "userName");

  //포스트 삭제하기
  const [dltMsg, isDltMsg] = React.useState(false); //삭제 메세지
  const deletePost = () => {
    dispatch(talkActions.deletePostServer(post_id));
    return;
  };

  //좋아요 토글
  const toggleLike = () => {
    if (is_login) {
      talkActions.likePostServer(post_id);
    } else {
      alert("로그인하세요~");
    }
  };

  //댓글
  const [cmtInp, isCmtInp] = React.useState(false); //댓글 입력창 보이기
  const [comment, setComment] = React.useState(""); //댓글 입력하기
  const writeComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      {post && (
        <>
          <Grid bgColor={Color.gray200} position="relative">
            {/* 게시글 내용 */}
            <Grid bgColor={Color.white} width="100%">
              <Grid
                borderBottom={`1px solid ${Color.gray200}`}
                padding="16px 20px"
              >
                <Text type="h2">{post.postTitle}</Text>
                <Grid
                  display="flex"
                  margin="7px 0 0 0"
                  justify="space-between"
                  align="center"
                >
                  <Grid display="flex">
                    <Text
                      color={Color.gray400}
                      type="caption"
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

                  {/* 클릭 시 좋아요 토글 */}
                  <Grid
                    display="flex"
                    align="center"
                    bgColor={Color.white}
                    onClick={toggleLike}
                    cursor
                  >
                    {post.isLike ? <FillHeart /> : <EmptyHeart />}{" "}
                    <Text type="p" whiteSpace="nowrap" padding="0 0 0 6px">
                      {post.likeNum}좋아요 수
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
              <Grid bgColor={Color.white} padding="28px 20px 24px" width="100%">
                <Text type="p" padding="0 32px 55px 0">
                  {post.postContent}
                </Text>
                <Grid display="flex" justify="space-between">
                  {/* 유저가 게시글 작성자라면 수정/삭제 */}
                  <Grid display="flex">
                    <Text
                      type="p"
                      margin="0 24px 0 0"
                      _onClick={() => {
                        props.history.push(`/talk/write/${post_id}`);
                      }}
                      cursor
                    >
                      수정
                    </Text>
                    <Text type="p" _onClick={() => isDltMsg(true)} cursor>
                      삭제
                    </Text>
                  </Grid>

                  <Grid display="flex" cursor>
                    <Comment width="16px" height="16px" />
                    <Text
                      type="p"
                      whiteSpace="nowrap"
                      margin="0 0 0 4px"
                      _onClick={() => isCmtInp(true)}
                    >
                      댓글 작성
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* 댓글 */}
            <Grid margin="10px 0" bgColor={Color.white} width="100%">
              {/* 댓글 작성 */}
              {cmtInp && (
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
                  <Text
                    width="26px"
                    fontWeight="medium"
                    _onClick={() => {
                      dispatch(
                        talkCommentActions.addCommentServer(
                          post_id,
                          comment,
                          post.talkCommentCount
                        )
                      );
                      isCmtInp(false);
                    }}
                  >
                    작성
                  </Text>
                </Grid>
              )}
              {/* 댓글 목록 */}
              {comment_list.map((_, idx) => (
                <TalkComment
                  key={idx}
                  comment_info={_}
                  commentCount={post.talkCommentCount}
                ></TalkComment>
              ))}
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
                top="296px"
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
                  justify="space-between"
                  align="center"
                  borderTop={`1px solid ${Color.lightGray4}`}
                >
                  <Text
                    textAlign="center"
                    width="50%"
                    lineHeight="44px"
                    _onClick={() => isDltMsg(false)}
                  >
                    취소
                  </Text>
                  <Text
                    textAlign="center"
                    width="50%"
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
  left: ${(props) => props.left || ""};
  background-color: ${(props) => props.bgColor || ""};
  border-bottom: ${(props) => props.borderBottom || ""};
  border-top: ${(props) => props.borderTop || ""};
  border-radius: ${(props) => props.borderRadius || ""};

  ${(props) => (props.cursor ? "cursor: pointer" : "")};
`;
export default TalkDetail;
