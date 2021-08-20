import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { actionCreators as modalActions } from "../redux/modules/modal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image } from "../elements/index";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Color } from "./common";
import { title } from "../images/icons";
import {
  UserOutlined,
  SearchOutlined,
  LeftOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const Header = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

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
    props.location.pathname.includes("/talk/write") ||
    props.location.pathname === "/review/search" ||
    props.location.pathname.includes("/review/write/") ||
    props.location.pathname === "/profile" ||
    props.location.pathname === "/taste"
  ) {
    return null;
  }

  if (props.location.pathname === "/login") {
    return (
      <React.Fragment>
        <SimpleContainer>
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

  if (
    props.location.pathname.includes("/detail") &&
    !props.location.pathname.includes("/talk/detail")
  ) {
    return (
      <React.Fragment>
        <SimpleContainer>
          <HeaderWrap is_simple>
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
              />
              {is_login ? (
                <UserOutlined
                  onClick={() => dispatch(modalActions.activeModal("logout"))}
                />
              ) : (
                <Button
                  bgColor="transparent"
                  color={Color.black}
                  fontSize="12px"
                  border={`1px solid ${Color.gray200}`}
                  padding="7px 16px"
                  _onClick={() => {
                    history.push("/login");
                  }}
                >
                  로그인
                </Button>
              )}
            </IconWrap>
          </HeaderWrap>
        </SimpleContainer>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Container isHide={hide}>
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
            <Image width="100%" height="25px" src={title}></Image>
          </Button>
          <IconWrap>
            <SearchOutlined
              onClick={() => {
                history.push("/search");
              }}
            />
            {is_login ? (
              <UserOutlined
                onClick={() => dispatch(modalActions.activeModal("logout"))}
              />
            ) : (
              <Button
                bgColor="transparent"
                color={Color.black}
                fontSize="12px"
                border={`1px solid ${Color.gray200}`}
                padding="7px 16px"
                _onClick={() => {
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
            <StyleNavLink activeStyle={activeStyle} to="/recommendation">
              추천
            </StyleNavLink>
            <StyleNavLink activeStyle={activeStyle} to="/review">
              리뷰
            </StyleNavLink>
            <StyleNavLink activeStyle={activeStyle} to="/talk">
              톡톡
            </StyleNavLink>
          </PageBtnBox>
        )}
      </Container>
    </React.Fragment>
  );
};

const StyleNavLink = styled(NavLink)`
  width: 50px;
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
  top: 0;
  z-index: 90;
  position: fixed;
  transition: 0.4s ease;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  ${({ isHide }) => isHide && "transform: translateY(-70px);"}
`;

const HeaderWrap = styled.div`
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 70px;
  padding: 0 16px;
  transition: 0.4s ease;
  background-color: ${Color.white};
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
  gap: 16px;
`;

const SimpleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export default withRouter(Header);
