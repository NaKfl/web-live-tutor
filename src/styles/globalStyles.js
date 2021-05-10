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
  width:100% !important;
}

body{
  font-family: 'Open Sans', sans-serif;
  overflow: auto !important;
}

#root{
  min-height:100%;
  min-width:100%;
  --antd-wave-shadow-color:${COLOR.CORNFLOWER}
}

p,
  label {
    font-family: 'Open Sans', sans-serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

::-webkit-scrollbar {
      width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
`;
