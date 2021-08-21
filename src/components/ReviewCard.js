import React from "react";
import styled from "styled-components";
import { Text, Image, Button } from "../elements";
import { Color } from "../shared/common";
import profileImgList from "../images/profiles";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilled } from "@ant-design/icons";
import { history } from "../redux/configureStore";
import { actionCreators as reviewActions } from "../redux/modules/review";
import time from "../shared/time";
import { kakao_webtoon_symbol, naver_webtoon_symbol } from "../images/symbols";
import Starts from "../images/icons/Stars.png";

const ReviewCard = (props) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = React.useState(false);

  const is_login = useSelector((state) => state.user.is_login);
  const toon_list = useSelector((state) => state.webtoon.toon_list);
  const toonInfo = toon_list.find((toon) => toon.toonId === props.toonId);

  React.useEffect(() => {
    setShowMore(false);
  }, []);

  const handleTextToggle = () => {
    if (showMore) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  };

  const handleLike = () => {
    if (is_login) {
      dispatch(
        reviewActions.likeReviewServer(
          props.reviewId,
          !props.like_list.includes(props.reviewId)
        )
      );
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  // 별점만 있는 리뷰면 보이지 않음.
  if (!props.reviewContent) {
    return <></>;
  }

  return (
    <React.Fragment>
      <Container main={props.main}>
        <PaddingBox>
          <FlexGrid>
            <FlexGrid>
              <Image
                src={profileImgList[props.userImg]}
                shape="circle"
                size="40px"
              ></Image>
              <ColumnGrid>
                <Text type="caption">{props.userName}</Text>
                <Text type="caption" color={Color.gray500}>
                  {time(props.createDate)}
                </Text>
              </ColumnGrid>
            </FlexGrid>
            <StarPoint
              stars={Starts}
              points={props.userPointNumber}
            ></StarPoint>
          </FlexGrid>

          <ReviewGrid>
            {showMore ? (
              <ReivewTextMore>{props.reviewContent}</ReivewTextMore>
            ) : (
              <ReivewText>{props.reviewContent}</ReivewText>
            )}
            {props.reviewContent.length >= 67 ? (
              <Button
                bgColor="transparent"
                color={Color.gray400}
                padding="0"
                margin="5px 0 0 4px"
                fontSize="12px"
                border="none"
                _onClick={handleTextToggle}
              >
                {showMore ? "줄이기" : "더보기"}
              </Button>
            ) : null}
          </ReviewGrid>

          {props.like_list?.indexOf(props.reviewId) === -1 ? (
            <FlexGrid flexStart>
              <HeartFilled
                onClick={handleLike}
                style={{
                  fontSize: "18px",
                  color: ` ${Color.gray200}`,
                  marginRight: "5px",
                }}
              ></HeartFilled>
              <Text type="num" fontSize="12px" color={Color.gray800}>
                {props.likeCount}
              </Text>
            </FlexGrid>
          ) : (
            <FlexGrid flexStart>
              <HeartFilled
                onClick={handleLike}
                style={{
                  fontSize: "18px",
                  color: ` ${Color.primary}`,
                  marginRight: "5px",
                }}
              ></HeartFilled>
              <Text type="num" fontSize="12px" color={Color.primary}>
                {props.likeCount}
              </Text>
            </FlexGrid>
          )}
        </PaddingBox>
        <FlexToonGrid
          onClick={() => {
            history.push({
              pathname: `/detail/${props.toonId}`,
              state: { id: props.toonId },
            });
          }}
        >
          <Image
            src={toonInfo.toonImg}
            width="48px"
            height="48px"
            radius="5px"
          ></Image>
          <InfoGrid>
            <FlexGrid flexStart>
              <Text type="caption" color={Color.primary}>
                {toonInfo.genres[1] ? toonInfo.genres[1] : toonInfo.genres[0]}
                {toonInfo.genres.length === 0 && "미분류"}
              </Text>
              <Text margin="0 10px" type="caption" color={Color.gray500}>
                {toonInfo.finished ? "완결" : toonInfo.toonWeekday}
              </Text>
            </FlexGrid>

            <FlexGrid>
              <Text fontWeight="medium" color={Color.gray800}>
                {toonInfo.toonTitle}
              </Text>
              {toonInfo.toonPlatform === "카카오" ? (
                <KakaoLogo kakao={kakao_webtoon_symbol}></KakaoLogo>
              ) : (
                <NaverLogo naver={naver_webtoon_symbol}></NaverLogo>
              )}
            </FlexGrid>
          </InfoGrid>
        </FlexToonGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 338px;
  height: auto;
  background: ${Color.gray100};
  display: block;
  border-radius: 15px;
  border: 1px solid ${Color.gray200};
  ${(props) =>
    props.main ? `margin: 10px 20px 20px 0` : `margin: 0 0 20px 0`};
`;

const PaddingBox = styled.div`
  padding: 16px;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) => props.flexStart && `justify-content: start;`};
`;

const FlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${Color.gray200};
  padding: 16px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  height: 48px;
  margin-left: 10px;
`;

const ReviewGrid = styled.div`
  width: 100%;
  min-height: 80px;
  height: auto;
  padding: 20px 0;
`;

const ReivewText = styled.div`
  width: 100%;
  font-size: 14px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  line-height: 1.6em;
  max-height: 4.8em;
  padding: 0 4px;
`;

const ReivewTextMore = styled.div`
  width: 100%;
  font-size: 14px;
  white-space: normal;
  word-break: break-word;
  line-height: 1.6em;
  padding: 0 4px;
`;

const ColumnGrid = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-around;
  flex-direction: column;
  margin: 0 10px;
`;

const KakaoLogo = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("${(props) => props.kakao}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const NaverLogo = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("${(props) => props.naver}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const StarPoint = styled.div`
  background-image: url("${(props) => props.stars}");
  width: 100px;
  height: 18px;

  background-position-y: ${(props) => (10 - props.points * 2) * 18 * -1}px;
  background-repeat: no-repeat;
  background-size: cover;
`;
export default ReviewCard;
