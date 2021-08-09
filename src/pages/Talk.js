import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Text, Image, Button, Input, WriteButton } from "../elements";
import { actionCreators as talkActions } from "../redux/modules/talk";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";

const Talk = (props) => {
  const dispatch = useDispatch();
  //톡 리스트 불러오기
  useEffect(() => {
    dispatch(talkActions.getPostAllServer());
  }, []);
  const post_list = useSelector((store) => store.talk.post_list);

  //로그인 여부 알기
  // const is_login = useSelector((store) => store.user.is_login);
  const is_login = true; //나중에 지우기

  return (
    <Grid bgColor={Color.lightGray6}>
      {/* 포스트 작성 버튼 */}
      {is_login && (
        <Grid
          position="fixed"
          bottom="50px"
          right="20px"
          cursor
          onClick={() => history.push("/talk/write")}
        >
          <WriteButton />
        </Grid>
      )}
      {/* 포스트 리스트 */}
      <Grid bgColor={Color.white} padding="20px">
        {post_list.map((post, idx) => (
          <Grid
            borderBottom={`1px solid ${Color.lightGray4}`}
            padding="20px 0 10px"
            cursor
            onClick={() => history.push(`/talk/detail/${post.postId}`)}
          >
            <Text type="p">{post.postTitle}</Text>
            <Grid display="flex" justify="space-between" align="center">
              <Grid display="flex">
                <Text color={Color.lightGray5} type="p" whiteSpace="nowrap">
                  {post.userName}
                </Text>
                <Text color={Color.lightGray5} type="p" whiteSpace="nowrap">
                  작성시간{post.createDate}
                </Text>
              </Grid>

              <Grid
                display="flex"
                align="center"
                bgColor={Color.white}
                margin="10px 0"
              >
                <Image
                  width="20px"
                  height="20px"
                  src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
                ></Image>
                <Text type="p" whiteSpace="nowrap">
                  댓글{post.commentCount}
                </Text>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
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
  bottom: ${(props) => props.bottom || ""};
  right: ${(props) => props.right || ""};
  background-color: ${(props) => props.bgColor || ""};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
  border-bottom: ${(props) => props.borderBottom || ""};
`;

export default Talk;
