import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as webtoonActions } from "../redux/modules/webtoon";
import { OfferCard } from "../components";
import { Text, Image, Button } from "../elements";
import {
  Slick,
  WebToonCard,
  SkeletonCard,
  ReviewCard,
  ToolTip,
} from "../components";
import profileImgList from "../images/profiles";
import { Color, userGradeIcon } from "../shared/common";
import { history } from "../redux/configureStore";
import { ReactComponent as FillStar } from "../images/icons/FillStar.svg";
import { NaverBigLogo } from "../images/symbols";
import { DownArrowPrimary, TalkBubble } from "../images/icons";

const Recommendation = () => {
  const dispatch = useDispatch();

  // window size
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const handleWindowResize = React.useCallback((event) => {
    setWindowSize(window.innerWidth);
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  // selectors
  const is_login = useSelector((state) => state.user.is_login);
  const user_name = useSelector((state) => state.user.info.userName);
  const toon_list = useSelector((state) => state.webtoon.toon_list);
  const best_reviewer_info = useSelector(
    (state) => state.reviewer.best_reviewer_offer_user_info
  );

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

  const md_review = [
    {
      toonId: 84,
      userImg: "11",
      userName: "MD신투니",
      createDate: "08.18",
      reviewContent:
        "귀여운 좀비물이에요. 생존물에서 거부감이 들 수 있는 그로테스크한 부분은 최소화되고 그림체는 둥글둥글해요. 이게 주인공 특유의 무덤덤함과 어우러지니 혈흔이 낭자하는 생존물이 아기자기한 모험물이 되었네요. 각자의 개성과 사연을 가진 사람들이 만나 생각도 못한 곳에서 웃음을 자아내고, 때론 진지하게 생각할 거리를 던져주는 만화. 추천합니다:)",
    },
  ];

  const md_toon = [
    {
      toonAuthor: "이명재",
      toonAvgPoint: 4.7,
      toonId: 84,
      toonImg:
        "https://shared-comic.pstatic.net/thumb/webtoon/766648/thumbnail/thumbnail_IMAG06_f81dd605-e54a-4c36-89dd-f5f7ce585761.jpg",

      toonTitle: "위아더좀비",
      toonWeekday: "화",
      totalPointCount: 3,
    },
  ];

  const dummy_toon = [
    {
      finished: false,
      genres: ["액션 무협"],
      toonAuthor: "민(meen) / 백승훈",
      toonAvgPoint: 0,
      toonId: 776,
      toonImg:
        "https://kr-a.kakaopagecdn.com/P/C/2306/c2/2x/24186843-8ca9-4a1d-af95-fc4310c05c7a.png",
      toonPlatform: "카카오",
      toonTitle: "독고3 [완전판]",
      toonWeekday: "월",
    },
  ];

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
    console.log("asdf");
    if (is_login) {
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
                <OfferCard
                  key={idx}
                  {..._}
                  user_name={user_name}
                  index={idx + 1}
                  total_index={for_user_list.length}
                ></OfferCard>
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
          <Text margin="0 0 5px 0" type="small" color={Color.gray700}>
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

        <TitleGrid no_border>
          <TooltipGrid>
            <Text type="h2" fontWeight="bold" color={Color.gray800}>
              비슷한 취향의 사용자가 본 웹툰
            </Text>
            <ToolTip position="top-center">
              {user_name}님과 비슷한 평가를 남긴 사용자가 좋게 평가한
              웹툰이에요!
            </ToolTip>
          </TooltipGrid>
          {is_login ? (
            <Button
              border="none"
              bgColor={Color.white}
              color={Color.gray700}
              fontSize="13px"
              width="50px"
              _onClick={() => {
                history.push("/toonlist/similar_toon");
              }}
            >
              더보기
            </Button>
          ) : null}
        </TitleGrid>

        {windowSize < 500 ? (
          <SliderBox>
            {is_loading || similar_user_list.length === 0 ? (
              <CardSliderBox>
                {Array.from({ length: 10 }).map((_, idx) => {
                  return <SkeletonCard key={idx}></SkeletonCard>;
                })}
              </CardSliderBox>
            ) : (
              <CardSliderBox>
                {similar_user_list?.map((_, idx) => {
                  return <WebToonCard key={idx} {..._}></WebToonCard>;
                })}
              </CardSliderBox>
            )}
          </SliderBox>
        ) : (
          <SliderBox onClickCapture={handleOnItemClick}>
            {is_loading || similar_user_list.length === 0 ? (
              <Slick>
                {Array.from({ length: 10 }).map((_, idx) => {
                  return <SkeletonCard key={idx}></SkeletonCard>;
                })}
              </Slick>
            ) : (
              <Slick
                _afterChange={handleAfterChange}
                _beforeChange={handleBeforeChange}
              >
                {similar_user_list?.map((_, idx) => {
                  return <WebToonCard key={idx} {..._}></WebToonCard>;
                })}
              </Slick>
            )}
          </SliderBox>
        )}

        <MdBox>
          <BookMark></BookMark>
          <MdInfoBox>
            <Text type="caption" fontWeight="bold" color={Color.primary}>
              #MD추천
            </Text>
            <Text type="h1" color={Color.white} fontWeight="bold">
              네웹 대표 <br /> 떠오르는 인기작!
            </Text>
            <Text type="caption" color={Color.gray300}>
              뻔하지 않은 일상 속 소소한 재미를 찾고 있다면?
            </Text>
          </MdInfoBox>
          <PlatformImg>
            <NaverBigLogo></NaverBigLogo>
          </PlatformImg>
        </MdBox>
        <FlexToonGrid
          onClick={() => {
            history.push(`/detail/${md_toon[0].toonId}`);
          }}
        >
          <Image
            margin="0 7px"
            src={md_toon[0].toonImg}
            shape="circle"
            size="64px"
          ></Image>
          <InfoGrid>
            <Text fontWeight="medium">{md_toon[0].toonTitle}</Text>
            <FlexGrid>
              <Text type="caption" color={Color.gray400}>
                {md_toon[0].toonAuthor}
              </Text>
              <FillStar width="12px" height="12px" style={{ margin: "5px" }} />
              <Text
                type="num"
                fontSize="12px"
                fontWeight="bold"
                margin="0 10px 0 0"
                color={Color.primary}
              >
                {md_toon[0].toonAvgPoint}
              </Text>
              <Text type="caption" color={Color.gray400}>
                {md_toon[0].toonWeekday}
              </Text>
            </FlexGrid>
            <TextGrid>
              <Text type="caption" color={Color.gray800}>
                인종이의 좀비 타워 속 귀여운 생존일기!
              </Text>
            </TextGrid>
          </InfoGrid>
        </FlexToonGrid>

        <ReviewGrid>
          {md_review.map((_, idx) => {
            return <ReviewCard md {..._} key={idx}></ReviewCard>;
          })}
        </ReviewGrid>

        <TitleGrid>
          <Text type="h2" fontWeight="bold" color={Color.gray800}>
            이번 주 웹툰 평론가의 추천
          </Text>
          <Button
            border="none"
            bgColor={Color.white}
            color={Color.gray700}
            fontSize="13px"
            width="50px"
            _onClick={() => {
              history.push("/toonlist/best_reviewer");
            }}
          >
            더보기
          </Button>
        </TitleGrid>

        <FlexReviewerGrid
          onClick={() => {
            history.push(`/userinfo/${best_reviewer_info?.userName}`);
          }}
        >
          <Image
            margin="0 7px"
            src={profileImgList[best_reviewer_info?.userImg]}
            shape="circle"
            size="48px"
          ></Image>
          <FlexInfoGrid>
            <Text padding="3px 0 0 0" fontWeight="medium" color={Color.gray800}>
              {best_reviewer_info?.userName}
            </Text>
            <FlexGrid>
              <Text
                type="caption"
                color={Color.primary}
                fontWeight="bold"
                margin="0 3px 0 0"
              >
                Lv.{best_reviewer_info?.userScore}
              </Text>
              <Text type="caption">
                {userGradeIcon(best_reviewer_info?.userGrade)}
              </Text>
            </FlexGrid>
          </FlexInfoGrid>
          <FlexGrid>
            <TalkBubble></TalkBubble>
            <Button
              width="130px"
              height="28px"
              padding="0"
              borderRadius="4px"
              bgColor={Color.primary}
              border="none"
              color={Color.white}
              fontSize="12px"
              fontWeight="bold"
            >
              리뷰 작성 수 TOP!
            </Button>
          </FlexGrid>
        </FlexReviewerGrid>

        {windowSize < 500 ? (
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
        ) : (
          <SliderBox onClickCapture={handleOnItemClick}>
            {is_loading || best_reviewer_list.length === 0 ? (
              <Slick>
                {Array.from({ length: 10 }).map((_, idx) => {
                  return <SkeletonCard key={idx}></SkeletonCard>;
                })}
              </Slick>
            ) : (
              <Slick
                _afterChange={handleAfterChange}
                _beforeChange={handleBeforeChange}
              >
                {best_reviewer_list?.map((_, idx) => {
                  return <WebToonCard key={idx} {..._}></WebToonCard>;
                })}
              </Slick>
            )}
          </SliderBox>
        )}

        <TitleGrid>
          <Text type="h2" fontWeight="bold" color={Color.gray800}>
            완결 작품 추천
          </Text>
          <Button
            border="none"
            bgColor={Color.white}
            color={Color.gray700}
            fontSize="13px"
            width="50px"
            _onClick={() => {
              history.push("/toonlist/end_toon");
            }}
          >
            더보기
          </Button>
        </TitleGrid>
        {windowSize < 500 ? (
          <SliderBox margin_bottom>
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
              </CardSliderBox>
            )}
          </SliderBox>
        ) : (
          <SliderBox margin_bottom onClickCapture={handleOnItemClick}>
            {is_loading || end_toon_list.length === 0 ? (
              <Slick>
                {Array.from({ length: 10 }).map((_, idx) => {
                  return <SkeletonCard key={idx}></SkeletonCard>;
                })}
              </Slick>
            ) : (
              <Slick
                _afterChange={handleAfterChange}
                _beforeChange={handleBeforeChange}
              >
                {end_toon_list?.map((_, idx) => {
                  return <WebToonCard key={idx} {..._}></WebToonCard>;
                })}
              </Slick>
            )}
          </SliderBox>
        )}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <BorderLine>
        <BannerBox
          onClick={() => {
            history.push("/login");
          }}
          margin
        >
          <Text margin="0 0 5px 0" type="small" color={Color.gray700}>
            좋아하실만한 웹툰을 추천해 드릴게요.
          </Text>
          <FlexGrid>
            <Text fontWeight="bold" color={Color.gray700}>
              로그인 후 취향 저격 웹툰 추천받기! 🥰
            </Text>
          </FlexGrid>
        </BannerBox>
      </BorderLine>

      <MdBox>
        <BookMark></BookMark>
        <MdInfoBox>
          <Text type="caption" fontWeight="bold" color={Color.primary}>
            #MD추천
          </Text>
          <Text type="h1" color={Color.white} fontWeight="bold">
            네웹 대표 <br /> 떠오르는 인기작!
          </Text>
          <Text type="caption" color={Color.gray300}>
            뻔하지 않은 일상 속 소소한 재미를 찾고 있다면?
          </Text>
        </MdInfoBox>
        <PlatformImg>
          <NaverBigLogo></NaverBigLogo>
        </PlatformImg>
      </MdBox>
      <FlexToonGrid
        onClick={() => {
          history.push(`/detail/${md_toon[0].toonId}`);
        }}
      >
        <Image
          margin="0 7px"
          src={md_toon[0].toonImg}
          shape="circle"
          size="64px"
        ></Image>
        <InfoGrid>
          <Text fontWeight="medium">{md_toon[0].toonTitle}</Text>
          <FlexGrid>
            <Text type="caption" color={Color.gray400}>
              {md_toon[0].toonAuthor}
            </Text>
            <FillStar width="12px" height="12px" style={{ margin: "5px" }} />
            <Text
              type="num"
              fontSize="12px"
              fontWeight="bold"
              margin="0 10px 0 0"
              color={Color.primary}
            >
              {md_toon[0].toonAvgPoint}
            </Text>
            <Text type="caption" color={Color.gray400}>
              {md_toon[0].toonWeekday}
            </Text>
          </FlexGrid>
          <TextGrid>
            <Text type="caption" color={Color.gray800}>
              인종이의 좀비 타워 속 귀여운 생존일기!
            </Text>
          </TextGrid>
        </InfoGrid>
      </FlexToonGrid>

      <ReviewGrid>
        {md_review.map((_, idx) => {
          return <ReviewCard md {..._} key={idx}></ReviewCard>;
        })}
      </ReviewGrid>

      <TitleGrid>
        <Text type="h2" fontWeight="bold" color={Color.gray800}>
          이번 주 웹툰 평론가의 추천
        </Text>
        <Button
          border="none"
          bgColor={Color.white}
          color={Color.gray700}
          fontSize="13px"
          width="50px"
          _onClick={() => {
            history.push("/toonlist/best_reviewer");
          }}
        >
          더보기
        </Button>
      </TitleGrid>

      <FlexReviewerGrid
        onClick={() => {
          history.push(`/userinfo/${best_reviewer_info?.userName}`);
        }}
      >
        <Image
          margin="0 7px"
          src={profileImgList[best_reviewer_info?.userImg]}
          shape="circle"
          size="48px"
        ></Image>
        <FlexInfoGrid>
          <Text padding="3px 0 0 0" fontWeight="medium" color={Color.gray800}>
            {best_reviewer_info?.userName}
          </Text>
          <FlexGrid>
            <Text
              type="caption"
              color={Color.primary}
              fontWeight="bold"
              margin="0 3px 0 0"
            >
              Lv.{best_reviewer_info?.userScore}
            </Text>
            <Text type="caption">
              {userGradeIcon(best_reviewer_info?.userGrade)}
            </Text>
          </FlexGrid>
        </FlexInfoGrid>
        <FlexGrid>
          <TalkBubble></TalkBubble>
          <Button
            width="130px"
            height="28px"
            padding="0"
            borderRadius="4px"
            bgColor={Color.primary}
            border="none"
            color={Color.white}
            fontSize="12px"
            fontWeight="bold"
          >
            리뷰 작성 수 TOP!
          </Button>
        </FlexGrid>
      </FlexReviewerGrid>

      {windowSize < 500 ? (
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
      ) : (
        <SliderBox onClickCapture={handleOnItemClick}>
          {is_loading || best_reviewer_list.length === 0 ? (
            <Slick>
              {Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCard key={idx}></SkeletonCard>;
              })}
            </Slick>
          ) : (
            <Slick
              _afterChange={handleAfterChange}
              _beforeChange={handleBeforeChange}
            >
              {best_reviewer_list?.map((_, idx) => {
                return <WebToonCard key={idx} {..._}></WebToonCard>;
              })}
            </Slick>
          )}
        </SliderBox>
      )}

      <TitleGrid>
        <Text type="h2" fontWeight="bold" color={Color.gray800}>
          완결 작품 추천
        </Text>
        <Button
          border="none"
          bgColor={Color.white}
          color={Color.gray700}
          fontSize="13px"
          width="50px"
          _onClick={() => {
            history.push("/toonlist/end_toon");
          }}
        >
          더보기
        </Button>
      </TitleGrid>

      {windowSize < 500 ? (
        <SliderBox margin_bottom>
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
            </CardSliderBox>
          )}
        </SliderBox>
      ) : (
        <SliderBox margin_bottom onClickCapture={handleOnItemClick}>
          {is_loading || end_toon_list.length === 0 ? (
            <Slick>
              {Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCard key={idx}></SkeletonCard>;
              })}
            </Slick>
          ) : (
            <Slick
              _afterChange={handleAfterChange}
              _beforeChange={handleBeforeChange}
            >
              {end_toon_list?.map((_, idx) => {
                return <WebToonCard key={idx} {..._}></WebToonCard>;
              })}
            </Slick>
          )}
        </SliderBox>
      )}
      <PositionGrid>
        <BlurBox>
          <BlurContentBox>
            <FlexGrid button>
              <DownArrowPrimary
                style={{ margin: "20px 0 40px" }}
              ></DownArrowPrimary>
            </FlexGrid>

            <Text type="h1" fontWeight="medium" margin="15px 0">
              취향저격,
            </Text>
            <Text type="h1" fontWeight="medium">
              더 많은 웹툰 추천을 받고 싶다면? 👀
            </Text>
            <FlexGrid button>
              <Button
                width="110px"
                height="56px"
                padding="0"
                borderRadius="50px"
                bgColor={Color.primary}
                border="none"
                color={Color.white}
                fontSize="14px"
                margin="60px 0 0 0"
                _onClick={() => {
                  history.push("/login");
                }}
              >
                로그인하기
              </Button>
            </FlexGrid>
          </BlurContentBox>
        </BlurBox>
        <OfferSliderBox md_bottom>
          {dummy_toon.map((_, idx) => {
            return (
              <OfferCard
                key={idx}
                {..._}
                user_name={user_name}
                dummy
              ></OfferCard>
            );
          })}

          <BottomBox bottom>
            <Text type="caption" color={Color.white} fontWeight="bold">
              😍 김투니님 만을 위한 추천 웹툰
            </Text>
          </BottomBox>
        </OfferSliderBox>

        <TitleGrid no_border no_margin>
          <Text type="h2" fontWeight="bold" color={Color.gray800}>
            비슷한 취향의 사용자가 본 웹툰
          </Text>
          <Button
            border="none"
            bgColor={Color.white}
            color={Color.gray700}
            fontSize="13px"
            width="50px"
          >
            더보기
          </Button>
        </TitleGrid>
        <SliderBox margin_bottom>
          <CardSliderBox>
            {best_reviewer_list?.map((_, idx) => {
              return <WebToonCard key={idx} {..._}></WebToonCard>;
            })}
          </CardSliderBox>
        </SliderBox>
      </PositionGrid>
    </React.Fragment>
  );
};

