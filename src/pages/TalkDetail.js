import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input, Text, Image } from "../elements";
import { actionCreators as talkActions } from "../redux/modules/talk";
import { actionCreators as talkCommentActions } from "../redux/modules/talkComment";
import { TalkComment } from "../components";
import { Color } from "../shared/common";

const TalkDetail = (props) => {
  //톡 포스트 가져오기
  const post_id = props.match.params.id;
  console.log(post_id, "postid");
  const post_list = useSelector((store) => store.talk.post_list);
  console.log(post_list, "postlist");
  const post = post_list.filter((p) => p.postId === post_id)[0];
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
    if (post?.commentCount !== 0 && !comment_list)
      dispatch(talkCommentActions.getCommentAllServer(post_id));
  }, []);

  const is_login = useSelector((store) => store.user.is_login); //로그인 여부
  const userName = useSelector((store) => store.user.user?.userName); //로그인 유저 정보
  console.log(userName, "userName");

  //포스트 삭제하기
  const deletePost = () => {
    if (window.confirm("정말 삭제하시려고요?")) {
      dispatch(talkActions.deletePostServer(post_id));
    } else return;
  };

  //좋아요 토글
  const toggleLike = () => {
    if (is_login) {
      talkActions.likePostServer(post_id);
    } else {
      alert("로그인하세요~");
    }
  };

  //댓글 입력하기
  const [comment, setComment] = React.useState("");
  const writeComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      {post && (
        <Grid>
          <Grid
            display="flex"
            justify="center"
            flexDir="column"
            align="center"
            width="90%"
            padding="20px"
            margin="20px"
            bgColor={Color.lightGray}
          >
            {/* 게시글 내용 */}
            <Grid
              display="flex"
              justify="space-between"
              bgColor={Color.white}
              margin="10px 0"
              width="100%"
            >
              <Text type="p">{post.postTitle}</Text>
              <Text type="p">{post.userName}</Text>
            </Grid>
            <Grid bgColor={Color.white} margin="10px 0" width="100%">
              <Text type="p">{post.postContent}</Text>
            </Grid>
            {/* 유저가 게시글 작성자라면 수정/삭제 */}
            {userName === post.userName && (
              <Grid display="flex">
                <Button
                  _onClick={() => {
                    props.history.push(`/talk/write/${post_id}`);
                  }}
                >
                  수정
                </Button>
                <Button _onClick={deletePost}>삭제</Button>
              </Grid>
            )}

            {/* 클릭 시 좋아요 토글. 이미지도 구분해 넣기 */}
            <Grid
              display="flex"
              bgColor={Color.white}
              margin="10px 0"
              width="100%"
              onClick={toggleLike}
            >
              {post.isLike ? (
                <Image
                  width="20px"
                  height="20px"
                  src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
                ></Image>
              ) : (
                <Image
                  width="20px"
                  height="20px"
                  src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
                ></Image>
              )}

              <Text type="p">{post.likeCount}좋아요 수</Text>
            </Grid>
          </Grid>

          {/* 댓글 */}
          <Grid
            display="flex"
            justify="center"
            flexDir="column"
            align="center"
            width="90%"
            padding="20px"
            margin="20px"
            bgColor={Color.lightGray}
          >
            {/* 댓글 작성 */}
            <Grid
              display="flex"
              justify="center"
              flexDir="column"
              align="center"
              width="90%"
            >
              <Input
                placeholder="댓글을 작성해 주세요"
                _onChange={writeComment}
                value={comment}
              ></Input>
              <Button
                _onClick={() => {
                  dispatch(
                    talkCommentActions.addCommentServer(
                      post_id,
                      comment,
                      post.commentCount
                    )
                  );
                }}
              >
                등록
              </Button>
            </Grid>
            {/* 댓글 목록 */}
            {comment_list.map((_, idx) => (
              <TalkComment
                key={idx}
                comment_info={_}
                commentCount={post.commentCount}
              ></TalkComment>
            ))}
          </Grid>
        </Grid>
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
  background-color: ${(props) => props.bgColor || ""};
`;
export default TalkDetail;
