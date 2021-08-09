import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Image, Text } from "../elements";
import { Color } from "../shared/common";

const ToonListCard = (props) => {
  return (
    <React.Fragment>
      <FlexToonGrid
        onClick={() => {
          history.push(`/detail/${props.id}`);
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
            <Text fontSize="12px" color={Color.orange}>
              {props.genre ? props.genre.genreType : null}
            </Text>
            <Text type="p" margin="0 15px" fontSize="12px" color={Color.gray}>
              {props.toonWeekday ? props.toonWeekday : "완결"}
            </Text>
          </FlexGrid>
          <TitleText>{props.toonTitle}</TitleText>

          <FlexGrid>
            <FlexGrid>
              <AuthorText>{props.toonAuthor}</AuthorText>
              <Image
                shape="square"
                margin="0 5px 0 5px"
                size="12px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLXIrRX56QwruA9no5dsQDpzLmNNgGigp4H-mNbe8Zll_MgRc1OVhN8nKaqDwTOSKiNGUT6bQ6O7sYRBDsPhnj49j7ACDz5qWrSeebdROovTQKhnt8O2jbq6QpskSozPMpq02E2hUQqTjg3gfLZpx-xv=s12-no?authuser=0"
              ></Image>
              <Text fontSize="12px">{props.toonAvgPoint}</Text>
            </FlexGrid>
            <Text fontSize="10px">{props.toonWeekday}</Text>
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
  padding: 0 15px;
  border-bottom: 1px solid ${Color.lightGray3};
`;

const ImageGrid = styled.div`
  width: 64px;
  height: 64px;
`;

const InfoGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 260px;
  height: 64px;
  margin-left: 5px;
`;

const TitleText = styled.p`
  font-size: 14px;
  color: ${Color.black};
  font-weight: bold;
`;

const AuthorText = styled.p`
  font-size: 12px;
  max-width: 130px;
  color: ${Color.darkGray};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

`;
export default ToonListCard;
