
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
    handleMouseOut: function (event) {
        this.setState({
            selecting: false,
            selectionStart: { x: -1, y: -1 }
        });
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
        ctx.putImageData(imageData, 0, 0);
    },
    render: function () {
        return (
            <canvas
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseOut={this.handleMouseOut}
                width={this.props.config.width}
                height={this.props.config.height}
            ></canvas>
        );
    }
});

module.exports = Display;

