import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../elements/index";

const Header = () => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

  const handleLogOut = () => {
    dispatch(userActions.logOut());
  };

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

export default Header;
