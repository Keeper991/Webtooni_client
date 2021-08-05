import React from "react";
import { Color } from "../shared/common";
import styled from "styled-components";
import { Button } from "../elements";

const ProgressStepBtns = ({ currentPageNum, clickHandlers, ...props }) => {
  return (
    <>
      {clickHandlers.map((onClick, i) => (
        <>
          <Button
            shape="circle"
            color={currentPageNum === i + 1 ? Color.white : Color.darkGray}
            bgColor={currentPageNum === i + 1 ? Color.black : Color.gray}
            border="none"
            size="24px"
            padding="0"
            _onClick={onClick}
          >
            {i + 1}
          </Button>
          {i < clickHandlers.length - 1 && <Line />}
        </>
      ))}
    </>
  );
};

const Line = styled.div`
  width: 1.5em;
  height: 0.5px;
  background-color: ${Color.gray};
`;

export default ProgressStepBtns;
