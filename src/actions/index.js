
import * as Types from './types';

export const resize = (width, height) => {
  return {
    type: Types.RESIZE_CANVAS,
    payload: {
      width, height
    }
  };
};

export const toggleSmoothing = () => {
  return {
    type: Types.TOGGLE_SMOOTHING
  };
};

export const resetPlot = () => {
  return {
    type: Types.RESET_PLOT
  };
};

export const startZoomSelection = (x, y) => {
  return {
    type: Types.START_ZOOM_SELECTION,
    payload: {
      x, y
    }
  };
};

export const moveZoomSelection = (x, y) => {
  return {
    type: Types.MOVE_ZOOM_SELECTION,
    payload: {
      x, y
    }
  };
};

export const finishZoomSelection = (x, y) => {
  return {
    type: Types.FINISH_ZOOM_SELECTION,
    payload: {
      x, y
    }
  };
};

export const cancelZoom = () => {
  return {
    type: Types.CANCEL_ZOOM
  };
};
