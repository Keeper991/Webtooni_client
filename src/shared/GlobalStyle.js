import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    position: relative;
    padding-top: 130px;
  }
`;

export default GlobalStyle;
