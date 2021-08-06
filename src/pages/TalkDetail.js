import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input, Text, Image } from "../elements";
import { actionCreators as talkActions } from "../redux/modules/talk";
import { Color } from "../shared/common";

const TalkDetail = (props) => {
  //톡 포스트 가져오기
  const post_id = props.match.params.id;
  console.log(post_id, "postid");
  const post_list = useSelector((store) => store.talk.post_list);
  console.log(post_list, "postlist");
  const post = post_list.filter((p) => p.postId === post_id)[0];
  //서버에 포스트 요청(포스트가 없거나 있어도 포스트 콘텐트가 없을 때)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!post?.postContent || !post) {
      dispatch(talkActions.getPostOneServer(post_id));
      return;
    }
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

            {/* 클릭 시 좋아요 토글. 로그인한 유저의 좋아요 여부 알아야함 -> 그 때 토글을 위한 이미지도 구분해 넣기 */}
            <Grid
              display="flex"
              bgColor={Color.white}
              margin="10px 0"
              width="100%"
              onClick={toggleLike}
            >
              <Image
                width="20px"
                height="20px"
                src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
              ></Image>
              <Text type="p">좋아요 수</Text>
            </Grid>
          </Grid>

          {/* 댓글 목록 */}
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
            <Grid
              display="flex"
              justify="space-between"
              flexDir="column"
              bgColor={Color.white}
              width="90%"
            >
              <Grid display="flex">
                <Image size="35px" shape="circle"></Image>
                <Grid padding="0 0 0 5px">
                  <Text type="p">유저네임{props.userName}</Text>
                  <Text type="p">등급{props.userGrade}</Text>
                </Grid>
              </Grid>
              <Text padding="0 0 0 20px">댓글 내용{props.reviewContent}</Text>
            </Grid>
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
