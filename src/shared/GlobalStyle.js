import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2') format('woff2'),
        url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff') format('woff'),
        url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf') format('opentype');
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src: url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2') format('woff2'),
        url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff') format('woff'),
        url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.otf') format('opentype');
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    src: url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2') format('woff2'),
        url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff') format('woff'),
        url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf') format('opentype');
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    src: url('https://cdnjs.cloudflare.com/ajax/libs/lato-font/3.0.0/fonts/lato-normal/lato-normal.woff2') format('woff2'),
        url('https://cdnjs.cloudflare.com/ajax/libs/lato-font/3.0.0/fonts/lato-normal/lato-normal.woff') format('woff');
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    src: url('https://cdnjs.cloudflare.com/ajax/libs/lato-font/3.0.0/fonts/lato-medium/lato-medium.woff2') format('woff2'),
        url('https://cdnjs.cloudflare.com/ajax/libs/lato-font/3.0.0/fonts/lato-medium/lato-medium.woff') format('woff');
    unicode-range: U+0041-005A, U+0061-007A, U+00 30-0039;
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    src: url('https://cdnjs.cloudflare.com/ajax/libs/lato-font/3.0.0/fonts/lato-bold/lato-bold.woff2') format('woff2'),
        url('https://cdnjs.cloudflare.com/ajax/libs/lato-font/3.0.0/fonts/lato-bold/lato-bold.woff') format('woff');
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  }
  
  * {
    box-sizing: border-box;
    &:focus, &:active {
      outline: none;
    }
  }
  body {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a:link, a:visited {
    text-decoration: none;
  }
`;

export default GlobalStyle;
