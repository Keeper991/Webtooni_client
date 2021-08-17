import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { history } from "../redux/configureStore";
import { Color } from "../shared/common";

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
          <Text tag="p" fontWeight="medium">
            {props.toonTitle}
          </Text>

          <FlexGrid flexStart>
            <Text tag="p" type="caption" color={Color.gray500}>
              {props.toonAuthor}
            </Text>
            <FlexGrid>
              <Image
                shape="square"
                margin="0 5px"
                size="12px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
              ></Image>
              <Text type="num" fontSize="12px">
                {props.toonAvgPoint}
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
`;

const ImageGrid = styled.div`
  width: 40px;
  height: 40px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  height: 36px;
  margin-left: 5px;
  justify-content: space-between;
`;

export default WebToonMonth;
