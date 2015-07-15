
var React = require('react');

var Controls = require('./ui/controls.jsx');
var Display = require('./ui/display.jsx');

var Mandelbrot = require('./mandelbrot');

var App = React.createClass({
    getInitialState: function () {
        return {
            smoothing: true,
            mandelbrot: Mandelbrot.calculate(
                Mandelbrot.create(
                    this.props.config.width,
                    this.props.config.height,
                    this.props.config.repeats,
                    this.props.config.startX1,
                    this.props.config.startY1,
                    this.props.config.startX2,
                    this.props.config.startY2
                )
            )
        };
    },
    handleMouseSelect: function (x1Pos, y1Pos, x2Pos, y2Pos) {
        console.log('mouse selection', x1Pos, y1Pos, x2Pos, y2Pos);
    },
    toggleSmoothing: function () {
        if (this.state.smoothing) {
            this.setState({ smoothing: false });
        } else {
            this.setState({ smoothing: true });
        }
    },
    handleControls: function (control) {
        switch (control) {
            case 'smoothing':
                this.toggleSmoothing();
                break;
            case 'reset':
                this.reset();
                break;
            default:
                console.log('Unknown control');
        }
    },
    reset: function () {
        this.setState({
            mandelbrot: Mandelbrot.calculate(
                Mandelbrot.create(
                    this.props.config.width,
                    this.props.config.height,
                    this.props.config.repeats,
                    this.props.config.startX1,
                    this.props.config.startY1,
                    this.props.config.startX2,
                    this.props.config.startY2
                )
            )
        });
    },
    render: function () {
        return (
            <div>
                <div id={'header'}>
                    <Controls
                        smoothing={this.state.smoothing}
                        controlHandler={this.handleControls}
                    />
                </div>
                <Display
                    config={this.props.config}
                    handleSelect={this.handleMouseSelect}
                    mandelbrot={this.state.mandelbrot}
                />
            </div>
        );
    }
});

module.exports = App;

