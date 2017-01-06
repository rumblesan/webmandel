
export const create = function (repeats, x1, y1, x2, y2) {
  var mandelbrot = {
    repeats: repeats,
    coords: { x1: x1, y1: y1, x2: x2, y2: y2 }
  };

  return mandelbrot;
};

export const render = function (mandelbrot, smoothing, canvasWidth, canvasHeight) {

  var render = {
    width: canvasWidth,
    height: canvasHeight,
    escapeValues: new Float64Array(canvasWidth * canvasHeight),
    values: new Float64Array(canvasWidth * canvasHeight)
  };

  var highest = 0;
  var lowest = 1000;
  var value;
  var xDistPerPixel  = (mandelbrot.coords.x2 - mandelbrot.coords.x1) / render.width;
  var yDistPerPixel = (mandelbrot.coords.y2 - mandelbrot.coords.y1) / render.height;

  var x, y, xCoord, yCoord;
  for (x = 0; x < render.width; x += 1) {
    for (y = 0; y < render.height; y += 1) {
      xCoord = mandelbrot.coords.x1 + (x * xDistPerPixel);
      yCoord = mandelbrot.coords.y1 + (y * yDistPerPixel);
      value = calculateValue(mandelbrot, xCoord, yCoord, smoothing);
      if (value > highest) {
        highest = value;
      }
      if (value > 0 && value < lowest) {
        lowest = value;
      }
      render.escapeValues[y * render.width + x] = value;
    }
  }

  // scaling from 0 to 1
  var diff = highest - lowest;
  var i;
  for (i = 0; i < render.escapeValues.length; i += 1) {
    render.values[i] = (render.escapeValues[i] - lowest) / diff;
  }

  return render;
};

export const calculateValue = function (mandelbrot, xCoord, yCoord, smoothing) {

  var x = 0;
  var y = 0;
  var temp = 0;
  var iteration;
  for (
    iteration = 0;
    ((x*x + y*y) < 4) && (iteration < mandelbrot.repeats);
    iteration += 1
  ) {
    temp = (x*x - y*y) + xCoord;
    y = 2 * x * y + yCoord;
    x = temp;
  }

  var output;
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

export const zoom = function (mandelbrot, x1, y1, x2, y2, smoothing, canvasWidth, canvasHeight) {
  var x1Brot, y1Brot, x2Brot, y2Brot;

  var plotX = mandelbrot.coords.x2 - mandelbrot.coords.x1;
  var plotY = mandelbrot.coords.y2 - mandelbrot.coords.y1;

  var ratio = plotX / plotY;
  var xLength = Math.abs(x2 - x1);

  x1Brot = mandelbrot.coords.x1 + (plotX * x1);
  y1Brot = mandelbrot.coords.y1 + (plotY * y1);

  x2Brot = x1Brot + (plotX * xLength);

  y2Brot = y1Brot + (Math.abs(x2Brot - x1Brot) / ratio);

  return create(
    mandelbrot.repeats,
    x1Brot, y1Brot, x2Brot, y2Brot
  );
};

export const findCentre = function (mandelbrot) {
  var coords = mandelbrot.coords;
  var cX = (coords.x2 + coords.x1) / 2;
  var cY = (coords.y2 + coords.y1) / 2;
  return {x: cX, y: cY};
};

export const resize = function (mandelbrot, newWidth, newHeight, canvasWidth, canvasHeight) {
  var c = findCentre(mandelbrot);

  var plotWidth = mandelbrot.coords.x2 - mandelbrot.coords.x1;
  var pxRatio = plotWidth / canvasWidth;
  var newPlotWidth = pxRatio * newWidth;
  var newPlotHeight = pxRatio * newHeight;

  var newX1 = c.x - (newPlotWidth / 2);
  var newX2 = c.x + (newPlotWidth / 2);
  var newY1 = c.y - (newPlotHeight / 2);
  var newY2 = c.y + (newPlotHeight / 2);

  return create(mandelbrot.repeats, newX1, newY1, newX2, newY2);
};
