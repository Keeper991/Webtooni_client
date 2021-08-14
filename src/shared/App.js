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
  Search,
  MyPage,
  Login,
  Talk,
  TalkWrite,
  TalkDetail,
  Taste,
  Profile,
  ToonList,
  KakaoLogin,
  NaverLogin,
  ReviewWrite,
} from "../pages/index";
import Header from "./Header";
import GlobalStyle from "./GlobalStyle";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.loginCheck());
  }, []);

  return (
    <ConnectedRouter history={history}>
      <GlobalStyle></GlobalStyle>
      <Header></Header>
      <Route path="/" exact component={Main} />
      <Route path="/detail/:id" exact component={Detail} />
      <Route path="/toonlist/:id" exact component={ToonList} />
      <Route path="/login" exact component={Login} />
      <Route path="/taste" exact component={Taste} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/recommendation" exact component={Recommendation} />
      <Route path="/review" exact component={Review} />
      <Route path="/review/write/:webtoon_id" exact component={ReviewWrite} />
      <Route
        path="/review/write/:webtoon_id/:review_id"
        exact
        component={ReviewWrite}
      />
      <Route path="/search" exact component={Search} />
      <Route path="/mypage" exact component={MyPage} />
      <Route path="/talk" exact component={Talk} />
      <Route path="/talk/write" exact component={TalkWrite} />
      <Route path="/talk/write/:id" exact component={TalkWrite} />
      <Route path="/talk/detail/:id" exact component={TalkDetail} />
      <Route path="/user/kakao" exact component={KakaoLogin} />
      <Route path="/user/naver" exact component={NaverLogin} />
    </ConnectedRouter>
  );
}

export default App;
