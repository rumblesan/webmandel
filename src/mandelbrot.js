
var Mandelbrot = {};

Mandelbrot.create = function (width, height, repeats, x1, y1, x2, y2) {
    var mandelbrot = {
        width: width,
        height: height,
        repeats: repeats,
        coords: { x1: x1, y1: y1, x2: x2, y2: y2 },
        escapeValues: new Float64Array(width * height),
        values: new Float64Array(width * height)
    };

    return mandelbrot;
};

Mandelbrot.calculate = function (mandelbrot, smoothing) {

    var highest = 0;
    var lowest = 1000;
    var value;
    var xDistPerPixel  = (mandelbrot.coords.x2 - mandelbrot.coords.x1) / mandelbrot.width;
    var yDistPerPixel = (mandelbrot.coords.y2 - mandelbrot.coords.y1) / mandelbrot.height;

    var x, y, xCoord, yCoord;
    for (x = 0; x < mandelbrot.width; x += 1) {
        for (y = 0; y < mandelbrot.height; y += 1) {
            xCoord = mandelbrot.coords.x1 + (x * xDistPerPixel);
            yCoord = mandelbrot.coords.y1 + (y * yDistPerPixel);
            value = Mandelbrot.calculateValue(mandelbrot, xCoord, yCoord, smoothing);
            if (value > highest) {
                highest = value;
            }
            if (value > 0 && value < lowest) {
                lowest = value;
            }
            mandelbrot.escapeValues[y * mandelbrot.width + x] = value;
        }
    }

    // scaling from 0 to 1
    var diff = highest - lowest;
    var i;
    for (i = 0; i < mandelbrot.escapeValues.length; i += 1) {
        mandelbrot.values[i] = (mandelbrot.escapeValues[i] - lowest) / diff;
    }

    return mandelbrot;
};

Mandelbrot.calculateValue = function (mandelbrot, xCoord, yCoord, smoothing) {

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

Mandelbrot.zoom = function (mandelbrot, x1, y1, x2, y2, smoothing) {
    var x1Brot, y1Brot, x2Brot, y2Brot;

    var plotX = mandelbrot.coords.x2 - mandelbrot.coords.x1;
    var plotY = mandelbrot.coords.y2 - mandelbrot.coords.y1;

    var ratio = plotX / plotY;
    var xLength = Math.abs(x2 - x1);

    x1Brot = mandelbrot.coords.x1 + (plotX * x1);
    y1Brot = mandelbrot.coords.y1 + (plotY * y1);

    x2Brot = x1Brot + (plotX * xLength);

    y2Brot = y1Brot + (Math.abs(x2Brot - x1Brot) / ratio);

    return Mandelbrot.calculate(
        Mandelbrot.create(
            mandelbrot.width, mandelbrot.height, mandelbrot.repeats,
            x1Brot, y1Brot, x2Brot, y2Brot
        ),
        smoothing
    );
};

Mandelbrot.findCentre = function (mandelbrot) {
    var coords = mandelbrot.coords;
    var cX = (coords.x2 + coords.x1) / 2;
    var cY = (coords.y2 + coords.y1) / 2;
    return {x: cX, y: cY};
};

Mandelbrot.resize = function (mandelbrot, newWidth, newHeight) {
    var c = Mandelbrot.findCentre(mandelbrot);

    var plotWidth = mandelbrot.coords.x2 - mandelbrot.coords.x1;
    var pxRatio = plotWidth / mandelbrot.width;
    var newPlotWidth = pxRatio * newWidth;
    var newPlotHeight = pxRatio * newHeight;

    var newX1 = c.x - (newPlotWidth / 2);
    var newX2 = c.x + (newPlotWidth / 2);
    var newY1 = c.y - (newPlotHeight / 2);
    var newY2 = c.y + (newPlotHeight / 2);

    return Mandelbrot.create(newWidth, newHeight, mandelbrot.repeats, newX1, newY1, newX2, newY2);
};

module.exports = Mandelbrot;

