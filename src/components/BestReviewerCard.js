import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { Color } from "../shared/common";
import profileImgList from "../images/profiles";
import { history } from "../redux/configureStore";
import { Medal } from "../images/icons";
import { userGradeIcon } from "../shared/common";
const BestReveiwerCard = (props) => {
  const [first, setFirst] = React.useState(false);

  React.useEffect(() => {
    if (props.index === 0) {
      setFirst(true);
    }
  }, []);

  return (
    <React.Fragment>
      <Container
        onClick={() => {
          history.push(`/userinfo/${props.user?.userName}`);
        }}
      >
        {first && (
          <MedalGrid>
            <Medal></Medal>
          </MedalGrid>
        )}
        <Image
          src={profileImgList[props.user.userImg]}
          shape="circle"
          size="64px"
        ></Image>
        <Text type="medium" fontWeight="bold" color={Color.gray800}>
          {props.user?.userName}
        </Text>
        <FlexInfoGrid>
          <Text type="caption" color={Color.primary} fontWeight="bold">
            Lv.{props.user?.userScore}
          </Text>
          <Text type="caption">{userGradeIcon(props.user?.userGrade)}</Text>
        </FlexInfoGrid>
        <BottomGrid>
          <FlexGrid>
            <Text type="small" fontWeight="bold" color={Color.gray400}>
              리뷰 수
            </Text>
            <Text type="num" fontSize="14px" fontWeight="bold">
              {props?.reviewCount}
            </Text>
          </FlexGrid>
          <FlexGrid>
            <Text type="small" fontWeight="bold" color={Color.gray400}>
              좋아요 수
            </Text>
            <Text type="num" fontSize="14px" fontWeight="bold">
              {props?.likeCount}
            </Text>
          </FlexGrid>
        </BottomGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 120px;
  height: 150px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 0px;
  position: relative;
  cursor: pointer;
`;

const BottomGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const FlexGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 5px;
  gap: 5px;
`;

const MedalGrid = styled.div`
  width: 27px;
  height: 40px;
  position: absolute;
  top: -5px;
  left: 7px;
`;

const FlexInfoGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3px;
`;

export default BestReveiwerCard;
