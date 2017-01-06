
import React from 'react';

import Controls from '../containers/InteractiveControls';
import RenderableCanvas from '../containers/RenderableCanvas';

export default () => {
  return (
    <div>
      <div id='header'>
        <Controls />
      </div>
      <RenderableCanvas />
    </div>
  );
};


