import React from "react";
import { ReviewCard } from "../components";
import { Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as reviewAction } from "../redux/modules/review";
import styled from "styled-components";
import { Color } from "../shared/common";

const Review = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (review_list.length === 0) {
      dispatch(reviewAction.getReviewList());
    }
  }, []);

  const review_list = useSelector((state) => state.review.review_list);

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
        {review_list?.map((_, idx) => {
          return <ReviewCard key={idx} {..._}></ReviewCard>;
        })}
      </Container>
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
  padding: 16px;
`;
export default Review;
