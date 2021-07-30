import React from "react";
import styled from "styled-components";
import { actionCreators as modalActions } from "../../redux/modules/modal";
import { actionCreators as userActions } from "../../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { Text, Input, Button } from "../../elements";
import { emailCheck } from "../common";

const ModalContents = (props) => {

  const dispatch = useDispatch();

  const onLogin = props.loginModal;
  const onSignUp = props.signUpModal;

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [nickName, setNickName] = React.useState("");
  const [pwdCheck, setPwdCheck] = React.useState("");
  const [profileImage, setProfileImage] = React.useState();

  const handleLogin = () => {

    if (id === "" || pwd === "") {
      window.alert("아이디, 패스워드를 모두 입력해주세요.");
      return;
    };

    if (!emailCheck(id)) {
      window.alert("이메일 형식이 아닙니다.");
      return;
    };

    console.log(id, pwd);
    props.getLogin(false);
    dispatch(modalActions.modalToggle(false));
    dispatch(userActions.loginDB(id, pwd));
  };

  const handleSignUp = () => {

    if (id === "" || nickName ==="" || pwd === "" || pwdCheck === "") {
      window.alert("아이디, 패스워드, 패스워드 확인을 모두 입력해주세요.");
      return;
    };

    if (!emailCheck(id)) {
      window.alert("이메일 형식이 아닙니다.");
      return;
    };

    if (pwd !== pwdCheck) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다.");
      return;
    }

    dispatch(userActions.signUpDB( id, nickName, pwd, pwdCheck, profileImage ));
    props.getSignUp(false);
    dispatch(modalActions.modalToggle(false));
  };


  if (onLogin) {
    return (
      <ModalWrap>
        <Text>로그인</Text>
        <Input placeholder="아이디를 입력해주세요." _onChange={(e) => {setId(e.target.value)}}></Input>
        <Input placeholder="패스워드를 입력해주세요." _onChange={(e) => {setPwd(e.target.value)}}></Input>
        <Button _onClick={handleLogin}>로그인하기</Button>
      </ModalWrap>
    );
  };

  if (onSignUp) {
    return (
      <ModalWrap>
        <Text>회원가입</Text>
        <Input placeholder="아이디를 입력해주세요." _onChange={(e) => {setId(e.target.value)}}></Input>
        <Input placeholder="닉네임을 입력해주세요." _onChange={(e) => {setNickName(e.target.value)}}></Input>
        <Input placeholder="패스워드를 입력해주세요." _onChange={(e) => {setPwd(e.target.value)}}></Input>
        <Input placeholder="패스워드를 다시 입력해주세요." _onChange={(e) => {setPwdCheck(e.target.value)}}></Input>
        <Text>프로필 사진을 선택해주세요.</Text>
        <div>
          <input type="radio" name="profile" value="1" onChange={(e) => {setProfileImage(e.target.value)}}></input>
          <label htmlFor="1">1번</label>
        </div>
        <div>
          <input type="radio" name="profile" value="2" onChange={(e) => {setProfileImage(e.target.value)}}></input>
          <label htmlFor="2">2번</label>
        </div>
        <div>
          <input type="radio" name="profile" value="3" onChange={(e) => {setProfileImage(e.target.value)}}></input>
          <label htmlFor="3">3번</label>
        </div>
        <div>
          <input type="radio" name="profile" value="4" onChange={(e) => {setProfileImage(e.target.value)}}></input>
          <label htmlFor="4">4번</label>
        </div>
        <div>
          <input type="radio" name="profile" value="5" onChange={(e) => {setProfileImage(e.target.value)}}></input>
          <label htmlFor="5">5번</label>
        </div>
        <Button _onClick={handleSignUp}>회원가입하기</Button>
      </ModalWrap>
    );
  };
 
  return null;

}

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export default ModalContents;