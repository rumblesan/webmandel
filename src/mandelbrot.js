
export const create = (repeats, x1, y1, x2, y2) => {
  return {
    repeats,
    coords: { x1, y1, x2, y2 }
  };
};

export const render = (mandelbrot, smoothing, width, height) => {

  const escapeValues = new Float64Array(width * height);
  const values = new Float64Array(width * height);

  let highest = 0;
  let lowest = 1000;
  const xDistPerPixel  = (mandelbrot.coords.x2 - mandelbrot.coords.x1) / width;
  const yDistPerPixel = (mandelbrot.coords.y2 - mandelbrot.coords.y1) / height;

  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      const xCoord = mandelbrot.coords.x1 + (x * xDistPerPixel);
      const yCoord = mandelbrot.coords.y1 + (y * yDistPerPixel);
      const value = calculateValue(mandelbrot, xCoord, yCoord, smoothing);
      if (value > highest) {
        highest = value;
      }
      if (value > 0 && value < lowest) {
        lowest = value;
      }
      escapeValues[y * width + x] = value;
    }
  }

  // scaling from 0 to 1
  const diff = highest - lowest;
  for (let i = 0; i < escapeValues.length; i += 1) {
    values[i] = (escapeValues[i] - lowest) / diff;
  }

  return {
    width,
    height,
    escapeValues,
    values
  };
};

export const calculateValue = (mandelbrot, xCoord, yCoord, smoothing) => {

  let x = 0;
  let y = 0;
  let temp = 0;
  let iteration;
  for (
    iteration = 0;
    ((x*x + y*y) < 4) && (iteration < mandelbrot.repeats);
    iteration += 1
  ) {
    temp = (x*x - y*y) + xCoord;
    y = 2 * x * y + yCoord;
    x = temp;
  }

  let output;
  if (iteration >= mandelbrot.repeats) {
    output = -1;
  } else {
    if (smoothing) {
      output = iteration + 1 - (Math.log( Math.log( Math.sqrt(x*x + y*y) ) ) / Math.log(2));
    } else {
      output = iteration;
    }
  }
  return output;
};

export const zoom = (mandelbrot, x1, y1, x2, y2, smoothing, canvasWidth, canvasHeight) => {
  const plotX = mandelbrot.coords.x2 - mandelbrot.coords.x1;
  const plotY = mandelbrot.coords.y2 - mandelbrot.coords.y1;

  const ratio = plotX / plotY;
  const xLength = Math.abs(x2 - x1);

  const x1Brot = mandelbrot.coords.x1 + (plotX * x1);
  const y1Brot = mandelbrot.coords.y1 + (plotY * y1);

  const x2Brot = x1Brot + (plotX * xLength);

  const y2Brot = y1Brot + (Math.abs(x2Brot - x1Brot) / ratio);

  return create(
    mandelbrot.repeats,
    x1Brot, y1Brot, x2Brot, y2Brot
  );
};

export const findCentre = ({coords}) => {
  return {
    x: (coords.x2 + coords.x1) / 2,
    y: (coords.y2 + coords.y1) / 2
  };
};

export const resize = (mandelbrot, newWidth, newHeight, canvasWidth, canvasHeight) => {
  const c = findCentre(mandelbrot);

  const plotWidth = mandelbrot.coords.x2 - mandelbrot.coords.x1;
  const pxRatio = plotWidth / canvasWidth;
  const newPlotWidth = pxRatio * newWidth;
  const newPlotHeight = pxRatio * newHeight;

  const newX1 = c.x - (newPlotWidth / 2);
  const newX2 = c.x + (newPlotWidth / 2);
  const newY1 = c.y - (newPlotHeight / 2);
  const newY2 = c.y + (newPlotHeight / 2);

  return create(mandelbrot.repeats, newX1, newY1, newX2, newY2);
};
