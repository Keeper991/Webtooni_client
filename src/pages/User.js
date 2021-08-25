import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Image, Text } from "../elements";
import { Color } from "../shared/common";
import { UploadOutlined } from "@ant-design/icons";
import profileImgList from "../images/profiles";
import { Pen } from "../images/icons";
import { Pie, Bar } from "react-chartjs-2";
import { Slick, ToonListCard, ReviewCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as modalActions } from "../redux/modules/modal";
import { PermitStrict } from "../shared/PermitAuth";
import { history } from "../redux/configureStore";

const User = (props) => {
  const dispatch = useDispatch();
  const urlUserName = props.match.params.userName;
  const userList = useSelector((state) => state.user.userList);
  const toon_list = useSelector((state) => state.webtoon.toon_list);
  const review_list = useSelector((state) => state.review.review_list);
  const like_list = useSelector((state) => state.user.reviewLikeList);

  const shareRef = useRef();

  const [userInfo, setUserInfo] = useState({
    userName: "",
    userImg: 0,
    userGrade: "",
    genre: [],
  });
  const [subscribeList, setSubscribeList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  const userData = userList.find((user) => user.userName === urlUserName);
  const totalSubscribeToonList = toon_list.filter((toon) =>
    userData?.subscribeList.includes(toon.toonId)
  );
  const totalReviewToonList = reviewList.map((review) =>
    toon_list.find((toon) => toon.toonId === review.toonId)
  );

  let totalToonList = [...totalSubscribeToonList, ...totalReviewToonList];
  totalToonList = totalToonList.filter(
    (toon, idx) =>
      totalToonList.findIndex((_toon) => _toon.toonId === toon.toonId) === idx
  );

  const reviewCount = reviewList.filter(
    (review) => review.reviewContent
  ).length;
  const pointCount = reviewList.length - reviewCount;

  const [dragging, setDragging] = React.useState(false);

  const handleBeforeChange = React.useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = React.useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const handleOnItemClick = React.useCallback(
    (e) => {
      if (dragging) e.stopPropagation();
    },
    [dragging]
  );

  const getRatioByGenre = (toonList) => {
    const genreList = toonList.map((toon) => toon.genres).flat();
    const genreCases = genreList.filter(
      (genre, idx) =>
        genreList.indexOf(genre) === idx &&
        !(genre === "스토리" || genre === "옴니버스" || genre === "에피소드")
    );
    const result = {};
    genreList.map((genre) => {
      result[genre] = (result[genre] || 0) + 1;
    });
    genreCases.map((genre) => {
      result[genre] = ((result[genre] / genreList.length) * 100).toFixed(1);
    });

    return [genreCases, Object.values(result)];
  };

  const getStarPointCount = (reviewList) => {
    const points = Array.from({ length: 10 }).fill(0);
    reviewList.map(
      (review) =>
        review.userPointNumber && ++points[review.userPointNumber / 0.5 - 1]
    );
    return points;
  };

  const getAvgPoint = (reviewList) => {
    return (
      reviewList.reduce((acc, review) => acc + review.userPointNumber, 0) /
      reviewList.length
    ).toFixed(2);
  };

  const [interestGenreList, interestData] = getRatioByGenre(totalToonList);
  const pointData = getStarPointCount(reviewList);

  const tasteByGenreChartData = {
    data: {
      labels: interestGenreList,
      datasets: [
        {
          backgroundColor: Array.from({ length: interestGenreList.length }).map(
            (color) => "#" + Math.floor(Math.random() * 16777215).toString(16)
          ),
          borderColor: "transparent",
          data: interestData,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            boxWidth: 15,
            boxHeight: 15,
          },
          position: "bottom",
        },
      },
    },
  };
  const starPointsChartData = {
    data: {
      labels: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      datasets: [
        {
          backgroundColor: Array.from({ length: 10 }).fill(Color.gray300),
          hoverBackgroundColor: Color.primary,
          borderColor: "transparent",
          borderRadius: Number.MAX_VALUE,
          data: pointData,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      },
    },
  };

  useEffect(() => {
    if (userData) {
      const dividedSubscribeList = [];
      let dividedLength = Math.floor(totalSubscribeToonList.length / 3);
      totalSubscribeToonList.length % 3 && ++dividedLength;
      for (let i = 0; i < dividedLength; i++) {
        dividedSubscribeList.push(
          totalSubscribeToonList.slice(i * 3, (i + 1) * 3)
        );
      }
      const filteredGenre = userData.genre.filter(
        (g, idx) => userData.genre.indexOf(g) === idx
      );
      setUserInfo({
        userName: userData.userName,
        userImg: userData.userImg,
        userGrade: userData.userGrade,
        genre: filteredGenre,
      });
      setSubscribeList(dividedSubscribeList);
      setReviewList(
        review_list.filter((review) => review.userName === urlUserName)
      );
    } else {
      dispatch(userActions.getUserPageInfoServer(urlUserName));
    }
  }, [userData]);

  return (
    <React.Fragment>
      <Container>
        <UserInfoArea>
          <UserInfoHeader>
            <UserInfoHeaderCol>
              <Text type="h2" fontWeight="bold" color={Color.gray800}>
                {userInfo.userName}
              </Text>
              <Text type="h2" color={Color.gray800}>
                의 유저페이지
              </Text>
              <Button
                padding="0"
                bgColor="transparent"
                border="none"
                margin="0 0 0 5px"
              >
                <UploadOutlined
                  onClick={() => {
                    shareRef.current.select();
                    document.execCommand("copy");
                    shareRef.current.setSelectionRange(0, 0);
                    dispatch(modalActions.activeModal("copyUrl"));
                  }}
                />
              </Button>
            </UserInfoHeaderCol>
            <UserInfoHeaderCol>
              <PermitStrict authorName={urlUserName}>
                <Text
                  type="caption"
                  cursor="true"
                  color={Color.gray700}
                  _onClick={() => dispatch(modalActions.activeModal("logout"))}
                >
                  로그아웃
                </Text>
              </PermitStrict>
            </UserInfoHeaderCol>
          </UserInfoHeader>
          <UserImg>
            <Image
              src={profileImgList[userInfo.userImg]}
              shape="circle"
              size="150px"
              margin="40px 0 0 0"
            />
            <PermitStrict authorName={urlUserName}>
              <Button
                shape="circle"
                size="40px"
                padding="0"
                bgColor={Color.gray100}
                border="none"
                _onClick={() => {
                  history.push({
                    pathname: "/profile",
                    state: {
                      editProfile: true,
                    },
                  });
                }}
              >
                <Pen width="12px" height="12px" />
              </Button>
            </PermitStrict>
          </UserImg>
          <UserNameAndGrade>
            <Text type="h1" fontWeight="bold">
              {userInfo.userName}
            </Text>
            <UserGrade>
              <Text
                type="num"
                fontSize="14px"
                fontWeight="bold"
                color={Color.primary}
              >
                Lv.1
              </Text>
              <Text type="h2">{userInfo.userGrade}</Text>
            </UserGrade>
          </UserNameAndGrade>
          <UserReviewAndLikeCount>
            <UserReviewAndLikeCountCol>
              <Text type="num" fontSize="20px">
                {pointCount}
              </Text>
              <Text fontWeight="bold" color={Color.gray400}>
                평가한 웹툰
              </Text>
            </UserReviewAndLikeCountCol>
            <SeparateLine />
            <UserReviewAndLikeCountCol>
              <Text type="num" fontSize="20px">
                {reviewCount}
              </Text>
              <Text fontWeight="bold" color={Color.gray400}>
                작성한 리뷰
              </Text>
            </UserReviewAndLikeCountCol>
            <SeparateLine />
            <UserReviewAndLikeCountCol>
              <Text type="num" fontSize="20px">
                {reviewList.reduce((a, c) => a + c.likeCount, 0)}
              </Text>
              <Text fontWeight="bold" color={Color.gray400}>
                받은 좋아요
              </Text>
            </UserReviewAndLikeCountCol>
          </UserReviewAndLikeCount>
          <UserTasteGenre>
            <Text color={Color.gray800}>저는</Text>
            {userInfo.genre.map((g, idx) => (
              <Text
                key={idx}
                type="h2"
                fontWeight="medium"
                color={Color.primary}
              >
                {g}
              </Text>
            ))}
            <Text color={Color.gray800}> 장르에 관심있어요 😀</Text>
          </UserTasteGenre>
          <TasteByGenre>
            <ChartCaption>
              <Text fontWeight="medium" color={Color.gray500}>
                장르별 관심도
              </Text>
            </ChartCaption>
            <PieChartWrap>
              {interestData.findIndex((data) => data !== 0) !== -1 ? (
                <Pie {...tasteByGenreChartData} />
              ) : (
                <EmptyInformationGuide>
                  작성된 리뷰가 없습니다.
                </EmptyInformationGuide>
              )}
            </PieChartWrap>
          </TasteByGenre>
          <StarPoints>
            <ChartCaption>
              <Text fontWeight="medium" color={Color.gray500}>
                내 평균 평점
              </Text>
              <Text type="h2" fontWeight="medium">
                {pointData.findIndex((data) => data !== 0) !== -1 &&
                  getAvgPoint(reviewList)}{" "}
                점
              </Text>
            </ChartCaption>
            <BarChartWrap>
              {pointData.findIndex((data) => data !== 0) !== -1 ? (
                <Bar {...starPointsChartData} />
              ) : (
                <EmptyInformationGuide>
                  작성된 리뷰가 없습니다.
                </EmptyInformationGuide>
              )}
            </BarChartWrap>
          </StarPoints>
        </UserInfoArea>
        <SubscribeListArea>
          <Text
            type="h2"
            fontWeight="bold"
            margin="0 0 20px 0"
            color={Color.gray800}
          >
            구독중인 웹툰
          </Text>
          <Slick
            is_variableWidth={false}
            _afterChange={handleAfterChange}
            _beforeChange={handleBeforeChange}
          >
            {subscribeList.length ? (
              subscribeList.map((list, idx) => (
                <WebtoonListWrap key={idx} onClickCapture={handleOnItemClick}>
                  {list.map((item, i) => (
                    <ToonListCard key={i} {...item} />
                  ))}
                </WebtoonListWrap>
              ))
            ) : (
              <EmptyInformationGuide>
                구독중인 웹툰이 없습니다.
              </EmptyInformationGuide>
            )}
          </Slick>
        </SubscribeListArea>
        <ReviewListArea>
          <Text
            type="h2"
            fontWeight="bold"
            margin="0 0 20px 0"
            color={Color.gray800}
          >
            작성한 리뷰
          </Text>
          <SlideWrap>
            {reviewList.length ? (
              reviewList.map((review, idx) => (
                <ReviewCard
                  key={idx}
                  userImg={userInfo.userImg}
                  {...review}
                  like_list={like_list}
                />
              ))
            ) : (
              <EmptyInformationGuide>
                작성된 리뷰가 없습니다.
              </EmptyInformationGuide>
            )}
          </SlideWrap>
        </ReviewListArea>
      </Container>
      <input
        ref={shareRef}
        value={document.location.href}
        style={{ position: "absolute", bottom: 0, opacity: 0 }}
        readOnly
      />
    </React.Fragment>
  );
};

const Container = styled.section`
  width: 100%;
  margin: -4px 0 0 0;
  background-color: ${Color.gray100};
  border-top: 0.1px solid ${Color.gray100};
  & > section {
    width: 100%;
    padding: 19px 16px;
    margin-top: 8px;
    background-color: ${Color.white};
  }
`;

const UserInfoArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfoHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfoHeaderCol = styled.div`
  display: flex;
`;

const UserImg = styled.div`
  position: relative;
  & button div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  & button {
    position: absolute;
    right: 0;
    bottom: 0;
    &:hover {
      opacity: 1;
    }
  }
`;

const UserNameAndGrade = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 35px 0;
`;

const UserGrade = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const UserReviewAndLikeCount = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 40px;
`;

const UserReviewAndLikeCountCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const SeparateLine = styled.div`
  height: 48px;
  width: 1px;
  background-color: ${Color.gray100};
`;

const UserTasteGenre = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 24px 0;
  border-top: 1px solid ${Color.gray100};
  border-bottom: 1px solid ${Color.gray100};
  & > h2 {
    text-decoration: underline;
  }
`;

const TasteByGenre = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 38px;
`;

const StarPoints = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 38px;
  margin-bottom: 20px;
`;

const ChartCaption = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const PieChartWrap = styled.div`
  width: 300px;
  height: 300px;
`;

const BarChartWrap = styled.div`
  width: 300px;
  height: 150px;
`;

const SubscribeListArea = styled.section``;

const WebtoonListWrap = styled.div``;

const ReviewListArea = styled.section``;

const EmptyInformationGuide = styled.div`
  color: ${Color.gray400};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default User;
