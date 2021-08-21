import React from "react";
import _ from "lodash";
import Loader from "react-loader-spinner";

const InfinityScroll = (props) => {
  const { children, callNext, loading, is_next } = props;

  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      if (loading) {
        return;
      }

      callNext();
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    if (loading) {
      return;
    }

    if (is_next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [is_next, loading]);
  console.log("다음꺼?", is_next, "로딩중?", loading);
  return (
    <React.Fragment>
      {children}
      {is_next && <Loader type="Oval" color="#FC5C2B" height={40} width={40} />}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};

export default InfinityScroll;