const BorderLine = styled.div`
  width: 100%;
  margin-top: -4px;
  border-top: 8px solid ${Color.gray100};
`;

const BannerBox = styled.div`
  height: 66px;
  background-color: ${Color.gray100};
  padding: 0 16px;
  margin: 40px 20px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  ${(props) =>
    props.margin ? "margin: 20px 20px 20px" : "margin: 40px 20px 20px"};
`;

const SliderBox = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 0 0 16px;
  ${(props) => (props.margin_bottom ? "margin-bottom: 30px" : null)};
`;

const OfferSliderBox = styled.div`
  width: 100%;
  ${(props) => (props.md_bottom ? "margin: 0" : "margin: -4px 0 20px 0")};
  border-top: 8px solid ${Color.gray100};
  border-bottom: 8px solid ${Color.gray100};
  position: relative;
`;

const BottomBox = styled.div`
  width: 100%;
  height: 32px;
  position: absolute;
  bottom: 0px;
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
    opacity: 0.7;
    z-index: 1;
  }
`;

const MdBox = styled.div`
  width: 100%;
  height: 208px;
  background-color: ${Color.gray800};
  margin: 22px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-image: url("https://lh3.googleusercontent.com/pw/AM-JKLWSzGXMxqDz78istsHPT-R9gjN-iDKqA48koTRwLHHaiUOwWjpjurhUQF3jb8q4XukxQpAMrabtNceGVSKh2_idGz2h9HoZU4dV4dtTdA2mn2ICENPjgpGHz8EEgPR4vw1Oub4gh-swnzDko6sYIzfX=w360-h200-no?authuser=0");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  border-top: 8px solid ${Color.gray100};
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
  ${(props) => props.button && "justify-content: center"};
