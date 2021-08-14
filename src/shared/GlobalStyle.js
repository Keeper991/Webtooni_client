import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url('../fonts/noto-sans-kr-v13-latin-regular.eot'); /* IE9 Compat Modes */
    src: local(''),
        url('../fonts/noto-sans-kr-v13-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../fonts/noto-sans-kr-v13-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('../fonts/noto-sans-kr-v13-latin-regular.woff') format('woff'), /* Modern Browsers */
        url('../fonts/noto-sans-kr-v13-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../fonts/noto-sans-kr-v13-latin-regular.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src: url('../fonts/noto-sans-kr-v13-latin-500.eot'); /* IE9 Compat Modes */
    src: local(''),
        url('../fonts/noto-sans-kr-v13-latin-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../fonts/noto-sans-kr-v13-latin-500.woff2') format('woff2'), /* Super Modern Browsers */
        url('../fonts/noto-sans-kr-v13-latin-500.woff') format('woff'), /* Modern Browsers */
        url('../fonts/noto-sans-kr-v13-latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../fonts/noto-sans-kr-v13-latin-500.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    src: url('../fonts/noto-sans-kr-v13-latin-700.eot'); /* IE9 Compat Modes */
    src: local(''),
        url('../fonts/noto-sans-kr-v13-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../fonts/noto-sans-kr-v13-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
        url('../fonts/noto-sans-kr-v13-latin-700.woff') format('woff'), /* Modern Browsers */
        url('../fonts/noto-sans-kr-v13-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../fonts/noto-sans-kr-v13-latin-700.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    src: url('../fonts/lato-v20-latin-regular.eot'); /* IE9 Compat Modes */
    src: local(''),
        url('../fonts/lato-v20-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../fonts/lato-v20-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('../fonts/lato-v20-latin-regular.woff') format('woff'), /* Modern Browsers */
        url('../fonts/lato-v20-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../fonts/lato-v20-latin-regular.svg#Lato') format('svg'); /* Legacy iOS */
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    src: url('../fonts/lato-v20-latin-700.eot'); /* IE9 Compat Modes */
    src: local(''),
        url('../fonts/lato-v20-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../fonts/lato-v20-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
        url('../fonts/lato-v20-latin-700.woff') format('woff'), /* Modern Browsers */
        url('../fonts/lato-v20-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../fonts/lato-v20-latin-700.svg#Lato') format('svg'); /* Legacy iOS */
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    src: url('../fonts/lato-v20-latin-700.eot'); /* IE9 Compat Modes */
    src: local(''),
        url('../fonts/lato-v20-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../fonts/lato-v20-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
        url('../fonts/lato-v20-latin-700.woff') format('woff'), /* Modern Browsers */
        url('../fonts/lato-v20-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../fonts/lato-v20-latin-700.svg#Lato') format('svg'); /* Legacy iOS */
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  }
  
  * {
    box-sizing: border-box;
  }
  body {
    position: relative;
    padding-top: 130px;
    margin: 0;
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
