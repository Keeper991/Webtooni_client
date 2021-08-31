import { useEffect } from "react";
import ReactGA from "react-ga";
import { history } from "../redux/configureStore";
const GA = () => {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {});
    history.listen((location, action) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname + window.location.search);
    });
  }, []);

  return <></>;
};

export default GA;
