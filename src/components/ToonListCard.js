import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Image, Text } from "../elements";
import { Color } from "../shared/common";
import { FillStar } from "../images/icons";
import { kakao_webtoon_symbol, naver_webtoon_symbol } from "../images/symbols";

const ToonListCard = (props) => {
  const is_search = props.search;

  if (is_search) {
    return (
      <React.Fragment>
        <FlexToonGrid
          onClick={() => {
            if (props.review) {
              return history.push({
                pathname: `/review/write/${props.toonId}`,
                state: { toonTitle: props.toonTitle },
              });
            }
            return history.push(`/detail/${props.toonId}`);
          }}
        >
          <ImageGrid>
            <Image
              radius="5px"
              src={props.toonImg}
              width="100%"
              height="100%"
            ></Image>
          </ImageGrid>

          <InfoGrid>
            <FlexGrid flexStart>
              <Text type="caption" color={Color.gray400}>
                {props.toonWeekday ? props.toonWeekday : "완결"}
              </Text>
            </FlexGrid>
            <Text fontWeight="bold">{props.toonTitle}</Text>

            <FlexGrid>
              <FlexGrid>
                <AuthorWrap>
                  <Text type="caption" color={Color.gray400}>
                    {props.toonAuthor}
                  </Text>
                </AuthorWrap>
                <FillStar
                  width="12px"
                  height="12px"
                  style={{ margin: "0 3px 0 5px" }}
                />
                <Text
                  type="num"
                  fontWeight="bold"
                  fontSize="12px"
                  color={Color.primary}
                >
                  {props.toonAvgPoint}
                </Text>
              </FlexGrid>

              {props.toonPlatform === "카카오" ? (
                <FlexGrid>
                  <KakaoLogo kakao={kakao_webtoon_symbol}></KakaoLogo>
                  <Text type="small">카카오 웹툰</Text>
                </FlexGrid>
              ) : (
                <FlexGrid>
                  <NaverLogo naver={naver_webtoon_symbol}></NaverLogo>
                  <Text type="small">네이버 웹툰</Text>
                </FlexGrid>
              )}
            </FlexGrid>
          </InfoGrid>
        </FlexToonGrid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <FlexToonGrid
        onClick={() => {
          if (props.review) {
            return history.push({
              pathname: `/detail/${props.toonId}`,
              state: { toonTitle: props.toonTitle },
            });
          }
          return history.push(`/detail/${props.toonId}`);
        }}
      >
        <ImageGrid>
          <Image
            radius="5px"
            src={props.toonImg}
            width="100%"
            height="100%"
          ></Image>
        </ImageGrid>

        <InfoGrid>
          <FlexGrid flexStart>
            {props?.detail ? null : (
              <Text type="caption" color={Color.primary} margin="0 7px 0 0">
                {props?.genres && props.genres[props.genres.length - 1]}
              </Text>
            )}
            <Text type="caption" color={Color.gray400}>
              {props.toonWeekday ? props.toonWeekday : "완결"}
            </Text>
          </FlexGrid>
          <Text fontWeight="bold">{props.toonTitle}</Text>

          <FlexGrid>
            <FlexGrid>
              <AuthorWrap>
                <Text type="caption" color={Color.gray400}>
                  {props.toonAuthor}
                </Text>
              </AuthorWrap>
              <FillStar
                width="12px"
                height="12px"
                style={{ margin: "0 3px 0 5px" }}
              />
              <Text
                type="num"
                fontWeight="bold"
                fontSize="12px"
                color={Color.primary}
              >
                {props.toonAvgPoint}
              </Text>
            </FlexGrid>

            {props.toonPlatform === "카카오" ? (
              <FlexGrid>
                <KakaoLogo kakao={kakao_webtoon_symbol}></KakaoLogo>
                <Text type="small">카카오 웹툰</Text>
              </FlexGrid>
            ) : (
              <FlexGrid>
                <NaverLogo naver={naver_webtoon_symbol}></NaverLogo>
                <Text type="small">네이버 웹툰</Text>
              </FlexGrid>
            )}
          </FlexGrid>
        </InfoGrid>
      </FlexToonGrid>
    </React.Fragment>
  );
};

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) => props.flexStart && `justify-content: start;`};
`;

const FlexToonGrid = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0 16px;
  border-bottom: 1px solid ${Color.gray100};
  &:last-child {
    border-bottom: 1px solid ${Color.white};
  }
`;

const ImageGrid = styled.div`
  width: 64px;
  height: 64px;
`;

const InfoGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 80%;
  height: 64px;
  padding-left: 13px;
`;

const AuthorWrap = styled.div`
  max-width: 130px;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const KakaoLogo = styled.div`
  width: 14px;
  height: 14px;
  background-image: url("${(props) => props.kakao}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 3px;
  margin-right: 3px;
`;

const NaverLogo = styled.div`
  width: 14px;
  height: 14px;
  background-image: url("${(props) => props.naver}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 3px;
  margin-right: 3px;
`;
export default ToonListCard;
