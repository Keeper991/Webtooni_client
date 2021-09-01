import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image } from "../elements/index";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Color, globalConst, maxWidth } from "./common";
import { title } from "../images/icons";
import {
  UserOutlined,
  SearchOutlined,
  LeftOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const Header = (props) => {
  const dispatch = useDispatch();

  //selectors
  const is_login = useSelector((state) => state.user.is_login);
  const userName = useSelector((state) => state.user.info.userName);

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

  //states
  const [hide, setHide] = React.useState(false);
  const [pageY, setPageY] = React.useState(0);
  const [isTop, setIsTop] = React.useState(false);

  const documentRef = React.useRef(document);
  const { pageYOffset } = window;

  // 스크롤에 따른 헤어 숨김/표시 처리
  const handleScroll = () => {
    const { innerHeight } = window;
    const { pageYOffset } = window;
    const { scrollHeight } = document.documentElement;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;

    if (pageYOffset <= 20) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
    if (pageYOffset === 0) {
      setHide(false);
    }
    if (pageYOffset <= 20 || scrollHeight - innerHeight - scrollTop <= 0) {
      return;
    }

    if (Math.abs(pageY - pageYOffset) < 50) {
      return;
    }

    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  React.useEffect(() => {
    documentRef.current.addEventListener("scroll", throttleScroll);
    return () =>
      documentRef.current.removeEventListener("scroll", throttleScroll);
  }, [pageY]);

  const isTalk = props.location.pathname.includes("talk");

  // 헤더 없는 페이지
  if (
    props.location.pathname.includes("/talk/write") ||
    props.location.pathname === "/review/search" ||
    props.location.pathname.includes("/review/write/") ||
    props.location.pathname === "/profile" ||
    props.location.pathname === "/taste" ||
    props.location.pathname.includes("/user/")
  ) {
    return null;
  }

  // 로그인 페이지
  if (props.location.pathname === "/login") {
    return (
      <React.Fragment>
        <SimpleContainer is_login>
          <HeaderWrap is_simple>
            <LeftOutlined
              style={{ fontSize: "18px", margin: "25px 0" }}
              onClick={() => {
                history.goBack();
              }}
            ></LeftOutlined>
          </HeaderWrap>
        </SimpleContainer>
      </React.Fragment>
    );
  }

  // 웹툰 상세 및 톡톡 상세 페이지
  if (props.location.pathname.includes("/detail")) {
    return (
      <React.Fragment>
        <SimpleContainer
          underThumbnail={!isTalk && pageYOffset >= 250}
          underTalk={isTalk && pageYOffset >= 5}
          topTalk={isTalk && pageYOffset < 5}
          toon={isTalk ? false : true}
          talk={isTalk ? true : false}
        >
          <HeaderWrap is_simple bgColor={isTalk ? Color.white : "transparent"}>
            {isTalk || pageYOffset >= 250 ? (
              // 톡톡 & 웹툰 상세 썸네일 이후 헤더
              <>
                <LeftOutlined
                  style={{ fontSize: "18px", margin: "25px 0" }}
                  onClick={() => {
                    if (props.location.state?.from_detail) {
                      history.go(-3);
                    } else {
                      history.goBack();
                    }
                  }}
                ></LeftOutlined>
                <IconWrap>
                  <HomeOutlined
                    onClick={() => {
                      history.push("/");
                    }}
                  />
                  <SearchOutlined
                    onClick={() => {
                      history.push("/search");
                    }}
                    style={{
                      margin: "0 18px 0 20px",
                    }}
                  />
                  {is_login ? (
                    <UserOutlined
                      onClick={() =>
                        dispatch(() => history.push(`/userinfo/${userName}`))
                      }
                    />
                  ) : (
                    <Button
                      bgColor="transparent"
                      color={Color.black}
                      fontSize="12px"
                      border={`1px solid ${Color.gray200}`}
                      padding="7px 16px"
                      _onClick={() => {
                        localStorage.setItem(
                          globalConst.curRoute,
                          props.location.pathname
                        );
                        history.push("/login");
                      }}
                    >
                      로그인
                    </Button>
                  )}
                </IconWrap>
              </>
            ) : (
              // 웹툰 상세 썸네일 영역 헤더
              <>
                {" "}
                <LeftOutlined
                  style={{
                    fontSize: "18px",
                    margin: "25px 0",
                    color: "white",
                  }}
                  onClick={() => {
                    if (props.location.state?.from_detail) {
                      history.go(-3);
                    } else {
                      history.goBack();
                    }
                  }}
                ></LeftOutlined>
                <IconWrap>
                  <HomeOutlined
                    onClick={() => {
                      history.push("/");
                    }}
                    style={{
                      color: "white",
                    }}
                  />
                  <SearchOutlined
                    onClick={() => {
                      history.push("/search");
                    }}
                    style={{
                      color: "white",
                      margin: "0 18px 0 20px",
                    }}
                  />
                  {is_login ? (
                    <UserOutlined
                      onClick={() =>
                        dispatch(() => history.push(`/userinfo/${userName}`))
                      }
                      style={{
                        color: "white",
                      }}
                    />
                  ) : (
                    <Button
                      bgColor="transparent"
                      color={Color.white}
                      fontSize="12px"
                      border={`1px solid ${Color.white}`}
                      padding="7px 16px"
                      _onClick={() => {
                        localStorage.setItem(
                          globalConst.curRoute,
                          props.location.pathname
                        );
                        history.push("/login");
                      }}
                    >
                      로그인
                    </Button>
                  )}
                </IconWrap>{" "}
              </>
            )}
          </HeaderWrap>
        </SimpleContainer>
      </React.Fragment>
    );
  }

  // 그 외 모든 페이지
  return (
    <React.Fragment>
      <Container isHide={hide} isTop={isTop}>
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
          >
            <Image
              width="100%"
              height="25px"
              margin="-7px 0 0 0"
              src={title}
            ></Image>
          </Button>
          <IconWrap>
            <SearchOutlined
              onClick={() => {
                history.push("/search");
              }}
              style={{
                margin: "0 18px 0 0",
              }}
            />
            {is_login ? (
              <UserOutlined
                onClick={() => history.push(`/userinfo/${userName}`)}
              />
            ) : (
              <Button
                bgColor="transparent"
                color={Color.black}
                fontSize="12px"
                border={`1px solid ${Color.gray200}`}
                padding="7px 16px"
                _onClick={() => {
                  localStorage.setItem(
                    globalConst.curRoute,
                    props.location.pathname
                  );
                  history.push("/login");
                }}
              >
                로그인
              </Button>
            )}
          </IconWrap>
        </HeaderWrap>

        {!(
          props.location.pathname === "/login" ||
          props.location.pathname === "/profile" ||
          props.location.pathname === "/taste"
        ) && (
          <PageBtnBox>
            <StyleNavLink activeStyle={activeStyle} exact to="/">
              메인
            </StyleNavLink>
            <StyleNavLink activeStyle={activeStyle} exact to="/recommendation">
              추천
            </StyleNavLink>
            <StyleNavLink activeStyle={activeStyle} exact to="/review">
              리뷰
            </StyleNavLink>
            <StyleNavLink activeStyle={activeStyle} exact to="/talk">
              톡톡
            </StyleNavLink>
          </PageBtnBox>
        )}
      </Container>
    </React.Fragment>
  );
};

const StyleNavLink = styled(NavLink)`
  width: 40px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${Color.black};
  font-size: 16px;
  font-weight: bold;
`;

const activeStyle = {
  color: `${Color.primary}`,
  borderBottom: "2px solid orange",
  marginTop: "2px",
};

const PageBtnBox = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
  padding: 0 16px;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 40;
  background: ${Color.white};
  gap: 14px;
`;

const Container = styled.div`
  width: 100vw;
  max-width: ${maxWidth};
  margin: 0 auto;
  top: 0;
  z-index: 90;
  position: fixed;
  border-left: 1px solid ${Color.gray100};
  border-right: 1px solid ${Color.gray100};
  transition: 0.4s ease;
  ${(props) =>
    props.isTop
      ? null
      : `box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;`};
  ${({ isHide }) => isHide && "transform: translateY(-70px);"}
`;

const HeaderWrap = styled.div`
  top: 0;
  z-index: 100;
  width: 100%;
  height: 70px;
  padding: 0 16px;
  transition: 0.4s ease;
  background-color: ${(props) => (props.bgColor ? props.bgColor : Color.white)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) =>
    props.is_simple ? null : "border-bottom: 1px solid rgba(0, 0, 0, 0.08);"}
  & > button > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;

  margin-right: 4px;
`;

const SimpleContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: ${maxWidth};
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 5;
  ${(props) => (props.talk ? `border-top: 1px solid white;` : "")}
  ${(props) =>
    props.underThumbnail
      ? `border-bottom: 1px solid ${Color.gray100}; box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; background-color: ${Color.white};  border-left: 1px solid ${Color.gray100};
  border-right: 1px solid ${Color.gray100}; `
      : ""}

  ${(props) =>
    props.underTalk
      ? `border-bottom:0.5px solid ${Color.gray100}; box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; `
      : ""}
  ${(props) =>
    !props.underTalk && props.talk
      ? `border-left: 1px solid ${Color.gray100};
  border-right: 1px solid ${Color.gray100};`
      : ""}
  ${(props) =>
    props.is_login
      ? `border-left: 1px solid ${Color.gray100};
  border-right: 1px solid ${Color.gray100};`
      : ""}
`;

export default withRouter(Header);