`;

const TitleGrid = styled.div`
  display: flex;
  width: 100%;
  height: 65px;
  ${(props) => (props.no_margin ? "margin-top: -1px" : "margin-top: 30px")};
  ${(props) =>
    props.no_border ? null : ` border-top: 8px solid ${Color.gray100}`};
  padding: 10px 16px 0;
  align-items: center;
  justify-content: space-between;
`;

const FlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 0 23px;
  cursor: pointer;
`;

const FlexReviewerGrid = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0 20px 0;
  padding: 0 16px;
  cursor: pointer;
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
  margin-right: 5px;
  height: 48px;
  justify-content: space-around;
  padding: 4px;
`;

const ReviewGrid = styled.div`
  width: 100%;
  padding: 0 16px;
  height: auto;
`;

const MdInfoBox = styled.div`
  height: 90px;
  display: flex;
  position: absolute;
  bottom: 20px;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0 20px;
`;

const PositionGrid = styled.div`
  position: relative;
  width: 100%;
`;

const BlurBox = styled.div`
  width: 100%;
  height: 900px;
  background: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 48%,
    rgba(255, 255, 255, 1) 56%,
    rgba(255, 255, 255, 1) 99%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 48%,
    rgba(255, 255, 255, 1) 56%,
    rgba(255, 255, 255, 1) 99%
  );
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 48%,
    rgba(255, 255, 255, 1) 56%,
    rgba(255, 255, 255, 1) 99%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */

  z-index: 3;
  position: absolute;
`;

const BlurContentBox = styled.div`
  width: 100%;
  padding: 0 28px;
  position: absolute;
  bottom: 220px;
  display: flex;
  flex-direction: column;
`;

const TextGrid = styled.div`
  width: 100%;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const CardSliderBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: scroll;
  padding-right: 150px;
  -ms-overflow-style: none;
  gap: 10px;

  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const TooltipGrid = styled.div`
  display: flex;
  gap: 5px;
`;

export default Recommendation;
