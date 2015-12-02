/*jslint browser: true */

var React = require('react');

var App = require('./app.jsx');

var canvasWidth  = document.documentElement.clientWidth;
var canvasHeight = document.documentElement.clientHeight;
var hwRatio = canvasHeight / canvasWidth;
var plotWidth = 3;
var centre = {
    x: -0.5,
    y: 0
}
var plotHeight = plotWidth * hwRatio;

var config = {
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

React.render(
    <App config={config} />,
    document.body
);

