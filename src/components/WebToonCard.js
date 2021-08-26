import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
import { FillStar } from "../images/icons";
import { kakao_webtoon_symbol, naver_webtoon_symbol } from "../images/symbols";

const WebToonCard = (props) => {
  return (
    <React.Fragment>
      <Container
        onClick={() => {
          history.push(`/detail/${props.toonId}`);
        }}
      >
        {props.index ? (
          <RankImageGrid index={props.index} rank={props.rank}>
            <Image
              src={props.toonImg}
              width="100%"
              height="100%"
              radius="5px"
            ></Image>
          </RankImageGrid>
        ) : (
          <ImageGrid index={props.index} rank={props.rank}>
            <Image
              src={props.toonImg}
              width="100%"
              height="100%"
              radius="5px"
            ></Image>
          </ImageGrid>
        )}

        <ContentsGrid>
          <FlexGrid>
            {props?.detail ? (
              <Text color={Color.primary} type="caption">
                {props.toonWeekday ? props.toonWeekday : "완결"}
              </Text>
            ) : (
              <FlexGrid>
                <Text color={Color.primary} type="caption">
                  {props?.genres && props.genres[props.genres.length - 1]}
                </Text>
                <Text color={Color.gray400} type="caption" margin="0 0 0 7px">
                  {props.toonWeekday ? props.toonWeekday : "완결"}
                </Text>
              </FlexGrid>
            )}
            <FlexGrid>
              <FillStar
                width="12px"
                height="12px"
                style={{ marginRight: "5px" }}
              />
              <Text
                type="num"
                fontSize="12px"
                fontWeight="bold"
                color={Color.gray700}
              >
                {props.toonAvgPoint}
              </Text>
            </FlexGrid>
          </FlexGrid>
          <TitleWrap>
            <Text fontWeight="medium" color={Color.gray800}>
              {props.toonTitle}
            </Text>
          </TitleWrap>
          <FlexGrid>
            <AuthorWrap>
              <Text type="caption" color={Color.gray400}>
                {props.toonAuthor}
              </Text>
            </AuthorWrap>
            {props.toonPlatform === "카카오" ? (
              <KakaoLogo kakao={kakao_webtoon_symbol}></KakaoLogo>
            ) : (
              <NaverLogo naver={naver_webtoon_symbol}></NaverLogo>
            )}
          </FlexGrid>
        </ContentsGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 150px;
  height: 220px;
  background: ${Color.white};
  display: inline-block;
  position: relative;
`;

const FlexGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
`;

const ContentsGrid = styled.div`
  padding: 0 5px;
  width: 100%;
  height: 76px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ImageGrid = styled.div`
  width: 150px;
  height: 140px;
`;

const RankImageGrid = styled.div`
  width: 150px;
  height: 140px;

  &:before {
    content: "${(props) => props.index}";
    display: flex;
    position: absolute;
    width: 22px;
    height: 22px;
    background-color: ${Color.gray700};
    font-size: 9px;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 5px;
  }
`;

const AuthorWrap = styled.div`
  width: 120px;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const TitleWrap = styled.div`
  width: 140px;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const KakaoLogo = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("${(props) => props.kakao}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 3px;
`;

const NaverLogo = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("${(props) => props.naver}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 3px;
`;
export default WebToonCard;
