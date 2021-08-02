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
  Board,
  Search,
  MyPage,
  Login,
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
      <Route path="/login" exact component={Login} />
      <Route path="/detail" exact component={Detail} />
      <Route path="/recommendation" exact component={Recommendation} />
      <Route path="/review" exact component={Review} />
      <Route path="/board" exact component={Board} />
      <Route path="/search" exact component={Search} />
      <Route path="/mypage" exact component={MyPage} />
    </ConnectedRouter>
  );
}

export default App;
