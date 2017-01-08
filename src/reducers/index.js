/**
   Reducer
*/

import * as Types from '../actions/types';

import * as Mandelbrot from '../lib/mandelbrot';

const defaultState = {
  smoothing: true,
  zoom: null,
  mandelbrot: Mandelbrot.create(
    255,
    -2, -1.5, 1, 1.5
  ),
  width: 0,
  height: 0,
  colours: {
    hueOffset: 0.63,
    saturation: 0.9,
    value: 0.8
  }
};

export default (state = defaultState, {type, payload}) => {
  switch (type) {
  case Types.RESIZE_CANVAS:
    return Object.assign({}, state, {
      width: payload.width,
      height: payload.height,
      mandelbrot: Mandelbrot.resize(
        state.mandelbrot, 
        payload.width, payload.height,
        payload.width, payload.height
      )
    });
  case Types.TOGGLE_SMOOTHING:
    return Object.assign({}, state, {
      smoothing: !state.smoothing
    });
  case Types.RESET_PLOT:
    return Object.assign({}, state, {
      zoom: defaultState.zoom,
      mandelbrot: Mandelbrot.resize(
        defaultState.mandelbrot,
        state.width, state.height,
        state.width, state.height
      )
    });
  case Types.START_ZOOM_SELECTION:
    return Object.assign({}, state, {
      zoom: {
        x1: payload.x,
        y1: payload.y,
      }
    });
  case Types.MOVE_ZOOM_SELECTION:
    if (state.zoom) {
      return Object.assign({}, state, {
        zoom: {
          x1: state.zoom.x1,
          y1: state.zoom.y1,
          x2: payload.x,
          y2: payload.y,
        }
      });
    }
    return state;
  case Types.FINISH_ZOOM_SELECTION:
    if (!state.zoom) {
      return Object.assign({}, state, {
        zoom: defaultState.zoom,
      });
    }
    if (!state.zoom.x2) {
      state.zoom.x1 -= 0.05;
      state.zoom.y1 -= 0.05;
      state.zoom.x2 = state.zoom.x1 + 0.1;
      state.zoom.y2 = state.zoom.y1 + 0.1;
    }
    if (state.zoom.x2 - state.zoom.x1 < 0.1) {
      state.zoom.x2 = state.zoom.x1 + 0.1;
      state.zoom.y2 = state.zoom.y1 + 0.1;
    }
    return Object.assign({}, state, {
      mandelbrot: Mandelbrot.zoom(
        state.mandelbrot,
        state.zoom.x1, state.zoom.y1,
        state.zoom.x2, state.zoom.y2
      ),
      zoom: defaultState.zoom,
    });
  case Types.CANCEL_ZOOM:
    return Object.assign({}, state, {
      zoom: defaultState.zoom,
    });
  default:
    return state;
  }
};
