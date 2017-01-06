
import React from 'react';

import * as Colour from '../colour';
import * as Mandelbrot from '../mandelbrot';

export default React.createClass({
  getInitialState: function () {
    return {
      selecting: false,
      selectionStart: { x: -1, y: -1 }
    };
  },
  componentDidUpdate: function () {
    this.drawCanvas();
  },
  componentDidMount: function () {
    this.drawCanvas();
  },
  handleMouseDown: function (event) {
    event.preventDefault();
    var rect = this.canvas.getBoundingClientRect();
    var xPos = (event.clientX - rect.left) / this.canvas.width;
    var yPos = (event.clientY - rect.top) / this.canvas.height;
    this.setState({
      selecting: true,
      selectionStart: { x: xPos, y: yPos }
    });
  },
  handleMouseUp: function (event) {
    event.preventDefault();
    if (!this.state.selecting) {
      return;
    }
    var rect = this.canvas.getBoundingClientRect();
    var xPos = (event.clientX - rect.left) / this.canvas.width;
    var yPos = (event.clientY - rect.top) / this.canvas.height;
    this.setState({
      selecting: false,
      selectionStart: { x: -1, y: -1 }
    });
    this.props.handleSelect(
      this.state.selectionStart.x,
      this.state.selectionStart.y,
      xPos,
      yPos
    );
  },
  handleMouseOut: function () {
    this.setState({
      selecting: false,
      selectionStart: { x: -1, y: -1 }
    });
  },
  drawCanvas: function () {
    var ctx = this.canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    var imageData = ctx.createImageData(
      this.canvas.width, this.canvas.height
    );
    var render = Mandelbrot.render(
      this.props.mandelbrot,
      this.props.smoothing,
      this.canvas.width, this.canvas.height
    );
    var p, c, x, y, v, cp;
    for (x = 0; x < render.width; x += 1) {
      for (y = 0; y < render.height; y += 1) {
        p = y * render.width + x;
        cp = p * 4;
        v = render.values[p];
        if (v < 0) {
          imageData.data[cp]   = 0;
          imageData.data[cp+1] = 0;
          imageData.data[cp+2] = 0;
          imageData.data[cp+3] = 255;
        } else {
          c = Colour.HSVtoRGB(
            v + this.props.colours.hueOffset,
            this.props.colours.saturation,
            this.props.colours.value
          );
          imageData.data[cp]   = c.r;
          imageData.data[cp+1] = c.g;
          imageData.data[cp+2] = c.b;
          imageData.data[cp+3] = 255;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  },
  render: function () {
    return (
      <canvas
        ref={(el) => { this.canvas = el; }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseOut={this.handleMouseOut}
        width={this.props.width}
        height={this.props.height}
        ></canvas>
    );
  }
});
