import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import {
  NotoSansKRBold,
  NotoSansKRRegular,
  NotoSansKRMedium,
  LatoBold,
  LatoRegular,
} from "../fonts";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: "NotoSansKR";
    src: url(${NotoSansKRRegular});
  }

  @font-face {
    font-family: "NotoSansKR";
    src: url(${NotoSansKRMedium});
    font-weight: 500;
  }

  @font-face {
    font-family: "NotoSansKR";
    src: url(${NotoSansKRBold});
    font-weight: 700;
  }

  @font-face {
    font-family: "NotoSansKR";
    src: url(${LatoRegular});
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  }

  @font-face {
    font-family: "NotoSansKR";
    src: url(${LatoBold});
    font-weight: 500;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  }

  @font-face {
    font-family: "NotoSansKR";
    src: url(${LatoBold});
    font-weight: 700;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  }
  
  * {
    box-sizing: border-box;
  }
  body {
    position: relative;
    padding-top: 130px;
    margin: 0;
    font-family: 'NotoSansKR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

`;

export default GlobalStyle;
