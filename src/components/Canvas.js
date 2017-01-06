
import React from 'react';

import * as Colour from '../lib/colour';
import * as Mandelbrot from '../lib/mandelbrot';

export default React.createClass({
  componentDidUpdate: function () {
    this.drawCanvas();
  },
  componentDidMount: function () {
    this.drawCanvas();
  },
  onMouseDown: function (event) {
    event.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const xPos = (event.clientX - rect.left) / this.canvas.width;
    const yPos = (event.clientY - rect.top) / this.canvas.height;
    this.props.startZoomSelection(xPos, yPos);
  },
  onMouseMove: function (event) {
    event.preventDefault();
    var rect = this.canvas.getBoundingClientRect();
    var xPos = (event.clientX - rect.left) / this.canvas.width;
    var yPos = (event.clientY - rect.top) / this.canvas.height;
    this.props.moveZoomSelection(xPos, yPos);
  },
  onMouseUp: function (event) {
    event.preventDefault();
    var rect = this.canvas.getBoundingClientRect();
    var xPos = (event.clientX - rect.left) / this.canvas.width;
    var yPos = (event.clientY - rect.top) / this.canvas.height;
    this.props.finishZoomSelection(xPos, yPos);
  },
  onMouseLeave: function () {
    this.props.cancelZoom();
  },
  drawCanvas: function () {
    const ctx = this.canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    const imageData = ctx.createImageData(
      this.canvas.width, this.canvas.height
    );
    const render = Mandelbrot.render(
      this.props.mandelbrot,
      this.props.smoothing,
      this.canvas.width, this.canvas.height
    );
    for (let x = 0; x < render.width; x += 1) {
      for (let y = 0; y < render.height; y += 1) {
        const p = y * render.width + x;
        const cp = p * 4;
        const v = render.values[p];
        if (v < 0) {
          imageData.data[cp]   = 0;
          imageData.data[cp+1] = 0;
          imageData.data[cp+2] = 0;
          imageData.data[cp+3] = 255;
        } else {
          const c = Colour.HSVtoRGB(
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
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseLeave}
        width={this.props.width}
        height={this.props.height}
        ></canvas>
    );
  }
});
