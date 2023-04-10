import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${normalize}

  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    height: 100%;
    display: block;
  }

  * {
    box-sizing: border-box;
  }

  /* Your custom global styles go here */
`;

export default GlobalStyles;
