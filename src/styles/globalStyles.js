import { createGlobalStyle } from 'styled-components';
import { COLOR } from './colorPalette';

export const GlobalStyle = createGlobalStyle`
*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

html,body{
  height:100%;
  width:100%;
}

body{
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: auto !important;
}

#root{
  min-height:100%;
  min-width:100%;
  --antd-wave-shadow-color:${COLOR.CORNFLOWER}
}

p,
  label {
    font-family: 'Lato', sans-serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
