import React from "react";
import styled from "styled-components";
import { Text, Image, Button } from "../elements";
import { Color } from "../shared/common";
import profileImgList from "../images/profiles";
import { useDispatch, useSelector } from "react-redux";
import { EmptyHeart, FillHeart, Stars } from "../images/icons";
import { history } from "../redux/configureStore";
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as modalActions } from "../redux/modules/modal";
import time from "../shared/time";
import { kakao_webtoon_symbol, naver_webtoon_symbol } from "../images/symbols";
import { over } from "lodash";

const ReviewCard = (props) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = React.useState(false);
  const [overflowActive, setOverflowActive] = React.useState(false);
  const is_login = useSelector((state) => state.user.is_login);
  const toon_list = useSelector((state) => state.webtoon.toon_list);
  const toonInfo = toon_list.find((toon) => toon.toonId === props.toonId);
  const textRef = React.useRef();

  const is_ellipsis_active = (e) => {
    return e?.offsetHeight < e?.scrollHeight || e?.offsetWidth < e?.scrollWidth;
  };

  React.useEffect(() => {
    setShowMore(false);
  }, []);

  React.useEffect(() => {
    if (is_ellipsis_active(textRef.current)) {
      setOverflowActive(true);
      return;
    }
    setOverflowActive(false);
  }, [is_ellipsis_active]);

  const handleTextToggle = () => {
    if (showMore) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  };

  const handleLike = () => {
    if (document.location.href.includes("userinfo")) return;
    if (is_login) {
      dispatch(
        reviewActions.likeReviewServer(
          props.reviewId,
          !props.like_list.includes(props.reviewId)
        )
      );
    } else {
      dispatch(modalActions.activeModal("needLogin"));
    }
  };

  // 별점만 있는 리뷰면 보이지 않음.
  if (!props.reviewContent) {
    return <></>;
  }

  if (props.md) {
    return (
      <React.Fragment>
        <MdContainer>
          <PaddingBox md>
            <FlexGrid>
              <FlexGrid>
                <Image
                  src={profileImgList[props.userImg]}
                  shape="circle"
                  size="40px"
                ></Image>
                <Text type="caption" margin="0 10px">
                  {props.userName}
                </Text>
                <Text type="caption" color={Color.gray500}>
                  {props.createDate}
                </Text>
              </FlexGrid>
            </FlexGrid>

            <ReviewGrid md>
              {showMore ? (
                <div>
                  <ReivewTextMore>{props.reviewContent}</ReivewTextMore>
                  <Button
                    bgColor="transparent"
                    color={Color.gray400}
                    padding="0"
                    margin="5px 0 5px 4px"
                    fontSize="12px"
                    border="none"
                    _onClick={handleTextToggle}
                  >
                    줄이기
                  </Button>
                </div>
              ) : (
                <ReivewText ref={textRef}>{props.reviewContent}</ReivewText>
              )}
              {overflowActive && !showMore ? (
                <Button
                  bgColor="transparent"
                  color={Color.gray400}
                  padding="0"
                  margin="5px 0 0 4px"
                  fontSize="12px"
                  border="none"
                  _onClick={handleTextToggle}
                >
                  더보기
                </Button>
              ) : null}
            </ReviewGrid>
          </PaddingBox>
        </MdContainer>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Container main={props.main}>
        <PaddingBox>
          <FlexGrid>
            <FlexGrid
              onClick={() => history.push(`/userinfo/${props.userName}`)}
            >
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
            <StarPoint stars={Stars} points={props.userPointNumber}></StarPoint>
          </FlexGrid>

          <ReviewGrid>
            {showMore ? (
              <div>
                <ReivewTextMore>{props.reviewContent}</ReivewTextMore>
                <Button
                  bgColor="transparent"
                  color={Color.gray400}
                  padding="0"
                  margin="5px 0 5px 4px"
                  fontSize="12px"
                  border="none"
                  _onClick={handleTextToggle}
                >
                  줄이기
                </Button>
              </div>
            ) : (
              <ReivewText ref={textRef}>{props.reviewContent}</ReivewText>
            )}
            {overflowActive && !showMore ? (
              <Button
                bgColor="transparent"
                color={Color.gray400}
                padding="0"
                margin="5px 0 0 4px"
                fontSize="12px"
                border="none"
                _onClick={handleTextToggle}
              >
                더보기
              </Button>
            ) : null}
          </ReviewGrid>
          {props.main ? (
            <FlexGrid flexStart>
              <FillHeart
                style={{
                  marginRight: "5px",
                }}
              ></FillHeart>
              <Text type="num" fontSize="12px" color={Color.primary}>
                {props.likeCount}
              </Text>
            </FlexGrid>
          ) : (
            <div>
              {props.like_list?.indexOf(props.reviewId) === -1 ? (
                <FlexGrid flexStart>
                  <EmptyHeart
                    onClick={handleLike}
                    style={{
                      marginRight: "5px",
                    }}
                  ></EmptyHeart>
                  <Text type="num" fontSize="12px" color={Color.gray800}>
                    {props.likeCount}
                  </Text>
                </FlexGrid>
              ) : (
                <FlexGrid flexStart>
                  <FillHeart
                    onClick={handleLike}
                    style={{
                      marginRight: "5px",
                    }}
                  ></FillHeart>
                  <Text type="num" fontSize="12px" color={Color.primary}>
                    {props.likeCount}
                  </Text>
                </FlexGrid>
              )}
            </div>
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
  height: 100%;
  background: ${Color.gray100};
  display: block;
  border-radius: 15px;
  border: 1px solid ${Color.gray200};
  ${(props) => (props.main ? `margin: 0px` : `margin: 0 0 20px 0`)};
`;

const MdContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${Color.gray100};
  display: block;
  border-radius: 15px;
  border: 1px solid ${Color.gray200};
`;

const PaddingBox = styled.div`
  ${(props) => (props.md ? `width: 100%` : `width: 338px`)};
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
  width: 100%;
  height: 80px;
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
  min-height: 100px;
  ${(props) =>
    props.md ? `padding: 10px 0 10px 0` : `padding: 20px 0 20px 0`};
`;

const ReivewText = styled.p`
  width: 100%;
  font-size: 14px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  line-height: 1.6em;
  max-height: 3.2em;
  padding: 0 4px;
`;

const ReivewTextMore = styled.p`
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
