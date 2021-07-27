import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { Main, Detail, Recommendation, Review, Board, Search, MyPage } from "../pages/index"
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <ConnectedRouter history={history}>
      <GlobalStyle></GlobalStyle>
      <Route path="/" exact component={Main} />
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
