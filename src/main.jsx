/*jslint browser: true */

var domready = require('domready');

var React = require('react');

var App = require('./app.jsx');

var config = {
    width: 1440,
    height: 960,
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

domready(function () {

    React.render(
        <App config={config} />,
        document.body
    );

});

