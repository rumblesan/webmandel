import { connect } from 'react-redux';
import {
  startZoomSelection,
  moveZoomSelection,
  finishZoomSelection,
  cancelZoom
} from '../actions';
import Canvas from '../components/Canvas';

const mapStateToProps = (state) => {
  return {
    smoothing: state.smoothing,
    mandelbrot: state.mandelbrot,
    width: state.width,
    height: state.height,
    colours: state.colours,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startZoomSelection: (x, y) => {
      dispatch(startZoomSelection(x, y));
    },
    moveZoomSelection: (x, y) => {
      dispatch(moveZoomSelection(x, y));
    },
    finishZoomSelection: (x, y) => {
      dispatch(finishZoomSelection(x, y));
    },
    cancelZoom: () => {
      dispatch(cancelZoom());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
