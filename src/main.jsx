/*jslint browser: true */

var React = require('react');

var App = require('./app.jsx');

var config = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    repeats: 255,
    startX1: -2.0,
    startY1: -1.0,
    startX2:  1.0,
    startY2:  1.0,
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

