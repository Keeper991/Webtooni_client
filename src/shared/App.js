import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
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
} from "../pages/index";
import Header from "./Header";
import GlobalStyle from "./GlobalStyle";
import Modal from "./Modals/Modal";
import ScrollToTop from "./ScrollToTop";

function App() {
  const dispatch = useDispatch();
  dispatch(userActions.loginCheck());

  return (
    <>
      <ConnectedRouter history={history}>
        <GlobalStyle></GlobalStyle>
        <ScrollToTop></ScrollToTop>
        <Header></Header>
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
        {/* <Route path="/user/:userName" exact component={User} /> */}
      </ConnectedRouter>
      <Modal />
    </>
  );
}

export default App;
