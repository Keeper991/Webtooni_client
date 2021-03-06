import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Image, Input, Text } from "../elements";
import { Color } from "../shared/common";
import { history } from "../redux/configureStore";
import profileImgList from "../images/profiles";
import { ProgressStepBtns } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as modalActions } from "../redux/modules/modal";

const TASTE_LS = "TASTE_LIST";
const PROFILE_LS = "PROFILE";
const USERNAME_LS = "USERNAME";

const Profile = ({ location: { state } }) => {
  const dispatch = useDispatch();

  //states
  const [profile, setProfile] = useState(-1);
  const [userName, setUserName] = useState("");

  //selectors
  const isLogin = useSelector((state) => state.user.is_login);
  const isShownWelcomeModal = useSelector(
    (state) => state.user.info.isShownWelcomeModal
  );
  const isChecking = useSelector((state) => state.user.isChecking);

  const isEditFromUserPage = state?.editProfile;
  const curUserName = useSelector((state) => state.user.info.userName);
  const curUserImg = useSelector((state) => state.user.info.userImg);
  const curGenres = useSelector((state) => state.user.info.genres);

  //effects
  useEffect(() => {
    const tasteDataLS = localStorage.getItem(TASTE_LS);
    // 프로필 수정 시 기존 데이터 불러오기
    if (isEditFromUserPage) {
      setProfile(curUserImg);
      setUserName(curUserName);
      localStorage.setItem(TASTE_LS, curGenres);
      return;
    }
    // 취향 미선택 시 취향 선택 페이지 이동
    if (!tasteDataLS) {
      history.replace("/taste");
    }

    // 프로필 설정
    const profileDataLS = localStorage.getItem(PROFILE_LS);
    profileDataLS && setProfile(parseInt(profileDataLS));
    const userNameDataLS = localStorage.getItem(USERNAME_LS);
    userNameDataLS && setUserName(userNameDataLS);
  }, []);

  useEffect(() => {
    if (isEditFromUserPage) {
      return;
    }
    // 잘못된 접근 시 메인페이지 이동
    if (!isChecking && !(isLogin === true && isShownWelcomeModal === false)) {
      dispatch(modalActions.activeModal("noAuth"));
      history.push("/");
    }
  }, [isLogin, isChecking]);

  // 취향/프로필 페이지 이동 함수
  const progressStepClickHandlers = [
    () => {
      localStorage.setItem(PROFILE_LS, profile);
      localStorage.setItem(USERNAME_LS, userName);
      history.push("/taste");
    },
    () => history.push("/profile"),
  ];

  // 작성한 프로필 등록
  const submitUserInfo = () => {
    if (!/^[a-zA-Z0-9가-힣_]{3,8}$/.test(userName)) {
      dispatch(modalActions.activeModal("invalidName"));
      return;
    }
    const data = {
      genres: localStorage.getItem(TASTE_LS).split(","),
      userImg: profile,
      userName: userName,
      isShownWelcomeModal: isEditFromUserPage,
    };
    const removeInfoData = () => {
      localStorage.removeItem(TASTE_LS);
      localStorage.removeItem(PROFILE_LS);
      localStorage.removeItem(USERNAME_LS);
    };
    dispatch(
      userActions.setUserServer(data, removeInfoData, isEditFromUserPage)
    );
  };

  return (
    <Container>
      <ContentWrap>
        <ProgressArea>
          {/* 최초 로그인 시의 취향/프로필페이지 이동 버튼 */}
          {!isEditFromUserPage && (
            <ProgressStepBtns
              currentPageNum={2}
              clickHandlers={progressStepClickHandlers}
            />
          )}
        </ProgressArea>
        <TitleArea>
          <Text type="h1" fontWeight="bold">
            프로필을 선택해주세요
          </Text>
        </TitleArea>
        {profile === -1 ? (
          // 프로필 이미지 선택
          <ProfileArea>
            {profileImgList.map((profileImg, i) => (
              <Button
                key={i}
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
          // 닉네임 설정
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
                maxLength={8}
                placeholder="닉네임 입력"
                margin="0 0 5px 0"
              >
                닉네임
              </Input>
              <Text type="caption" color={Color.gray300} padding="0 0 0 5px">
                닉네임은 3~8자리의 한글, 숫자, 영어, _만 사용가능합니다.
              </Text>
            </UserNameArea>
          </>
        )}
      </ContentWrap>

      {profile === -1 || !userName ? (
        // 프로필 이미지 선택 후 비활성화된 버튼
        <Button width="100%" margin="0 auto" disabled>
          가입완료
        </Button>
      ) : (
        // 최종 완료 버튼
        <Button
          width="100%"
          margin="0 auto"
          bgColor={Color.black}
          color={Color.white}
          _onClick={submitUserInfo}
        >
          {isEditFromUserPage ? "수정완료" : "가입완료"}
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 360px;
  position: relative;
  top: -50px;
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
