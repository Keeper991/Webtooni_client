import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Button, Image, Input, Text } from "../elements";
import { Color } from "../shared/common";

import { history } from "../redux/configureStore";

import profileImgList from "../images/profiles";
import ProgressStepBtns from "../components/ProgressStepBtns";
import { useDispatch } from "react-redux";
import { meAPI } from "../shared/API";

const TASTE_LS = "TASTE_LIST";
const PROFILE_LS = "PROFILE";
const USERNAME_LS = "USERNAME";

const Profile = () => {
  const [profile, setProfile] = useState(-1);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const tasteDataLS = localStorage.getItem(TASTE_LS);
    if (!tasteDataLS) {
      history.replace("/taste");
    }

    const profileDataLS = localStorage.getItem(PROFILE_LS);
    profileDataLS && setProfile(parseInt(profileDataLS));
    const userNameDataLS = localStorage.getItem(USERNAME_LS);
    userNameDataLS && setUserName(userNameDataLS);
  }, []);

  const progressStepClickHandlers = [
    () => {
      localStorage.setItem(PROFILE_LS, profile);
      localStorage.setItem(USERNAME_LS, userName);
      history.push("/taste");
    },
    () => history.push("/profile"),
  ];

  const submitUserInfo = () => {
    const data = {
      toonGenre: localStorage.getItem(TASTE_LS).split(","),
      userProfile: profile,
      userName: userName,
    };
    // dispatch register api..
  };

  return (
    <Container>
      <ProgressArea>
        <ProgressStepBtns
          currentPageNum={2}
          clickHandlers={progressStepClickHandlers}
        />
      </ProgressArea>
      <TitleArea>
        <Text type="title" fontSize="3rem" fontWeight={600}>
          프로필을 선택해주세요
        </Text>
      </TitleArea>
      {profile === -1 ? (
        <ProfileArea>
          {profileImgList.map((profileImg, i) => (
            <Button
              shape="circle"
              size="auto"
              border="none"
              padding="0"
              bgColor="transparent"
              _onClick={() => {
                setProfile(i + 1);
                localStorage.setItem(PROFILE_LS, profile);
              }}
            >
              <Image shape="circle" size="4em" src={profileImg} />
            </Button>
          ))}
        </ProfileArea>
      ) : (
        <>
          <ReSelectBtnArea>
            <Button
              bgColor="transparent"
              width="auto"
              height="auto"
              padding="0"
              border="none"
              _onClick={() => {
                setProfile(-1);
              }}
            >
              <u>재선택</u>
            </Button>
          </ReSelectBtnArea>
          <ProfileArea>
            <Image
              shape="circle"
              size="8em"
              src={profileImgList[profile - 1]}
            />
          </ProfileArea>
          <UserNameArea>
            <Input
              value={userName}
              _onChange={(e) => setUserName(e.target.value)}
              placeholder="닉네임 입력"
            >
              닉네임
            </Input>
          </UserNameArea>
        </>
      )}

      {profile === -1 ? (
        <Button width="90%" margin="0 auto" disabled>
          가입완료
        </Button>
      ) : (
        <Button
          width="90%"
          margin="0 auto"
          bgColor={Color.black}
          color={Color.white}
          _onClick={submitUserInfo}
        >
          가입완료
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 360px;
  height: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProgressArea = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleArea = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > *:last-child {
    text-align: center;
    line-height: 1.25;
    margin-top: 1em;
  }
`;

const ProfileArea = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 4px;
  padding-bottom: 3em;
`;

const ReSelectBtnArea = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const UserNameArea = styled.section``;

export default Profile;
