import React from 'react';
import { renderToString } from 'react-dom/server';

import './index.css';
import App from './App';

const render = () => {
  let content = renderToString(
     <App />
  );
  return { content };
}

export {
  render
};

export default render;
