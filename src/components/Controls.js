
import React from 'react';

export default ({smoothing, toggleSmoothing, resetPlot}) => {
  return (
    <div id='controls'>
      <span className='control-item interactive'>
        <a href="http://rumblesan.com">Rumblesan</a>
      </span>

      <span className='control-item interactive' onClick={toggleSmoothing}>
        Smoothing: {smoothing ? 'On' : 'Off'}
      </span>

      <span className='control-item interactive' onClick={resetPlot}>
        Reset
      </span>

      <span className='control-item'>
        Click and drag to zoom
      </span>

    </div>
  );
};
