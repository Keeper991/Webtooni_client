import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input } from "../elements";
import { DetailStar } from "../components";
import { actionCreators as webtoonActions } from "../redux/modules/talk";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
import { ReactComponent as BackButton } from "../images/BackButton.svg";

const ReviewWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((store) => store.user.is_login); //로그인 여부 판별

  //로그인 유저 네임
  const userName = useSelector((store) => store.user.info?.userName);
  console.log(userName, "userName");

  //별점 이력이 있으면 기존 별점 가져오기
  const webtoon_id = props.match.params.webtoon_id;
  const review_id = props.match.params.review_id;
  const detail_list = useSelector((store) => store.webtoon.detail_list);
  const toon = detail_list.filter((t) => t.toon_id === webtoon_id)[0];
  const prev_review = toon?.reviews.filter(
    (item) => item.userName === userName
  )[0];

  //리뷰 작성하기
  const [review, setReview] = React.useState("");

  //상황 별 분기
  useEffect(() => {
    //로그인 안 했으면 메인으로 이동
    if (!is_login) {
      alert("로그인 후 이용하세요~");
      history.go(-1);
      return;
    }
    //유저가 포스트 작성자가 아닐 때 메인으로 이동
    // if (userName && userName !== prev_review.userName) {
    //   alert("다른 사람의 리뷰예요");
    //   history.go(-1);
    //   return;
    // }
  }, []);

  //리뷰 등록
  const uploadReview = () => {
    if (!review) {
      alert("빠진 항목이 있어요");
      return;
    }
    if (is_login) {
      dispatch(webtoonActions.uploadReviewServer(review_id, review));
    } else {
      alert("로그인하세요~");
    }
  };

  return (
    <>
      <Grid
        display="flex"
        justify="space-between"
        align="flex-start"
        borderBottom={`1px solid ${Color.gray200}`}
        padding="20px"
      >
        {/* 뒤로가기 */}
        <Grid
          cursor
          onClick={() => {
            history.go(-1);
          }}
        >
          <BackButton></BackButton>
        </Grid>

        {/* 게시글 등록 */}
        <Button
          border="none"
          color={Color.white}
          bgColor={Color.gray900}
          width="80px"
          height="45px"
          fontSize="17px"
          fontWeight="bold"
          _onClick={uploadReview}
        >
          작성
        </Button>
      </Grid>

      <Grid borderBottom={`1px solid ${Color.gray200}`} padding="15px 20px">
        <DetailStar
          webtoon_id={webtoon_id}
          is_login={is_login}
          prev_review={prev_review}
        />
      </Grid>
      <Input
        padding="15px 20px"
        multiLine
        placeholder="내용을 입력하세요"
        _onChange={(e) => setReview(e.target.value)}
        border="none"
        height="400px"
        value={review}
      ></Input>
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
  border-bottom: ${(props) => props.borderBottom || ""};
  ${(props) => (props.cursor ? "cursor: pointer" : "")};
`;

export default ReviewWrite;
