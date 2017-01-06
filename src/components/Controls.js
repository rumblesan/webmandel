
import React from 'react';

export default ({smoothing, toggleSmoothing, resetPlot}) => {
  return (
    <div id='controls'>
      <span className='control-item'>Rumblesan</span>

      <span className='control-item' onClick={toggleSmoothing}>
        Smoothing: {smoothing ? 'On' : 'Off'}
      </span>

      <span className='control-item' onClick={resetPlot}>
        Reset
      </span>

      <span className='control-item'>
        Click and drag to zoom
      </span>

    </div>
  );
};
