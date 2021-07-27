import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import Main from "../components/Main";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Main} />
    </ConnectedRouter>
  );
}

export default App;
