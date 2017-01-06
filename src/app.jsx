
import React from 'react';
import _ from 'underscore';

import Controls from './ui/controls.jsx';
import Display from './ui/display.jsx';

import * as Mandelbrot from './mandelbrot';

export default React.createClass({
  getInitialState: function () {
    return {
      smoothing: true,
      width: this.props.config.width,
      height: this.props.config.height,
      mandelbrot: Mandelbrot.create(
        this.props.config.repeats,
        this.props.config.startX1,
        this.props.config.startY1,
        this.props.config.startX2,
        this.props.config.startY2
      )
    };
  },
  handleMouseSelect: function (x1Pos, y1Pos, x2Pos, y2Pos) {
    this.setState({
      mandelbrot: Mandelbrot.zoom(
        this.state.mandelbrot,
        x1Pos,
        y1Pos,
        x2Pos,
        y2Pos,
        this.state.smoothing,
        this.state.width,
        this.state.height
      )
    });
  },
  toggleSmoothing: function () {
    if (this.state.smoothing) {
      this.setState({
        smoothing: false
      });
    } else {
      this.setState({
        smoothing: true
      });
    }
  },
  handleControls: function (control) {
    switch (control) {
    case 'smoothing':
      this.toggleSmoothing();
      break;
    case 'reset':
      this.reset();
      break;
      //default:
      //    console.log('Unknown control');
    }
  },
  reset: function () {
    this.setState({
      mandelbrot: Mandelbrot.create(
        this.props.config.repeats,
        this.props.config.startX1,
        this.props.config.startY1,
        this.props.config.startX2,
        this.props.config.startY2
      )
    });
  },
  resize: _.debounce(function () {
    this.setState({
      mandelbrot: Mandelbrot.resize(
        this.state.mandelbrot,
        this.state.width,
        this.state.height,
        this.state.width,
        this.state.height
      )
    });
  }, 200),
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  handleResize: function () {
    this.setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }, this.resize);
  },
  render: function () {
    return (
      <div>
        <div id={'header'}>
          <Controls
            smoothing={this.state.smoothing}
            controlHandler={this.handleControls}
            />
        </div>
        <Display
          colours={this.props.config.colours}
          width={this.state.width}
          height={this.state.height}
          handleSelect={this.handleMouseSelect}
          smoothing={this.state.smoothing}
          mandelbrot={this.state.mandelbrot}
          />
      </div>
    );
  }
});
