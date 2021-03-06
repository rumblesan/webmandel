
import React from 'react';

export default ({zoom, width, height}) => {
  if (!zoom || !zoom.x2 || !zoom.y2) {
    return <svg></svg>;
  }
  const ratio = height / width;
  const bWidth = (zoom.x2 - zoom.x1) * width;
  const bHeight = bWidth * ratio;
  return (
    <svg>
      <rect
        id='zoombox'
        x={zoom.x1 * width}
        y={zoom.y1 * height}
        width={bWidth}
        height={bHeight}
        stroke="white"
        fill="none"
      />
    </svg>
  );
};
