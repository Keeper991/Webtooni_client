import React from "react";
import { ReviewCard } from "../components";
import { Text, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as reviewAction } from "../redux/modules/review";
import styled from "styled-components";
import { WriteButton } from "../images/icons";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";
import InfinityScroll from "../shared/InfinityScroll";

const Review = () => {
  const dispatch = useDispatch();

  const [is_best, setIsBest] = React.useState(false);

  const is_login = useSelector((state) => state.user.is_login);

  const is_loading_review = useSelector(
    (state) => state.review.is_loading_review
  );

  const review_list = useSelector((state) => state.review.review_list);

  let new_review_list = [...review_list];
  new_review_list.sort((a, b) => b.createDate - a.createDate);

  let best_review_list = [...review_list];
  best_review_list.sort((a, b) => b.likeCount - a.likeCount);

  const like_list = useSelector((state) => state.user.reviewLikeList);

  const new_page_num = useSelector((state) => state.review.new_page_num);
  const best_page_num = useSelector((state) => state.review.best_page_num);

  const is_last = useSelector((state) => state.review.is_last);

  React.useEffect(() => {
    dispatch(reviewAction.getReviewList(new_page_num));
    dispatch(reviewAction.getReviewListOrderByLike(best_page_num));
  }, []);

  return (
    <React.Fragment>
      <FlexGrid>
        <Text type="h2" fontWeight="bold" color={Color.gray800}>
          리뷰 목록
        </Text>
        <TabGrid>
          <Button
            _onClick={() => {
              setIsBest(false);
              dispatch(reviewAction.isLast(false));
            }}
            bgColor={Color.white}
            width="50px"
            height="30px"
            border="none"
            fontWeight="bold"
            fontSize="13px"
            padding="0"
            color={!is_best ? Color.primary : Color.gray400}
          >
            최신순
          </Button>
          <Button
            _onClick={() => {
              setIsBest(true);
              dispatch(reviewAction.isLast(false));
            }}
            bgColor={Color.white}
            width="50px"
            height="30px"
            border="none"
            fontWeight="bold"
            fontSize="13px"
            padding="0"
            color={is_best ? Color.primary : Color.gray400}
          >
            좋아요순
          </Button>
        </TabGrid>
      </FlexGrid>

      <Container>
        {is_best && (
          <InfinityScroll
            loading={is_loading_review}
            callNext={() => {
              dispatch(reviewAction.getReviewListOrderByLike(best_page_num));
            }}
            is_next={is_last ? false : true}
          >
            {best_review_list?.map((_, idx) => {
              return (
                <ReviewCard key={idx} {..._} like_list={like_list}></ReviewCard>
              );
            })}
          </InfinityScroll>
        )}

        {!is_best && (
          <InfinityScroll
            loading={is_loading_review}
            callNext={() => {
              dispatch(reviewAction.getReviewList(new_page_num));
            }}
            is_next={is_last ? false : true}
          >
            {new_review_list?.map((_, idx) => {
              return (
                <ReviewCard key={idx} {..._} like_list={like_list}></ReviewCard>
              );
            })}
          </InfinityScroll>
        )}
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
  display: flex;
  width: 100%;
  height: 72px;
  margin-top: -4px;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
  border-top: 8px solid ${Color.gray100};
  border-bottom: 8px solid ${Color.gray100};
`;

const TabGrid = styled.div`
  display: flex;
  width: 100%;
  height: 42px;
  margin: 10px 0;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

const WriteBtn = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;
export default Review;
