import React from "react";
import { Color } from "../shared/common";
import styled from "styled-components";
import { Button, Text } from "../elements";

// 취향/프로필페이지 이동을 위한 단계별 숫자 버튼
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
