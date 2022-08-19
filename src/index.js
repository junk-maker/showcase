import App from './App';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';

const Global = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 100%;
}

body {
  color: #000;
  font-weight: 300;
  line-height: 1.6;
  background: #ecf0f1;
  box-sizing: border-box;
  font-family: Open Sans, sans-serif;
}
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Global/>
    <App />
  </BrowserRouter>
 
);

const devMode = process.env.NODE_ENV === 'development';
if (devMode && module && module.hot) {
    module.hot.accept();
};