
var React   = require('react');

var Display = React.createClass({
    componentDidUpdate: function () {
        this.drawCanvas();
    },
    componentDidMount: function () {
        this.drawCanvas();
    },
    handleClick: function (event) {
        var canvas = this.getDOMNode();
        var rect = canvas.getBoundingClientRect();
        var xPos = (event.clientX - rect.left) / canvas.width;
        var yPos = (event.clientY - rect.top) / canvas.height;
        this.props.handleSelect(xPos, yPos);
    },
    drawCanvas: function () {
        var canvas = this.getDOMNode();
        var ctx = canvas.getContext('2d');
        var imageData = ctx.createImageData(
            canvas.width, canvas.height
        )
        var i;
        for (i = 0; i < imageData.data.length; i += 1) {
            imageData.data[i] = this.props.mandelbrot.canvas[i];
        }
        console.log(imageData.data);
        ctx.putImageData(imageData, 0, 0);
    },
    render: function () {
        return (
            <canvas
                onClick={this.handleClick}
                width={this.props.config.width}
                height={this.props.config.height}
            ></canvas>
        );
    }
});

module.exports = Display;

