import { connect } from 'react-redux';
import { toggleSmoothing, resetPlot } from '../actions';
import Controls from '../components/Controls';

const mapStateToProps = (state) => {
  return {
    smoothing: state.smoothing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSmoothing: () => {
      dispatch(toggleSmoothing());
    },
    resetPlot: () => {
      dispatch(resetPlot());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
