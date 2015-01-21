var React = require('react'),
    d3gauge = require('d3-gauge');


function getReadableFileSizeString(fileSizeInBytes) {
    var i = -1;
    // var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / (1024 * 1024);
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(3); // + byteUnits[i];
};

var MemoryUsageGraph = React.createClass({

    propTypes: {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        title: React.PropTypes.string,
        data: React.PropTypes.number,
        domain: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            width: 400,
            height: 450,
            min: 0,
            max: 10,
            data: 0,
            title: 'Memory Chart',
            label: 'Memory Usage'
        };
    },

    getInitialState: function() {
        return {
            title: 'Memory Usage'
        };
    },

    render: function() {
        return (
            <div className="memory-usage-section">
                <h4 className="memory-usage-heading">{this.props.title}</h4>
            </div>
        );
    },

    componentDidMount: function() {
        var dom =  this.getDOMNode();
        this.gauge = this.createGauge(dom, this.props);
    },

    shouldComponentUpdate: function() {
        var dom =  this.getDOMNode();
        this.updateGauge(dom, this.props);
        return false;
    },

    updateGauge: function (dom, props) {
        var data = getReadableFileSizeString(props.data);
        this.gauge.write(data);
    },

    createGauge: function (dom, props) {
        var width = props.width;
        var height = props.height;
        var min = props.min;
        var max = props.max;
        width = width + 200;
        var data = props.data;

        var config = {
            label: props.label,
            clazz: 'simple',
            size: 300,
            min: undefined != min ? min : 0,
            max: undefined != max ? max : 2
        };

        var range = config.max - config.min;
        config.yellowZones = [{ from: config.min + range * 0.75, to: config.min + range * 0.9 }];
        config.redZones = [{ from: config.min + range * 0.9, to: config.max }];

        return d3gauge(dom, config);
    }

});

module.exports = MemoryUsageGraph;