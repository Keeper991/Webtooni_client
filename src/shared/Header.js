import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../elements/index";
import { withRouter } from "react-router";

const Header = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

  const handleLogOut = () => {
    dispatch(userActions.logOut());
  };

  if (props.location.pathname === "/login") {
    return (
      <Container>
        <Button
          _onClick={() => {
            history.push("/");
          }}
          margin="0 0 0 15px"
          fontWeight="bold"
          fontSize="17px"
          color="#fff"
          border="none"
          bgColor="#333"
        >
          Webtooniverse
        </Button>
      </Container>
    );
  }

  if (is_login) {
    return (
      <React.Fragment>
        <Container>
          <Button
            _onClick={() => {
              history.push("/");
            }}
            margin="0 0 0 15px"
            fontWeight="bold"
            fontSize="17px"
            color="#fff"
            border="none"
            bgColor="#333"
          >
            Webtooniverse
          </Button>
          <Button
            color="#fff"
            bgColor="#333"
            border="none"
            _onClick={handleLogOut}
          >
            로그아웃
          </Button>
        </Container>
        <PageBtnBox>
          <Button
            _onClick={() => {
              history.push("/recommendation");
            }}
            margin="0 10px"
            width="70px"
            height="30px"
            bgColor="#fff"
            border="none"
          >
            추천
          </Button>
          <Button
            _onClick={() => {
              history.push("/review");
            }}
            margin="0 10px"
            width="70px"
            height="30px"
            bgColor="#fff"
            border="none"
          >
            리뷰
          </Button>
          <Button
            _onClick={() => {
              history.push("/board");
            }}
            margin="0 10px"
            width="70px"
            height="30px"
            bgColor="#fff"
            border="none"
          >
            톡톡
          </Button>
        </PageBtnBox>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Container>
        <Button
          _onClick={() => {
            history.push("/");
          }}
          margin="0 0 0 15px"
          fontWeight="bold"
          fontSize="17px"
          color="#fff"
          border="none"
          bgColor="#333"
        >
          Webtooniverse
        </Button>

        <Button
          color="#fff"
          bgColor="#333"
          border="none"
          _onClick={() => {
            history.push("/login");
          }}
        >
          로그인
        </Button>
      </Container>
      <PageBtnBox>
        <Button
          _onClick={() => {
            history.push("/recommendation");
          }}
          margin="0 10px"
          width="70px"
          height="30px"
          bgColor="#fff"
          border="none"
        >
          추천
        </Button>
        <Button
          _onClick={() => {
            history.push("/review");
          }}
          margin="0 10px"
          width="70px"
          height="30px"
          bgColor="#fff"
          border="none"
        >
          리뷰
        </Button>
        <Button
          _onClick={() => {
            history.push("/board");
          }}
          margin="0 10px"
          width="70px"
          height="30px"
          bgColor="#fff"
          border="none"
        >
          톡톡
        </Button>
      </PageBtnBox>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 70px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageBtnBox = styled.div`
  display: flex;
  margin: 20px 0;
`;

export default withRouter(Header);
