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
} from "../pages/index";
import Header from "./Header";
import GlobalStyle from "./GlobalStyle";

function App() {
  const dispatch = useDispatch();

  const is_Token = document.cookie.match("USER_TOKEN") ? true : false;

  React.useEffect(() => {
    if (is_Token) {
      dispatch(userActions.loginCheck());
    }
  }, []);

  return (
    <ConnectedRouter history={history}>
      <GlobalStyle></GlobalStyle>
      <Header></Header>
      <Route path="/" exact component={Main} />
      <Route path="/detail/:id" exact component={Detail} />
      <Route path="/login" exact component={Login} />
      <Route path="/taste" exact component={Taste} />
      <Route path="/recommendation" exact component={Recommendation} />
      <Route path="/review" exact component={Review} />
      <Route path="/search" exact component={Search} />
      <Route path="/mypage" exact component={MyPage} />
      <Route path="/talk" exact component={Talk} />
      <Route path="/talk/write" exact component={TalkWrite} />
      <Route path="/talk/write/:id" exact component={TalkWrite} />
      <Route path="/talk/:id" exact component={TalkDetail} />
    </ConnectedRouter>
  );
}

export default App;
