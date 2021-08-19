import React from "react";
import { ReviewCard } from "../components";
import { Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as reviewAction } from "../redux/modules/review";
import styled from "styled-components";
import { ReactComponent as WriteButton } from "../images/WriteButton.svg";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";
import InfinityScroll from "../shared/InfinityScroll";

const Review = () => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

  const is_loading_review = useSelector(
    (state) => state.review.is_loading_review
  );

  let review_list = useSelector((state) => state.review.review_list);
  review_list = [...review_list];
  review_list.sort((a, b) => b.createDate - a.createDate);

  const like_list = useSelector((state) => state.user.reviewLikeList);

  const page_num = useSelector((state) => state.review.page_num);

  const is_last = useSelector((state) => state.review.is_last);

  React.useEffect(() => {
    if (page_num === 1) {
      dispatch(reviewAction.getReviewList(page_num));
    }
  }, []);

  return (
    <React.Fragment>
      <FlexGrid>
        <Text type="h2" fontWeight="bold" color={Color.gray800}>
          리뷰 목록
        </Text>
      </FlexGrid>
      <FlexGrid>
        <Text type="caption" color={Color.gray800}>
          전체
        </Text>
      </FlexGrid>

      <Container>
        <InfinityScroll
          loading={is_loading_review}
          callNext={() => {
            dispatch(reviewAction.getReviewList(page_num));
          }}
          is_next={is_last ? false : true}
        >
          {review_list?.map((_, idx) => {
            return (
              <ReviewCard key={idx} {..._} like_list={like_list}></ReviewCard>
            );
          })}
        </InfinityScroll>
      </Container>
      {is_login && (
        <WriteBtn>
          <WriteButton
            onClick={() => {
              history.push("/review/search");
            }}
          ></WriteButton>
        </WriteBtn>
      )}
    </React.Fragment>
  );
};

const FlexGrid = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 16px;
`;

const WriteBtn = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;
export default Review;
