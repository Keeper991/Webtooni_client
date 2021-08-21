import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { OfferCard } from "../components";
import { Text, Image, Button } from "../elements";
import { Slick, WebToonCard, SkeletonCard } from "../components";
import profileImgList from "../images/profiles";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";
import { ReactComponent as FillStar } from "../images/FillStar.svg";

const Recommendation = () => {
  const dispatch = useDispatch();
  // selectors
  const is_login = useSelector((state) => state.user.is_login);
  const user_name = useSelector((state) => state.user.info.userName);
  const toon_list = useSelector((state) => state.webtoon.toon_list);
  const best_reviewer_info = useSelector(
    (state) => state.reviewer.best_reviewer_offer_user_info
  );
  const [showMore, setShowMore] = React.useState(false);

  const handleTextToggle = () => {
    if (showMore) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  };

  // webtoon lists
  const best_reviewer_list = toon_list.filter((toon) =>
    toon.filterConditions.includes("bestReviewerOffer")
  );
  const md_offer_list = toon_list.filter((toon) =>
    toon.filterConditions.includes("mdOffer")
  );
  const end_toon_list = toon_list.filter((toon) =>
    toon.filterConditions.includes("endOffer")
  );
  const similar_user_list = toon_list.filter((toon) =>
    toon.filterConditions.includes("similarUserOffer")
  );
  const for_user_list = toon_list.filter((toon) =>
    toon.filterConditions.includes("forUser")
  );

  const md_review = {
    userImg: "2",
    userName: "MD김투니",
    createDate: "08.18",
    reviewContent:
      "판타지 장르 중에서는 최고로 꼽힐만한 작품 중 하나라고 생각합니다. 굉장히 넓은 세계관을 유지하면서도 세계관이 무너지지 않고 있습니다. 또한 그 넓은 이야기를 굉장히 높은 퀄리티의 그림과 연출로 풀어내고 있죠. 오랜기간 동안 사랑을 받은 이유가 분명히 있습니다.",
  };

  // slick swipe click prevent
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

  // effects
  React.useEffect(() => {
    if (!end_toon_list.length || !md_offer_list.length || !best_reviewer_list) {
      dispatch(webtoonActions.getOfferWebtoonListForLogin());
    }
  }, []);

  React.useEffect(() => {
    if (is_login && (!for_user_list?.length || !similar_user_list.length)) {
      dispatch(webtoonActions.getForUserWebtoonList());
    }
  }, [is_login]);

  const is_loading = useSelector((state) => state.webtoon.is_loading);

  if (is_login) {
    return (
      <React.Fragment>
        <OfferSliderBox onClickCapture={handleOnItemClick}>
          <Slick
            is_offer
            _afterChange={handleAfterChange}
            _beforeChange={handleBeforeChange}
          >
            {for_user_list.map((_, idx) => {
              return (
                <OfferCard key={idx} {..._} user_name={user_name}></OfferCard>
              );
            })}
          </Slick>
          <BottomBox>
            <Text type="caption" color={Color.white} fontWeight="bold">
              😍 {user_name}님 만을 위한 추천 웹툰
            </Text>
          </BottomBox>
        </OfferSliderBox>

        <BannerBox
          onClick={() => {
            history.push("/review/search");
          }}
        >
          <Text margin="5px 0 0 0" type="small" color={Color.gray700}>
            좋아하실만한 웹툰을 추천해 드릴게요.
          </Text>
          <FlexGrid>
            <Text fontWeight="bold" color={Color.gray700}>
              재밌게 본 웹툰의 리뷰를 등록해보세요!
            </Text>
            <Image
              shape="square"
              size="16px"
              margin="0 5px"
              src="https://lh3.googleusercontent.com/pw/AM-JKLWPhtnQViH6A2gkyW-RSm0DPzry9dNgxBNfUplfxinXpWyXDHotbccu1JiRG8NoxAgreYwSXnKylBkgJ2OUew1FEhCanaMevg_G-Prks9-3ooXIluMWS9n6q-j2m4PAe4IY9o6t5Vcg6F51UfY7x2ms=w16-h17-no?authuser=0"
            ></Image>
          </FlexGrid>
        </BannerBox>

        <TitleGrid>
          <Text type="h2" fontWeight="bold" color={Color.gray800}>
            비슷한 취향의 사용자가 본 웹툰
          </Text>
          {is_login ? (
            <Button
              border="none"
              bgColor={Color.white}
              color={Color.gray700}
              fontSize="12px"
              width="50px"
              _onClick={() => {
                history.push("/toonlist/similar_toon");
              }}
            >
              더보기
            </Button>
          ) : null}
        </TitleGrid>

        <SliderBox onClickCapture={handleOnItemClick}>
          {is_loading || similar_user_list.length === 0 ? (
            <CardSliderBox is_infinite>
              {Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCard key={idx}></SkeletonCard>;
              })}
            </CardSliderBox>
          ) : (
            <CardSliderBox
              is_infinite
              _afterChange={handleAfterChange}
              _beforeChange={handleBeforeChange}
            >
              {similar_user_list?.map((_, idx) => {
                return <WebToonCard key={idx} {..._}></WebToonCard>;
              })}
            </CardSliderBox>
          )}
        </SliderBox>

        <MdBox>
          <BookMark></BookMark>
          <MdInfoBox>
            <Text type="small" color={Color.primary}>
              #MD추천
            </Text>
            <Text type="h1" color={Color.white} fontWeight="bold">
              네웹 대표 <br /> 글로벌 인기작!
            </Text>
            <Text type="caption" color={Color.gray300}>
              두근두근 청춘 로맨스물을 찾고 있다면?
            </Text>
          </MdInfoBox>
          <PlatformImg>
            <Image
              shape="square"
              size="33px"
              src="https://lh3.googleusercontent.com/pw/AM-JKLUzns3dJ9QMMvbc1SAKf7CNsU2e3HAN-XkY-qHk_1o5X_CskFJiSAwZ9F8lRBhNaRwxMMqOI32OBdJW3bPgupH1FAx-z9WI51FwqIiIC5ggfzfGxiIM47ux759UeRX5p1-7dv2Uf3GKP-NZ9hPi0cqR=s33-no?authuser=0"
            ></Image>
          </PlatformImg>
        </MdBox>
        <FlexToonGrid
          onClick={() => {
            history.push(
              `/detail/${md_offer_list && md_offer_list[0]?.toonId}`
            );
          }}
        >
          <Image
            margin="0 7px"
            src={md_offer_list && md_offer_list[0]?.toonImg}
            shape="circle"
            size="64px"
          ></Image>
          <InfoGrid>
            <Text fontWeight="medium">
              {md_offer_list && md_offer_list[0]?.toonTitle}
            </Text>
            <FlexGrid>
              <Text type="caption" color={Color.gray400}>
                {md_offer_list && md_offer_list[0]?.toonAuthor}
              </Text>
              <FillStar width="12px" height="12px" style={{ margin: "5px" }} />
              <Text
                type="num"
                fontSize="12px"
                fontWeight="bold"
                margin="0 10px 0 0"
                color={Color.primary}
              >
                {md_offer_list && md_offer_list[0]?.toonAvgPoint}
              </Text>
              <Text type="caption" color={Color.gray400}>
                {md_offer_list && md_offer_list[0]?.toonWeekday}
              </Text>
            </FlexGrid>
            <TextGrid>
              <Text tag="p" type="caption" color={Color.gray800}>
                긴 호흡을 지닌 네이버 웹툰 3대장!
              </Text>
            </TextGrid>

            <Text></Text>
          </InfoGrid>
        </FlexToonGrid>
        <MdCommentBox>
          <FlexGrid>
            <Image
              size="32px"
              shape="circle"
              src={profileImgList[md_review.userImg]}
            ></Image>
            <Text type="caption" margin="0 7px">
              {md_review.userName}
            </Text>
            <Text type="caption" color={Color.gray400}>
              {md_review.createDate}
            </Text>
          </FlexGrid>

          <ReviewGrid>
            {showMore ? (
              <ReivewTextMore>{md_review?.reviewContent}</ReivewTextMore>
            ) : (
              <ReivewText>{md_review?.reviewContent}</ReivewText>
            )}
            {md_review.reviewContent?.length >= 73 ? (
              <Button
                bgColor="transparent"
                color={Color.gray400}
                padding="0"
                margin="10px 0 0 0"
                fontSize="12px"
                border="none"
                _onClick={handleTextToggle}
              >
                {showMore ? "줄이기" : "더보기"}
              </Button>
            ) : null}
          </ReviewGrid>
        </MdCommentBox>

        <TitleGrid>
          <Text type="h2" fontWeight="bold" color={Color.gray800}>
            이번 주 웹툰 평론가의 추천
          </Text>
          <Button
            border="none"
            bgColor={Color.white}
            color={Color.gray700}
            fontSize="12px"
            width="50px"
            _onClick={() => {
              history.push("/toonlist/best_reviewer");
            }}
          >
            더보기
          </Button>
        </TitleGrid>

        <FlexReviewerGrid>
          <Image
            margin="0 7px"
            src={profileImgList[best_reviewer_info?.userImg]}
            shape="circle"
            size="48px"
          ></Image>
          <FlexInfoGrid>
            <Text
              tag="p"
              padding="3px 0 0 0"
              fontWeight="medium"
              color={Color.gray800}
            >
              {best_reviewer_info?.userName}
            </Text>
            <FlexGrid>
              <Text type="caption" color={Color.gray400}>
                {best_reviewer_info?.userGrade}
              </Text>
            </FlexGrid>
          </FlexInfoGrid>
        </FlexReviewerGrid>

        <SliderBox onClickCapture={handleOnItemClick}>
          {is_loading || best_reviewer_list.length === 0 ? (
            <CardSliderBox>
              {Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCard key={idx}></SkeletonCard>;
              })}
            </CardSliderBox>
          ) : (
            <CardSliderBox
              is_infinite
              _afterChange={handleAfterChange}
              _beforeChange={handleBeforeChange}
            >
              {best_reviewer_list?.map((_, idx) => {
                return <WebToonCard key={idx} {..._}></WebToonCard>;
              })}
            </CardSliderBox>
          )}
        </SliderBox>

        <TitleGrid>
          <Text type="h2" fontWeight="bold" color={Color.gray800}>
            완결 작품 추천
          </Text>
          <Button
            border="none"
            bgColor={Color.white}
            color={Color.gray700}
            fontSize="12px"
            width="50px"
            _onClick={() => {
              history.push("/toonlist/end_toon");
            }}
          >
            더보기
          </Button>
        </TitleGrid>
        <SliderBox onClickCapture={handleOnItemClick}>
          {is_loading || end_toon_list.length === 0 ? (
            <CardSliderBox>
              {Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCard key={idx}></SkeletonCard>;
              })}
            </CardSliderBox>
          ) : (
            <CardSliderBox
              is_infinite
              _afterChange={handleAfterChange}
              _beforeChange={handleBeforeChange}
            >
              {end_toon_list?.map((_, idx) => {
                return <WebToonCard key={idx} {..._}></WebToonCard>;
              })}
            </CardSliderBox>
          )}
        </SliderBox>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <BannerBox
        onClick={() => {
          history.push("/login");
        }}
      >
        <Text margin="5px 0 0 0" type="small" color={Color.gray700}>
          좋아하실만한 웹툰을 추천해 드릴게요.
        </Text>
        <FlexGrid>
          <Text fontWeight="bold" color={Color.gray700}>
            로그인 후 취향 저격 웹툰 추천받기! 🥰
          </Text>
        </FlexGrid>
      </BannerBox>
      <MdBox>
        <BookMark></BookMark>
        <MdInfoBox>
          <Text type="small" color={Color.primary}>
            #MD추천
          </Text>
          <Text type="h1" color={Color.white} fontWeight="bold">
            네웹 대표 <br /> 글로벌 인기작!
          </Text>
          <Text type="caption" color={Color.gray300}>
            두근두근 청춘 로맨스물을 찾고 있다면?
          </Text>
        </MdInfoBox>
        <PlatformImg>
          <Image
            shape="square"
            size="33px"
            src="https://lh3.googleusercontent.com/pw/AM-JKLUzns3dJ9QMMvbc1SAKf7CNsU2e3HAN-XkY-qHk_1o5X_CskFJiSAwZ9F8lRBhNaRwxMMqOI32OBdJW3bPgupH1FAx-z9WI51FwqIiIC5ggfzfGxiIM47ux759UeRX5p1-7dv2Uf3GKP-NZ9hPi0cqR=s33-no?authuser=0"
          ></Image>
        </PlatformImg>
      </MdBox>
      <FlexToonGrid
        onClick={() => {
          history.push(`/detail/${md_offer_list && md_offer_list[0]?.toonId}`);
        }}
      >
        <Image
          margin="0 7px"
          src={md_offer_list && md_offer_list[0]?.toonImg}
          shape="circle"
          size="64px"
        ></Image>
        <InfoGrid>
          <Text fontWeight="medium">
            {md_offer_list && md_offer_list[0]?.toonTitle}
          </Text>
          <FlexGrid>
            <Text type="caption" color={Color.gray400}>
              {md_offer_list && md_offer_list[0]?.toonAuthor}
            </Text>
            <Image
              shape="square"
              margin="0 5px 0 7px"
              size="12px"
              src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
            ></Image>
            <Text
              type="num"
              fontSize="12px"
              fontWeight="bold"
              margin="0 10px 0 0"
            >
              {md_offer_list && md_offer_list[0]?.toonAvgPoint}
            </Text>
            <Text type="caption" color={Color.gray400}>
              {md_offer_list && md_offer_list[0]?.toonWeekday}
            </Text>
          </FlexGrid>
          <TextGrid>
            <Text tag="p" type="caption" color={Color.gray800}>
              긴 호흡을 지닌 네이버 웹툰 3대장!
            </Text>
          </TextGrid>

          <Text></Text>
        </InfoGrid>
      </FlexToonGrid>
      <MdCommentBox>
        <FlexGrid>
          <Image
            size="32px"
            shape="circle"
            src={profileImgList[md_review.userImg]}
          ></Image>
          <Text type="caption" margin="0 7px">
            {md_review.userName}
          </Text>
          <Text type="caption" color={Color.gray400}>
            {md_review.createDate}
          </Text>
        </FlexGrid>

        <ReviewGrid>
          {showMore ? (
            <ReivewTextMore>{md_review?.reviewContent}</ReivewTextMore>
          ) : (
            <ReivewText>{md_review?.reviewContent}</ReivewText>
          )}
          {md_review.reviewContent?.length >= 73 ? (
            <Button
              bgColor="transparent"
              color={Color.gray400}
              padding="0"
              margin="5px 0 0 0"
              fontSize="12px"
              border="none"
              _onClick={handleTextToggle}
            >
              {showMore ? "줄이기" : "더보기"}
            </Button>
          ) : null}
        </ReviewGrid>
      </MdCommentBox>

      <TitleGrid>
        <Text type="h2" fontWeight="bold" color={Color.gray800}>
          이번 주 웹툰 평론가의 추천
        </Text>
        <Button
          border="none"
          bgColor={Color.white}
          color={Color.gray700}
          fontSize="12px"
          width="50px"
          _onClick={() => {
            history.push("/toonlist/best_reviewer");
          }}
        >
          더보기
        </Button>
      </TitleGrid>

      <FlexReviewerGrid>
        <Image
          margin="0 7px"
          src={profileImgList[best_reviewer_info?.userImg]}
          shape="circle"
          size="48px"
        ></Image>
        <FlexInfoGrid>
          <Text
            tag="p"
            padding="3px 0 0 0"
            fontWeight="medium"
            color={Color.gray800}
          >
            {best_reviewer_info?.userName}
          </Text>
          <FlexGrid>
            <Text type="caption" color={Color.gray400}>
              {best_reviewer_info?.userGrade}
            </Text>
          </FlexGrid>
        </FlexInfoGrid>
      </FlexReviewerGrid>

      <SliderBox>
        {is_loading || best_reviewer_list.length === 0 ? (
          <CardSliderBox>
            {Array.from({ length: 10 }).map((_, idx) => {
              return <SkeletonCard key={idx}></SkeletonCard>;
            })}
          </CardSliderBox>
        ) : (
          <CardSliderBox>
            {best_reviewer_list?.map((_, idx) => {
              return <WebToonCard key={idx} {..._}></WebToonCard>;
            })}
          </CardSliderBox>
        )}
      </SliderBox>

      <TitleGrid>
        <Text type="h2" fontWeight="bold" color={Color.gray800}>
          완결 작품 추천
        </Text>
        <Button
          border="none"
          bgColor={Color.white}
          color={Color.gray700}
          fontSize="12px"
          width="50px"
          _onClick={() => {
            history.push("/toonlist/end_toon");
          }}
        >
          더보기
        </Button>
      </TitleGrid>
      <SliderBox>
        {is_loading || end_toon_list.length === 0 ? (
          <CardSliderBox is_infinite>
            {Array.from({ length: 10 }).map((_, idx) => {
              return <SkeletonCard key={idx}></SkeletonCard>;
            })}
          </CardSliderBox>
        ) : (
          <CardSliderBox>
            {end_toon_list?.map((_, idx) => {
              return <WebToonCard key={idx} {..._}></WebToonCard>;
            })}
            <DummyCard></DummyCard>
          </CardSliderBox>
        )}
      </SliderBox>

      {/* <OfferCard {...for_user_list} user_name={user_name}></OfferCard>

      <BannerBox>
        <Text margin="5px 0 0 0" type="small" color={Color.gray700}>
          좋아하실만한 웹툰을 추천해 드릴게요.
        </Text>
        <FlexGrid>
          <Text fontWeight="bold" color={Color.gray700}>
            재밌게 본 웹툰의 리뷰를 등록해보세요!
          </Text>
          <Image
            shape="square"
            size="16px"
            margin="0 5px"
            src="https://lh3.googleusercontent.com/pw/AM-JKLWPhtnQViH6A2gkyW-RSm0DPzry9dNgxBNfUplfxinXpWyXDHotbccu1JiRG8NoxAgreYwSXnKylBkgJ2OUew1FEhCanaMevg_G-Prks9-3ooXIluMWS9n6q-j2m4PAe4IY9o6t5Vcg6F51UfY7x2ms=w16-h17-no?authuser=0"
          ></Image>
        </FlexGrid>
      </BannerBox>

      <TitleGrid>
        <Text type="h2" fontWeight="bold" color={Color.gray800}>
          비슷한 취향의 사용자가 본 웹툰
        </Text>
        {is_login ? (
          <Button
            border="none"
            bgColor={Color.white}
            color={Color.gray700}
            fontSize="12px"
            width="50px"
            _onClick={() => {
              history.push("/toonlist/similar_toon");
            }}
          >
            더보기
          </Button>
        ) : null}
      </TitleGrid>

      {is_login ? (
        <SliderBox>
          {is_loading || similar_user_list.length === 0 ? (
            <Slick is_infinite>
              {Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCard key={idx}></SkeletonCard>;
              })}
            </Slick>
          ) : (
            <Slick is_infinite>
              {similar_user_list?.map((_, idx) => {
                return <WebToonCard key={idx} {..._}></WebToonCard>;
              })}
            </Slick>
          )}
        </SliderBox>
      ) : (
        <HiddenBlurBox>
          <BlurText>지금 로그인하고 맞춤 웹툰 추천 받기!</BlurText>
          <BlurBox>
            {is_loading || similar_user_list.length === 0 ? (
              <Slick is_infinite>
                {Array.from({ length: 10 }).map((_, idx) => {
                  return <SkeletonCard key={idx}></SkeletonCard>;
                })}
              </Slick>
            ) : (
              <Slick is_infinite>
                {similar_user_list?.map((_, idx) => {
                  return <WebToonCard key={idx} {..._}></WebToonCard>;
                })}
              </Slick>
            )}
          </BlurBox>
        </HiddenBlurBox>
      )} */}
    </React.Fragment>
  );
};

