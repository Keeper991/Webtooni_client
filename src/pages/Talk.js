import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Text, Image, Button, Input } from "../elements";
import { actionCreators as talkActions } from "../redux/modules/talk";

const Talk = (props) => {
  const dispatch = useDispatch();
  //talk list 불러오기
  useEffect((props) => {
    dispatch(talkActions.getTalkAllServer());
  }, []);
  const talk_list = useSelector((store) => store.talk.talk_list);

  //로그인 여부 알기
  const is_login = useSelector((store) => store.user.is_login);

  return (
    <Grid padding="20px" margin="20px" bgColor="#f1f1f1">
      {is_login && (
        <Button _onClick={() => props.history.push("/talk/write")}>
          글쓰기
        </Button>
      )}
      {/* 톡 리스트 */}
      {talk_list.map((talk, idx) => (
        <Grid padding="20px" margin="20px" bgColor="#fff" key={idx}>
          <Grid display="flex" justify="space-between">
            <Text type="p">{talk.postTitle}</Text>
            <Text type="p">{talk.userName}</Text>
          </Grid>
          <Grid display="flex" justify="center">
            <Grid display="flex">
              <Image
                width="20px"
                height="20px"
                src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
              ></Image>
              <Text type="p">좋아요 수</Text>
            </Grid>
            <Grid display="flex">
              <Image
                width="20px"
                height="20px"
                src="https://cdn.pixabay.com/photo/2013/07/12/17/39/star-152151_960_720.png"
              ></Image>
              <Text type="p">댓글 수</Text>
            </Grid>
          </Grid>
        </Grid>
      ))}
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

export default Talk;
