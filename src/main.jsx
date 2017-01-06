/*jslint browser: true */

import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './images/favicon.ico';
import './style/style.css';

import App from './app.jsx';

const canvasWidth  = document.documentElement.clientWidth;
const canvasHeight = document.documentElement.clientHeight;
const hwRatio = canvasHeight / canvasWidth;
const plotWidth = 3;
const centre = {
  x: -0.5,
  y: 0
};
const plotHeight = plotWidth * hwRatio;

const config = {
  width: canvasWidth,
  height: canvasHeight,
  repeats: 255,
  startX1: centre.x - (plotWidth / 2),
  startY1: centre.y - (plotHeight / 2),
  startX2: centre.x + (plotWidth / 2),
  startY2: centre.y + (plotHeight / 2),
  colours: {
    hueOffset: 0.63,
    saturation: 0.9,
    value: 0.8
  }
};

ReactDOM.render(
    <App config={config} />,
    document.body
);

