import React from "react";
import { Color } from "../shared/common";
import styled from "styled-components";
import { Button, Text } from "../elements";

const ProgressStepBtns = ({ currentPageNum, clickHandlers, ...props }) => {
  return (
    <>
      {clickHandlers.map((onClick, i) => (
        <React.Fragment key={i}>
          <Button
            shape="circle"
            bgColor={currentPageNum === i + 1 ? Color.black : Color.gray200}
            border="none"
            size="24px"
            padding="0"
            _onClick={onClick}
          >
            <Text
              type="num"
              fontSize="12px"
              fontWeight="bold"
              color={Color.white}
            >
              {i + 1}
            </Text>
          </Button>
          {i < clickHandlers.length - 1 && <Line />}
        </React.Fragment>
      ))}
    </>
  );
};

const Line = styled.div`
  width: 1.5em;
  height: 0.5px;
  background-color: ${Color.gray200};
`;

export default ProgressStepBtns;
