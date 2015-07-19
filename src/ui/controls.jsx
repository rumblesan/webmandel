
var React = require('react');

var Controls = React.createClass({
    toggleSmoothing: function () {
        this.props.controlHandler('smoothing');
    },
    toggleReset: function () {
        this.props.controlHandler('reset');
    },
    render: function () {
        var smoothing = this.props.smoothing ? 'On' : 'Off';
        return (
            <div id='controls'>
                <span className='control-item'>Rumblesan</span>

                <span className='control-item' onClick={this.toggleSmoothing}>
                    Smoothing: {smoothing}
                </span>

                <span className='control-item' onClick={this.toggleReset}>
                    Reset
                </span>

                <span className='control-item'>
                    Click and drag to zoom
                </span>

            </div>
        );
    }
});

module.exports = Controls;

