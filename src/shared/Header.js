import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image } from "../elements/index";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Color } from "./common";

const Header = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

  const handleLogOut = () => {
    dispatch(userActions.logOut());
  };

  const throttle = function (callback, waitTime) {
    let timerId = null;
    return (e) => {
      if (timerId) return;
      timerId = setTimeout(() => {
        callback.call(this, e);
        timerId = null;
      }, waitTime);
    };
  };

  const [hide, setHide] = React.useState(false);
  const [pageY, setPageY] = React.useState(0);
  const documentRef = React.useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  React.useEffect(() => {
    documentRef.current.addEventListener("scroll", throttleScroll);
    return () =>
      documentRef.current.removeEventListener("scroll", throttleScroll);
  }, [pageY]);

  if (
    props.location.pathname === "/login" ||
    props.location.pathname === "/profile" ||
    props.location.pathname === "/taste"
  ) {
    return (
      <LoginHeaderWrap>
        <Button
          _onClick={() => {
            history.push("/");
          }}
          border="none"
          bgColor={Color.white}
          width="151px"
          height="25px"
          borderRadius="none"
          padding="0"
          margin="-10px 0 0 15px"
        >
          <Image
            width="100%"
            height="25px"
            src="https://lh3.googleusercontent.com/pw/AM-JKLXT8w8Fi8N_J4qEQdB2mlrNjcj_p7g67WEiyBiwZPw2__VjiJYiaYfWgAs8hFj8p2wwWJaaqYATW0rFu9zc-apqE_5kw7_If516xxw0Mia2-4ouK1qmTxyY7dr8ZQrGVwQRvjhVBerRu-ddqBYN6xk4=w151-h25-no?authuser=0"
          ></Image>
        </Button>
      </LoginHeaderWrap>
    );
  }

  if (is_login) {
    return (
      <React.Fragment>
        <Container className={hide && "hide"}>
          <HeaderWrap>
            <Button
              _onClick={() => {
                history.push("/");
              }}
              border="none"
              bgColor={Color.white}
              width="151px"
              height="25px"
              borderRadius="none"
              padding="0"
              margin="-10px 0 0 15px"
            >
              <Image
                width="100%"
                height="25px"
                src="https://lh3.googleusercontent.com/pw/AM-JKLXT8w8Fi8N_J4qEQdB2mlrNjcj_p7g67WEiyBiwZPw2__VjiJYiaYfWgAs8hFj8p2wwWJaaqYATW0rFu9zc-apqE_5kw7_If516xxw0Mia2-4ouK1qmTxyY7dr8ZQrGVwQRvjhVBerRu-ddqBYN6xk4=w151-h25-no?authuser=0"
              ></Image>
            </Button>

            <Button
              color={Color.black}
              bgColor={Color.white}
              border="none"
              _onClick={handleLogOut}
            >
              로그아웃
            </Button>
          </HeaderWrap>

          <PageBtnBox>
            <NavBtn
              onClick={() => {
                history.push("/recommendation");
              }}
            >
              추천
            </NavBtn>
            <NavBtn
              onClick={() => {
                history.push("/review");
              }}
            >
              리뷰
            </NavBtn>
            <NavBtn
              onClick={() => {
                history.push("/talk");
              }}
            >
              톡톡
            </NavBtn>
          </PageBtnBox>
        </Container>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Container className={hide && "hide"}>
        <HeaderWrap>
          <Button
            _onClick={() => {
              history.push("/");
            }}
            border="none"
            bgColor={Color.white}
            width="151px"
            height="25px"
            borderRadius="none"
            padding="0"
            margin="-10px 0 0 15px"
          >
            <Image
              width="100%"
              height="25px"
              src="https://lh3.googleusercontent.com/pw/AM-JKLXT8w8Fi8N_J4qEQdB2mlrNjcj_p7g67WEiyBiwZPw2__VjiJYiaYfWgAs8hFj8p2wwWJaaqYATW0rFu9zc-apqE_5kw7_If516xxw0Mia2-4ouK1qmTxyY7dr8ZQrGVwQRvjhVBerRu-ddqBYN6xk4=w151-h25-no?authuser=0"
            ></Image>
          </Button>

          <Button
            color={Color.black}
            bgColor={Color.white}
            border="none"
            _onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Button>
        </HeaderWrap>

        <PageBtnBox>
          <NavLink
            activeStyle={activeStyle}
            exact
            to="/recommendation"
            style={defaultStyle}
          >
            추천
          </NavLink>

          <NavLink
            activeStyle={activeStyle}
            exact
            to="/review"
            style={defaultStyle}
          >
            리뷰
          </NavLink>

          <NavLink
            activeStyle={activeStyle}
            exact
            to="/talk"
            style={defaultStyle}
          >
            톡톡
          </NavLink>
        </PageBtnBox>
      </Container>
    </React.Fragment>
  );
};

const defaultStyle = {
  width: "50px",
  height: "55px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  color: Color.black,
  fontSize: "16px",
  fontWeight: "bold",
  background: Color.white,
  margin: "0 7px",
};

const activeStyle = {
  color: `${Color.orange}`,
  borderBottom: "2px solid orange",
  marginTop: "2px",
};

const PageBtnBox = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 40;
  background: ${Color.white};
`;

const Container = styled.div`
  width: 100vw;
  top: 0;
  z-index: 90;
  position: fixed;
  transition: 0.4s ease;
  &.hide {
    transform: translateY(-70px);
  }
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
const NavBtn = styled.button`
  margin: 0 10px;
  width: 70px;
  height: 30px;
  background: ${Color.white};
  border: none;
  font-size: 16px;
  font-weight: bold;
`;

const HeaderWrap = styled.div`
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 70px;
  transition: 0.4s ease;
  background-color: ${Color.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const LoginHeaderWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 70px;
  background-color: ${Color.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

export default withRouter(Header);