const BannerBox = styled.div`
  width: 320px;
  height: 66px;
  background-color: ${Color.gray100};
  padding: 0 16px;
  margin: 30px auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SliderBox = styled.div`
  white-space: nowrap;
  overflow: hidden;
  margin: 20px 0 50px 0;
  padding-left: 16px;
`;

const OfferSliderBox = styled.div`
  margin: 20px 0 50px 0;
  position: relative;
`;

const BottomBox = styled.div`
  width: 100%;
  height: 32px;
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    z-index: 2;
  }
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${Color.black};
    opacity: 0.5;
    z-index: 1;
  }
`;

const MdBox = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${Color.gray800};
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-image: url("https://lh3.googleusercontent.com/pw/AM-JKLWSzGXMxqDz78istsHPT-R9gjN-iDKqA48koTRwLHHaiUOwWjpjurhUQF3jb8q4XukxQpAMrabtNceGVSKh2_idGz2h9HoZU4dV4dtTdA2mn2ICENPjgpGHz8EEgPR4vw1Oub4gh-swnzDko6sYIzfX=w360-h200-no?authuser=0");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
`;

const PlatformImg = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20px;
`;

const BookMark = styled.div`
  width: 32px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 20px;
  background-image: url("https://lh3.googleusercontent.com/pw/AM-JKLX9TMSv2HEBZvBU_2HfbBWkcbzob3Q2xbO5n37lvHAZRT4odoycyeUVUkFGCwH_xAO5_5LEDVZILVVnysQykUskGSHW6ujh4TN5xEDOPEifCnVAQB2A-cgnomeNlOhShd6zrjuHq28mg8y7_Mrh1lSL=w32-h30-no?authuser=0");
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const TitleGrid = styled.div`
  display: flex;
  width: 100%;
  height: 65px;
  margin-top: 30px;
  padding: 10px 16px 0;
  align-items: center;
  justify-content: space-between;
  border-top: 8px solid ${Color.gray100};
`;

const FlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 0 23px;
`;

const FlexReviewerGrid = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0 30px;
  padding: 0 16px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 64px;
  justify-content: space-around;
  padding: 3px;
`;

const FlexInfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 48px;
  justify-content: space-around;
  padding: 3px;
`;

const MdCommentBox = styled.div`
  width: 100%auto;
  min-height: 100px;
  padding: 16px;
  background-color: ${Color.gray100};
  margin: 20px 16px 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReviewGrid = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 0;
`;

const ReivewText = styled.div`
  width: 100%;
  font-size: 12px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  line-height: 1.6em;
  max-height: 4.8em;
`;

const ReivewTextMore = styled.div`
  width: 100%;
  font-size: 12px;
  white-space: normal;
  word-break: break-word;
  line-height: 1.6em;
`;

const MdInfoBox = styled.div`
  height: 90px;
  display: flex;
  position: absolute;
  bottom: 15px;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0 20px;
`;

const HiddenBlurBox = styled.div`
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  margin: 10px 0 50px 0;

  &:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: ${Color.black};
    opacity: 0.5;
  }
`;

const BlurBox = styled.div`
  filter: blur(1.5px);
`;

const TextGrid = styled.div`
  width: 100%;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const BlurText = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  z-index: 5;
`;

const CardSliderBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: scroll;
  -ms-overflow-style: none;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const DummyCard = styled.div`
  width: 150px;
  height: 220px;
  background: ${Color.naverGreen};
  display: inline-block;
  position: relative;
`;
export default Recommendation;
