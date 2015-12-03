
var Colour = require('../colour');
var Mandelbrot = require('../mandelbrot');

var React   = require('react');

var Display = React.createClass({
    getInitialState: function () {
        return {
            selecting: false,
            selectionStart: { x: -1, y: -1 }
        };
    },
    componentDidUpdate: function () {
        this.drawCanvas();
    },
    componentDidMount: function () {
        this.drawCanvas();
    },
    handleMouseDown: function (event) {
        event.preventDefault();
        var canvas = this.getDOMNode();
        var rect = canvas.getBoundingClientRect();
        var xPos = (event.clientX - rect.left) / canvas.width;
        var yPos = (event.clientY - rect.top) / canvas.height;
        this.setState({
            selecting: true,
            selectionStart: { x: xPos, y: yPos }
        });
    },
    handleMouseUp: function (event) {
        event.preventDefault();
        if (!this.state.selecting) {
            return;
        }
        var canvas = this.getDOMNode();
        var rect = canvas.getBoundingClientRect();
        var xPos = (event.clientX - rect.left) / canvas.width;
        var yPos = (event.clientY - rect.top) / canvas.height;
        this.setState({
            selecting: false,
            selectionStart: { x: -1, y: -1 }
        });
        this.props.handleSelect(
            this.state.selectionStart.x,
            this.state.selectionStart.y,
            xPos,
            yPos
        );
    },
    handleMouseOut: function () {
        this.setState({
            selecting: false,
            selectionStart: { x: -1, y: -1 }
        });
    },
    drawCanvas: function () {
        var canvas = this.getDOMNode();
        var ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        var imageData = ctx.createImageData(
            canvas.width, canvas.height
        );
        var render = Mandelbrot.calculate(
            this.props.mandelbrot,
            this.props.smoothing,
            canvas.width, canvas.height
        );
        var p, c, x, y, v, cp;
        for (x = 0; x < canvas.width; x += 1) {
            for (y = 0; y < canvas.height; y += 1) {
                p = y * canvas.width + x;
                cp = p * 4;
                v = render.values[p];
                if (v < 0) {
                    imageData.data[cp]   = 0;
                    imageData.data[cp+1] = 0;
                    imageData.data[cp+2] = 0;
                    imageData.data[cp+3] = 255;
                } else {
                    c = Colour.HSVtoRGB(
                        v + this.props.colours.hueOffset,
                        this.props.colours.saturation,
                        this.props.colours.value
                    );
                    imageData.data[cp]   = c.r;
                    imageData.data[cp+1] = c.g;
                    imageData.data[cp+2] = c.b;
                    imageData.data[cp+3] = 255;
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);
    },
    render: function () {
        return (
            <canvas
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseOut={this.handleMouseOut}
                width={this.props.width}
                height={this.props.height}
            ></canvas>
        );
    }
});

module.exports = Display;

