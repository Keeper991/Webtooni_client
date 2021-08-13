import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Image, Input, Text } from "../elements";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";
import profileImgList from "../images/profiles";
import { ProgressStepBtns } from "../components";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

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
      genres: localStorage.getItem(TASTE_LS).split(","),
      userImg: profile,
      userName: userName,
      isShownWelcomeModal: false,
    };
    localStorage.removeItem(TASTE_LS);
    localStorage.removeItem(PROFILE_LS);
    localStorage.removeItem(USERNAME_LS);
    dispatch(userActions.setUserServer(data));
  };

  return (
    <Container>
      <ContentWrap>
        <ProgressArea>
          <ProgressStepBtns
            currentPageNum={2}
            clickHandlers={progressStepClickHandlers}
          />
        </ProgressArea>
        <TitleArea>
          <Text type="h1" fontWeight="bold">
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
                  setProfile(i);
                  localStorage.setItem(PROFILE_LS, i);
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
                color={Color.gray400}
                _onClick={() => {
                  setProfile(-1);
                }}
              >
                <u>재선택</u>
              </Button>
            </ReSelectBtnArea>
            <SelectedProfileArea>
              <Image shape="circle" size="90px" src={profileImgList[profile]} />
            </SelectedProfileArea>
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
      </ContentWrap>
      {profile === -1 || !userName ? (
        <Button width="100%" margin="0 auto" disabled>
          가입완료
        </Button>
      ) : (
        <Button
          width="100%"
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
  height: 502px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrap = styled.div`
  & > section:first-child {
    margin-bottom: 32px;
  }
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
`;

const ProfileArea = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 4px;
  padding-bottom: 3em;
  margin-top: 43px;
`;

const ReSelectBtnArea = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;
`;

const SelectedProfileArea = styled.section`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;

const UserNameArea = styled.section`
  margin-top: 43px;
`;

export default Profile;
