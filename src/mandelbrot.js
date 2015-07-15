
var Colour = require('./colour');

var Mandelbrot = {};

Mandelbrot.create = function (width, height, repeats, x1, y1, x2, y2) {
    var mandelbrot = {
        width: width,
        height: height,
        repeats: repeats,
        coords: { x1: x1, y1: y1, x2: x2, y2: y2 },
        canvas: new Uint8ClampedArray(width * height * 4),
        smoothValues: new Float64Array(width * height)
    };

    return mandelbrot;
};

Mandelbrot.calculate = function (mandelbrot) {

    var highest = 0;
    var lowest = 1000;
    var value;

    var x, y;
    for (x = 0; x < mandelbrot.width; x += 1) {
        for (y = 0; y < mandelbrot.height; y += 1) {
            value = Mandelbrot.calculateSmoothValue(mandelbrot, x, y);
            if (value > highest) {
                highest = value;
            }
            if (value > 0 && value < lowest) {
                lowest = value;
            }
            mandelbrot.smoothValues[x*mandelbrot.height + y] = value;
        }
    }

    var v1, v2;
    // scaling from 0 to 1
    for (x = 0; x < mandelbrot.width; x += 1) {
        for (y = 0; y < mandelbrot.height; y += 1) {
            v1 = mandelbrot.smoothValues[x*mandelbrot.height + y];
            v2 = Mandelbrot.scaleValue(v1, highest, lowest);
            mandelbrot.smoothValues[x*mandelbrot.height + y] = v2;
        }
    }

    // calculate colours
    var p, c;
    for (x = 0; x < mandelbrot.width; x += 1) {
        for (y = 0; y < mandelbrot.height; y += 1) {
            p = x * mandelbrot.height + y;
            cp = p * 4;
            c = Colour.HSVtoRGB(mandelbrot.smoothValues[p], 0.5, 0.5);
            mandelbrot.canvas[cp]   = c.r;
            mandelbrot.canvas[cp+1] = c.g;
            mandelbrot.canvas[cp+2] = c.b;
            mandelbrot.canvas[cp+3] = 255;
        }
    }

    return mandelbrot;

};

Mandelbrot.calculateSmoothValue = function (mandelbrot, xPos, yPos) {

    var xCoord = mandelbrot.coords.x1 + (
        (mandelbrot.coords.x2 - mandelbrot.coords.x1) * (xPos / mandelbrot.width)
    );
    // Subtracting from y1 because we have two coordinate systems
    // Mandelbrot is plotted on usual x/y axes with y increasing upwards
    // Pixels have origin at top left corner and y increases downwards
    var yCoord = mandelbrot.coords.y1 - (
        (mandelbrot.coords.y2 - mandelbrot.coords.y1) * (yPos / mandelbrot.height)
    );


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
        output = iteration + 1 - (Math.log( Math.log( Math.sqrt(x*x + y*y) ) ) / Math.log(2));
    }
    return output;
};

Mandelbrot.scaleValue = function (value, highest, lowest) {
    return ( (value - lowest) / (highest - lowest) );
};

module.exports = Mandelbrot;

