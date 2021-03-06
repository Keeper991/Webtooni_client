import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";
import { ReactComponent as FillStar } from "../images/icons/FillStar.svg";

// 메인페이지 플랫폼별 Top10용 웹툰 카드
const WebToonMonth = (props) => {
  return (
    <React.Fragment>
      <FlexToonGrid
        onClick={() => {
          history.push(`/detail/${props.toonId}`);
        }}
      >
        <Text type="num" fontSize="12px" fontWeight="bold" margin="0 16px 0 0">
          {props.idx + 1}
        </Text>
        <ImageGrid index={props.idx + 1}>
          <Image
            src={props.toonImg}
            width="40px"
            height="40px"
            radius="4px"
          ></Image>
        </ImageGrid>

        <InfoGrid>
          <Text fontWeight="medium">{props.toonTitle}</Text>

          <FlexGrid flexStart>
            <Text type="caption" color={Color.gray500}>
              {props.toonAuthor}
            </Text>
            <FlexGrid>
              <FillStar
                width="12px"
                height="12px"
                style={{ margin: "0 5px" }}
              />
              <Text type="num" fontSize="12px">
                {props.fixedAvgPoint}
              </Text>
            </FlexGrid>
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
  margin: 10px 0;
  cursor: pointer;
`;

const ImageGrid = styled.div`
  width: 40px;
  height: 40px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  height: 36px;
  margin-left: 10px;
  padding: 2px 0;
  justify-content: space-between;
`;

export default WebToonMonth;
