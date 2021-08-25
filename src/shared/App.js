import React from "react";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { Color } from "../shared/common";
import { actionCreators as userActions } from "../redux/modules/user";
import {
  Main,
  Detail,
  Recommendation,
  Review,
  ReviewSearch,
  Search,
  Login,
  Talk,
  TalkWrite,
  TalkDetail,
  Taste,
  Profile,
  ToonList,
  SocialLogin,
  ReviewWrite,
  User,
} from "../pages/index";
import Header from "./Header";
import GlobalStyle from "./GlobalStyle";
import Modal from "./Modals/Modal";
import ScrollToTop from "./ScrollToTop";

function App() {
  const dispatch = useDispatch();
  dispatch(userActions.loginCheck());

  return (
    <Container>
      <ConnectedRouter history={history}>
        <GlobalStyle></GlobalStyle>
        <ScrollToTop></ScrollToTop>
        <Center>
          <Header></Header>
        </Center>
        <Route path="/" exact component={Main} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/toonlist/:id" exact component={ToonList} />
        <Route path="/login" exact component={Login} />
        <Route path="/taste" exact component={Taste} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/recommendation" exact component={Recommendation} />
        <Route path="/review/write/:webtoon_id" exact component={ReviewWrite} />
        <Route path="/review" exact component={Review} />
        <Route path="/review/search" exact component={ReviewSearch} />
        <Route path="/search" exact component={Search} />
        <Route path="/talk" exact component={Talk} />
        <Route path="/talk/write" exact component={TalkWrite} />
        <Route path="/talk/write/:id" exact component={TalkWrite} />
        <Route path="/talk/detail/:id" exact component={TalkDetail} />
        <Route path="/user/kakao" exact component={SocialLogin} />
        <Route path="/user/naver" exact component={SocialLogin} />
        <Route path="/userinfo/:userName" exact component={User} />
      </ConnectedRouter>
      <Modal />
    </Container>
  );
}

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.section`
  border-left: 1px solid ${Color.gray100};
  border-right: 1px solid ${Color.gray100};
  max-width: 700px;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 130px;
  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
