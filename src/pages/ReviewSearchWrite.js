import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Button, Input, Text } from "../elements";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";

const ReviewSearchWrite = (props) => {
  const dispatch = useDispatch();

  const review_id = props.match.params.id;
  console.log(review_id);

  const is_login = useSelector((state) => state.user.is_login);

  const [review, setReview] = React.useState("");
  const writeReview = (e) => {
    setReview(e.target.value);
  };
  const uploadReview = () => {
    dispatch(webtoonActions.uploadReviewServer(review_id, review));
  };

  console.log(review);
  return (
    <React.Fragment>
      <FlexGrid>
        <LeftOutlined
          onClick={() => {
            history.goBack();
          }}
        ></LeftOutlined>
        <Button width="66px" height="32px" radius="4px" _onClick={uploadReview}>
          작성
        </Button>
      </FlexGrid>

      <Container>
        <Button
          shape="pill"
          width="120px"
          height="30px"
          bgColor="transparent"
          // color={Color.}
        >
          킬러방
        </Button>
        <Text>⭐⭐⭐⭐⭐</Text>
        <Input
          multiLine
          width="100%"
          height="500px"
          _onChange={writeReview}
          value={review}
        ></Input>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  padding: 16px;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid ${Color.gray100};
`;

export default ReviewSearchWrite;
